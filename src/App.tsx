import React, { useState, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { EditorialGuide } from './components/EditorialGuide';
import { Footer } from './components/Footer';
import { InfoModals } from './components/InfoModals';
import { ALL_CRICKET_BATS, SELLER_INFO } from './data/bats';
import { BatCategory, BatWeightClass, CartItem, CricketBat, SortOption } from './types/bat';
import {
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Scale,
  ShieldCheck,
  Sparkles,
  Video,
  MessageCircle,
  Grid2X2,
  Square,
  Home,
  Heart,
  ShoppingBag,
} from 'lucide-react';

export default function App() {
  // Model & Filter States
  const [selectedModel, setSelectedModel] = useState<BatCategory>('All');
  const [selectedWeightClass, setSelectedWeightClass] = useState<BatWeightClass>('All');
  const [selectedBallType, setSelectedBallType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([400, 4500]);
  const [sortBy, setSortBy] = useState<SortOption>('position');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      bat: ALL_CRICKET_BATS[0],
      selectedWeight: '1035g',
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<CricketBat[]>([ALL_CRICKET_BATS[1], ALL_CRICKET_BATS[2]]);

  // Total cart items count
  const totalCartItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  // Modals & Drawers
  const [quickViewBat, setQuickViewBat] = useState<CricketBat | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<'about' | 'contact' | 'dealership' | null>(null);

  // Model Selection
  const handleSelectModel = (model: BatCategory) => {
    setSelectedModel(model);
  };

  const handleResetFilters = () => {
    setSelectedModel('All');
    setSelectedWeightClass('All');
    setSelectedBallType('All');
    setPriceRange([400, 4500]);
    setSortBy('position');
    setSearchQuery('');
  };

  // Cart Actions
  const handleAddToCart = (bat: CricketBat, selectedWeight?: string) => {
    const weightToUse = selectedWeight || bat.availableWeights[0] || bat.weightRange;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.bat.id === bat.id && item.selectedWeight === weightToUse
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [...prev, { bat, selectedWeight: weightToUse, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist Actions
  const handleToggleWishlist = (bat: CricketBat) => {
    setWishlist((prev) => {
      const exists = prev.some((b) => b.id === bat.id);
      if (exists) {
        return prev.filter((b) => b.id !== bat.id);
      }
      return [...prev, bat];
    });
  };

  // Filter & Sort Calculation
  const filteredBats = useMemo(() => {
    return ALL_CRICKET_BATS.filter((bat) => {
      // Model Filter
      if (selectedModel !== 'All' && bat.model !== selectedModel) {
        return false;
      }

      // Weight Class Filter
      if (selectedWeightClass !== 'All') {
        if (selectedWeightClass === 'Under 980g') {
          const isLight = bat.weightRange.includes('950') || bat.weightRange.includes('980') || (bat.verifiedWeight && bat.verifiedWeight.includes('957'));
          if (!isLight) return false;
        } else if (selectedWeightClass === '1000g - 1035g') {
          const isMid = bat.weightRange.includes('1000') || bat.weightRange.includes('1020') || bat.weightRange.includes('1035');
          if (!isMid) return false;
        } else if (selectedWeightClass === '1040g+') {
          const isHeavy = bat.weightRange.includes('1040') || bat.weightRange.includes('1050') || bat.weightRange.includes('1065');
          if (!isHeavy) return false;
        }
      }

      // Ball Type Filter
      if (selectedBallType !== 'All') {
        const matchesBall = bat.ballSuitability.some((b) =>
          b.toLowerCase().includes(selectedBallType.toLowerCase())
        );
        if (!matchesBall) return false;
      }

      // Price Range Filter
      if (bat.finalPrice < priceRange[0] || bat.finalPrice > priceRange[1]) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = bat.name.toLowerCase().includes(q);
        const matchesModel = bat.model.toLowerCase().includes(q);
        const matchesDesc = bat.shortDesc.toLowerCase().includes(q);
        const matchesWeight = bat.weightRange.toLowerCase().includes(q);
        const matchesScoop = bat.scoopType.toLowerCase().includes(q);
        if (!matchesName && !matchesModel && !matchesDesc && !matchesWeight && !matchesScoop) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') {
        return a.finalPrice - b.finalPrice;
      }
      if (sortBy === 'price-high-low') {
        return b.finalPrice - a.finalPrice;
      }
      if (sortBy === 'weight-low-high') {
        const getWeightNum = (str: string) => {
          const match = str.match(/\d+/);
          return match ? parseInt(match[0], 10) : 1000;
        };
        return getWeightNum(a.weightRange) - getWeightNum(b.weightRange);
      }
      return 0; // 'position' retains catalog order
    });
  }, [selectedModel, selectedWeightClass, selectedBallType, priceRange, sortBy, searchQuery]);

  const activeFilterCount =
    (selectedModel !== 'All' ? 1 : 0) +
    (selectedWeightClass !== 'All' ? 1 : 0) +
    (selectedBallType !== 'All' ? 1 : 0) +
    (priceRange[0] !== 400 || priceRange[1] !== 4500 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#18181b] flex flex-col font-sans">
      {/* 1. Orange Top Utility Bar */}
      <TopBar
        onOpenAbout={() => setActiveInfoModal('about')}
        onOpenContact={() => setActiveInfoModal('contact')}
      />

      {/* 2. Cricket Adda Brand Header */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeModel={selectedModel}
        onSelectModel={handleSelectModel}
      />

      {/* 3. High-Impact Cricket Adda Hero Showcase Banner */}
      <HeroBanner
        activeModel={selectedModel}
        onSelectCategory={handleSelectModel}
      />

      {/* 4. Main Store Container */}
      <main id="catalog" className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12">
        {/* Mobile Filter & Grid Control Bar */}
        <div className="lg:hidden flex items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-200/80">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-800 shadow-xs cursor-pointer touch-manipulation"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600" strokeWidth={1.75} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#f15b28] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            {/* 1-Col vs 2-Col Mobile View Toggle */}
            <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-100/80 p-0.5">
              <button
                onClick={() => setMobileGridCols(1)}
                className={`p-1 rounded cursor-pointer transition-colors touch-manipulation ${
                  mobileGridCols === 1
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Single Column (Detailed View)"
                aria-label="Single column detailed view"
              >
                <Square className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setMobileGridCols(2)}
                className={`p-1 rounded cursor-pointer transition-colors touch-manipulation ${
                  mobileGridCols === 2
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Two Columns (Compact View)"
                aria-label="Two column compact view"
              >
                <Grid2X2 className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Mobile Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.75} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-neutral-200 rounded-lg px-2 py-1 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer"
              >
                <option value="position">Featured</option>
                <option value="weight-low-high">Lightest (957g)</option>
                <option value="price-low-high">₹ Low to High</option>
                <option value="price-high-low">₹ High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <div
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col justify-between overflow-y-auto p-4 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="font-bold text-sm text-neutral-900">Filter Bats</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="py-3">
                <FilterSidebar
                  selectedModel={selectedModel}
                  onSelectModel={(m) => {
                    handleSelectModel(m);
                    setMobileFilterOpen(false);
                  }}
                  selectedWeightClass={selectedWeightClass}
                  onSelectWeightClass={(w) => {
                    setSelectedWeightClass(w);
                    setMobileFilterOpen(false);
                  }}
                  selectedBallType={selectedBallType}
                  onSelectBallType={(b) => {
                    setSelectedBallType(b);
                    setMobileFilterOpen(false);
                  }}
                  priceRange={priceRange}
                  onPriceChange={(min, max) => setPriceRange([min, max])}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onResetFilters={handleResetFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Show Results ({filteredBats.length})
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-7 items-start">
          {/* Left Column: Direct Tennis Bat Filters (Desktop) */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedModel={selectedModel}
              onSelectModel={handleSelectModel}
              selectedWeightClass={selectedWeightClass}
              onSelectWeightClass={setSelectedWeightClass}
              selectedBallType={selectedBallType}
              onSelectBallType={setSelectedBallType}
              priceRange={priceRange}
              onPriceChange={(min, max) => setPriceRange([min, max])}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Right Column: Catalog Grid & Controls */}
          <div className="flex-1 w-full space-y-4">
            {/* Catalog Control Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80">
              <div className="flex items-baseline gap-2">
                <h2 className="text-sm font-bold text-neutral-900 tracking-tight uppercase">
                  {selectedModel === 'All' ? 'Available Bats' : selectedModel}
                </h2>
                <span className="text-xs font-mono text-neutral-400 font-semibold">
                  ({filteredBats.length})
                </span>
              </div>

              {/* Minimal Sort */}
              <div className="flex items-center gap-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.75} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-xs font-semibold text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="position">Featured</option>
                  <option value="weight-low-high">Lightest (957g)</option>
                  <option value="price-low-high">₹ Low to High</option>
                  <option value="price-high-low">₹ High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Tag Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-100/80 rounded-xl text-xs">
                <span className="text-neutral-500 font-semibold px-1">Active:</span>

                {selectedModel !== 'All' && (
                  <span
                    onClick={() => setSelectedModel('All')}
                    className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-neutral-400 font-medium text-neutral-800"
                  >
                    Model: {selectedModel} <X className="w-3 h-3 text-neutral-400" strokeWidth={2} />
                  </span>
                )}

                {selectedWeightClass !== 'All' && (
                  <span
                    onClick={() => setSelectedWeightClass('All')}
                    className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-neutral-400 font-medium text-neutral-800"
                  >
                    Weight: {selectedWeightClass} <X className="w-3 h-3 text-neutral-400" strokeWidth={2} />
                  </span>
                )}

                {selectedBallType !== 'All' && (
                  <span
                    onClick={() => setSelectedBallType('All')}
                    className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-neutral-400 font-medium text-neutral-800"
                  >
                    Ball: {selectedBallType} <X className="w-3 h-3 text-neutral-400" strokeWidth={2} />
                  </span>
                )}

                {searchQuery && (
                  <span
                    onClick={() => setSearchQuery('')}
                    className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-neutral-400 font-medium text-neutral-800"
                  >
                    Search: "{searchQuery}" <X className="w-3 h-3 text-neutral-400" strokeWidth={2} />
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-neutral-600 hover:text-neutral-900 font-semibold hover:underline px-2 cursor-pointer ml-auto text-xs"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Catalog Grid */}
            {filteredBats.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-3.5">
                <div className="w-14 h-14 bg-neutral-100 text-neutral-500 rounded-full flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  No Bats Found With Selected Filters
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try clearing your filters or search query to browse our complete collection of Cricket Adda scooped bats.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
                >
                  Show All Bats
                </button>
              </div>
            ) : (
              <div
                className={`grid ${
                  mobileGridCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
                } sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5`}
              >
                {filteredBats.map((bat) => (
                  <ProductCard
                    key={bat.id}
                    bat={bat}
                    isWishlisted={wishlist.some((b) => b.id === bat.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewBat}
                    onAddToCart={(b) => handleAddToCart(b)}
                    compact={mobileGridCols === 2}
                  />
                ))}
              </div>
            )}

            {/* Minimal Guarantee Strip with Lucide Icons */}
            <div className="p-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-4 mt-8 border border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-800 text-emerald-400 border border-neutral-700 flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="text-xs font-bold block">Live Video Inspection</span>
                  <span className="text-[11px] text-neutral-400 font-medium">Verify your exact bat on scale before dispatch</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi,%20I%20want%20to%20see%20a%20bat%20on%20video%20call.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shrink-0"
                title="WhatsApp Video Call"
                aria-label="Request video call on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Editorial Technical Guide on Cricket Adda Scoop Bats */}
      <EditorialGuide />

      {/* 6. Footer */}
      <Footer
        onSelectCategory={(model) => {
          handleSelectModel(model);
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
      />

      {/* 7. Mobile Sticky Bottom Navigation Bar with Lucide Icons */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-neutral-200/80 px-3 py-1.5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => {
            const el = document.getElementById('catalog');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer py-1 px-2 touch-manipulation"
          aria-label="Go to Bats Catalog"
        >
          <Home className="w-4.5 h-4.5" strokeWidth={1.75} />
          <span className="text-[10px] font-semibold">Bats</span>
        </button>

        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer py-1 px-2 relative touch-manipulation"
          aria-label="Open Filters"
        >
          <div className="relative">
            <SlidersHorizontal className="w-4.5 h-4.5 text-neutral-600" strokeWidth={1.75} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-[#f15b28] text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Filter</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer py-1 px-2 relative touch-manipulation"
          aria-label="Saved Bats"
        >
          <div className="relative">
            <Heart className="w-4.5 h-4.5 text-neutral-600" strokeWidth={1.75} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Saved</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-neutral-900 cursor-pointer py-1 px-2 relative touch-manipulation"
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5 text-neutral-600" strokeWidth={1.75} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full bg-[#f15b28] text-white text-[9px] font-bold flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Bag</span>
        </button>

        <a
          href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi,%20I%20want%20to%20inquire%20about%20Cricket%20Adda%20cricket%20bats`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-emerald-600 hover:text-emerald-700 cursor-pointer py-1 px-2 touch-manipulation"
          aria-label="WhatsApp Workshop"
        >
          <MessageCircle className="w-4.5 h-4.5 text-emerald-600" strokeWidth={1.75} />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
      </nav>

      {/* 8. WhatsApp Quick Help / Order Widget */}
      <WhatsAppWidget />

      {/* 9. Quick View Modal */}
      <QuickViewModal
        bat={quickViewBat}
        onClose={() => setQuickViewBat(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewBat ? wishlist.some((b) => b.id === quickViewBat.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 9. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      {/* 10. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(bat) => handleAddToCart(bat)}
      />

      {/* 11. Workshop Info Modals */}
      <InfoModals
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </div>
  );
}
