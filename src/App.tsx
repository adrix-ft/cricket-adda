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
import { ALL_CRICKET_BATS } from './data/bats';
import { BatRange, BatSize, CartItem, CricketBat, SortOption, WillowType } from './types/bat';
import { ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';

export default function App() {
  // Catalog Filters State
  const [selectedSizes, setSelectedSizes] = useState<BatSize[]>([]);
  const [selectedWillowTypes, setSelectedWillowTypes] = useState<WillowType[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<BatRange[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([2555, 129999]);
  const [sortBy, setSortBy] = useState<SortOption>('position');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBatCategory, setActiveBatCategory] = useState<string>('All Bats');
  const itemsPerPage = 12;

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      bat: ALL_CRICKET_BATS[0],
      size: 'Mens',
      quantity: 1,
      withKnocking: true,
    },
  ]);
  const [wishlist, setWishlist] = useState<CricketBat[]>([ALL_CRICKET_BATS[1]]);

  // Modals & Drawers
  const [quickViewBat, setQuickViewBat] = useState<CricketBat | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<'about' | 'contact' | 'dealership' | null>(null);

  // Category Selection for Bats Specialist Store
  const handleSelectBatCategory = (category: string) => {
    setActiveBatCategory(category);
    setCurrentPage(1);

    if (category === 'All Bats') {
      setSelectedWillowTypes([]);
      setSelectedRanges([]);
    } else if (category === 'English Willow') {
      setSelectedWillowTypes(['English Willow']);
      setSelectedRanges([]);
    } else if (category === 'Kashmir Willow') {
      setSelectedWillowTypes(['Kashmir Willow']);
      setSelectedRanges([]);
    } else if (category === 'Player Edition') {
      setSelectedWillowTypes(['English Willow']);
      setSelectedRanges(['ROAR', 'XLITE', 'BLAK']);
    } else if (category === 'Tennis Bats') {
      setSelectedWillowTypes(['Kashmir Willow', 'Incredible Willow']);
      setSelectedRanges(['WILDFIRE']);
    }
  };

  // Filter Handlers
  const handleToggleSize = (size: BatSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleToggleWillow = (willow: WillowType) => {
    setSelectedWillowTypes((prev) =>
      prev.includes(willow) ? prev.filter((w) => w !== willow) : [...prev, willow]
    );
    setCurrentPage(1);
  };

  const handleToggleRange = (range: BatRange) => {
    setSelectedRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedWillowTypes([]);
    setSelectedRanges([]);
    setPriceRange([2555, 129999]);
    setSortBy('position');
    setSearchQuery('');
    setActiveBatCategory('All Bats');
    setCurrentPage(1);
  };

  // Cart Actions
  const handleAddToCart = (bat: CricketBat, size: BatSize = 'Mens', withKnocking: boolean = false) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.bat.id === bat.id && item.size === size && item.withKnocking === withKnocking
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [...prev, { bat, size, quantity: 1, withKnocking }];
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
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = bat.name.toLowerCase().includes(q);
        const matchesWillow = bat.willowType.toLowerCase().includes(q);
        const matchesRange = bat.range.toLowerCase().includes(q);
        const matchesSeries = bat.series.toLowerCase().includes(q);
        if (!matchesName && !matchesWillow && !matchesRange && !matchesSeries) {
          return false;
        }
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some((s) => bat.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Willow Type
      if (selectedWillowTypes.length > 0) {
        if (!selectedWillowTypes.includes(bat.willowType)) return false;
      }

      // Ranges
      if (selectedRanges.length > 0) {
        if (!selectedRanges.includes(bat.range)) return false;
      }

      // Price Range
      if (bat.finalPrice < priceRange[0] || bat.finalPrice > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price-high-low') {
        return b.finalPrice - a.finalPrice;
      }
      if (sortBy === 'price-low-high') {
        return a.finalPrice - b.finalPrice;
      }
      return 0; // 'position' retains catalog order
    });
  }, [searchQuery, selectedSizes, selectedWillowTypes, selectedRanges, priceRange, sortBy]);

  // Pagination calculation
  const totalItems = filteredBats.length;
  const displayTotal = searchQuery || selectedSizes.length || selectedWillowTypes.length || selectedRanges.length
    ? totalItems
    : 172;

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedBats = filteredBats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFilterCount =
    selectedSizes.length +
    selectedWillowTypes.length +
    selectedRanges.length +
    (priceRange[0] !== 2555 || priceRange[1] !== 129999 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8f7f7] text-[#24201e] flex flex-col font-sans">
      {/* 1. Orange Top Utility Bar */}
      <TopBar
        onOpenAbout={() => setActiveInfoModal('about')}
        onOpenContact={() => setActiveInfoModal('contact')}
        onOpenDealership={() => setActiveInfoModal('dealership')}
      />

      {/* 2. White Main Navbar (Exclusively Bat Collections) */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeBatCategory={activeBatCategory}
        onSelectBatCategory={handleSelectBatCategory}
      />

      {/* 3. Hero Banner with Real Category Image */}
      <HeroBanner
        onSelectCategory={(willow) => handleSelectBatCategory(willow)}
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
            <span>Filters ({activeFilterCount})</span>
          </button>

          <span className="text-xs text-neutral-500 font-mono">
            {totalItems} Bats Available
          </span>
        </div>

        {/* Catalog Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left Sidebar */}
          <div
            className={`w-full lg:w-64 lg:block ${
              mobileFilterOpen ? 'block' : 'hidden'
            } bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl border lg:border-none border-neutral-200 shadow-sm lg:shadow-none`}
          >
            <FilterSidebar
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              selectedWillowTypes={selectedWillowTypes}
              onToggleWillow={handleToggleWillow}
              selectedRanges={selectedRanges}
              onToggleRange={handleToggleRange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Right Product Grid Area */}
          <div className="flex-1 w-full space-y-6">
            {/* Top Results Header matching screenshot */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <span className="text-xs text-neutral-600 font-medium">
                Items {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, totalItems)} of {displayTotal} total
              </span>

              <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
                Handcrafted Precision · 100% Certified Willow
              </span>
            </div>

            {/* Active Filters Bar */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-100 rounded-lg text-xs">
                <span className="text-neutral-500 font-semibold px-1">Active:</span>
                {selectedSizes.map((sz) => (
                  <span
                    key={sz}
                    onClick={() => handleToggleSize(sz)}
                    className="bg-white border border-neutral-300 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:border-[#f15b28]"
                  >
                    Size {sz} <X className="w-3 h-3 text-neutral-400" />
                  </span>
                ))}
                {selectedWillowTypes.map((w) => (
                  <span
                    key={w}
                    onClick={() => handleToggleWillow(w)}
                    className="bg-white border border-neutral-300 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:border-[#f15b28]"
                  >
                    {w} <X className="w-3 h-3 text-neutral-400" />
                  </span>
                ))}
                {selectedRanges.map((r) => (
                  <span
                    key={r}
                    onClick={() => handleToggleRange(r)}
                    className="bg-white border border-neutral-300 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:border-[#f15b28]"
                  >
                    {r} <X className="w-3 h-3 text-neutral-400" />
                  </span>
                ))}
                {searchQuery && (
                  <span
                    onClick={() => setSearchQuery('')}
                    className="bg-white border border-neutral-300 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:border-[#f15b28]"
                  >
                    Search: {searchQuery} <X className="w-3 h-3 text-neutral-400" />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-[#f15b28] font-bold hover:underline px-2 cursor-pointer ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* 3-Column Bat Grid */}
            {paginatedBats.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#fdf4f1] text-[#f15b28] rounded-full flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  No Cricket Bats Match Your Filter
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try broadening your price bounds, willow type, or size selection to explore our full handcrafted bat collection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#f15b28] text-white text-xs font-bold rounded-lg hover:bg-[#c93c0d] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {paginatedBats.map((bat) => (
                  <ProductCard
                    key={bat.id}
                    bat={bat}
                    isWishlisted={wishlist.some((b) => b.id === bat.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewBat}
                    onAddToCart={(b) => handleAddToCart(b, 'Mens', false)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls matching screenshot numbers (1, 2, 3, 4, 5, >) */}
            {totalItems > 0 && (
              <div className="pt-8 pb-4 flex items-center justify-center gap-1.5 text-xs font-bold">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded border border-neutral-300 bg-white text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded border transition-colors cursor-pointer flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-[#f15b28] border-[#f15b28] text-white shadow-xs'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-8 h-8 rounded border border-neutral-300 bg-white text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 5. Complete Editorial Buying Guide & FAQs from Screenshot */}
      <EditorialGuide />

      {/* 6. Site Footer */}
      <Footer
        onSelectCategory={(willow) => {
          handleSelectBatCategory(willow);
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
      />

      {/* 7. Floating WhatsApp Consultation Widget (+91 92176 79479) */}
      <WhatsAppWidget />

      {/* 8. Modals & Drawers */}
      <QuickViewModal
        bat={quickViewBat}
        onClose={() => setQuickViewBat(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewBat ? wishlist.some((b) => b.id === quickViewBat.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(bat) => handleAddToCart(bat, 'Mens', false)}
      />

      <InfoModals
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </div>
  );
}
