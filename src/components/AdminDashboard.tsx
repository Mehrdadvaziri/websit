import React, { useState } from 'react';
import { 
  Product, 
  Order, 
  NavigationTab 
} from '../types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileSpreadsheet, 
  Search, 
  Bot, 
  Download, 
  Layers, 
  Settings, 
  RefreshCw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setCurrentTab: (tab: NavigationTab) => void;
  setIsElementorModalOpen: (open: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  setProducts,
  orders,
  setOrders,
  setCurrentTab,
  setIsElementorModalOpen,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'orders' | 'products' | 'seo-ai'>('overview');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'processing' | 'approved'>('all');
  const [searchProductQuery, setSearchProductQuery] = useState('');
  
  // SEO generator state
  const [seoTargetProduct, setSeoTargetProduct] = useState<Product | null>(products[0] || null);
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  // New product state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    category: 'fiber',
    categoryLabel: 'کابل فیبر نوری',
    sku: '',
    price: 0,
    formattedPrice: '۰ تومان',
    inStock: true,
    stockCount: 10,
    shortDescription: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
    specs: [{ label: 'استاندارد', value: 'TIA-568 / G.652D' }],
    keyBenefits: [{ title: 'گارانتی اصالت کالا', description: 'تست فلوک و تاییدیه کارخانه', icon: 'ShieldCheck' }],
    seoKeywords: ['تجهیزات شبکه', 'نیرا']
  });

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const lowStockProductsCount = products.filter(p => p.stockCount < 10).length;

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        let statusLabel = 'تأیید شده و آماده ارسال';
        if (newStatus === 'processing') statusLabel = 'در حال تست فنی و بسته‌بندی';
        if (newStatus === 'pending') statusLabel = 'در انتظار صدور پیش‌فاکتور';
        if (newStatus === 'delivered') statusLabel = 'تحویل داده شده';
        return { ...o, status: newStatus, statusLabel };
      }
      return o;
    }));
  };

  const handleToggleProductStock = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    }));
  };

  const handleGenerateAISeo = async () => {
    if (!seoTargetProduct) return;
    setIsGeneratingSeo(true);
    try {
      const res = await fetch('/api/ai/seo-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: seoTargetProduct.title,
          category: seoTargetProduct.categoryLabel,
          specs: seoTargetProduct.specs
        })
      });
      const data = await res.json();
      setSeoResult(data);
    } catch (err) {
      setSeoResult({
        seoTitle: `${seoTargetProduct.title} | خرید با گارانتی ۲۵ ساله - نیرا شبکه`,
        metaDescription: `خرید مستقیم ${seoTargetProduct.title} با تضمین تست فلوک و ارسال فوری ویژه سازمان‌ها و مجریان دیتاسنتر. استعلام قیمت رسمی در نیرا شبکه.`,
        focusKeywords: ['خرید فیبر نوری', 'کابل شبکه اورجینال', 'نیرا شبکه', seoTargetProduct.sku],
        schemaJsonLd: {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": seoTargetProduct.title,
          "sku": seoTargetProduct.sku,
          "brand": { "@type": "Brand", "name": "Nira Network" },
          "offers": {
            "@type": "Offer",
            "price": seoTargetProduct.price,
            "priceCurrency": "IRR",
            "availability": "https://schema.org/InStock"
          }
        }
      });
    } finally {
      setIsGeneratingSeo(false);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.sku) return;

    const created: Product = {
      id: `prod-${Date.now()}`,
      title: newProduct.title || 'محصول جدید',
      category: newProduct.category as any || 'fiber',
      categoryLabel: newProduct.category === 'fiber' ? 'کابل فیبر نوری' : newProduct.category === 'copper' ? 'کابل مسی' : 'تجهیزات اکتیو',
      sku: newProduct.sku || 'SKU-NEW',
      price: Number(newProduct.price) || 10000000,
      formattedPrice: `${(Number(newProduct.price) || 10000000).toLocaleString('fa-IR')} تومان`,
      inStock: newProduct.inStock ?? true,
      stockCount: Number(newProduct.stockCount) || 10,
      shortDescription: newProduct.shortDescription || 'توضیحات کوتاه فنی محصول',
      fullDescription: newProduct.fullDescription || 'توضیحات کامل جهت استفاده در ووکامرس',
      image: newProduct.image || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      gallery: [newProduct.image || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
      specs: newProduct.specs || [],
      keyBenefits: newProduct.keyBenefits || [],
      seoKeywords: ['نیرا شبکه', 'محصول جدید']
    };

    setProducts(prev => [created, ...prev]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="py-8 bg-[#0b1329] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>پنل اختصاصی مدیریت سازمانی • سیستم ووکامرس و المنتور نیرا</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              داشبورد مانیتورینگ سفارشات و کاتالوگ محصولات
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsElementorModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>خروجی المنتور و ووکامرس</span>
            </button>

            <button
              onClick={() => setCurrentTab('home')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>مشاهده سایت</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Admin */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'overview' ? 'bg-[#0066FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>آمار کلی و گزارشات فروش</span>
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'orders' ? 'bg-[#0066FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>مدیریت پیش‌فاکتورها و سفارشات ({orders.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'products' ? 'bg-[#0066FF] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>مدیریت محصولات و موجودی انبار ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('seo-ai')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              adminTab === 'seo-ai' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>دستیار هوش مصنوعی سئو و اسکیمای کالا</span>
          </button>
        </div>

        {/* TAB 1: Overview KPIs */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>مجموع فروش و استعلام‌ها</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {totalRevenue.toLocaleString('fa-IR')}
                </div>
                <span className="text-[11px] text-emerald-400 font-bold block">+۱۸٪ رشد نسبت به ماه گذشته</span>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>سفارشات در انتظار بررسی</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {pendingOrdersCount}
                </div>
                <span className="text-[11px] text-slate-400 block">نیازمند صدور پیش‌فاکتور رسمی</span>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>تعداد اقلام کاتالوگ فعال</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {products.length}
                </div>
                <span className="text-[11px] text-slate-400 block">آماده همگام‌سازی با ووکامرس</span>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>کالاهای رو به اتمام انبار</span>
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-rose-400 font-mono">
                  {lowStockProductsCount}
                </div>
                <span className="text-[11px] text-slate-400 block">موجودی زیر ۱۰ عدد</span>
              </div>

            </div>

            {/* Quick Actions & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white">آخرین سفارشات ثبت‌شده در پرتال</h3>
                  <button 
                    onClick={() => setAdminTab('orders')}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    مشاهده همه
                  </button>
                </div>

                <div className="divide-y divide-slate-800 text-xs">
                  {orders.slice(0, 3).map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-bold text-white font-mono">{o.orderNumber}</span>
                        <p className="text-slate-400">{o.customerName} - {o.companyName}</p>
                      </div>
                      <div className="text-left space-y-1">
                        <span className="font-bold text-emerald-400 font-mono">{o.formattedAmount}</span>
                        <span className="block text-[10px] text-slate-500">{o.statusLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elementor & AI Quick Tools */}
              <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">ابزارهای سریع توسعه‌دهنده</h3>
                
                <button
                  onClick={() => setIsElementorModalOpen(true)}
                  className="w-full p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-right border border-slate-700 space-y-1 transition-colors"
                >
                  <p className="text-xs font-bold text-amber-300">دریافت فایل JSON قالب‌های المنتور</p>
                  <p className="text-[11px] text-slate-400">شامل هدر، فوتر، ویجت‌های کاتالوگ و صفحه محصول</p>
                </button>

                <button
                  onClick={() => setAdminTab('seo-ai')}
                  className="w-full p-3 rounded-2xl bg-blue-950/60 hover:bg-blue-900/60 text-right border border-blue-800 space-y-1 transition-colors"
                >
                  <p className="text-xs font-bold text-blue-300">دستیار هوش مصنوعی سئو ووکامرس</p>
                  <p className="text-[11px] text-slate-400">تولید اسکیما، متادیسکریپشن و کی‌وردهای گوگل</p>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Orders Management */}
        {adminTab === 'orders' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold text-white">مدیریت وضعیت پیش‌فاکتورها و سفارشات</h3>
              
              {/* Order Status Filters */}
              <div className="flex items-center gap-2">
                {(['all', 'pending', 'processing', 'approved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderFilter === st ? 'bg-[#0066FF] text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'همه' : st === 'pending' ? 'در انتظار' : st === 'processing' ? 'در حال پردازش' : 'تأیید شده'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">شماره سفارش</th>
                    <th className="py-3 px-4">کارفرما / سازمان</th>
                    <th className="py-3 px-4">تاریخ</th>
                    <th className="py-3 px-4">مبلغ کل (تومان)</th>
                    <th className="py-3 px-4">تغییر وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders
                    .filter(o => orderFilter === 'all' || o.status === orderFilter)
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">{order.orderNumber}</td>
                        <td className="py-3.5 px-4 text-slate-300">{order.customerName} ({order.companyName})</td>
                        <td className="py-3.5 px-4 text-slate-400">{order.date}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{order.formattedAmount}</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e: any) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-400 cursor-pointer"
                          >
                            <option value="pending">در انتظار استعلام (Pending)</option>
                            <option value="processing">در حال تست و آماده‌سازی (Processing)</option>
                            <option value="approved">تأیید شده و صدور فاکتور (Approved)</option>
                            <option value="delivered">تحویل داده شد (Delivered)</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: Products Management */}
        {adminTab === 'products' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-white">کاتالوگ و انبارگردانی محصولات</h3>
                <span className="text-xs text-slate-400 font-mono">({products.length} کالا)</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن محصول جدید</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">کالا</th>
                    <th className="py-3 px-4">کد SKU</th>
                    <th className="py-3 px-4">دسته‌بندی</th>
                    <th className="py-3 px-4">قیمت واحد</th>
                    <th className="py-3 px-4 text-center">موجودی انبار</th>
                    <th className="py-3 px-4 text-left">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt="" 
                          className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-white line-clamp-1 max-w-xs">{product.title}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{product.sku}</td>
                      <td className="py-3.5 px-4 text-blue-400 font-semibold">{product.categoryLabel}</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">{product.formattedPrice}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleProductStock(product.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            product.inStock
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {product.inStock ? `موجود (${product.stockCount})` : 'ناموجود'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-left">
                        <button
                          onClick={() => {
                            setSeoTargetProduct(product);
                            setAdminTab('seo-ai');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs font-semibold"
                        >
                          سئو با AI
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 4: AI SEO Generator for WooCommerce / Elementor */}
        {adminTab === 'seo-ai' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Bot className="w-4 h-4" />
                <span>دستیار هوشمند سئو و استخراج اسکیما برای ووکامرس</span>
              </div>
              <h3 className="text-lg font-black text-white">تولید خودکار متاتگ‌ها و اسکیما JSON-LD برای محصولات</h3>
              <p className="text-xs text-slate-400">
                این بخش با استفاده از مدل Gemini عنوان سئو، متا دیسکریپشن گوگل و کدهای ساختاریافته Schema.org را تولید می‌کند.
              </p>
            </div>

            {/* Product Selector for SEO */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300">انتخاب محصول هدف:</label>
              <select
                value={seoTargetProduct?.id || ''}
                onChange={(e) => {
                  const match = products.find(p => p.id === e.target.value);
                  if (match) setSeoTargetProduct(match);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.sku})</option>
                ))}
              </select>

              <button
                disabled={isGeneratingSeo}
                onClick={handleGenerateAISeo}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isGeneratingSeo ? 'در حال نگارش سئو و اسکیما با AI...' : 'تولید اطلاعات بهینه‌سازی سئو با هوش مصنوعی'}</span>
              </button>
            </div>

            {/* Generated Result */}
            {seoResult && (
              <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 animate-in fade-in">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-400">عنوان بهینه سئو گوگل (SEO Title):</span>
                  <p className="text-xs bg-slate-900 p-3 rounded-xl text-white font-semibold">{seoResult.seoTitle}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-400">متا توضیحات گوگل (Meta Description - ۱۶۰ کاراکتر):</span>
                  <p className="text-xs bg-slate-900 p-3 rounded-xl text-slate-300">{seoResult.metaDescription}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-300">کد استاندارد Schema.org JSON-LD:</span>
                  <pre className="text-[11px] font-mono bg-slate-900 p-4 rounded-xl text-emerald-400 overflow-x-auto leading-relaxed">
                    {JSON.stringify(seoResult.schemaJsonLd, null, 2)}
                  </pre>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white">افزودن محصول جدید به کاتالوگ نیرا</h4>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">نام و عنوان دقیق محصول</label>
                  <input
                    type="text"
                    required
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">کد فنی (SKU)</label>
                    <input
                      type="text"
                      required
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">قیمت پایه (تومان)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">دسته‌بندی</label>
                  <select
                    value={newProduct.category}
                    onChange={(e: any) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="fiber">کابل فیبر نوری</option>
                    <option value="copper">کابل‌های مسی شبکه</option>
                    <option value="active">تجهیزات اکتیو و سوییچ</option>
                    <option value="passive">تجهیزات پسیو و ODF</option>
                    <option value="rack">رک و محفظه‌های سرور</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">توضیحات کوتاه فنی</label>
                  <textarea
                    rows={2}
                    value={newProduct.shortDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  ></textarea>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0066FF] text-white font-bold"
                  >
                    ذخیره محصول در سیستم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
