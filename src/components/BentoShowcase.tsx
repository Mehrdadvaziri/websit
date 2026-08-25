import React from 'react';
import { 
  Network, 
  Cpu, 
  Layers, 
  Server, 
  Boxes, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab } from '../types';

interface BentoShowcaseProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setSelectedCategory?: (cat: string) => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({
  setCurrentTab,
  setSelectedCategory
}) => {
  const handleCategoryClick = (category: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
    setCurrentTab('products');
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-right space-y-2">
            <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase flex items-center gap-1.5 justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              دسته‌بندی جامع تجهیزات نیرا
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              زیرساخت‌های مهندسی‌شده برای آینده ارتباطات
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              تأمین مستقیم و بدون واسطه تمامی ملزومات شبکه، پسیو و اکتیو متناسب با استانداردهای سازمانی
            </p>
          </div>

          <button
            id="bento-btn-view-all"
            onClick={() => setCurrentTab('products')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-blue-700 transition-colors self-start md:self-auto"
          >
            <span>مشاهده همه محصولات و کاتالوگ فنی</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Fiber Optic Cables (Hero Large Bento - 7 cols) */}
          <div 
            onClick={() => handleCategoryClick('fiber')}
            className="md:col-span-7 group relative rounded-2xl overflow-hidden bg-slate-950 text-white p-6 sm:p-8 cursor-pointer border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-blue-950/40 z-0"></div>
            
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80" 
              alt="کابل فیبر نوری" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[260px] space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Network className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  سینگل‌مود و مالتی‌مود
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-blue-300 transition-colors">
                  کابل‌های فیبر نوری تخصصی (Fiber Optic Cables)
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                  کابل‌های ۲ تا ۱۴۴ کور GYXTW، GYTA53، فیبرهای ضد جونده خاکی و هوایی ADSS با تارهای درجه یک کورنینگ و یوانگ‌دینگ با حداقل افت سیگنال نوری.
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs text-blue-400 font-bold">
                  <span>مشاهده محصولات فیبر نوری</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Copper Network Cables (5 cols) */}
          <div 
            onClick={() => handleCategoryClick('copper')}
            className="md:col-span-5 group relative rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/60 p-6 sm:p-8 cursor-pointer border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col justify-between h-full min-h-[260px] space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                  100% مس خالص
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                  کابل‌های مسی شبکه (Cat6, Cat6A, Cat7)
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  کابل‌های تمام مس با خلوص ۹۹.۹۸٪، ساختار UTP و SFTP شیلددار دارای روکش‌های کندسوز LSZH و گذردهی کامل تست پرمننت فلوک.
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-[#0066FF] font-bold">
                  <span>مشاهده کابل‌های مسی</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Active Equipment & Switches (4 cols) */}
          <div 
            onClick={() => handleCategoryClick('active')}
            className="md:col-span-4 group rounded-2xl bg-white p-6 cursor-pointer border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors mb-1.5">
              تجهیزات اکتیو و سوئیچینگ
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              سوئیچ‌های مدیریتی لایه ۲ و ۳، روترهای سازمانی، ماژول‌های 10G/40G SFP+ و مدیاکانورترهای صنعتی.
            </p>
          </div>

          {/* Card 4: Passive Equipment & ODF (4 cols) */}
          <div 
            onClick={() => handleCategoryClick('passive')}
            className="md:col-span-4 group rounded-2xl bg-white p-6 cursor-pointer border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Boxes className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors mb-1.5">
              تجهیزات پسیو، ODF و پچ پنل
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              باکس‌های فیوژن ODF ریلی، پچ کوردهای داپلکس SC/LC، آداپتورها، پیگتیل و پچ پنل‌های ماژولار.
            </p>
          </div>

          {/* Card 5: Server Racks & Enclosures (4 cols) */}
          <div 
            onClick={() => handleCategoryClick('rack')}
            className="md:col-span-4 group rounded-2xl bg-white p-6 cursor-pointer border border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors mb-1.5">
              رک و محفظه‌های سرور
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              رک‌های ایستاده ۴۲ و ۴۷ یونیت دیتاسنتری، رک‌های دیواری ۶ تا ۱۲ یونیت با درب‌های توری مشبک و مدیریت حرارتی هوشمند.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
