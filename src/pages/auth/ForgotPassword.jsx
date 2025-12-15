import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { toast } from "sonner";
import { userStore } from "@/store/userStore";

function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPassword: sendForgotPassData } = userStore();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await sendForgotPassData(data);
      toast.success("تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني");
      navigate(`/verify?email=${data.email}`);
    } catch (error) {
      console.error(error);
      let errorMessage = "حدث خطأ أثناء إرسال الرابط";

      if (typeof error === "string") {
        if (error.includes("User not found")) {
          errorMessage = "البريد الإلكتروني غير مسجل";
        } else {
          errorMessage = error;
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            نسيت كلمة المرور
          </CardTitle>
          <CardDescription className="text-center">
            أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mt-3">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "جاري الإرسال..."
                  : "إرسال رابط إعادة التعيين"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                تذكرت كلمة المرور؟{" "}
                <Link to="/login" className="text-primary hover:underline">
                  تسجيل الدخول
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
