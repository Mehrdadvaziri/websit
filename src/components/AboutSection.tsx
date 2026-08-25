import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Cpu, 
  Users, 
  CheckCircle, 
  Layers, 
  Globe2, 
  Zap, 
  ArrowLeft 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface AboutSectionProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  setCurrentTab,
  setIsAiModalOpen
}) => {
  return (
    <section className="py-16 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-right">
            <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              داستان و اصالت نیرا شبکه
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              تأمین پایدار، اطمینان بی‌وقفه در زیرساخت‌های حیاتی کشور
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              شرکت مهندسی <strong>نیرا شبکه</strong> با بیش از ۱۵ سال تجربه مستمر در حوزه طراحی، تولید، واردات و توزیع تجهیزات پسیو و اکتیو فیبر نوری و شبکه‌های مسی، هم‌اکنون به عنوان یکی از مطمئن‌ترین مراجع تأمین دیتاسنترها، سازمان‌های دولتی، بانک‌ها و صنایع بزرگ کشور شناخته می‌شود.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              تعهد ما به ارائه کالاهای منطبق بر استانداردهای TIA-942، ISO 9001 و تست‌های سخت‌گیرانه فلوک DSX-8000 موجب شده تا زیرساخت‌های اجرا شده با برند نیرا، با ۲۵ سال گارانتی رسمی تعویض و پشتیبانی فنی ۲۴ ساعته همراه باشند.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <span className="block text-2xl font-black text-[#0066FF] font-mono">+۱۵ سال</span>
                <span className="text-xs text-slate-600 font-medium">تجربه تخصصی زیرساخت</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <span className="block text-2xl font-black text-slate-900 font-mono">۲۵ سال</span>
                <span className="text-xs text-slate-600 font-medium">ضمانت فیزیکی محصولات</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                alt="مرکز داده نیرا شبکه"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-6 right-6 left-6 text-white space-y-1">
                <p className="text-xs font-bold text-blue-400">آزمایشگاه تخصصی کنترل کیفیت</p>
                <p className="text-sm font-black">تست افت نوری و میکروسکوپی کانکتورهای فیبر نوری</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">چرا مهندسان ارشد، نیرا شبکه را انتخاب می‌کنند؟</h2>
            <p className="text-xs text-slate-500">چهار اصل کلیدی در زنجیره تأمین و خدمات مهندسی ما</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">اصالت ۱۰۰٪ مس و فیبر</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                تولید شده با تارهای خالص Corning و خلوص مس ۹۹.۹۸٪ بدون آلومینیوم (بدون CCA).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">گواهینامه‌های رسمی</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                انطباق کامل با استانداردهای ISO 9001، TIA-942 و ANSI/BICSI با تاییدیه تست فلوک.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">پشتیبانی و استعلام آنی</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                صدور کمتر از ۳۰ دقیقه پیش‌فاکتورهای رسمی سازمانی و تحویل در همان روز در تهران.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">هوش مصنوعی مشاوره</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                سامانه هوشمند اختصاصی محاسبه قطعات و شبیه‌سازی ترافیک شبکه برای کارفرمایان.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
