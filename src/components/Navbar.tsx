import React, { useState } from 'react';
import { 
  NavigationTab, 
  CartItem, 
  UserProfile 
} from '../types';
import { 
  Network, 
  Search, 
  ShoppingCart, 
  User, 
  Bot, 
  LayoutDashboard, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  FileCode2,
  ChevronDown
} from 'lucide-react';
import { NiraLogo } from './NiraLogo';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsAiModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsElementorModalOpen: (open: boolean) => void;
  currentUser: UserProfile | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  cartItems,
  setIsCartOpen,
  setIsAiModalOpen,
  setIsAuthModalOpen,
  setIsElementorModalOpen,
  currentUser,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'خانه' },
    { id: 'products', label: 'محصولات' },
    { id: 'projects', label: 'پروژه‌ها' },
    { id: 'news', label: 'اخبار' },
    { id: 'about', label: 'درباره ما' },
    { id: 'contact', label: 'تماس با ما' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      {/* Top Bar with Standards & Hotline */}
      <div className="bg-[#0b1329] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              سامانه پاسخگویی و استعلام ۲۴ ساعته پروژه‌های شبکه و دیتاسنتر
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">استانداردهای بین‌المللی: TIA-942 • BICSI • ISO 9001</span>
          </div>

          <div className="flex items-center gap-5">
            <button 
              id="btn-nav-elementor-tools"
              onClick={() => setIsElementorModalOpen(true)}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors text-xs font-semibold"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>ابزارهای المنتور و ووکامرس</span>
            </button>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:02188880000" 
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>خط ویژه: ۰۲۱-۸۸۸۸۰۰۰۰</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* RIGHT SIDE: Official Brand Logo & Main Navigation Menu in RTL */}
          <div className="flex items-center gap-4 xl:gap-8 shrink-0">
            
            {/* Logo Button strictly positioned on the RIGHT side with clean N and Fiber Optic Cable */}
            <button 
              id="brand-logo-btn"
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-3 text-right group focus:outline-none shrink-0"
              aria-label="صفحه اصلی نیرا شبکه"
            >
              {/* Clean 'N' and Fiber Optic Cable Emblem without bottom text */}
              <NiraLogo size="md" />
              
              <div className="flex flex-col text-right select-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    نیرا شبکه
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200">
                    N
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider">
                  کابل فیبر نوری و زیرساخت شبکه
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 whitespace-nowrap shrink-0">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => setCurrentTab(link.id)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                      isActive 
                        ? 'text-[#0066FF] bg-blue-50/90 font-bold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* LEFT SIDE: Search, AI Consultant, User Portal & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input Box */}
            <div className="relative hidden md:block w-44 xl:w-56">
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (currentTab !== 'products') setCurrentTab('products');
                }}
                placeholder="جستجوی کابل، ODF، رک..."
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl pr-9 pl-3 py-2.5 border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* AI Assistant Trigger Button */}
            <button
              id="btn-open-ai-consultant"
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              title="مشاور هوشمند طراحی شبکه با هوش مصنوعی"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">مشاور هوش مصنوعی</span>
              <Sparkles className="w-3 h-3 text-cyan-200" />
            </button>

            {/* Admin Dashboard Switch */}
            <button
              id="btn-nav-admin"
              onClick={() => setCurrentTab('admin-dashboard')}
              className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'admin-dashboard'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="پنل مدیریت فروشگاه و کاتالوگ"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              <span className="hidden xl:inline">پنل مدیریت</span>
            </button>

            {/* User Account / Portal Button */}
            <button
              id="btn-nav-user-account"
              onClick={() => {
                if (currentUser) {
                  setCurrentTab('user-portal');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'user-portal'
                  ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="حساب کاربری و پیگیری سفارشات"
            >
              <User className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">
                {currentUser ? 'پرتال کاربری' : 'ورود / عضویت'}
              </span>
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              id="btn-open-cart-drawer"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066FF] transition-all active:scale-95 shadow-xs"
              title="سبد استعلام و پیش‌فاکتور"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی کابل و تجهیزات..."
              className="w-full bg-slate-100 text-xs text-slate-800 placeholder-slate-400 rounded-xl pr-9 pl-3 py-2.5 border border-slate-200"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold text-right transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsElementorModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-amber-600 font-bold flex items-center gap-1"
            >
              <FileCode2 className="w-4 h-4" />
              <span>ابزارهای وردپرس / المنتور</span>
            </button>
            <a href="tel:02188880000" className="text-slate-500 font-mono">
              ۰۲۱-۸۸۸۸۰۰۰۰
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
