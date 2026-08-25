import React from 'react';
import { 
  Network, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCode2, 
  Bot, 
  ArrowLeft 
} from 'lucide-react';
import { NavigationTab } from '../types';
import { NiraLogo } from './NiraLogo';

interface FooterProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsElementorModalOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  setIsAiModalOpen,
  setIsElementorModalOpen,
}) => {
  return (
    <footer className="bg-[#0b1329] text-slate-300 border-t border-slate-800 text-right">
      
      {/* Top CTA Strip */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-right">
            <h3 className="text-lg sm:text-xl font-black text-white">
              آماده شروع پروژه یا استعلام رسمی قیمت کابل‌های فیبر نوری هستید؟
            </h3>
            <p className="text-xs text-slate-400">
              مهندسان نیرا شبکه در کمتر از ۳۰ دقیقه لیست اقلام و پیش‌فاکتور رسمی را صادر می‌کنند.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>طراحی با هوش مصنوعی</span>
            </button>

            <button
              onClick={() => setCurrentTab('contact')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-xs"
            >
              درخواست پیش‌فاکتور رسمی (RFQ)
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* Clean Vector Emblem without embedded bottom text */}
              <NiraLogo size="lg" theme="dark" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white tracking-tight">
                    نیرا شبکه
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-900/60 text-cyan-300 border border-blue-500/40">
                    N
                  </span>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 tracking-wider">
                  کابل فیبر نوری و زیرساخت دیتاسنتر
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              مرجع تخصصی تأمین، واردات مستقیم و اجرای زیرساخت‌های پسیو و اکتیو فیبر نوری، کابل‌های مسی فرکانس بالا، سوییچینگ سازمانی و رک‌های دیتاسنتری با تضمین تست فلوک و ۲۵ سال ضمانت اصالت فیزیکی.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                استاندارد TIA-942
              </span>
              <span className="text-blue-400 font-bold flex items-center gap-1">
                <Award className="w-4 h-4" />
                عضو BICSI
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">دسته‌بندی تجهیزات</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">کابل فیبر نوری سینگل‌مود (OS2)</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">کابل‌های مالتی‌مود (OM3/OM4)</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">کابل شبکه Cat6 و Cat6A UTP/SFTP</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">سوئیچ‌های مدیریتی لایه ۳ و 10G SFP+</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">باکس ODF و پچ پنل فیبر نوری</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-blue-400 transition-colors">رک ۴۲ یونیت ایستاده دیتاسنتری</button></li>
            </ul>
          </div>

          {/* Standards & Services */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">خدمات مهندسی</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-blue-400 transition-colors">تست فلوک و صدور سرتیفیکیت</button></li>
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-blue-400 transition-colors">فیوژن اسپلایسینگ و OTDR</button></li>
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-blue-400 transition-colors">طراحی دیتاسنتر بر اساس TIA-942</button></li>
              <li><button onClick={() => setCurrentTab('services')} className="hover:text-blue-400 transition-colors">کابل‌کشی ساختاریافته مس و فیبر</button></li>
              <li><button onClick={() => setCurrentTab('projects')} className="hover:text-blue-400 transition-colors">پروژه‌های کلان FTTx و FTTH</button></li>
              <li><button onClick={() => setIsAiModalOpen(true)} className="hover:text-amber-300 text-blue-400 font-semibold transition-colors">محاسبه هوشمند لینک نوری با AI</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">اطلاعات ارتباطی</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، تقاطع مطهری، برج فناوری شبکه، طبقه ۶</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">۰۲۱-۸۸۸۸۰۰۰۰ (۳۰ خط)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">info@niranetworks.ir</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsElementorModalOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 font-bold"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>راهنمای یکپارچه‌سازی المنتور و ووکامرس</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} شرکت مهندسی نیرا شبکه (Nira Networks). کلیه حقوق مادی و معنوی محفوظ است.</p>
          <div className="flex items-center gap-6">
            <span>تضمین اصالت کالا</span>
            <span>۲۵ سال گارانتی تعویض</span>
            <span>پشتیبانی مهندسی ۲۴/۷</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
