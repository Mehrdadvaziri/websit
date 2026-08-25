import React, { useState } from 'react';
import { 
  UserProfile, 
  Order, 
  NavigationTab 
} from '../types';
import { 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Building, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Printer, 
  Download, 
  Shield, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface UserPortalProps {
  currentUser: UserProfile;
  orders: Order[];
  setCurrentTab: (tab: NavigationTab) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const UserPortal: React.FC<UserPortalProps> = ({
  currentUser,
  orders,
  setCurrentTab,
  setIsCartOpen,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            تأیید شده و آماده ارسال
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            در حال تست فنی و بسته‌بندی
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" />
            در انتظار صدور پیش‌فاکتور
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            تحویل داده شده
          </span>
        );
    }
  };

  return (
    <div className="py-10 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>سامانه مشتریان سازمانی</span>
              <span>/</span>
              <span className="text-[#0066FF] font-bold">داشبورد و سفارشات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              پرتال مدیریت سفارشات و پیش‌فاکتورهای شرکتی
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('products')}
              className="px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ثبت سفارش و استعلام جدید</span>
            </button>
          </div>
        </div>

        {/* Profile & KPI Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* User Profile Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-black text-slate-900">{currentUser.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200">
                    VIP
                  </span>
                </div>
                <p className="text-xs text-slate-500">{currentUser.role}</p>
                <p className="text-xs font-bold text-slate-700">{currentUser.company}</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  ایمیل:
                </span>
                <span className="font-mono text-slate-900 font-bold">{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  تلفن همراه:
                </span>
                <span className="font-mono text-slate-900 font-bold">{currentUser.phone}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  سطح اعتبار حساب:
                </span>
                <span className="font-bold text-emerald-700">تأیید شده (حقوقی)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1">
              <p className="font-bold">خدمات اختصاصی حساب شما:</p>
              <p className="text-[11px] text-slate-600">
                امکان پرداخت اعتباری ۶۰ روزه برای مناقصات، اعزام رایگان کارشناس تست فلوک و تخفیف ویژه پروژه‌ای.
              </p>
            </div>
          </div>

          {/* Quick Metrics (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">کل سفارشات ثبت‌شده</span>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-slate-900 font-mono">{orders.length}</span>
                <span className="text-xs text-slate-400 mr-1.5">مورد سفارش رسمی</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">سفارشات در جریان</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-amber-600 font-mono">
                  {orders.filter(o => o.status === 'processing' || o.status === 'pending').length}
                </span>
                <span className="text-xs text-slate-400 mr-1.5">در حال پیگیری</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">مجموع تراکنش‌ها</span>
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="mt-4">
                <span className="text-xl font-black text-emerald-700 font-mono">۱۹۳,۴۰۰,۰۰۰</span>
                <span className="text-[11px] text-slate-500 block">تومان</span>
              </div>
            </div>
          </div>

        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-6 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">تاریخچه سفارشات و پیش‌فاکتورها</h3>
            <span className="text-xs text-slate-500">به‌روزرسانی لحظه‌ای وضعیت انبار</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="py-3.5 px-6">شماره سفارش</th>
                  <th className="py-3.5 px-4">تاریخ ثبت</th>
                  <th className="py-3.5 px-4">تعداد اقلام</th>
                  <th className="py-3.5 px-4">مبلغ کل</th>
                  <th className="py-3.5 px-4">وضعیت پیگیری</th>
                  <th className="py-3.5 px-6 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} کالا
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900">
                      {order.formattedAmount}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4 px-6 text-left">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0066FF] font-bold text-xs transition-colors"
                      >
                        مشاهده پیش‌فاکتور
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice / RFQ Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0066FF]" />
                  <h3 className="text-base font-black text-slate-900">
                    پیش‌فاکتور رسمی استعلام - شماره {selectedOrder.orderNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Company Info Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block">خریدار / کارفرما:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedOrder.customerName} ({selectedOrder.companyName})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">فروشنده:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">شرکت مهندسی و بازرگانی نیرا شبکه</span>
                </div>
                <div>
                  <span className="text-slate-500 block">تاریخ صدور:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">نحوه پرداخت:</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{selectedOrder.paymentMethod || 'رسمی با ضمانت‌نامه'}</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="py-2.5 px-4">شرح کالا</th>
                      <th className="py-2.5 px-3 text-center">تعداد</th>
                      <th className="py-2.5 px-3">قیمت واحد</th>
                      <th className="py-2.5 px-4 text-left">مجموع (تومان)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-bold text-slate-800">{item.productTitle}</td>
                        <td className="py-3 px-3 text-center font-bold font-mono">{item.quantity}</td>
                        <td className="py-3 px-3 font-mono">{item.unitPrice.toLocaleString('fa-IR')}</td>
                        <td className="py-3 px-4 text-left font-black font-mono">{(item.unitPrice * item.quantity).toLocaleString('fa-IR')}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                    <tr>
                      <td colSpan={3} className="py-3 px-4 text-slate-700">مبلغ کل پیش‌فاکتور:</td>
                      <td className="py-3 px-4 text-left text-sm font-black text-[#0066FF] font-mono">{selectedOrder.formattedAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ فاکتور رسمی</span>
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  بستن
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
