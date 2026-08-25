import React from 'react';
import { 
  ArrowLeft, 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Server, 
  Award, 
  Activity 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HeroSectionProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setCurrentTab,
  setIsAiModalOpen,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Background Subtle Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0066FF 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column (Text & CTAs) in RTL */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>تأمین‌کننده تخصصی کابل‌های نوری، مسی و رک‌های دیتاسنتر</span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 mr-1" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.25] tracking-tight">
              زیرساخت ارتباطی پایدار با{' '}
              <span className="text-[#0066FF] relative inline-block">
                فیبر نوری و تجهیزات شبکه
                <svg 
                  className="absolute -bottom-2 right-0 w-full h-3 text-blue-300/60 -z-10" 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                >
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              {' '}نیرا
            </h1>

            {/* Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              ارائه‌دهنده جامع‌ترین سبد کابل‌های فیبر نوری سینگل‌مود و مالتی‌مود، کابل‌های مسی فرکانس بالا، سوئیچ‌های مدیریتی لایه ۳ و رک‌های استاندارد دیتاسنتری با تضمین گذراندن تست‌های معتبر فلوک و ۲۵ سال ضمانت فیزیکی.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>موجودی تضمینی کابل‌های آرمورد خاکی و داکتی</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>صدور رسمی پیش‌فاکتور (RFQ) ویژه مناقصات</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>انطباق کامل با استانداردهای TIA-942 و BICSI</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مشاوره و طراحی معماری شبکه با هوش مصنوعی</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-btn-products"
                onClick={() => setCurrentTab('products')}
                className="px-6 py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 hover:translate-y-[-2px]"
              >
                <span>مشاهده کاتالوگ محصولات</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-ai-wizard"
                onClick={() => setIsAiModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2 hover:border-blue-400 group"
              >
                <Bot className="w-4 h-4 text-[#0066FF] group-hover:scale-110 transition-transform" />
                <span>مشاوره و استعلام هوشمند با AI</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </button>

              <button
                id="hero-btn-projects"
                onClick={() => setCurrentTab('projects')}
                className="px-4 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
              >
                مشاهده پروژه‌های اجرا شده
              </button>
            </div>

          </div>

          {/* Left Column (Visual Showcase / Interactive Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xl p-5 sm:p-6 space-y-5">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">زیرساخت دیتاسنتر نیرا</h4>
                      <p className="text-xs text-slate-500">Tier-3 Certified Standard</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                    تست فلوک ۱۰۰٪ تایید
                  </span>
                </div>

                {/* Featured Product Visual */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video group">
                  <img 
                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" 
                    alt="کابل فیبر نوری نیرا شبکه" 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                  
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold text-blue-300">محصول استراتژیک</p>
                      <p className="text-sm font-bold">کابل فیبر نوری ۲۴ کور GYXTW</p>
                    </div>
                    <span className="text-xs font-mono bg-blue-600/80 px-2 py-0.5 rounded border border-blue-400/30">
                      OS2 / G.652D
                    </span>
                  </div>
                </div>

                {/* Specs Micro-Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                    <span className="block text-[10px] text-slate-500 font-medium">حداکثر پهنای باند</span>
                    <span className="block text-xs font-extrabold text-slate-900 mt-0.5">100 Gbps</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                    <span className="block text-[10px] text-slate-500 font-medium">طول عمر مفید</span>
                    <span className="block text-xs font-extrabold text-slate-900 mt-0.5">۲۵ سال گارانتی</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                    <span className="block text-[10px] text-slate-500 font-medium">استاندارد روکش</span>
                    <span className="block text-xs font-extrabold text-slate-900 mt-0.5">LSZH / HDPE</span>
                  </div>
                </div>

                {/* Micro AI Assistant Trigger inside Hero */}
                <div 
                  onClick={() => setIsAiModalOpen(true)}
                  className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#0066FF]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">نیاز به محاسبه متراژ فیبر دارید؟</p>
                      <p className="text-[11px] text-slate-500">تحلیل رایگان با مدل هوش مصنوعی نیرا</p>
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-[#0066FF]" />
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Live Counters Banner */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">+۱۵۰</p>
            <p className="text-xs text-slate-600 font-medium">سازمان و دیتاسنتر فعال</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-[#0066FF] font-mono">+۲,۵۰۰</p>
            <p className="text-xs text-slate-600 font-medium">کیلومتر فیبر نوری توزیع شده</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">۲۵ سال</p>
            <p className="text-xs text-slate-600 font-medium">گارانتی فیزیکی کابل‌های شبکه</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">۹۹.۹۸٪</p>
            <p className="text-xs text-slate-600 font-medium">پایداری عملکرد و تایید تست</p>
          </div>
        </div>

      </div>
    </section>
  );
};
