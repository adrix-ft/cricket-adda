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
import { SlidersHorizontal, X, ArrowUpDown, Scale, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  // Model & Filter States
  const [selectedModel, setSelectedModel] = useState<BatCategory>('All');
  const [selectedWeightClass, setSelectedWeightClass] = useState<BatWeightClass>('All');
  const [selectedBallType, setSelectedBallType] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([400, 4500]);
  const [sortBy, setSortBy] = useState<SortOption>('position');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      bat: ALL_CRICKET_BATS[0],
      selectedWeight: '1035g',
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<CricketBat[]>([ALL_CRICKET_BATS[1], ALL_CRICKET_BATS[2]]);

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
    <div className="min-h-screen bg-[#f8f7f7] text-[#24201e] flex flex-col font-sans">
      {/* 1. Orange Top Utility Bar */}
      <TopBar
        onOpenAbout={() => setActiveInfoModal('about')}
        onOpenContact={() => setActiveInfoModal('contact')}
      />

      {/* 2. Direct 7T7T Brand Header without fancy corporate tabs */}
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

      {/* 3. High-Impact 7T7T Hero Showcase Banner */}
      <HeroBanner
        activeModel={selectedModel}
        onSelectCategory={handleSelectModel}
      />

      {/* 4. Main Store Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 py-2 px-4 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-neutral-800 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#f15b28]" />
            <span>Filter Bats ({activeFilterCount})</span>
          </button>

          {/* Mobile Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-neutral-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#f15b28]"
            >
              <option value="position">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="weight-low-high">Lightest Weight First</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Overlay Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <div
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col justify-between overflow-y-auto p-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="font-bold text-sm text-neutral-900">Filter Bats</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              <div className="py-4">
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
                className="w-full py-2.5 bg-[#f15b28] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Show Results ({filteredBats.length})
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
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
          <div className="flex-1 w-full space-y-5">
            {/* Catalog Control Header */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>
                    {selectedModel === 'All' ? 'All Handcrafted 7T7T Bats' : selectedModel}
                  </span>
                  <span className="text-xs font-bold text-neutral-400 font-mono">
                    ({filteredBats.length} bats)
                  </span>
                </h2>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Direct from workshop · Free 7T7T padded cover with every bat order
                </p>
              </div>

              {/* Desktop Sort Dropdown */}
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="text-neutral-500 font-semibold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-1.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#f15b28] cursor-pointer"
                >
                  <option value="position">Featured Recommendation</option>
                  <option value="weight-low-high">Lightest Weight First (957g)</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Tag Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-neutral-100 rounded-xl text-xs">
                <span className="text-neutral-500 font-bold px-1">Active:</span>

                {selectedModel !== 'All' && (
                  <span
                    onClick={() => setSelectedModel('All')}
                    className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-[#f15b28] font-semibold text-neutral-800"
                  >
                    Model: {selectedModel} <X className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                )}

                {selectedWeightClass !== 'All' && (
                  <span
                    onClick={() => setSelectedWeightClass('All')}
                    className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-[#f15b28] font-semibold text-neutral-800"
                  >
                    Weight: {selectedWeightClass} <X className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                )}

                {selectedBallType !== 'All' && (
                  <span
                    onClick={() => setSelectedBallType('All')}
                    className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-[#f15b28] font-semibold text-neutral-800"
                  >
                    Ball: {selectedBallType} <X className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                )}

                {searchQuery && (
                  <span
                    onClick={() => setSearchQuery('')}
                    className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:border-[#f15b28] font-semibold text-neutral-800"
                  >
                    Search: "{searchQuery}" <X className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-[#f15b28] font-bold hover:underline px-2 cursor-pointer ml-auto text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Catalog Grid */}
            {filteredBats.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#fdf4f1] text-[#f15b28] rounded-full flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  No Bats Found With Selected Filters
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try clearing your filters or search query to browse our complete collection of 7T7T scooped bats.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#f15b28] text-white text-xs font-bold rounded-lg hover:bg-[#c93c0d] transition-colors cursor-pointer"
                >
                  Show All Bats
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredBats.map((bat) => (
                  <ProductCard
                    key={bat.id}
                    bat={bat}
                    isWishlisted={wishlist.some((b) => b.id === bat.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewBat}
                    onAddToCart={(b) => handleAddToCart(b)}
                  />
                ))}
              </div>
            )}

            {/* Seller Workshop Guarantee Banner */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f15b28] flex items-center gap-1.5 justify-center md:justify-start">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Workshop Video Call Guarantee</span>
                </span>
                <h4 className="text-base sm:text-lg font-bold">
                  Want to see the actual bat on digital scale before ordering?
                </h4>
                <p className="text-xs text-neutral-300 max-w-xl">
                  Message our bat craftsman directly. We will show you the exact grains, edge thickness, and digital scale weight live on WhatsApp video call.
                </p>
              </div>

              <a
                href={`https://wa.me/${SELLER_INFO.whatsappNumber}?text=Hi%20Cricket%20Adda,%20I%20want%20to%20see%20a%20bat%20on%20live%20video%20call.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-md transition-colors shrink-0"
              >
                Schedule WhatsApp Video Call
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Editorial Technical Guide on 7T7T Scoop Bats */}
      <EditorialGuide />

      {/* 6. Footer */}
      <Footer
        onSelectCategory={(model) => {
          handleSelectModel(model);
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
      />

      {/* 7. WhatsApp Quick Help / Order Widget */}
      <WhatsAppWidget />

      {/* 8. Quick View Modal */}
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
