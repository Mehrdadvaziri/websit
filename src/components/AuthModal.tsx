import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CURRENT_USER } from '../data/mockData';
import { User, Lock, Building, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentUser: (user: UserProfile | null) => void;
  onSuccessLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  setCurrentUser,
  onSuccessLogin,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('a.shaygan@datapardaz.ir');
  const [password, setPassword] = useState('••••••••');
  const [companyName, setCompanyName] = useState('شرکت داده‌پرداز');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(CURRENT_USER);
    onClose();
    onSuccessLogin();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      name: 'کاربر سازمانی جدید',
      role: 'مدیر پروژه',
      company: companyName || 'شرکت متقاضی',
      email: email,
      phone: '۰۹۱۲-۰۰۰-۰۰۰۰',
      avatar: CURRENT_USER.avatar
    });
    onClose();
    onSuccessLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden space-y-6 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {tab === 'login' ? 'ورود به پرتال سازمانی نیرا' : 'ثبت‌نام حساب حقوقی و شرکتی'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'login' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            ورود به حساب
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              tab === 'register' ? 'bg-white text-[#0066FF] shadow-xs' : 'text-slate-600'
            }`}
          >
            ثبت‌نام حقوقی (جدید)
          </button>
        </div>

        {/* Form */}
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5 text-right">
              <label className="font-bold text-slate-700">پست الکترونیکی / شناسه کاربری</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="font-bold text-slate-700">کلمه عبور</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:border-blue-400 font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>ورود به پرتال مشتریان</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div className="space-y-1 text-right">
              <label className="font-bold text-slate-700">نام شرکت / سازمان</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
              />
            </div>

            <div className="space-y-1 text-right">
              <label className="font-bold text-slate-700">ایمیل سازمانی</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-mono"
              />
            </div>

            <div className="space-y-1 text-right">
              <label className="font-bold text-slate-700">کلمه عبور</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>ایجاد حساب و شروع همکاری</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
