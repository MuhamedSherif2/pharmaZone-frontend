import React, { useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import { verifySchema } from "@/lib/validations/auth";
import { toast } from "sonner";

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const inputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const watchCode = form.watch("code");

  // لما الكود يبقى 6 أرقام → نفّذ التحقق تلقائياً (اختياري)
  useEffect(() => {
    if (watchCode && watchCode.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [watchCode]);

  const onSubmit = async (data) => {
    try {
      // هنا حط الـ API call الحقيقي
      // const res = await verifyEmail({ email, code: data.code });

      // مثال مؤقت
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.code === "123456") {
            resolve();
          } else {
            reject(new Error("الكود غير صحيح"));
          }
        }, 1000);
      });

      toast.success("تم التحقق من بريدك الإلكتروني بنجاح!");
      setTimeout(() => navigate("/reset-password"), 1500);
    } catch (error) {
      toast.error(error.message || "فشل التحقق، حاول مرة أخرى");
      form.setError("code", { message: "الكود غير صحيح" });
      inputRef.current?.focus();
    }
  };

  const handleResend = async () => {
    try {
      // await resendVerificationCode(email);
      toast.success("تم إرسال الكود مرة أخرى");
      form.reset();
      inputRef.current?.focus();
    } catch {
      toast.error("فشل إرسال الكود، حاول مرة أخرى");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length > 0) {
      form.setValue("code", pasted, { shouldValidate: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            التحقق من البريد الإلكتروني
          </CardTitle>
          <CardDescription className="text-center">
            أدخل الكود المكون من 6 أرقام المرسل إلى
            <br />
            <span className="font-medium">{email || "بريدك الإلكتروني"}</span>
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">
                      كود التحقق
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="••••••"
                        className="text-center text-2xl tracking-widest font-mono h-14"
                        maxLength={6}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6);
                          field.onChange(value);
                        }}
                        onPaste={handlePaste}
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResend}
                  className="text-sm"
                >
                  إعادة إرسال الكود
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting || watchCode.length !== 6}
              >
                {form.formState.isSubmitting ? "جاري التحقق..." : "التحقق"}
              </Button>

              <div className="text-sm text-center text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Verify;
