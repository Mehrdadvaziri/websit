import React from 'react';
import { 
  Compass, 
  Truck, 
  CheckCircle, 
  ShieldAlert, 
  Cpu, 
  Bot, 
  FileCheck2, 
  ArrowLeft 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface ServicesSectionProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  setCurrentTab,
  setIsAiModalOpen,
}) => {
  const services = [
    {
      id: 'consulting',
      icon: Compass,
      iconBg: 'bg-blue-50 text-[#0066FF]',
      title: 'مشاوره و طراحی معماری شبکه',
      description: 'طراحی توپولوژی شبکه‌های اداری، سازمانی و دیتاسنترهای Tier-3 منطبق بر استانداردهای TIA-942 و ANSI/BICSI به همراه نقشه‌های اتوکد و دیاگرام لایه‌ها.',
      features: ['طراحی اختصاصی فیبر نوری و FTTH', 'محاسبه پهنای باند و افت توان نوری (Power Budget)', 'طراحی ریداندنسی و سوئیچینگ لایه ۳']
    },
    {
      id: 'supply',
      icon: Truck,
      iconBg: 'bg-indigo-50 text-indigo-600',
      title: 'تأمین مستقیم و بدون واسطه تجهیزات',
      description: 'واردات و توزیع مستقیم انواع کابل‌های فیبر نوری خاکی، داکتی، هوایی، کابل‌های شبکه Cat6/6A تمام مس و تجهیزات سوئیچینگ با گواهی مبدا و اصالت کالا.',
      features: ['تضمین بهترین قیمت پروژه‌ای و مناقصات', 'موجودی انبار آماده تحویل فوری', 'صدور پیش‌فاکتور رسمی با احتساب ارزش افزوده']
    },
    {
      id: 'testing',
      icon: FileCheck2,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'تست فلوک، فیوژن و صدور شناسنامه',
      description: 'اجرای فیوژن تخصصی فیبر نوری با دستگاه‌های ژاپنی فوجیکورا، تست فلوک DSX-8000 با ارائه گزارش تحلیلی کامل و ۲۵ سال گارانتی رسمی زیرساخت فیزیکی.',
      features: ['تست OTDR و افت‌سنجی نوری کالیبره', 'فیوژن و آرایش استاندارد در ODF و پچ‌پنل', 'ضمانت تعویض ۲۵ ساله عملکرد کابل‌ها']
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase">
            خدمات یکپارچه مهندسی نیرا
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            از ایده و طراحی تا بهره‌برداری و پشتیبانی ۲۴ ساعته
          </h2>
          <p className="text-sm text-slate-600">
            ما زیرساخت شبکه را به عنوان شریان حیاتی کسب‌وکار شما با بالاترین ضریب اطمینان طراحی و پیاده‌سازی می‌کنیم.
          </p>
        </div>

        {/* 3 Columns Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${srv.iconBg} flex items-center justify-center font-bold`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => setCurrentTab('contact')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] text-xs font-bold border border-slate-200 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    <span>ثبت درخواست مشاوره فنی</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Banner in Services */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0b1329] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
              <Bot className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                سیستم هوشمند برآورد اقلام شبکه (BOM) با هوش مصنوعی نیرا
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                تعداد کلاینت‌ها و متراژ ساختمان را وارد کنید، هوش مصنوعی نقشه کابل‌کشی و لیست قطعات لازم را دقیق محاسبه می‌کند.
              </p>
            </div>
          </div>

          <button
            id="services-btn-open-ai"
            onClick={() => setIsAiModalOpen(true)}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <span>شروع محاسبه با هوش مصنوعی</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
