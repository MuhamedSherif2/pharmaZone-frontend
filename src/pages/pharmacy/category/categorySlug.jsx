import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { productsByCategory } from "@/data/products";

export default function CategorySlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const products = productsByCategory[slug] || [];
  const { addToCart } = useCartStore();

  const getCategoryName = (slug) => {
    switch (slug) {
      case "medicines":
        return "أدوية";
      case "vitamins":
        return "فيتامينات ومكملات";
      case "personal-care":
        return "عناية شخصية";
      case "baby-care":
        return "عناية بالطفل";
      case "medical-equipment":
        return "معدات طبية";
      case "skin-care":
        return "عناية بالبشرة";
      default:
        return "المنتجات";
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`تمت إضافة ${product.name} إلى السلة!`);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 hover:bg-transparent hover:text-primary p-0"
          onClick={() => navigate("/pharmacy")}
        >
          &larr; العودة للمتجر
        </Button>
        <h1 className="text-3xl font-bold mb-2 text-right">
          {getCategoryName(slug)}
        </h1>
        <p className="text-gray-600 text-right">
          {products.length} منتج متوفر
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border"
            >
              <div 
                className="h-48 w-full bg-gray-50 relative overflow-hidden rounded-t-xl cursor-pointer"
                onClick={() => navigate(`/pharmacy/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}%
                  </div>
                )}
              </div>
              <CardContent className="grow p-4 text-right flex flex-col">
                <h3
                  className="text-lg font-bold mb-2 hover:text-primary cursor-pointer line-clamp-2"
                  onClick={() => navigate(`/pharmacy/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xl font-bold text-primary">
                    {product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    أضف إلى السلة
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigate(`/pharmacy/product/${product.id}`)}
                  >
                    المزيد
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            لا توجد منتجات متاحة
          </h2>
          <p className="text-gray-600 mb-8">
            لا توجد منتجات متاحة في هذا القسم حالياً.
          </p>
          <Button onClick={() => navigate("/pharmacy")}>
            العودة للمتجر الرئيسي
          </Button>
        </div>
      )}
    </div>
  );
}