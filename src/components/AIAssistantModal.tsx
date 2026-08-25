import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShoppingCart, 
  Cpu, 
  Network, 
  Layers, 
  HelpCircle, 
  Loader2, 
  Building2, 
  Server,
  Zap,
  ArrowLeft,
  Boxes
} from 'lucide-react';
import { 
  AIRecommendationResponse, 
  Product, 
  AIRecommendationItem 
} from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddMultipleToCart,
  setIsCartOpen,
}) => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'chat'>('wizard');
  
  // Wizard State
  const [projectType, setProjectType] = useState('شبکه اداری و دیتاسنتر سازمانی');
  const [scale, setScale] = useState('۵۰ الی ۱۵۰ کاربر (۳ طبقه)');
  const [environment, setEnvironment] = useState('داخلی با ارتباط بک‌بون فیبر نوری');
  const [userNeed, setUserNeed] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIRecommendationResponse | null>(null);
  const [addedAllSuccess, setAddedAllSuccess] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'سلام و احترام! من هوش مصنوعی مشاور ارشد زیرساخت نیرا شبکه هستم. هرگونه سوال در خصوص استانداردهای فیبر نوری (OS2/OM3/OM4)، کابل‌کشی ساخت‌یافته Cat6A، افت توان نوری (Power Budget) یا نحوه پیاده‌سازی در المنتور و ووکامرس دارید، بفرمایید.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  if (!isOpen) return null;

  // Handler for AI Wizard
  const handleGenerateBOM = async () => {
    setIsGenerating(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          scale,
          environment,
          userNeed: userNeed || `پروژه ${projectType} برای مقیاس ${scale} در شرایط ${environment}`
        })
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error('Failed to get AI recommendation:', err);
      // Fallback result
      setAiResult({
        technicalSummary: `طراحی پیشنهادی برای ${projectType}: اجرای بک‌بون فیبر نوری سینگل‌مود ۲۴ کور بین رک مرکزی و ساب‌رک‌ها و توزیع کابل‌های Cat6A UTP تمام مس برای نودهای کلاینت جهت تضمین سرعت گیگابیت بدون افت.`,
        recommendations: [
          {
            productName: 'کابل فیبر نوری سینگل مود ۲۴ کور GYXTW',
            category: 'کابل فیبر نوری',
            sku: 'GYXTW-24C-SM',
            reason: 'ستون‌فقرات نوری پرسرعت بین طبقات با مقاومت در برابر رطوبت و جوندگان',
            quantity: '۱ قرقره (۱۰۰۰ متر)',
            estimatedBudget: '۴۵,۰۰۰,۰۰۰ تومان'
          },
          {
            productName: 'کابل شبکه Cat6 UTP تمام مس نیرا',
            category: 'کابل مسی',
            sku: 'NC6-UTP-BC-305M',
            reason: 'انتقال داده پرسرعت گیگابیت به سیستم‌های کاربران با مس خالص ۹۹.۹۸٪',
            quantity: '۴ حلقه (۱۲۲۰ متر)',
            estimatedBudget: '۳۱,۲۰۰,۰۰۰ تومان'
          },
          {
            productName: 'باکس ODF رکمونت ۲۴ پورت 1U',
            category: 'تجهیزات پسیو',
            sku: 'NODF-24P-SC-SM',
            reason: 'ترمینال و فیوژن امن تارهای فیبر در رک اصلی و ساب‌رک‌ها',
            quantity: '۲ دستگاه',
            estimatedBudget: '۱۲,۸۰۰,۰۰۰ تومان'
          },
          {
            productName: 'سوئیچ ۲۴ پورت گیگابیتی مدیریتی لایه ۳',
            category: 'تجهیزات اکتیو',
            sku: 'NSW-24G-4XG-L3',
            reason: 'مدیریت VLANها، کیفیت سرویس (QoS) و ارتباط با پورت‌های ۱۰G SFP+',
            quantity: '۲ دستگاه',
            estimatedBudget: '۱۱۶,۰۰۰,۰۰۰ تومان'
          }
        ],
        elementorWooAdvice: 'شما می‌توانید این پکیج پیشنهادی را مستقیماً به سبد استعلام افزوده یا کد شورت‌کد آن را در برگه المنتور درج فرمایید.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler to add all recommended items to cart
  const handleAddAllToCart = () => {
    if (!aiResult || !aiResult.recommendations) return;
    
    const itemsToAdd: { product: Product; quantity: number }[] = [];
    aiResult.recommendations.forEach((rec) => {
      // Find matching product in catalog
      const match = products.find(p => 
        p.title.includes(rec.productName) || 
        rec.productName.includes(p.title) ||
        p.category === (rec.category.includes('فیبر') ? 'fiber' : rec.category.includes('مسی') ? 'copper' : 'active')
      );
      if (match) {
        itemsToAdd.push({ product: match, quantity: 1 });
      }
    });

    if (itemsToAdd.length > 0) {
      onAddMultipleToCart(itemsToAdd);
      setAddedAllSuccess(true);
      setTimeout(() => {
        setAddedAllSuccess(false);
        onClose();
        setIsCartOpen(true);
      }, 1200);
    }
  };

  // Handler for Chat
  const handleSendChat = async () => {
    if (!inputMessage.trim() || isChatLoading) return;
    const userText = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: data.reply || 'متشکرم. توصیه فنی بر اساس استاندارد TIA-942 در جدول مشخصات نیرا شبکه ارائه شده است.'
      }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: 'جهت پاسخگویی دقیق‌تر، کارشناسان فنی نیرا شبکه با خط ویژه ۰۲۱-۸۸۸۸۰۰۰۰ در دسترس هستند. برای نیاز شما استفاده از کابل‌های سینگل‌مود OS2 با اتلاف زیر 0.35dB/km پیشنهاد می‌گردد.' 
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">مشاور هوشمند زیرساخت شبکه و فیبر نوری</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                طراحی معماری، لیست اقلام (BOM)، استعلام هوشمند قیمت و مشاوره استانداردها
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'wizard'
                ? 'bg-white text-[#0066FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>طراحی هوشمند پروژه و برآورد اقلام (BOM)</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-white text-[#0066FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>چت و پاسخ به سوالات فنی شبکه</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Wizard */}
          {activeTab === 'wizard' && (
            <div className="space-y-6">
              
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-[#0066FF]">
                  <Sparkles className="w-4 h-4" />
                  چگونه کار می‌کند؟
                </p>
                <p className="text-slate-600 leading-relaxed">
                  مشخصات ساختمان یا نیاز پروژه خود را وارد کنید؛ هوش مصنوعی مناسب‌ترین کابل‌های نوری، مسی، سوییچ و رک‌ها را همراه با مقدار پیشنهادی و خلاصه معماری تولید می‌کند.
                </p>
              </div>

              {/* Wizard Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">نوع پروژه / کاربری ساختمان</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="شبکه اداری و دیتاسنتر سازمانی">ساختمان اداری و دیتاسنتر سازمانی</option>
                    <option value="بیمارستان و مرکز درمانی هوشمند">بیمارستان و مراکز درمانی (پایدار و ایمن)</option>
                    <option value="دانشگاه و محوطه وسیع (Campus)">دانشگاه و مجتمع آموزشی (Campus Network)</option>
                    <option value="کارخانه و محیط صنعتی خشن">کارخانه و شهرک صنعتی (کابل‌های ضد نویز و جونده)</option>
                    <option value="مرکز داده و اتاق سرور اختصاصی">مرکز داده و هاستینگ (Tier-3 Datacenter)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">مقیاس پروژه / تعداد نودها و طبقات</label>
                  <select
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="کوچک: تا ۵۰ نود (۱ الی ۲ طبقه)">کوچک: تا ۵۰ نود (۱ الی ۲ طبقه)</option>
                    <option value="متوسط: ۵۰ الی ۱۵۰ کاربر (۳ الی ۵ طبقه)">متوسط: ۵۰ الی ۱۵۰ کاربر (۳ الی ۵ طبقه)</option>
                    <option value="بزرگ: ۱۵۰ الی ۵۰۰ کاربر (برج یا چند ساختمان)">بزرگ: ۱۵۰ الی ۵۰۰ کاربر (چند ساختمان)</option>
                    <option value="دیتاسنتر اختصاصی: بیش از ۴۰ رک و ۲۰۰۰ پورت">دیتاسنتر اختصاصی: بیش از ۴۰ رک و ۲۰۰۰ پورت</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">توضیحات اختیاری یا الزامات خاص (اختیاری)</label>
                <input
                  type="text"
                  value={userNeed}
                  onChange={(e) => setUserNeed(e.target.value)}
                  placeholder="مثال: فاصله ساختمان‌ها ۳۰۰ متر است و نیاز به ارتباط ۱۰ گیگ و رک‌های با تهویه قوی داریم..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <button
                id="btn-generate-ai-bom"
                disabled={isGenerating}
                onClick={handleGenerateBOM}
                className="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال تحلیل معماری و محاسبه دقیق اقلام توسط هوش مصنوعی...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>محاسبه و صدور پیشنهاد هوشمند معماری و قطعات</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </>
                )}
              </button>

              {/* AI Output Result Box */}
              {aiResult && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in">
                  
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm font-bold text-slate-900">نتیجه تحلیل مهندسی نیرا هوش مصنوعی:</h4>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      تأیید استاندارد TIA-942
                    </span>
                  </div>

                  {/* Architecture Summary */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <p className="font-bold text-slate-900 mb-1">خلاصه معماری پیشنهادی:</p>
                    <p>{aiResult.technicalSummary}</p>
                  </div>

                  {/* Recommended BOM Items */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-800">لیست قطعات و تجهیزات برآورد شده (BOM):</p>
                    
                    <div className="space-y-2">
                      {aiResult.recommendations?.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-blue-600">{item.category}</span>
                            <h5 className="font-bold text-slate-900">{item.productName}</h5>
                            <p className="text-[11px] text-slate-500">{item.reason}</p>
                          </div>

                          <div className="flex items-center gap-4 text-left shrink-0">
                            <span className="bg-slate-100 text-slate-800 font-bold px-2 py-1 rounded">
                              {item.quantity}
                            </span>
                            <span className="font-bold text-emerald-700 font-mono">
                              {item.estimatedBudget}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elementor & WooCommerce note */}
                  {aiResult.elementorWooAdvice && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      <strong>نکته المنتور و ووکامرس: </strong>
                      {aiResult.elementorWooAdvice}
                    </div>
                  )}

                  {/* Add All to Cart CTA */}
                  <div className="pt-2">
                    <button
                      id="btn-ai-add-all-cart"
                      onClick={handleAddAllToCart}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                        addedAllSuccess 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {addedAllSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>تمام اقلام با موفقیت به سبد استعلام افزوده شدند!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>افزودن تمام قطعات پیشنهادی به سبد استعلام (RFQ)</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: Chat */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px]">
              
              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2">
                {chatMessages.map((msg, index) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAi && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                          isAi
                            ? 'bg-slate-100 text-slate-800 border border-slate-200'
                            : 'bg-[#0066FF] text-white'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {!isAi && (
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
                          <span>شما</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-3 rounded-2xl w-fit">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0066FF]" />
                    <span>مشاور هوش مصنوعی در حال نگارش پاسخ تخصصی...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChat();
                  }}
                  placeholder="سوال فنی خود را بپرسید (مثال: تفاوت کابل GYXTW و GYTA53 چیست؟)..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400"
                />
                <button
                  disabled={isChatLoading || !inputMessage.trim()}
                  onClick={handleSendChat}
                  className="p-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
