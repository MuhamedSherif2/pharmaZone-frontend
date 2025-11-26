import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "1",
    displayOrder: 1,
    imageUrl: "https://placehold.co/600x400?text=Medicines",
    name: "أدوية",
    slug: "medicines",
  },
  {
    id: "2",
    displayOrder: 2,
    imageUrl: "https://placehold.co/600x400?text=Vitamins",
    name: "فيتامينات ومكملات",
    slug: "vitamins",
  },
  {
    id: "3",
    displayOrder: 3,
    imageUrl: "https://placehold.co/600x400?text=Personal+Care",
    name: "عناية شخصية",
    slug: "personal-care",
  },
  {
    id: "4",
    displayOrder: 4,
    imageUrl: "https://placehold.co/600x400?text=Baby+Care",
    name: "عناية بالطفل",
    slug: "baby-care",
  },
  {
    id: "5",
    displayOrder: 5,
    imageUrl: "https://placehold.co/600x400?text=Medical+Equipment",
    name: "معدات طبية",
    slug: "medical-equipment",
  },
  {
    id: "6",
    displayOrder: 6,
    imageUrl: "https://placehold.co/600x400?text=Skin+Care",
    name: "عناية بالبشرة",
    slug: "skin-care",
  },
];

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
