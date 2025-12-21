import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/category";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pharmacy() {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold">أطلب ادويتك</h1>
      <p className="text-xl mt-4">
        نحن نقدم لك خدمة تسليم الأدوية بسرعة وبسهولة. اطلب الآن
      </p>

      {/* search box */}
      <div className="flex items-center gap-2 mt-10">
        <Input
          type="text"
          placeholder="ابحث عن قسم الادويه التي تحتاجها"
          className="placeholder:text-gray-400"
        />
        <Button>بحث</Button>
      </div>

      {/* categories pharmacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {categories
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md"
              onClick={() => navigate(`/pharmacy/category/${category.slug}`)}
            >
              <div className="h-48 w-full bg-gray-100 relative rounded-t-xl">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <CardContent className="text-center p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
