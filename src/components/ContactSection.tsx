import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building, 
  Sparkles,
  Bot
} from 'lucide-react';

interface ContactSectionProps {
  setIsAiModalOpen: (open: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  setIsAiModalOpen
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'فیبر نوری و دیتاسنتر',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase">
            مرکز ارتباط با مشتریان و استعلام قیمت
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            تماس با دپارتمان مهندسی و فروش نیرا شبکه
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            کارشناسان ما آماده پاسخگویی، اعزام کارشناس به سایت و ارائه پیش‌فاکتور رسمی هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contacts Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                اطلاعات تماس مستقیم
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-medium">تلفن خط ویژه (۳۰ خط):</span>
                    <a href="tel:02188880000" className="text-slate-900 font-bold hover:text-[#0066FF] font-mono text-base block mt-0.5">
                      ۰۲۱-۸۸۸۸۰۰۰۰
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-medium">پشتیبانی واتس‌اپ و تلگرام:</span>
                    <span className="text-slate-900 font-bold font-mono text-sm block mt-0.5">
                      ۰۹۱۲-۳۴۵-۶۷۸۹
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-medium">پست الکترونیکی سازمانی:</span>
                    <span className="text-slate-900 font-bold font-mono text-xs block mt-0.5">
                      info@niranetwork.ir
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-medium">نشانی دفتر مرکزی:</span>
                    <span className="text-slate-700 font-medium leading-relaxed block mt-0.5">
                      تهران، خیابان ولیعصر، تقاطع میرداماد، برج فناوری پارس، طبقه ۹، واحد ۹۰۴
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-500 shrink-0" />
                <div className="text-xs text-slate-600 space-y-0.5">
                  <p className="font-bold text-slate-800">ساعات کاری بخش مهندسی و انبار:</p>
                  <p>شنبه تا چهارشنبه: ۸:۳۰ الی ۱۷:۳۰ • پنج‌شنبه: ۸:۳۰ الی ۱۳:۳۰</p>
                </div>
              </div>
            </div>

            {/* AI Assistant Promo */}
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Bot className="w-4 h-4" />
                <span>مشاوره و استعلام بدون معطلی</span>
              </div>
              <h4 className="text-base font-bold">می‌خواهید همین حالا متراژ و قیمت قطعات را برآورد کنید؟</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                سامانه هوش مصنوعی نیرا شبکه در کمتر از ۱۰ ثانیه جدول دقیق قطعات را آماده می‌کند.
              </p>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-white text-[#0066FF] hover:bg-blue-50 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>محاسبه با هوش مصنوعی</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Form Area (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  فرم درخواست پیش‌فاکتور رسمی و مشاوره پروژه
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  اطلاعات پروژه خود را ثبت فرمایید تا کارشناس مسئول تا حداکثر ۱ ساعت آینده با شما تماس حاصل نماید.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">درخواست شما با موفقیت ثبت گردید!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    پیش‌فاکتور اولیه و بررسی فنی به شماره <strong>{formData.phone}</strong> ارسال خواهد شد.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', company: '', phone: '', email: '', projectType: 'فیبر نوری و دیتاسنتر', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-slate-700">نام و نام خانوادگی *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: مهندس رضوانی"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-slate-700">نام شرکت / سازمان</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="مثال: شرکت ارتباطات پیشرو"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-slate-700">شماره تماس مستقیم *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="۰۹۱۲..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 text-right">
                      <label className="text-xs font-bold text-slate-700">پست الکترونیکی</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.ir"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <label className="text-xs font-bold text-slate-700">نوع پروژه / اقلام درخواستی</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="فیبر نوری و دیتاسنتر">فیبر نوری و زیرساخت دیتاسنتر</option>
                      <option value="کابل‌های مسی شبکه و پچ پنل">کابل‌کشی ساخت‌یافته مسی (Cat6/Cat6A)</option>
                      <option value="سوئیچینگ و تجهیزات اکتیو">تجهیزات اکتیو و سوئیچینگ لایه ۳</option>
                      <option value="رک و محفظه‌های سرور">رک‌های ایستاده و دیواری</option>
                      <option value="تست فلوک و فیوژن">خدمات تست فلوک و فیوژن در محل</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-right">
                    <label className="text-xs font-bold text-slate-700">شرح اقلام، متراژ تقریبی یا مشخصات مناقصه</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="متراژ کابل، تعداد پورت یا لیست فایل‌های BOM را اینجا یادداشت نمایید..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400 leading-relaxed"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ارسال درخواست استعلام و صدور پیش‌فاکتور</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
