import React, { useState } from 'react';
import { 
  CartItem, 
  NavigationTab, 
  Order 
} from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  FileText, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  setCurrentTab: (tab: NavigationTab) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  setCurrentTab,
}) => {
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);
  const [orderCompany, setOrderCompany] = useState('');
  const [orderPhone, setOrderPhone] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const vat = Math.round(subtotal * 0.10); // 10% VAT
  const grandTotal = subtotal + vat;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderCompany ? `نماینده ${orderCompany}` : 'مشتری سازمانی',
      companyName: orderCompany || 'شرکت متقاضی زیرساخت',
      date: 'امروز',
      totalAmount: grandTotal,
      formattedAmount: `${grandTotal.toLocaleString('fa-IR')} تومان`,
      status: 'pending',
      statusLabel: 'در انتظار صدور پیش‌فاکتور رسمی',
      paymentMethod: 'استعلام قیمت رسمی (RFQ)',
      items: cartItems.map(item => ({
        productId: item.product.id,
        productTitle: item.product.title,
        quantity: item.quantity,
        unitPrice: item.product.price,
        image: item.product.image
      }))
    };

    onPlaceOrder(newOrder);
    setIsSuccessOrder(true);
    setTimeout(() => {
      setIsSuccessOrder(false);
      onClearCart();
      onClose();
      setCurrentTab('user-portal');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Top Bar */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-base font-black text-slate-900">سبد استعلام و پیش‌فاکتور</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0066FF]">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} کالا
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {isSuccessOrder ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">پیش‌فاکتور شما با موفقیت صادر شد!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  در حال انتقال به پرتال مشتریان برای مشاهده و چاپ پیش‌فاکتور رسمی...
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-slate-700">سبد استعلام شما خالی است</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  محصولات و تجهیزات مورد نیاز پروژه خود را از کاتالوگ یا با راهنمایی مشاور هوش مصنوعی انتخاب نمایید.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentTab('products');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold shadow-xs hover:bg-blue-700"
                >
                  مشاهده کاتالوگ تجهیزات
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center gap-3 space-y-1 shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] text-blue-600 font-bold block">{item.product.categoryLabel}</span>
                    <h4 className="text-xs font-bold text-slate-900 truncate" title={item.product.title}>
                      {item.product.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-800 font-mono">
                      {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="حذف از سبد"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && !isSuccessOrder && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>جمع اقلام:</span>
                  <span className="font-mono font-bold text-slate-900">{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>مالیات بر ارزش افزوده (۱۰٪ رسمی):</span>
                  <span className="font-mono text-slate-700">{vat.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>مبلغ کل برآورد:</span>
                  <span className="text-[#0066FF] font-mono text-base">{grandTotal.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              {/* Quick RFQ Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="نام شرکت / سازمان (اختیاری)"
                  value={orderCompany}
                  onChange={(e) => setOrderCompany(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-400"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>ثبت نهایی و صدور پیش‌فاکتور رسمی (RFQ)</span>
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمانت اصالت فیزیکی و تست فلوک کارخانه‌ای نیرا</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
