import React, { useState } from 'react';
import { 
  FileCode2, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Package, 
  Layers, 
  FileSpreadsheet, 
  CheckCircle2, 
  ExternalLink,
  Code
} from 'lucide-react';
import { Product } from '../types';

interface ElementorWooCommerceModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ElementorWooCommerceModal: React.FC<ElementorWooCommerceModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [activeTab, setActiveTab] = useState<'elementor' | 'woocommerce' | 'shortcodes' | 'guide'>('elementor');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generate Elementor Export JSON
  const elementorTemplateJSON = {
    version: "0.4",
    title: "Nira Network - Lumina Light Infrastructure Kit",
    type: "kit",
    author: "Nira Network & AI Studio",
    content: [
      {
        id: "hero_section_nira",
        elType: "section",
        settings: {
          layout: "boxed",
          background_background: "gradient",
          background_color: "#f7f9fb",
          background_color_b: "#ffffff"
        },
        elements: [
          {
            id: "heading_nira",
            elType: "widget",
            widgetType: "heading",
            settings: {
              title: "تأمین‌کننده پیشرو زیرساخت‌های شبکه و فیبر نوری نیرا",
              header_size: "h1",
              typography_typography: "custom",
              typography_font_family: "Vazirmatn"
            }
          }
        ]
      }
    ]
  };

  // Generate WooCommerce Product CSV
  const generateWooCommerceCSV = () => {
    const headers = "ID,Type,SKU,Name,Published,Is featured?,Visibility in catalog,Short description,Description,In stock?,Stock,Regular price,Categories,Images\n";
    const rows = products.map((p, idx) => {
      const escapedTitle = `"${p.title.replace(/"/g, '""')}"`;
      const escapedShortDesc = `"${p.shortDescription.replace(/"/g, '""')}"`;
      const escapedDesc = `"${p.fullDescription.replace(/"/g, '""')}"`;
      return `${idx + 1},simple,${p.sku},${escapedTitle},1,1,visible,${escapedShortDesc},${escapedDesc},${p.inStock ? 1 : 0},${p.stockCount},${p.price},"${p.categoryLabel}",${p.image}`;
    }).join("\n");
    return headers + rows;
  };

  const handleDownloadCSV = () => {
    const csvData = generateWooCommerceCSV();
    const blob = new Blob(["\uFEFF" + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nira_woocommerce_products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadElementorJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elementorTemplateJSON, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "nira_elementor_kit_template.json");
    dlAnchor.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">پکیج سازگاری و استخراج برای المنتور و ووکامرس</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Elementor & WooCommerce Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                فایل‌های آماده درون‌ریزی (Import) مستقیم در وردپرس به همراه سئو و ساختار صفحات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('elementor')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'elementor' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>قالب‌های JSON المنتور</span>
          </button>

          <button
            onClick={() => setActiveTab('woocommerce')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'woocommerce' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>فایل محصولات CSV ووکامرس</span>
          </button>

          <button
            onClick={() => setActiveTab('shortcodes')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'shortcodes' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>شورت‌کدهای اختصاصی</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>راهنمای گام‌به‌گام نصب</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* TAB 1: Elementor JSON */}
          {activeTab === 'elementor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 text-slate-700">
                <p className="font-bold text-[#0066FF] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  درون‌ریزی کیت قالب المنتور نیرا شبکه (Elementor Kit Template)
                </p>
                <p className="leading-relaxed">
                  فایل زیر شامل تعاریف فونت‌های وزیرمتن، رنگ‌بندی استاندارد Lumina Light، استایل‌های بخش هیرو، بنتو گرید دسته‌بندی‌ها و سکشن مشخصات فنی است که می‌توانید در بخش <strong>المنتور ← ابزارها ← درون‌ریزی/برون‌ریزی کیت</strong> بارگذاری نمایید.
                </p>
              </div>

              <div className="relative bg-slate-900 p-4 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-[11px] max-h-52 overflow-y-auto">
                <pre>{JSON.stringify(elementorTemplateJSON, null, 2)}</pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadElementorJSON}
                  className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود فایل nira_elementor_kit_template.json</span>
                </button>

                <button
                  onClick={() => handleCopy(JSON.stringify(elementorTemplateJSON, null, 2), 'elementor-json')}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-2"
                >
                  {copiedCode === 'elementor-json' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>کپی محتوای JSON</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WooCommerce CSV */}
          {activeTab === 'woocommerce' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-slate-700">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  درون‌ریزی محصولات در ووکامرس (WooCommerce Product CSV Import)
                </p>
                <p className="leading-relaxed">
                  فایل CSV زیر حاوی تمامی {products.length} محصول موجود در کاتالوگ نیرا به همراه کدهای فنی SKU، قیمت‌های به‌روز، دسته‌بندی‌ها، توضیحات کوتاه، گالری تصاویر و وضعیت انبار می‌باشد. در ووکامرس به بخش <strong>محصولات ← درون‌ریزی</strong> مراجعه فرمایید.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>نمونه ساختار فایل خروجی:</span>
                  <span className="text-slate-500 font-mono">UTF-8 with BOM</span>
                </div>
                <pre className="text-[11px] font-mono bg-white p-3 rounded-xl border border-slate-200 text-slate-700 overflow-x-auto">
                  {generateWooCommerceCSV().split('\n').slice(0, 4).join('\n')}
                </pre>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>دانلود رایگان فایل nira_woocommerce_products.csv</span>
              </button>
            </div>
          )}

          {/* TAB 3: Shortcodes */}
          {activeTab === 'shortcodes' && (
            <div className="space-y-4">
              <p className="text-slate-600 font-medium">
                این شورت‌کدها را در هر ویجت «کد کوتاه» (Shortcode Widget) یا «متن» المنتور قرار دهید تا ماژول‌های پویا بارگذاری شوند:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">ویجت کاتالوگ فیبر نوری</p>
                    <code className="text-[11px] text-blue-600 font-mono">[nira_products category="fiber" limit="6"]</code>
                  </div>
                  <button
                    onClick={() => handleCopy('[nira_products category="fiber" limit="6"]', 'sc1')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                  >
                    {copiedCode === 'sc1' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">فرم استعلام هوشمند قیمت و RFQ</p>
                    <code className="text-[11px] text-blue-600 font-mono">[nira_rfq_quote_builder]</code>
                  </div>
                  <button
                    onClick={() => handleCopy('[nira_rfq_quote_builder]', 'sc2')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                  >
                    {copiedCode === 'sc2' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">مشاور هوش مصنوعی طراحی شبکه</p>
                    <code className="text-[11px] text-blue-600 font-mono">[nira_ai_consultant_widget]</code>
                  </div>
                  <button
                    onClick={() => handleCopy('[nira_ai_consultant_widget]', 'sc3')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100"
                  >
                    {copiedCode === 'sc3' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Setup Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">مراحل ۳ گانه راه‌اندازی سریع در وردپرس:</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shrink-0">۱</span>
                  <div>
                    <strong className="text-slate-900 block">نصب افزونه‌های پایه:</strong>
                    <span>افزونه‌های Elementor Pro، WooCommerce و افزونه سئو (Yoast SEO یا Rank Math) را در وردپرس نصب و فعال فرمایید.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shrink-0">۲</span>
                  <div>
                    <strong className="text-slate-900 block">درون‌ریزی محصولات:</strong>
                    <span>از تب «فایل محصولات CSV»، فایل آماده را دانلود کرده و در بخش محصولات ووکامرس بارگذاری نمایید.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs shrink-0">۳</span>
                  <div>
                    <strong className="text-slate-900 block">اعمال استایل و هوش مصنوعی:</strong>
                    <span>کیت قالب JSON المنتور را درون‌ریزی کرده تا تمامی رنگ‌ها، فونت وزیرمتن و کارت‌های بنتو به صورت خودکار اعمال شوند.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
