import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  Zap,
  Globe2,
  HardDrive
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HeroSliderProps {
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
}

interface SlideItem {
  id: number;
  badge: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  image: string;
  cardBadge: string;
  cardTitle: string;
  cardSub: string;
  cardCode: string;
  cardStatus: string;
  cardActionText: string;
  stats: {
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
  };
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  setCurrentTab,
  setIsAiModalOpen,
  setIsCartOpen,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: SlideItem[] = [
    // Slide 1: Optical Lighting & Illuminated Fiber Bokeh (Directly matches user image 6108e96a1a05ef6bf960202e7eee0cd9.jpg)
    {
      id: 1,
      badge: 'OPTICS • فناوری نور و لیزر فیبر نوری',
      titleMain: 'تأمین‌کننده پیشرو',
      titleHighlight: 'زیرساخت‌های شبکه و فیبر نوری',
      description: 'با ارائه راهکارهای نوین و تجهیزات پیشرفته، زیرساخت‌های ارتباطی سازمان شما را با بالاترین کیفیت و امنیت تضمین می‌کنیم. نیرا شبکه، نماد اطمینان در دنیای دیجیتال.',
      // High-res vivid bokeh fiber optics directly reproducing user's Optical Lighting image
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=95',
      cardBadge: 'OPTICAL LIGHTING',
      cardTitle: 'مشاهده مشخصات کابل ۲۴ کور سینگل‌مود',
      cardSub: 'Abstract close-up of illuminated fiber optics with bokeh lights.',
      cardCode: 'ITU-TG.652D / OS2',
      cardStatus: 'تأمین فوری از انبار مرکزی',
      cardActionText: 'مشاهده مشخصات فنی',
      stats: {
        stat1Val: '۲۴/۷',
        stat1Label: 'پشتیبانی مهندسی',
        stat2Val: '۱۰۰٪',
        stat2Label: 'تست فلوک و اصالت',
        stat3Val: 'Km 500+',
        stat3Label: 'کابل‌کشی فیبر نوری'
      }
    },
    // Slide 2: Patch Panel Server Room with Port Numbers 058, 074, 090 (Directly matches user image.png)
    {
      id: 2,
      badge: 'STRUCTURED CABLING • پچ پنل و پچ کورد',
      titleMain: 'مدیریت استاندارد کابل‌کشی با',
      titleHighlight: 'پچ پنل‌های ۲۴ و ۴۸ پورت ماژولار',
      description: 'پچ پنل‌های شیلدد Cat6A/Cat7 و باکس‌های ODF با شماره‌گذاری دقیق پورت‌ها و تفکیک رنگ پچ‌کوردها، بدون نویز الکترومغناطیسی با تست فلوک چنل و پرمننت لینک.',
      // High-res network patch panel with cables plugged
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=95',
      cardBadge: 'PATCH PANEL 058-090',
      cardTitle: 'پچ پنل ۲۴ پورت Cat6A STP ماژولار',
      cardSub: 'High-density numbered enterprise server rack patch bay.',
      cardCode: 'TIA-568-C.2 / Cat6A SFTP',
      cardStatus: 'آماده ارسال فوری • با گارانتی',
      cardActionText: 'مشاهده پچ پنل و رک',
      stats: {
        stat1Val: '10 Gbps',
        stat1Label: 'پهنای باند فرکانسی 500MHz',
        stat2Val: '۰٪ نویز',
        stat2Label: 'شیلد و فویل ۱۰۰٪ محافظ',
        stat3Val: '۲۵ سال',
        stat3Label: 'ضمانت تعویض فیزیکی'
      }
    },
    // Slide 3: FTTH Fiber Cable Multi-Core (Directly matches user photo_2026-08-16_19-15-07.jpg)
    {
      id: 3,
      badge: 'FTTH BROADBAND • راهکارهای اینترنت پرسرعت',
      titleMain: 'اتصال پرسرعت فیبر تا منازل و برج‌ها با',
      titleHighlight: 'کابل‌های دراپ و تجهیزات FTTx نیرا',
      description: 'طراحی جامع و تأمین مستقیم کابل‌های فیبر نوری تارباز و چندکور خودنگهدار (Drop Cable)، اسپلیترهای نوری PLC، باکس‌های FAT و مودم‌های فیبر نوری GPON/EPON.',
      // Vibrant glowing fiber strands branching out
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=2000&q=95',
      cardBadge: 'FIBER TO THE HOME',
      cardTitle: 'دراپ کیبل ۲ و ۴ کور FTTH G657A2',
      cardSub: 'Fastest growing optical network solutions for enterprise & home.',
      cardCode: 'FTTH / FTTB / FTTO',
      cardStatus: 'موجودی انبار: بیش از ۵۰ کیلومتر',
      cardActionText: 'مشاهده پکیج FTTH',
      stats: {
        stat1Val: '1 Gbps+',
        stat1Label: 'سرعت دسترسی اینترنت فیبر',
        stat2Val: '1:64',
        stat2Label: 'اسپلیتر نوری PLC',
        stat3Val: '۱,۲۰۰+',
        stat3Label: 'پروژه موفق شهری و سازمانی'
      }
    }
  ];

  // Auto-play timer (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const active = slides[currentSlide];

  return (
    <section 
      id="hero-banner-slider"
      className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-between select-none group/slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images: CLEAR & VIVID with subtle opacity for maximum visibility */}
      {slides.map((slide, idx) => {
        const isCurrent = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
              isCurrent ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with interactive hover zoom and smooth pan */}
            <img
              src={slide.image}
              alt={slide.titleMain}
              className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out hover:scale-110 ${
                isCurrent ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Lighter, clear overlay so image texture & colors are clearly visible */}
            <div className="absolute inset-0 bg-slate-950/30 backdrop-brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/15" />
          </div>
        );
      })}

      {/* Cyber Grid Subtle Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-1"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Centered Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 relative z-10 w-full flex-1 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy (Right Column in RTL layout) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-xs text-slate-200 shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{active.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.3] tracking-tight">
              <span className="text-white block sm:inline drop-shadow-md">{active.titleMain}</span>{' '}
              <span className="text-[#38BDF8] drop-shadow-lg">
                {active.titleHighlight}
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-md bg-slate-950/25 p-2 rounded-xl backdrop-blur-xs">
              {active.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-start-collab-btn"
                onClick={() => setCurrentTab('contact')}
                className="px-7 py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 active:scale-95 text-white font-bold text-sm shadow-xl shadow-blue-600/50 transition-all flex items-center gap-2 hover:translate-y-[-2px]"
              >
                <span>شروع همکاری</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                id="hero-view-catalog-btn"
                onClick={() => setCurrentTab('products')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold text-sm shadow-lg transition-all hover:translate-y-[-2px]"
              >
                کاتالوگ محصولات
              </button>

              <button
                id="hero-ai-calc-btn"
                onClick={() => setIsAiModalOpen(true)}
                className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs backdrop-blur-md transition-all flex items-center gap-1.5 hover:border-cyan-400"
              >
                <Bot className="w-4 h-4 text-amber-300" />
                <span>طراحی با هوش مصنوعی</span>
              </button>
            </div>

          </div>

          {/* Left Glass Floating Card (Matches the mockup widget with CTA & Details) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md rounded-2xl bg-slate-900/70 border border-slate-600/60 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/70 space-y-4 text-right transition-transform hover:scale-[1.02] duration-300">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  {active.cardBadge}
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  SLIDE 0{currentSlide + 1} / 0{slides.length}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-300 font-mono tracking-tight mb-1">
                  {active.cardSub}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {active.cardTitle}
                </h3>
              </div>

              {/* Action Button inside card */}
              <button
                onClick={() => setCurrentTab('products')}
                className="w-full py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-blue-600 border border-slate-600 hover:border-blue-500 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="font-mono text-[11px] text-cyan-300 group-hover:text-white transition-colors">
                  Learn More
                </span>
                <div className="flex items-center gap-2">
                  <span>{active.cardActionText}</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </div>
              </button>

              {/* Status & Code indicators */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-300 font-medium">
                  {active.cardCode}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {active.cardStatus}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Floating Stats Bar & Controls */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Key Metrics from current slide */}
            <div className="flex items-center justify-around w-full md:w-auto gap-8 sm:gap-14 text-center md:text-right">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {active.stats.stat1Val}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {active.stats.stat1Label}
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800" />

              <div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {active.stats.stat2Val}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {active.stats.stat2Label}
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800" />

              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400 tracking-tight">
                  {active.stats.stat3Val}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  {active.stats.stat3Label}
                </div>
              </div>
            </div>

            {/* Slider Dots & Next/Prev Navigation */}
            <div className="flex items-center gap-4">
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide 
                        ? 'w-8 bg-[#38BDF8]' 
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`اسلاید ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-200 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-90"
                  aria-label="اسلاید قبلی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-200 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-90"
                  aria-label="اسلاید بعدی"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
