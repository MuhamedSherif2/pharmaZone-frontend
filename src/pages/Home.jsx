import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
    navigate("/login");
  };

  return (
    <section className="min-h-screen p-4 bg-[url(/background.png)] bg-cover bg-center bg-scroll bg-no-repeat flex items-center justify-center">
      <div className="container mx-auto flex items-center justify-center">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>مرحباً بك في PharmaZone</CardTitle>
              <CardDescription>
                نظام إدارة الصيدليات والأدوية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                هذا هو النظام الأساسي لإدارة الصيدليات. يمكنك الآن البدء في استخدام المميزات المختلفة.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>المميزات</CardTitle>
              <CardDescription>
                ما يمكنك فعله في النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• إدارة المخزون</li>
                <li>• إدارة المبيعات</li>
                <li>• تقارير مفصلة</li>
                <li>• إدارة العملاء</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
              <CardDescription>
                نظرة سريعة على الأداء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">إجمالي المنتجات</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المبيعات اليوم</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العملاء</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Home;