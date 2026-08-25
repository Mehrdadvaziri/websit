import { Product, Order, Project, NewsArticle, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'کابل فیبر نوری سینگل مود ۲۴ کور GYXTW',
    category: 'fiber',
    categoryLabel: 'کابل فیبر نوری',
    sku: 'GYXTW-24C-SM-OS2',
    price: 45000000,
    formattedPrice: '۴۵,۰۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 14,
    badge: 'پرفروش‌ترین',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'کابل فیبر نوری ۲۴ کور سینگل‌مود با روکش مقاوم پلی‌اتیلن و آرمورد ضد جونده مخصوص داکت و لوله',
    fullDescription: 'کابل فیبر نوری ۲۴ کور مدل GYXTW از نوع Central Loose Tube با ژل ضدآب و دو مفتول فولادی موازی در طرفین جهت استحکام کششی بالا طراحی شده است. این کابل با تارهای استاندارد G.652D بالاترین نرخ انتقال سیگنال نوری با حداقل افت (Attenuation) را برای مسافت‌های طولانی تا ۴۰ کیلومتر در شبکه‌های بک‌بون سازمانی و شهری تضمین می‌کند.',
    specs: [
      { label: 'نوع تار نوری', value: 'Single Mode (OS2 / ITU-T G.652.D)' },
      { label: 'تعداد کور (Core)', value: '۲۴ کور مجزا با کد رنگی استاندارد TIA-598' },
      { label: 'نوع سازه', value: 'Central Loose Tube با ژل تیکسوتروپیک ضد رطوبت' },
      { label: 'محافظت مکانیکی', value: 'نوار فولادی موج‌دار ضد جونده (Corrugated Steel Tape Armored)' },
      { label: 'عناصر کششی', value: 'دو عدد سیم فولادی فسفاته (Parallel Steel Wires)' },
      { label: 'جنس روکش نهایی', value: 'MDPE / HDPE مقاوم در برابر UV و حرارت' },
      { label: 'حداکثر افت در ۱۳۱۰ نانومتر', value: '≤ 0.35 dB/km' },
      { label: 'محدوده دمای کاری', value: '-۴۰ تا +۷۰ درجه سانتی‌گراد' }
    ],
    keyBenefits: [
      {
        title: 'مقاومت حرارتی و ضد جونده بالا',
        description: 'روکش آرمورد موج‌دار با دوام فوق‌العاده در برابر نفوذ جوندگان و رطوبت زمین',
        icon: 'ShieldCheck'
      },
      {
        title: 'پهنای باند فوق‌العاده ۱۰G و ۴۰G',
        description: 'افت سیگنال ناچیز برای پیاده‌سازی لینک‌های پرسرعت دیتاسنتری',
        icon: 'Zap'
      },
      {
        title: 'گارانتی اصالت و تست فلوک',
        description: 'همراه با گواهی تست OTDR کارخانه‌ای و ضمانت ۲۵ ساله فیزیکی کابل',
        icon: 'Award'
      }
    ],
    seoKeywords: ['کابل فیبر نوری ۲۴ کور', 'GYXTW', 'فیبر نوری سینگل مود', 'خرید کابل نوری نیرا', 'کابل فیبر ارزان و استاندارد']
  },
  {
    id: 'prod-2',
    title: 'کابل فیبر نوری ۱۲ کور خاکی و داکتی GYTA53',
    category: 'fiber',
    categoryLabel: 'کابل فیبر نوری',
    sku: 'GYTA53-12C-SM',
    price: 32000000,
    formattedPrice: '۳۲,۰۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 8,
    badge: 'دفن مستقیم',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'کابل دولایه آرمورد برای دفن مستقیم در خاک (Direct Buried) و محیط‌های خشن صنعتی',
    fullDescription: 'کابل فیبر نوری GYTA53 دارای ساختار چند لوله با مغزی FRP، نوار آلومینیومی رطوبت‌گیر و نوار فولادی ضد جونده است که روکش دولایه پلی‌اتیلن آن را برای سخت‌ترین شرایط محیطی مناسب می‌سازد.',
    specs: [
      { label: 'نوع تار', value: 'Single Mode G.652D' },
      { label: 'تعداد کور', value: '۱۲ کور' },
      { label: 'لایه آرمور', value: 'دو لایه نوار آلومینیوم (APL) + نوار فولادی (PSP)' },
      { label: 'عنصر مقاومتی مرکزی', value: 'FRP غیرفلزی' }
    ],
    keyBenefits: [
      { title: 'تحمل بار سنگین', description: 'قابلیت دفن مستقیم در عمق خاک بدون نیاز به لوله', icon: 'Layers' },
      { title: 'ضد نفوذ آب', description: 'ترکیب کامل نوار ژل‌دار ضد آب', icon: 'Droplets' }
    ],
    seoKeywords: ['کابل فیبر نوری ۱۲ کور', 'GYTA53', 'دفن مستقیم خاکی']
  },
  {
    id: 'prod-3',
    title: 'کابل شبکه Cat6 UTP تمام مس نیرا (حلقه ۳۰۵ متری)',
    category: 'copper',
    categoryLabel: 'کابل مسی',
    sku: 'NC6-UTP-BC-305M',
    price: 7800000,
    formattedPrice: '۷,۸۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 45,
    badge: 'تضمین تست فلوک',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'کابل مسی تمام مس با خلوص ۹۹.۹۸٪ بدون آلیاژ با روکش LSZH کندسوز و تفکیک‌کننده مرکزی ۴ زوج',
    fullDescription: 'کابل شبکه Cat6 UTP نیرا شبکه با رشته‌های مسی خالص ۲۳AWG و دیوایدر پلاستیکی وسط، حداقل تداخل هم‌شنوایی (Crosstalk) و گذردهی کامل تست فلوک پرمننت را تضمین می‌نماید.',
    specs: [
      { label: 'استاندارد فرکانس', value: '250 MHz (Class E)' },
      { label: 'جنس هادی', value: 'مس خالص بدون اکسیژن (OFC 100% Copper)' },
      { label: 'قطر هادی', value: '23 AWG (0.57 mm)' },
      { label: 'جنس روکش', value: 'LSZH ضد اشتعال و بدون گاز سمی' },
      { label: 'طول قرقره', value: '۳۰۵ متر در جعبه کشاننده آسان' }
    ],
    keyBenefits: [
      { title: 'تست فلوک چنل و پرمننت', description: 'پاس شدن با بالاترین مارجین (Headroom +6dB)', icon: 'CheckCircle' },
      { title: 'پشتیبانی از PoE++', description: 'قابلیت تغذیه اکسس‌پوینت‌ها و دوربین‌های تا ۹۰ وات', icon: 'Zap' }
    ],
    seoKeywords: ['کابل Cat6 UTP', 'کابل شبکه مس خالص', 'کابل لگراند نیرا', 'کابل فلوک تست']
  },
  {
    id: 'prod-4',
    title: 'کابل شبکه Cat6A SFTP شیلد و فویل‌دار صنعتی',
    category: 'copper',
    categoryLabel: 'کابل مسی',
    sku: 'NC6A-SFTP-IND',
    price: 13500000,
    formattedPrice: '۱۳,۵۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 22,
    badge: '10 Gigabit',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'حداکثر محافظت در برابر امواج الکترومغناطیسی (EMI) و نویز با پهنای باند ۵۰۰ مگاهرتز',
    fullDescription: 'کابل Cat6A SFTP دارای شیلد بافته‌شده مسی به همراه فویل آلومینیومی به دور هر زوج جهت حذف کامل نویزهای صنعتی و انتقال پایدار ۱۰ گیگابیت بر ثانیه در دیتاسنترها.',
    specs: [
      { label: 'پهنای باند', value: '500 MHz (10GBASE-T تا ۱۰۰ متر)' },
      { label: 'شیلدینگ', value: 'SFTP (Overall Braid + Individual Foil Pairs)' },
      { label: 'قطر هادی', value: '23 AWG Pure Copper' }
    ],
    keyBenefits: [
      { title: 'سرعت ۱۰ گیگابیت واقعی', description: 'بدون افت سرعت در مسافت ۱۰۰ متری استاندارد', icon: 'Cpu' },
      { title: 'مقاوم در برابر نویز برق', description: 'عبور ایمن در سینی کابل کنار کابل‌های برق سه فاز', icon: 'Shield' }
    ],
    seoKeywords: ['کابل Cat6A SFTP', 'کابل ۱۰ گیگ', 'کابل شبکه شیلددار']
  },
  {
    id: 'prod-5',
    title: 'سوئیچ ۲۴ پورت گیگابیتی مدیریتی لایه ۳ لایت با ۴ پورت 10G SFP+',
    category: 'active',
    categoryLabel: 'تجهیزات اکتیو',
    sku: 'NSW-24G-4XG-L3',
    price: 58000000,
    formattedPrice: '۵۸,۰۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 6,
    badge: 'سازمانی لایه ۳',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'سوئیچ مدیریتی با قابلیت‌های پیشرفته روتینگ استاتیک، VLAN، QoS و آپ‌لینک‌های پرسرعت ۱۰G',
    fullDescription: 'سوئیچ ۲۴ پورت مدیریتی نیرا شبکه برای لایه توزیع و اکسس سازمان‌ها طراحی شده و از پروتکل‌های مسیریابی RIP, OSPF, IPv6 و مانیتورینگ SNMPv3 پشتیبانی می‌کند.',
    specs: [
      { label: 'پورت‌های شبکه', value: '۲۴ پورت ۱۰/۱۰۰/۱۰۰۰ RJ45 گیگابیتی' },
      { label: 'پورت‌های آپ‌لینک', value: '۴ پورت ۱۰G SFP+ نوری' },
      { label: 'ظرفیت سوییچینگ', value: '128 Gbps' },
      { label: 'منبع تغذیه', value: 'دوگانه ریداندانت (Dual Redundant AC)' }
    ],
    keyBenefits: [
      { title: 'مدیریت وب و CLI', description: 'رابط کاربری گرافیکی مدرن فارسی و انگلیسی + خط فرمان امن SSH', icon: 'Terminal' },
      { title: 'روتینگ درون‌سازمانی', description: 'هدایت سریع ترافیک بین VLANها بدون نیاز به روتر خارجی', icon: 'Share2' }
    ],
    seoKeywords: ['سوییچ ۲۴ پورت مدیریتی', 'سوییچ سیسکو', 'سوییچ فیبر نوری SFP+']
  },
  {
    id: 'prod-6',
    title: 'باکس ODF رکمونت ۲۴ پورت 1U کشویی با آداپتور و پیگتیل',
    category: 'passive',
    categoryLabel: 'تجهیزات پسیو',
    sku: 'NODF-24P-SC-SM',
    price: 6400000,
    formattedPrice: '۶,۴۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 19,
    badge: 'پکیج کامل',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'پچ پنل و باکس توزیع فیبر نوری رکمونت ۱ یونیت با سینی فیوژن، ۲۴ آداپتور SC و پیگتیل‌های تست‌شده',
    fullDescription: 'باکس ODF کشویی نیرا با بدنه ضخیم الکترواستاتیک ضدخش، امکان آرایش منظم فیبر نوری، شعاع خمش ایمن و دسترسی سریع بدون باز کردن رک را برای اپراتورها فراهم می‌کند.',
    specs: [
      { label: 'ارتفاع رک', value: '1U (استاندارد ۱۹ اینچ)' },
      { label: 'نوع پورت‌ها', value: '۲۴ پورت SC Simplex / Duplex' },
      { label: 'مکانیزم کشو', value: 'ریل بلبرینگی روان با قفل ایمنی' },
      { label: 'اقلام همراه', value: 'سینی فیوژن، ۲۴ عدد پیگتیل SM و شرینک حرارتی' }
    ],
    keyBenefits: [
      { title: 'کشو ریلی بلبرینگی', description: 'سرویس‌دهی آسان تارهای فیبر بدون قطعی شبکه', icon: 'Sliders' },
      { title: 'محافظت از شعاع خمش', description: 'حداکثر حفاظت از کدهای فیوژن و پیگتیل‌ها', icon: 'ShieldCheck' }
    ],
    seoKeywords: ['ODF فیبر نوری', 'پچ پنل فیبر نوری', 'باکس ۲۴ پورت SC']
  },
  {
    id: 'prod-7',
    title: 'رک شبکه ۴۲ یونیت ایستاده دیتاسنتری عمق ۱۰۰۰ میلیمتر',
    category: 'rack',
    categoryLabel: 'رک و محفظه',
    sku: 'NRCK-42U-1000D',
    price: 18500000,
    formattedPrice: '۱۸,۵۰۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 5,
    badge: 'سنگین دیتاسنتر',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'رک ایستاده مقاوم با درب توری مشبک ۸۰٪، ۴ عدد فن بلبرینگی، سنسور دما و پاورماژول ۸ پورت',
    fullDescription: 'رک ۴۲ یونیت نیرا شبکه با ستون‌های فولادی تقویت‌شده ۱.۵ میلیمتری تحمل وزن سرورها تا ۱۰۰۰ کیلوگرم را داشته و دارای پنل‌های جانبی قفل‌شو برای امنیت فیزیکی حداکثری است.',
    specs: [
      { label: 'ارتفاع', value: '42U (ارتفاع خارجی ۲۰۰ سانتی‌متر)' },
      { label: 'عمق', value: '۱۰۰۰ میلیمتر (ایده‌آل برای سرورهای رکمونت)' },
      { label: 'تهویه هوا', value: 'درب جلو و عقب مشبک توری با گردش هوای ۸۰٪' },
      { label: 'تحمل وزن استاتیک', value: '۱۰۰۰ کیلوگرم' }
    ],
    keyBenefits: [
      { title: 'گردش هوای بهینه', description: 'درب‌های مشبک جهت کاهش چشمگیر دمای سرورها', icon: 'Wind' },
      { title: 'پاورماژول و فن هوشمند', description: 'شامل فن‌های دور متغیر و دماسنج دیجیتال', icon: 'Cpu' }
    ],
    seoKeywords: ['رک ۴۲ یونیت', 'رک سرور دیتاسنتر', 'خرید رک ایستاده']
  },
  {
    id: 'prod-8',
    title: 'پچ کورد فیبر نوری SC-LC داپلکس ۳ متری سینگل مود',
    category: 'fiber',
    categoryLabel: 'کابل فیبر نوری',
    sku: 'NPC-SCLC-SM-3M',
    price: 480000,
    formattedPrice: '۴۸۰,۰۰۰ تومان',
    inStock: true,
    stockCount: 150,
    badge: 'ارسال فوری',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'پچ‌کورد داپلکس ۳ متری با فرول سرامیکی دقیق و تلفات بازگشتی بیش از ۵۵ دسی‌بل (UPC)',
    fullDescription: 'پچ کوردهای کارخانه‌ای نیرا شبکه تحت آزمایش‌های میکروسکوپی فاکتور هندسه فرول و افت اینسرشن زیر 0.2dB قرار گرفته‌اند و برای اتصال ماژول‌های SFP به پچ پنل‌های نوری مناسب هستند.',
    specs: [
      { label: 'کانکتورها', value: 'SC به LC داپلکس (Duplex)' },
      { label: 'نوع تار', value: 'Single Mode 9/125um OS2' },
      { label: 'Insertion Loss', value: '≤ 0.20 dB' },
      { label: 'Return Loss', value: '≥ 55 dB (UPC polish)' }
    ],
    keyBenefits: [
      { title: 'تست افت ۱۰۰٪', description: 'دارای برچسب نتیجه تست در هر بسته‌بندی', icon: 'CheckCircle' }
    ],
    seoKeywords: ['پچ کورد فیبر نوری', 'پچ کورد SC LC', 'پچکورد سینگل مود']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-9842',
    customerName: 'مهندس محمودی',
    companyName: 'شرکت فناوران عصر نوین',
    date: '۱۴۰۳/۰۸/۲۴',
    totalAmount: 112000000,
    formattedAmount: '۱۱۲,۰۰۰,۰۰۰ تومان',
    status: 'approved',
    statusLabel: 'تأیید شده و آماده ارسال',
    paymentMethod: 'واریز به حساب شرکتی',
    trackingCode: 'TRK-8812903',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'کابل فیبر نوری سینگل مود ۲۴ کور GYXTW',
        quantity: 2,
        unitPrice: 45000000,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-7',
        productTitle: 'رک شبکه ۴۲ یونیت ایستاده دیتاسنتری',
        quantity: 1,
        unitPrice: 18500000,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-9843',
    customerName: 'خانم مهندس حسینی',
    companyName: 'بانک آینده (مرکز فناوری)',
    date: '۱۴۰۳/۰۸/۲۶',
    totalAmount: 58000000,
    formattedAmount: '۵۸,۰۰۰,۰۰۰ تومان',
    status: 'processing',
    statusLabel: 'در حال تست فنی و بسته‌بندی',
    paymentMethod: 'ضمانت‌نامه بانکی',
    trackingCode: 'TRK-9921445',
    items: [
      {
        productId: 'prod-5',
        productTitle: 'سوئیچ ۲۴ پورت گیگابیتی مدیریتی لایه ۳',
        quantity: 1,
        unitPrice: 58000000,
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'ORD-9844',
    customerName: 'دکتر کریمی',
    companyName: 'مرکز تحقیقات مخابرات ایران',
    date: '۱۴۰۳/۰۸/۲۷',
    totalAmount: 23400000,
    formattedAmount: '۲۳,۴۰۰,۰۰۰ تومان',
    status: 'pending',
    statusLabel: 'در انتظار صدور پیش‌فاکتور رسمی',
    paymentMethod: 'استعلام قیمت رسمی (RFQ)',
    items: [
      {
        productId: 'prod-3',
        productTitle: 'کابل شبکه Cat6 UTP تمام مس نیرا',
        quantity: 3,
        unitPrice: 7800000,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'توسعه زیرساخت مرکز داده و کابل‌کشی فیبر نوری پردیس بانکی',
    client: 'بانک سامان و هلدینگ مالی',
    category: 'مرکز داده و فیبر نوری سازمانی',
    year: '۱۴۰۳',
    isFeatured: true,
    stats: 'بیش از ۴۸۰ کور فیبر نوری OS2 با نرخ اتلاف زیر 0.1dB',
    iconName: 'Server',
    description: 'طراحی، اجرا و تست کامل فیزیکی زیرساخت فیبر نوری پرسرعت برای ارتباط بیش از ۲۰۰۰ سرور فیزیکی و پایگاه داده ریداندانت در دو سایت همجوار.',
    fullStory: 'این پروژه شامل کابل‌کشی بیش از ۱۲ کیلومتر کابل فیبر نوری ۲۴ کور و ۹۶ کور با استاندارد TIA-942 Tier-3 بود که با رک‌های اختصاصی دیتاسنتر نیرا شبکه و مانیتورینگ پیوسته دما و افت نوری در مدت ۴۵ روز عملیاتی شد.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-2',
    title: 'طراحی و پیاده‌سازی شبکه دانشگاهی و فیبر نوری محوطه',
    client: 'دانشگاه جامع تهران',
    category: 'شبکه محوطه (Campus Network)',
    year: '۱۴۰۲',
    stats: 'اتصال ۱۸ دانشکده با کابل‌های خاکی آرمورد GYTA53',
    iconName: 'Building2',
    description: 'ایجاد شبکه ستون‌فقرات پرسرعت ۱۰G بین دانشکده‌ها و دیتاسنتر مرکزی به طول ۱۸ کیلومتر دفن مستقیم و هوایی.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-3',
    title: 'ارتقای امنیت فیزیکی و شبکه نظارت تصویری هوشمند فرودگاهی',
    client: 'سازمان هواپیمایی کشوری',
    category: 'زیرساخت نظارت تصویری و سوییچینگ صنعتی',
    year: '۱۴۰۲',
    stats: 'پوشش ۶۵۰ دوربین مداربسته 4K با کابل‌های SFTP صنعتی',
    iconName: 'Shield',
    description: 'تأمین کابل‌های ضد نویز و سوییچ‌های PoE صنعتی با توانایی تحمل دمای بالا و عملکرد پایدار ۲۴/۷.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-4',
    title: 'پیاده‌سازی شبکه فیبر نوری اختصاصی شهرک صنعتی فناوری',
    client: 'شهرک فناوری پیشرفته',
    category: 'FTTH و شبکه دسترسی نوری',
    year: '۱۴۰۳',
    stats: 'پوشش ۱۲۰ واحد صنعتی با معماری GPON نوین',
    iconName: 'Globe',
    description: 'تحویل پورت فیبر نوری اختصاصی گیگابیتی برای هر سوله صنعتی با باکس‌های FAT و اسپلیترهای PLC.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'رونمایی از کابل‌های نسل جدید ۲۴ کور با روکش ویژه ضد رطوبت و جونده نیرا',
    category: 'fiber',
    categoryLabel: 'فیبر نوری',
    date: '۲۲ آبان ۱۴۰۳',
    readTime: '۴ دقیقه مطالعه',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'نیرا شبکه با همکاری آزمایشگاه‌های استاندارد بین‌المللی، خط تولید کابل‌های فیبر نوری با مقاومت در برابر جوندگان و تغییرات دمایی تا ۸۰ درجه سانتی‌گراد را راه‌اندازی کرد.',
    content: 'کابل‌های سری جدید با بهره‌گیری از پلیمرهای پیشرفته نانو و نوار فولادی ضخیم کرومی تولید شده‌اند که علاوه بر جلوگیری کامل از آسیب جوندگان، در مقابل نفوذ نمک و آب‌های زیرزمینی مقاوم هستند.'
  },
  {
    id: 'news-2',
    title: 'تغییرات استاندارد کابل‌کشی ساخت‌یافته TIA-942 در سال ۲۰۲۴',
    category: 'standards',
    categoryLabel: 'استانداردهای بین‌المللی',
    date: '۱۵ آبان ۱۴۰۳',
    readTime: '۶ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    excerpt: 'بررسی الزامات نوین در تفکیک کابل‌های برق و داده در مسیرهای زیرکفی دیتاسنترها و استفاده از کانکتورهای MPO/MTP.',
    content: 'استاندارد جدید بر مدیریت تراکم کابل در سینی‌ها، کاهش تلفات درج و استفاده از کابل‌های کم‌دود بدون هالوژن (LSZH) تأکید ویژه دارد.'
  },
  {
    id: 'news-3',
    title: 'چگونه بهترین سوئیچ لایه ۳ را برای شبکه سازمان خود انتخاب کنیم؟',
    category: 'active',
    categoryLabel: 'تجهیزات اکتیو',
    date: '۰۸ آبان ۱۴۰۳',
    readTime: '۵ دقیقه مطالعه',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    excerpt: 'راهنمای جامع محاسبه ترافیک شبکه، بافر پورت‌ها، تعداد VLANها و نرخ فورواردینگ بسته‌ها در ثانیه (Mpps).',
    content: 'انتخاب سوئیچ نامناسب می‌تواند به گلوگاه اصلی شبکه تبدیل شود. در این مقاله چک‌لیست ۱۰ مرحله‌ای انتخاب سوییچ اکسس و کور تشریح شده است.'
  }
];

export const CURRENT_USER: UserProfile = {
  name: 'مهندس آریا شایگان',
  role: 'مدیر ارشد زیرساخت و فناوری اطلاعات',
  company: 'شرکت مهندسی زیرساخت داده‌پرداز',
  email: 'a.shaygan@datapardaz.ir',
  phone: '۰۹۱۲-۳۴۵-۶۷۸۹',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
};
