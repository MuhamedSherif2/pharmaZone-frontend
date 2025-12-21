import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById } from "@/data/products";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductSlug() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          المنتج غير موجود
        </h2>
        <Button onClick={() => navigate(-1)}>العودة للخلف</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <Button
        variant="ghost"
        className="mb-6 hover:bg-transparent hover:text-primary p-0"
        onClick={() => navigate(-1)}
      >
        &larr; العودة
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-xl overflow-hidden h-[400px] flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <div className="text-2xl font-bold text-primary mb-6">
            {product.price}
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">الوصف:</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.details && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  تفاصيل إضافية:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.details}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              className="flex-1 text-lg py-6"
              onClick={() => console.log(product)}
            >
              أضف إلى السلة
            </Button>
            <Button variant="outline" className="py-6">
              ♡
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
