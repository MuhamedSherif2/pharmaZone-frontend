import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add logout logic
    console.log("Logout");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">الصفحة الرئيسية</h1>
          <Button variant="outline" onClick={handleLogout}>
            تسجيل الخروج
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
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

          <Card>
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

          <Card>
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
    </div>
  );
}

export default Home;

