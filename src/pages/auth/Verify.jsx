import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  FormMessage,
} from "@/components/ui/form";
import { verifySchema } from "@/lib/validations/auth";

function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  // Update form value when code array changes
  useEffect(() => {
    const codeString = code.join("");
    if (codeString.length > 0) {
      form.setValue("code", codeString, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleCodeChange = (index, value) => {
    // Only allow single digit
    if (!/^\d*$/.test(value) || value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      form.setValue("code", pastedData, { shouldValidate: true });
      document.getElementById(`code-5`)?.focus();
    }
  };

  const onSubmit = (data) => {
    // TODO: Add verification logic
    console.log("Verify Code:", data.code);
    setIsVerified(true);
    // navigate("/login");
  };

  const handleResend = () => {
    // TODO: Add resend code logic
    console.log("Resend code to:", email);
    alert("تم إرسال الكود مرة أخرى");
    setCode(["", "", "", "", "", ""]);
    form.reset();
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-success">
              تم التحقق بنجاح
            </CardTitle>
            <CardDescription className="text-center">
              تم التحقق من بريدك الإلكتروني بنجاح
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            التحقق من البريد الإلكتروني
          </CardTitle>
          <CardDescription className="text-center">
            أدخل الكود المرسل إلى {email || "بريدك الإلكتروني"}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center gap-2">
                        {code.map((digit, index) => (
                          <Input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg font-bold"
                            value={digit}
                            onChange={(e) =>
                              handleCodeChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            aria-invalid={!!form.formState.errors.code}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <div className="flex justify-center">
                      <FormMessage />
                    </div>
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
            <CardFooter className="flex flex-col space-y-4 mt-3">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={form.formState.isSubmitting}
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
