import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { productsByCategory } from "@/data/products";

export default function CategorySlug() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const products = productsByCategory[slug] || [];

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

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {getCategoryName(slug)}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow pt-0"
            >
              <div className="h-48 w-full bg-gray-50 relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="grow p-4 text-right">
                <h3
                  className="text-xl font-bold mb-2 hover:underline cursor-pointer"
                  onClick={() => navigate(`/pharmacy/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="text-lg font-bold text-primary">
                  {product.price}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => console.log(product)}>
                  أضف إلى السلة
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-10">
          لا توجد منتجات متاحة في هذا القسم حالياً.
        </div>
      )}
    </div>
  );
}
