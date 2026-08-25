import React, { useState } from 'react';
import { NewsArticle, NavigationTab } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  Tag, 
  Share2,
  Check
} from 'lucide-react';

interface NewsSectionProps {
  articles: NewsArticle[];
  setCurrentTab: (tab: NavigationTab) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  setCurrentTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'fiber', label: 'فیبر نوری' },
    { id: 'standards', label: 'استانداردها و TIA' },
    { id: 'active', label: 'تجهیزات اکتیو' }
  ];

  const filtered = articles.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  const featured = articles.find(a => a.isFeatured) || articles[0];

  return (
    <section className="py-16 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              دانشنامه و اخبار تخصصی
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              آخرین رویدادها، استانداردهای کابل‌کشی و مقالات فنی
            </h1>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-[#0066FF] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Hero Article */}
        {featured && selectedCategory === 'all' && (
          <div 
            onClick={() => setReadingArticle(featured)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 right-4 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-lg">
                مقاله ویژه
              </span>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                  {featured.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-[#0066FF]">
                <span>مطالعه کامل مقاله</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-slate-800 shadow-xs">
                    {art.categoryLabel}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs font-bold text-[#0066FF] pt-3">
                <span>ادامه مطلب</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-lg">
                  {readingArticle.categoryLabel}
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>تاریخ انتشار: {readingArticle.date}</span>
                  <span>زمان مطالعه: {readingArticle.readTime}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-snug">{readingArticle.title}</h3>
                
                <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {readingArticle.excerpt}
                </p>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {readingArticle.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">واحد تحقیق و توسعه نیرا شبکه</span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
