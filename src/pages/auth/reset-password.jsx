import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resetPasswordService } from "@/services/auth";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "@/lib/validations/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    if (!email) {
      toast.error("بيانات غير مكتملة، يرجى إعادة طلب تغيير كلمة المرور");
      return;
    }

    try {
      await resetPasswordService({
        email,
        otp: code, // Include code if API requires it, or token if provided in state
        password: values.password,
      });

      toast.success("تم تغيير كلمة المرور بنجاح");
      navigate("/login");
    } catch (error) {
      console.error(error);
      let errorMessage = "حدث خطأ أثناء تغيير كلمة المرور";
      if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(errorMessage);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">إعادة تعيين كلمة المرور</CardTitle>
          <CardDescription className="text-center">
            أدخل كلمة المرور الجديدة أدناه.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور الجديدة</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                إعادة تعيين كلمة المرور
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
