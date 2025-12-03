import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Trash2, ShoppingBag, CreditCard, Package } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [testCount, setTestCount] = useState(1);

  const loadCart = () => {
    try {
      const saved = localStorage.getItem('cart-storage');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCartItems(parsed.state?.cart || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("خطأ في التحميل:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const addTestProduct = () => {
    const testProduct = {
      id: `test-${testCount}`,
      name: `منتج اختبار ${testCount}`,
      price: `${testCount * 10} ج.م`,
      description: "هذا منتج اختبار",
      image: "https://via.placeholder.com/150",
      quantity: 1
    };

    try {
      const saved = localStorage.getItem('cart-storage');
      let currentCart = [];
      
      if (saved) {
        const parsed = JSON.parse(saved);
        currentCart = parsed.state?.cart || [];
      }
      
      currentCart.push(testProduct);
      
      localStorage.setItem('cart-storage', JSON.stringify({
        state: { cart: currentCart },
        version: 0
      }));
      
      setTestCount(prev => prev + 1);
      loadCart();
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error("خطأ في الإضافة:", error);
    }
  };

  const clearCart = () => {
    localStorage.setItem('cart-storage', JSON.stringify({
      state: { cart: [] },
      version: 0
    }));
    setCartItems([]);
    setTestCount(1);
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id) => {
    const saved = localStorage.getItem('cart-storage');
    if (saved) {
      const parsed = JSON.parse(saved);
      let currentCart = parsed.state?.cart || [];
      
      currentCart = currentCart.filter(item => item.id !== id);
      
      localStorage.setItem('cart-storage', JSON.stringify({
        state: { cart: currentCart },
        version: 0
      }));
      
      loadCart();
      window.dispatchEvent(new Event('storage'));
    }
  };

  const increaseQuantity = (id) => {
    const updated = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem('cart-storage', JSON.stringify({
      state: { cart: updated },
      version: 0
    }));
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    
    setCartItems(updated);
    localStorage.setItem('cart-storage', JSON.stringify({
      state: { cart: updated },
      version: 0
    }));
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      const num = parseFloat(price.replace(/[^\d.]/g, '')) || 0;
      return num.toLocaleString('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2
      });
    }
    const num = typeof price === 'number' ? price : 0;
    return num.toLocaleString('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceStr = item.price?.toString() || "0";
      const price = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="bg-white rounded-xl shadow-xl border p-6 w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">سلة المشتريات</h1>
            <p className="text-gray-600">إدارة منتجاتك بسهولة</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={addTestProduct}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Plus className="h-4 w-4" />
            إضافة منتج اختبار
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">المنتجات المضافة</h2>
            <span className="text-sm text-gray-500">{cartItems.length} منتج</span>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">السلة فارغة</h3>
              <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات بعد</p>
              <Button 
                onClick={addTestProduct}
                className="bg-blue-600 hover:bg-blue-700"
              >
                إضافة أول منتج
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cartItems.map((item, index) => (
                <Card 
                  key={item.id || index} 
                  className="hover:shadow-lg transition-all duration-300 border hover:border-blue-300 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="text-blue-600 font-bold text-xl">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors ml-2"
                          title="إزالة المنتج"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image || "https://via.placeholder.com/300x160/4f46e5/ffffff?text=Product"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">الكمية:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-lg"
                                disabled={(item.quantity || 1) <= 1}
                                title="تقليل الكمية"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-bold text-lg w-12 text-center border-x border-gray-300">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors rounded-l-lg"
                                title="زيادة الكمية"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm text-gray-500">الإجمالي:</div>
                            <div className="font-bold text-green-600 text-lg">
                              {formatPrice(
                                (parseFloat(item.price?.toString().replace(/[^\d.]/g, '') || 0) * (item.quantity || 1))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">ملخص الطلب</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">عدد المنتجات:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{totalItems}</span>
                      <span className="text-sm text-gray-500">منتج</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">الإجمالي الفرعي:</span>
                    <span className="font-bold text-lg">{formatPrice(calculateTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">التوصيل:</span>
                    <span className="font-bold text-green-600">مجاني</span>
                  </div>
                  
                  <div className="h-px bg-gray-300 my-4"></div>
                  
                  <div className="flex justify-between items-center text-xl font-bold pt-2">
                    <span className="text-gray-900">الإجمالي النهائي:</span>
                    <span className="text-blue-600">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full py-4 text-lg font-bold bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-3"
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      alert(`تم تأكيد طلبك! المجموع: ${formatPrice(calculateTotal())}`);
                      clearCart();
                    }}
                  >
                    <CreditCard className="h-5 w-5" />
                    تأكيد الطلب
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full py-3 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 gap-3"
                    onClick={clearCart}
                    disabled={cartItems.length === 0}
                  >
                    <Trash2 className="h-5 w-5" />
                    تفريغ السلة بالكامل
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p>توصيل سريع</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p>دفع آمن</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {cartItems.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 text-center">
                      شكراً لاختيارك! يمكنك تعديل الكميات أو إزالة المنتجات
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-3">إحصائيات السلة</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-blue-600">{cartItems.length}</div>
                  <div className="text-sm text-gray-600">منتج مختلف</div>
                </div>
                <div className="text-center p-3 bg-white rounded border">
                  <div className="text-2xl font-bold text-green-600">{totalItems}</div>
                  <div className="text-sm text-gray-600">وحدة إجمالية</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;