import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  NavigationTab 
} from '../types';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Eye, 
  Check, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  Network, 
  Cpu, 
  Boxes, 
  Server, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  FileSpreadsheet,
  Cable,
  Flame,
  Radio
} from 'lucide-react';

interface ProductsCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  cartItems: CartItem[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsAiModalOpen: (open: boolean) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  cartItems,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  setIsAiModalOpen,
}) => {
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [addedPopupId, setAddedPopupId] = useState<string | null>(null);
  
  // Ref for the category horizontal scroll track
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const categories = [
    { id: 'all', label: 'همه تجهیزات', icon: Layers, count: products.length },
    { id: 'fiber', label: 'کابل فیبر نوری', icon: Network, count: products.filter(p => p.category === 'fiber').length },
    { id: 'copper', label: 'کابل‌های مسی و شبکه', icon: Cable, count: products.filter(p => p.category === 'copper').length },
    { id: 'active', label: 'تجهیزات اکتیو و سوییچ', icon: Cpu, count: products.filter(p => p.category === 'active').length },
    { id: 'passive', label: 'پسیو، پچ پنل و ODF', icon: Boxes, count: products.filter(p => p.category === 'passive').length },
    { id: 'rack', label: 'رک سرور و متعلقات', icon: Server, count: products.filter(p => p.category === 'rack').length },
  ];

  // Check scroll position to display navigation arrows & fade indicators
  const checkScrollState = () => {
    const el = categoryScrollRef.current;
    if (!el) return;
    // In RTL scrollLeft can be negative or positive depending on browser implementation
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;
    const scrollLeft = Math.abs(el.scrollLeft);

    setShowRightArrow(scrollLeft > 10);
    setShowLeftArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  const scrollCategory = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const offset = direction === 'left' ? -200 : 200;
    el.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScrollState, 350);
  };

  // Scroll active category into full view automatically
  const handleSelectCategory = (catId: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(catId);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // In stock match
      if (onlyInStock && !p.inStock) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchDesc = p.shortDescription.toLowerCase().includes(q);
        const matchKeywords = p.seoKeywords?.some(k => k.toLowerCase().includes(q));
        if (!matchTitle && !matchSku && !matchDesc && !matchKeywords) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title, 'fa');
      return 0;
    });
  }, [products, selectedCategory, onlyInStock, searchQuery, sortBy]);

  const handleQuickAdd = (p: Product) => {
    onAddToCart(p, 1);
    setAddedPopupId(p.id);
    setTimeout(() => {
      setAddedPopupId(null);
    }, 1500);
  };

  return (
    <div className="py-10 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Header & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
              <span>نیرا شبکه</span>
              <span>/</span>
              <span className="text-[#0066FF] font-bold">فروشگاه و کاتالوگ محصولات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تجهیزات تخصصی فیبر نوری و زیرساخت شبکه
            </h1>
          </div>

          {/* AI Banner Button inside Catalog */}
          <button
            id="catalog-btn-ai-consult"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-200 hover:bg-blue-100 transition-colors text-xs font-bold shadow-xs self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span>نیاز به استعلام هوشمند پکیج دارید؟ مشاور AI</span>
          </button>
        </div>

        {/* Enhanced Categories & Filters Bar */}
        <div className="my-6 space-y-4">
          
          {/* Category Chips with Full Visibility, Arrow Controls, and Auto-Scroll on Hover */}
          <div className="relative bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center">
            
            {/* Scroll Right Arrow Button */}
            <button
              onClick={() => scrollCategory('right')}
              className={`absolute right-2 z-20 w-8 h-8 rounded-xl bg-white/95 border border-slate-200 shadow-md text-slate-700 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all ${
                showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              title="مشاهده دسته‌های قبل"
              aria-label="اسکرول به راست"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Category Track */}
            <div 
              ref={categoryScrollRef}
              onScroll={checkScrollState}
              className="flex items-center gap-2 overflow-x-auto py-1 px-1 scroll-smooth w-full no-scrollbar select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-filter-${cat.id}`}
                    onClick={(e) => handleSelectCategory(cat.id, e)}
                    onMouseEnter={(e) => {
                      // Smoothly center category into view on hover so it's never cut off
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest'
                      });
                      setTimeout(checkScrollState, 250);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 group ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
                    }`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                      isActive ? 'bg-blue-700 text-white' : 'bg-slate-200/80 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Left Arrow Button */}
            <button
              onClick={() => scrollCategory('left')}
              className={`absolute left-2 z-20 w-8 h-8 rounded-xl bg-white/95 border border-slate-200 shadow-md text-slate-700 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all ${
                showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              title="مشاهده دسته‌های بیشتر"
              aria-label="اسکرول به چپ"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

          </div>

          {/* Secondary Controls: Search, Stock Filter, Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="جستجو در بین کابل‌ها، پچ‌پنل‌ها، ماژول‌های نوری، رک و پارت نامبرها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-700 font-bold bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stock Toggle & Sorting */}
            <div className="md:col-span-6 flex items-center justify-end gap-3 flex-wrap sm:flex-nowrap">
              
              {/* In-Stock Toggle */}
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 select-none shadow-xs">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0066FF] focus:ring-blue-500 border-slate-300 accent-[#0066FF]"
                />
                <span>فقط کالاهای موجود در انبار</span>
              </label>

              {/* Sort Select */}
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-400 cursor-pointer shadow-xs"
              >
                <option value="featured">مرتب‌سازی پیش‌فرض</option>
                <option value="price-asc">ارزان‌ترین قیمت</option>
                <option value="price-desc">گران‌ترین قیمت</option>
                <option value="name">نام محصول (الفبا)</option>
              </select>

            </div>

          </div>

        </div>

        {/* Active Search/Filter Notification */}
        {searchQuery && (
          <div className="mb-6 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-800 flex items-center justify-between">
            <span>
              نمایش نتایج جستجو برای: <strong>"{searchQuery}"</strong> ({filteredProducts.length} مورد یافت شد)
            </span>
            <button 
              onClick={() => setSearchQuery('')}
              className="font-bold text-blue-600 hover:underline"
            >
              پاک کردن فیلتر
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 my-8 space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">محصولی با این مشخصات یافت نشد</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              لطفاً عبارات جستجو را تغییر دهید یا فیلترهای اعمال شده را بازنشانی فرمایید.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors"
            >
              نمایش همه محصولات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCartCount = cartItems.find(c => c.product.id === product.id)?.quantity || 0;
              const isRecentlyAdded = addedPopupId === product.id;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover-lift"
                >
                  {/* Card Top / Image Area with Interactive Zoom */}
                  <div>
                    <div 
                      className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" 
                      onClick={() => onSelectProduct(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-10">
                        {product.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0066FF] text-white shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Stock Status Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        {product.inStock ? (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/90 text-white backdrop-blur-xs">
                            موجود در انبار
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-rose-500/90 text-white backdrop-blur-xs">
                            تماس برای استعلام
                          </span>
                        )}
                      </div>

                      {/* Quick Hover Action Overlay */}
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="p-2 rounded-xl bg-white/95 text-slate-800 hover:text-blue-600 text-xs font-bold flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          <span>مشاهده مشخصات</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2 text-right">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{product.sku}</span>
                        <span className="text-blue-600 font-bold">{product.categoryLabel}</span>
                      </div>

                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="text-sm font-bold text-slate-900 hover:text-[#0066FF] cursor-pointer line-clamp-2 transition-colors leading-snug"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Price & Cart Button */}
                  <div className="p-4 pt-2 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">قیمت تخمینی:</span>
                      <div className="text-sm font-black text-slate-900 font-mono">
                        {product.formattedPrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                          isRecentlyAdded
                            ? 'bg-emerald-600 text-white'
                            : product.inStock
                            ? 'bg-[#0066FF] hover:bg-blue-700 text-white active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {isRecentlyAdded ? (
                          <>
                            <Check className="w-4 h-4 animate-bounce" />
                            <span>به پیش‌فاکتور افزوده شد</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>افزودن به پیش‌فاکتور</span>
                            {inCartCount > 0 && (
                              <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-mono mr-1">
                                {inCartCount}
                              </span>
                            )}
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                        title="مشاهده جزئیات کامل و کاتالوگ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
