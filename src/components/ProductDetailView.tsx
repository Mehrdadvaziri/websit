import React, { useState } from 'react';
import { 
  Product, 
  CartItem, 
  NavigationTab 
} from '../types';
import { 
  ArrowRight, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle, 
  Truck, 
  FileText, 
  Bot, 
  Layers, 
  Share2, 
  Check, 
  Copy,
  Sliders,
  Cpu,
  Boxes
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onSelectRelated,
  setIsAiModalOpen,
  setIsCartOpen,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'seo'>('specs');
  const [copiedSku, setCopiedSku] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'passive'))
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const handleCopySku = () => {
    navigator.clipboard?.writeText(product.sku);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  return (
    <div className="py-8 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb & Back button */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0066FF] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به لیست محصولات</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium hidden sm:flex">
            <span>نیرا شبکه</span>
            <span>/</span>
            <span>{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-slate-900 font-bold line-clamp-1 max-w-xs">{product.title}</span>
          </div>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Right Column (Images Gallery) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Active Image */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] border border-slate-200">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-md">
                  {product.sku}
                </div>
              </div>

              {/* Thumbnails list */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === imgUrl ? 'border-[#0066FF] ring-2 ring-blue-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto" />
                  <span className="block text-[11px] font-bold text-slate-800">۲۵ سال گارانتی</span>
                  <span className="block text-[10px] text-slate-500">ضمانت فیزیکی کابل</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-center space-y-1">
                  <Award className="w-5 h-5 text-emerald-600 mx-auto" />
                  <span className="block text-[11px] font-bold text-slate-800">تست فلوک ۱۰۰٪</span>
                  <span className="block text-[10px] text-slate-500">گواهی کالیبره OTDR</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-center space-y-1">
                  <Truck className="w-5 h-5 text-amber-600 mx-auto" />
                  <span className="block text-[11px] font-bold text-slate-800">تحویل فوری</span>
                  <span className="block text-[10px] text-slate-500">موجودی انبار مرکزی</span>
                </div>
              </div>

            </div>

            {/* Left Column (Details & Purchase Form) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Category & SKU Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                  {product.categoryLabel}
                </span>

                <button 
                  onClick={handleCopySku}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-mono bg-slate-100 px-2.5 py-1 rounded-lg"
                  title="کپی کردن کد فنی SKU"
                >
                  <span>کد فنی: {product.sku}</span>
                  {copiedSku ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Price & Stock */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-slate-500 font-medium">قیمت پایه (تومان):</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {product.formattedPrice}
                  </span>
                </div>

                <div className="text-left">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      موجود در انبار ({product.stockCount} واحد)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                      نیازمند استعلام تولید
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector & Order Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-slate-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="btn-add-to-cart-detail"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0066FF] hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>به سبد استعلام افزوده شد</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>افزودن به سبد استعلام و خرید</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant RFQ Official Quote Button */}
                <button
                  onClick={() => {
                    handleAdd();
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>صدور فوری پیش‌فاکتور رسمی پروژه‌ای (RFQ)</span>
                </button>
              </div>

              {/* AI Technical Advisor banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#0066FF]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">سوالی درباره سازگاری این محصول دارید؟</h4>
                    <p className="text-[11px] text-slate-500">پاسخ فنی فوری و مقایسه با استانداردها توسط هوش مصنوعی</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  پرسش از AI
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tabs for Specs, Description, SEO / Elementor */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#0066FF] text-[#0066FF]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              جدول مشخصات فنی تخصصی
            </button>
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'desc'
                  ? 'border-[#0066FF] text-[#0066FF]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              توضیحات تکمیلی و کاربردها
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'seo'
                  ? 'border-[#0066FF] text-[#0066FF]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              اطلاعات سئو و شورت‌کد ووکامرس
            </button>
          </div>

          {/* Tab 1: Specs Table */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {product.specs?.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}>
                        <td className="py-3 px-4 font-bold text-slate-700 w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Key Benefits 3 blocks */}
              {product.keyBenefits && product.keyBenefits.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {product.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1.5">
                      <div className="flex items-center gap-2 text-[#0066FF] font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>{benefit.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Full Description */}
          {activeTab === 'desc' && (
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>{product.fullDescription}</p>
              <h4 className="text-base font-bold text-slate-900 pt-2">راهنمای نصب و نگهداری</h4>
              <p>
                در هنگام کابل‌کشی و خواباندن در داکت یا لوله‌های پلی‌اتیلن، همواره شعاع خمش مجاز (حداقل ۲۰ برابر قطر خارجی کابل در حالت پویا و ۱۰ برابر در حالت ایستا) را رعایت فرمایید. برای پایانه‌بندی از پیگتیل‌های استاندارد با اتصال فیوژنی استفاده گردد.
              </p>
            </div>
          )}

          {/* Tab 3: SEO and WooCommerce Integration Data */}
          {activeTab === 'seo' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono space-y-2 overflow-x-auto">
                <p className="text-amber-400 font-bold">// شورت‌کد المنتور و ووکامرس برای این محصول:</p>
                <code className="text-emerald-400 block">[nira_product_card id="{product.id}" sku="{product.sku}"]</code>
                <p className="text-slate-400 pt-2">// کلمات کلیدی سئو (Focus Keywords):</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.seoKeywords?.map((kw, i) => (
                    <span key={i} className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded text-[11px]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">محصولات مکمل و مرتبط</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] text-blue-600 font-bold">{rel.categoryLabel}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs font-black text-slate-800">{rel.formattedPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
