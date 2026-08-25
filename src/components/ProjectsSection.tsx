import React, { useState } from 'react';
import { Project, NavigationTab } from '../types';
import { 
  Building2, 
  Server, 
  Shield, 
  Globe, 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  setCurrentTab: (tab: NavigationTab) => void;
  setIsAiModalOpen: (open: boolean) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  setCurrentTab,
  setIsAiModalOpen
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProject = projects.find(p => p.isFeatured) || projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject.id);

  return (
    <section className="py-16 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              سوابق و پروژه‌های شاخص
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              اعتماد برترین سازمان‌ها و دیتاسنترهای کشور به نیرا شبکه
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              نگاهی به برخی از بزرگترین زیرساخت‌های فیبر نوری، دیتاسنترها و شبکه‌های محوطه‌ای اجرا شده با تجهیزات استاندارد نیرا
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('contact')}
            className="px-5 py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>درخواست استعلام پروژه شما</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Project Banner (Large Showcase matching Image 1/22) */}
        {featuredProject && (
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Text Area (7 cols) */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/30">
                      پروژه ملی و سازمانی شاخص
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      سال {featuredProject.year}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {featuredProject.title}
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                    {featuredProject.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>دستاوردهای کلیدی پروژه:</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">
                      {featuredProject.stats}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <span>مطالعه مستندات فنی و گزارش اجرا</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-slate-400">کارفرما: {featuredProject.client}</span>
                </div>
              </div>

              {/* Image Area (5 cols) */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
              </div>

            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((proj) => {
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 shadow-xs">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>کارفرما: {proj.client}</span>
                      <span>{proj.year}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between text-xs font-bold text-[#0066FF] pt-3">
                  <span>مشاهده جزییات</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-lg">
                  {selectedProject.category}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900">{selectedProject.title}</h3>
                <p className="text-xs text-slate-500">کارفرما: {selectedProject.client} • سال اجرا: {selectedProject.year}</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.fullStory || selectedProject.description}
                </p>

                {selectedProject.stats && (
                  <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200">
                    {selectedProject.stats}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentTab('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0066FF] text-white text-xs font-bold hover:bg-blue-700"
                >
                  استعلام پروژه مشابه
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
