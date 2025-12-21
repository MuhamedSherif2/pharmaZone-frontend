import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSpring, animated, config } from "@react-spring/web";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { MapPinIcon, SearchIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Label } from "@/components/ui/label.jsx";
import { categories } from "@/data/category.js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { getAllProducts, productsByCategory } from "@/data/products";

function Home() {
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([10, 120]);
  const [checkRadio, setCheckRadio] = useState(null);
  const [products, setProduct] = useState(getAllProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const egyptianGovernorates = [
    { id: 1, name: "القاهرة" },
    { id: 2, name: "الإسكندرية" },
    { id: 3, name: "الجيزة" },
    { id: 4, name: "القليوبية" },
    { id: 5, name: "الشرقية" },
    { id: 6, name: "الدقهلية" },
    { id: 7, name: "المنوفية" },
    { id: 8, name: "الغربية" },
    { id: 9, name: "كفر الشيخ" },
    { id: 10, name: "البحيرة" },
    { id: 11, name: "الفيوم" },
    { id: 12, name: "بني سويف" },
    { id: 13, name: "المنيا" },
    { id: 14, name: "أسيوط" },
    { id: 15, name: "سوهاج" },
    { id: 16, name: "قنا" },
    { id: 17, name: "الأقصر" },
    { id: 18, name: "أسوان" },
    { id: 19, name: "مطروح" },
    { id: 20, name: "الوادي الجديد" },
    { id: 21, name: "البحر الأحمر" },
    { id: 22, name: "سيناء الشمالية" },
    { id: 23, name: "سيناء الجنوبية" },
  ];

  const slides = [
    {
      id: 1,
      image: "assets/hero-1.jpg",
    },
    {
      id: 2,
      image: "assets/hero-2.jpg",
    },
    {
      id: 3,
      image: "/assets/hero-3.jpg",
    },
    {
      id: 4,
      image: "assets/hero-4.jpg",
    },
    {
      id: 5,
      image: "assets/hero-5.jpg",
    },
  ];

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.slow,
  });

  const descAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.slow,
    delay: 200,
  });

  const buttonsAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.slow,
    delay: 400,
  });

  const handleSendData = () => {
    if (!selectedGovernorate || !searchQuery) return;
    const data = {
      selectedGovernorate,
      searchQuery,
    };
    console.log(data);
  };

  // Helper: parse price string like "15.00 ج" or "15.50 ر.س" to number
  const parsePrice = (priceStr) => {
    if (!priceStr) return NaN;
    const cleaned = String(priceStr)
      .replace(/[^0-9.,]/g, "")
      .replace(/,/g, ".");
    return parseFloat(cleaned);
  };

  // Filter products by category (slug) and priceRange.
  const filterProducts = ({ category, priceRangeArr }) => {
    let list = [];
    if (category) {
      list = productsByCategory[category] ?? [];
    } else {
      list = getAllProducts();
    }

    if (Array.isArray(priceRangeArr) && priceRangeArr.length === 2) {
      const [min, max] = priceRangeArr;
      list = list.filter((p) => {
        const priceNum = parsePrice(p.price);
        if (isNaN(priceNum)) return false;
        return priceNum >= min && priceNum <= max;
      });
    }

    return list;
  };

  // Update products whenever the selected category or price range changes
  React.useEffect(() => {
    const result = filterProducts({
      category: checkRadio,
      priceRangeArr: priceRange,
    });
    setProduct(result);
  }, [checkRadio, priceRange]);

  // Reset to first page whenever the product list changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  return (
    <>
      {/* Image Slider Section with Swiper */}
      <section className="container mx-auto relative mt-16 max-sm:hidden sm:h-105 md:h-150 rounded-xl overflow-hidden bg-linear-to-tr from-white via-blue-50 to-cyan-100">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {slides.slice(0, 3).map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              {/* Image */}
              <img
                src={slide.image}
                alt="Hero Product"
                className="w-full h-full object-fill"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Hero Section */}
      <section className="min-h-auto py-20 bg-linear-to-br from-white via-blue-50 to-cyan-100 flex items-center justify-center overflow-hidden relative my-4 hero">
        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Main Heading */}
          <animated.div style={titleAnimation} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
              PharmaZone
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-2 text-background">
              منصة إدارة الصيدليات الحديثة
            </p>
            <p className="text-lg text-secondary">
              نظام متكامل لإدارة المخزون والمبيعات والعملاء
            </p>
          </animated.div>

          {/* Description */}
          <animated.div style={descAnimation} className="mb-12">
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-secondary">
              اكتشف أفضل حل لإدارة صيدليتك. نوفر لك أدوات قوية وسهلة الاستخدام
              لتحسين عملياتك وزيادة المبيعات
            </p>
          </animated.div>

          {/* CTA Buttons */}
          <animated.div
            style={buttonsAnimation}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Search & Governorate Selection */}
            <Card className="bg-white shadow-lg border-0 py-1">
              <CardContent className="flex flex-col sm:flex-row gap-3 p-4 h-full">
                <div className="flex items-center gap-2 relative h-full">
                  <SearchIcon className="w-5 h-5 text-gray-400 absolute right-3" />
                  <Input
                    type="search"
                    placeholder="ابحث عن الأدوية..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Select
                  value={selectedGovernorate}
                  onValueChange={setSelectedGovernorate}
                >
                  <SelectTrigger className="w-full sm:w-48 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                    <div className="flex items-center gap-px">
                      <MapPinIcon />
                      <SelectValue placeholder="اختر المحافظة" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {egyptianGovernorates.map((gov) => (
                      <SelectItem key={gov.id} value={gov.id.toString()}>
                        {gov.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button type={"submit"} onClick={handleSendData}>
                  بحث
                </Button>
              </CardContent>
            </Card>
          </animated.div>
        </div>
      </section>

      <div
        className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 py-10 px-4"
        dir="rtl"
      >
        {/* filter */}
        <aside className="col-span-1 md:col-span-3 space-y-6 md:sticky md:top-24">
          <h2 className="text-lg font-semibold">التصفية</h2>

          {/* price */}
          <div className="space-y-3">
            <p className="text-sm font-medium">نطاق السعر</p>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              min={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0]} ج</span>
              <span>{priceRange[1]} ج</span>
            </div>
          </div>

          {/* categroy */}
          <div className="space-y-3">
            <p className="text-sm font-medium">التصنيف</p>
            <RadioGroup
              dir={"rtl"}
              value={checkRadio}
              onValueChange={(val) => setCheckRadio(val)}
            >
              {categories.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <RadioGroupItem value={item.slug} id={item.id} />
                  <Label htmlFor={item.id} className="text-sm">
                    {item.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </aside>

        {/* result */}
        <main className="col-span-1 md:col-span-9 space-y-6">
          {/* header */}
          <div className="flex items-start sm:items-center flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">نتائج البحث</h2>
              <p className="text-sm text-muted-foreground">
                عرض النتائج لكلمة "بانادول"
              </p>
            </div>

            <Select defaultValue="relevance">
              <SelectTrigger className="w-full sm:w-45">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">الأكثر صلة</SelectItem>
                <SelectItem value="price">السعر</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* medicines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const totalPages = Math.max(
                1,
                Math.ceil(products.length / pageSize)
              );
              const start = (currentPage - 1) * pageSize;
              const paginatedProducts = products.slice(start, start + pageSize);
              return paginatedProducts.map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <CardHeader className="p-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-44 w-full object-cover"
                    />
                    <Badge
                      className="absolute top-2 left-2"
                      variant={
                        item.status === "متوفر" ? "success" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-2 pt-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.pharmacy}
                    </p>
                    <p className="font-bold">{item.price}</p>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full">عرض</Button>
                  </CardFooter>
                </Card>
              ));
            })()}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(Math.ceil(products.length / pageSize), p + 1)
                )
              }
              disabled={currentPage === Math.ceil(products.length / pageSize)}
            >
              التالي
            </Button>

            {Array.from(
              { length: Math.max(1, Math.ceil(products.length / pageSize)) },
              (_, i) => i + 1
            ).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "secondary" : "ghost"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              السابق
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
