import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Nira Network - Lumina Light Infrastructure" });
  });

  // AI Product Recommendation Endpoint
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      const { userNeed, projectType, scale, environment } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback intelligent heuristic recommendation if key is not yet set
        return res.json({
          success: true,
          source: "local-engine",
          recommendations: [
            {
              productName: "کابل فیبر نوری سینگل مود ۲۴ کور GYXTW",
              category: "کابل فیبر نوری",
              sku: "GYXTW-24C-SM",
              reason: "ایده‌آل برای بک‌بون پرسرعت ساختمان‌ها و مسافت‌های طولانی با محافظت در برابر جوندگان",
              quantity: "۲ درام (۲۰۰۰ متر)",
              estimatedBudget: "۴۵,۰۰۰,۰۰۰ تومان"
            },
            {
              productName: "سوئیچ ۲۴ پورت گیگابیتی مدیریتی لایه ۳",
              category: "تجهیزات اکتیو",
              sku: "SW-L3-24G-4SFP",
              reason: "مناسب برای توزیع پرسرعت شبکه با ۴ پورت آپ‌لینک ۱۰ گیگابیتی SFP+",
              quantity: "۲ دستگاه",
              estimatedBudget: "۵۸,۰۰۰,۰۰۰ تومان"
            },
            {
              productName: "باکس ODF رکمونت ۲۴ پورت SC با پیگتیل و آداپتور",
              category: "تجهیزات پسیو",
              sku: "ODF-24P-1U-SC",
              reason: "جهت فیوژن و آرایش استاندارد تارهای فیبر نوری در رک‌های اصلی",
              quantity: "۲ عدد",
              estimatedBudget: "۶,۴۰۰,۰۰۰ تومان"
            },
            {
              productName: "رک ۴۲ یونیت ایستاده عمق ۱۰۰ سانتیمتر با درب توری",
              category: "رک و محفظه",
              sku: "RACK-42U-100D",
              reason: "محافظت و تهویه استاندارد تجهیزات دیتاسنتری و سوئیچ‌های سازمانی",
              quantity: "۱ دستگاه",
              estimatedBudget: "۱۸,۵۰۰,۰۰۰ تومان"
            }
          ],
          technicalSummary: `طراحی پیشنهادی برای پروژه ${projectType || "سازمانی"} با مقیاس ${scale || "متوسط"}: معماری ترکیبی فیبر نوری در هسته (Core) و کابل‌کشی مسی Cat6A در لایه دسترسی (Access) برای تضمین ۹۹.۹٪ آپ‌تایم و قابلیت ارتقا به ۴۰/۱۰۰G.`,
          elementorWooAdvice: "این تجهیزات به صورت پکیج پیشنهادی در ووکامرس قابلیت افزودن مستقیم به سبد استعلام (RFQ) و همگام‌سازی با ویجت‌های المنتور را دارا هستند."
        });
      }

      const prompt = `شما مهندس ارشد طراح زیرساخت شبکه و فیبر نوری در شرکت "نیرا شبکه" (Nira Network) هستید.
بر اساس درخواست مشتری زیر، بهترین تجهیزات استاندارد شبکه (از جمله کابل فیبر نوری سینگل‌مود/مالتی‌مود، کابل شبکه Cat6/Cat6A/Cat7، سوئیچ‌های سیسکو/مدیریتی، رک‌های سرور، پچ کورد، پچ پنل، ODF و ماژول‌های SFP+) را پیشنهاد دهید.

مشخصات نیاز مشتری:
- متن نیاز: "${userNeed || "طراحی و تأمین تجهیزات شبکه یکپارچه برای سازمان"}"
- نوع پروژه: "${projectType || "شبکه اداری و دیتاسنتر"}"
- مقیاس / تعداد کلاینت: "${scale || "متوسط"}"
- شرایط محیطی: "${environment || "داخلی و فضای باز"}"

پاسخ را دقیقاً به صورت یک JSON استاندارد (بدون توضیحات اضافی خارج از JSON) با فرمت زیر ارائه کنید:
{
  "technicalSummary": "خلاصه فنی معماری پیشنهادی و توپولوژی شبکه",
  "recommendations": [
    {
      "productName": "نام دقیق کالا",
      "category": "دسته‌بندی (کابل فیبر نوری / تجهیزات اکتیو / تجهیزات پسیو / رک و محفظه / کابل مسی)",
      "sku": "کد فنی استاندارد",
      "reason": "دلیل تخصصی انتخاب این محصول برای این پروژه",
      "quantity": "تعداد یا متراژ پیشنهادی",
      "estimatedBudget": "تخمین قیمت حدودی به تومان"
    }
  ],
  "seoTags": ["کلمات کلیدی سئو فارسی برای این سیستم"],
  "elementorWooAdvice": "توصیه جهت پیاده‌سازی و استعلام در فروشگاه ووکامرس"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json({ success: true, source: "gemini-3.7-flash", ...parsed });
    } catch (err: any) {
      console.error("AI Recommendation error:", err);
      res.status(500).json({ error: "خطا در پردازش درخواست هوش مصنوعی", details: err?.message });
    }
  });

  // AI Chat Consultant
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `همکار گرامی، با توجه به استاندارد TIA-942 و استانداردهای کابل‌کشی ساخت‌یافته نیرا شبکه، برای پاسخ به سوال شما "${message}" توصیه می‌شود از کابل‌های سینگل‌مود OS2 برای فواصل بالای ۳۰۰ متر و کابل‌های مسی Cat6A UTP تمام مس برای فواصل زیر ۹۰ متر با سوئیچ‌های مدیریتی لایه ۳ استفاده نمایید. آیا مایلید لیست دقیق قطعات (BOM) را صادر کنیم؟`,
          suggestedProducts: ["کابل فیبر نوری سینگل مود ۲۴ کور", "سوئیچ ۲۴ پورت گیگابیتی", "پچ کورد SC-SC"]
        });
      }

      const systemPrompt = `شما مشاور فنی و مهندس متخصص هوش مصنوعی "نیرا شبکه" (Nira Network) هستید.
وظیفه شما راهنمایی تخصصی و مودبانه کاربران در زمینه انتخاب کابل‌های فیبر نوری (سینگل مود، مالتی مود OM3/OM4)، کابل‌های مسی (Cat6, Cat6A, Cat7)، رک‌های شبکه (ایستاده، دیواری)، سوییچ‌ها و روترها، اسپلیترها، ODF و استانداردسازی دیتاسنتر مطابق با BICSI و TIA-942 است.
پاسخ‌ها را مختصر، فنی، کاربردی و به زبان فارسی روان ارائه دهید. در پایان هر پاسخ، در صورت لزوم ۱ الی ۳ محصول مرتبط از فروشگاه نیرا شبکه را معرفی کنید.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: `${systemPrompt}\n\nپیام کاربر: ${message}`,
      });

      res.json({
        reply: response.text || "پاسخی دریافت نشد.",
        suggestedProducts: ["کابل فیبر نوری سینگل مود ۲۴ کور", "کابل شبکه Cat6 UTP", "رک ۴۲ یونیت دیتاسنتری"]
      });
    } catch (err: any) {
      console.error("AI Chat error:", err);
      res.status(500).json({ error: "خطا در برقراری ارتباط با مدل هوش مصنوعی", details: err?.message });
    }
  });

  // AI SEO & Elementor Schema Generator for Products
  app.post("/api/ai/seo-generate", async (req, res) => {
    try {
      const { productTitle, category, specs } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          seoTitle: `${productTitle || "تجهیزات شبکه"} | خرید و قیمت اورجینال - نیرا شبکه`,
          metaDescription: `خرید ${productTitle || "کابل و تجهیزات شبکه"} با گارانتی اصالت، بالاترین استاندارد فنی و ارسال فوری از تأمین‌کننده مستقیم زیرساخت فیبر نوری نیرا شبکه.`,
          focusKeywords: ["خرید کابل شبکه", "قیمت فیبر نوری", "نیرا شبکه", "تجهیزات دیتاسنتر"],
          schemaJsonLd: {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": productTitle || "محصول نیرا شبکه",
            "brand": { "@type": "Brand", "name": "Nira Network" },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "IRR",
              "availability": "https://schema.org/InStock"
            }
          }
        });
      }

      const prompt = `برای محصول زیر در فروشگاه اینترنتی ووکامرس / المنتور نیرا شبکه:
عنوان محصول: ${productTitle}
دسته‌بندی: ${category}
مشخصات: ${JSON.stringify(specs || {})}

مواردی از قبیل عنوان سئو (SEO Title)، متا دیسکریپشن جذاب و استاندارد گوگل (زیر ۱۶۰ کاراکتر)، کلمات کلیدی کانونی، و کدهای Schema.org JSON-LD را تولید کن.
پاسخ فقط به صورت JSON باشد:
{
  "seoTitle": "...",
  "metaDescription": "...",
  "focusKeywords": ["..."],
  "schemaJsonLd": {...}
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      res.json(JSON.parse(response.text || "{}"));
    } catch (err: any) {
      res.status(500).json({ error: "خطا در تولید سئو", details: err?.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nira Network Server running on http://localhost:${PORT}`);
  });
}

startServer();
