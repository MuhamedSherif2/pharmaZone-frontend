import React, { useEffect, useState } from "react";
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
import { signupSchema } from "@/lib/validations/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import MarkerComp from "@/components/map";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { userStore } from "@/store/userStore";

// Constants
const STEPS = {
  BASIC_INFO: 0,
  PHARMACY_INFO: 1,
};

const ROLES = {
  USER: "user",
  PHARMACY: "pharmacy",
};

const DEFAULT_MAP_CENTER = [30.0444, 31.2357];
const DEFAULT_MAP_ZOOM = 12;

function Signup() {
  const [step, setStep] = useState(STEPS.BASIC_INFO);
  const { createUser } = userStore();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      role: ROLES.USER,
      phone: "",
      password: "",
      confirmPassword: "",
      work24h: false,
      startTime: "",
      endTime: "",
      location: {
        lng: null,
        lat: null,
        address: "",
      },
    },
  });

  const { watch, setValue, trigger, handleSubmit, formState, clearErrors } =
    form;
  const { isSubmitting, errors } = formState;

  const role = watch("role");
  const work24h = watch("work24h");
  const isPharmacy = role === ROLES.PHARMACY;

  // Handlers
  const handleRoleChange = (value) => {
    setValue("role", value);

    if (value === ROLES.USER) {
      resetPharmacyFields();
      setStep(STEPS.BASIC_INFO);
    }
  };

  const resetPharmacyFields = () => {
    setValue("work24h", false);
    setValue("startTime", "");
    setValue("endTime", "");
    setValue("location", { lng: null, lat: null, address: "" });
  };

  const handleNextStep = async () => {
    const fieldsToValidate = [
      "name",
      "email",
      "role",
      "phone",
      "password",
      "confirmPassword",
    ];
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      toast.error("برجاء استكمال البيانات الأساسية بشكل صحيح");
      return;
    }

    setStep(STEPS.PHARMACY_INFO);
  };

  const handlePreviousStep = () => {
    setStep(STEPS.BASIC_INFO);
  };

  const handleLocationChange = (position) => {
    setValue("location", {
      lat: position.lat,
      lng: position.lng,
      address: position.address || "موقع غير محدد",
    });
    clearErrors("location");
  };

  const onSubmit = async (data) => {
    const {
      name,
      email,
      phone,
      role,
      password,
      location,
      startTime,
      endTime,
      work24h,
    } = data;
    const workPeriod = work24h ? null : { startTime, endTime };

    const user = {
      name,
      email,
      phone,
      role,
      password,
    };

    const pharmacy = {
      location,
      work24h,
      ...workPeriod,
    };

    const sendData = {
      ...user,
      ...(role === "pharmacy" && pharmacy),
    };

    try {
      await createUser(sendData);
      toast.success("تم إنشاء الحساب بنجاح!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب";

      if (typeof error === "string") {
        if (error.includes("Email already exists")) {
          errorMessage = "البريد الإلكتروني مستخدم بالفعل";
        } else if (error.includes("Network Error")) {
          errorMessage = "فشل الاتصال بالخادم";
        } else {
          errorMessage = error;
        }
      }
      toast.error(errorMessage);
    }
  };

  // Show validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError) {
        toast.error(firstError);
      }
    }
  }, [errors]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            إنشاء حساب جديد
          </CardTitle>
          <CardDescription className="text-center">
            {step === STEPS.BASIC_INFO
              ? "أدخل بياناتك الأساسية"
              : "أكمل بيانات الصيدلية"}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {step === STEPS.BASIC_INFO ? (
                <BasicInfoStep
                  form={form}
                  role={role}
                  onRoleChange={handleRoleChange}
                />
              ) : (
                <PharmacyInfoStep
                  form={form}
                  work24h={work24h}
                  onLocationChange={handleLocationChange}
                />
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <ActionButtons
                isPharmacy={isPharmacy}
                step={step}
                isSubmitting={isSubmitting}
                onNext={handleNextStep}
                onPrevious={handlePreviousStep}
              />

              <div className="text-sm text-center text-muted-foreground">
                لديك حساب بالفعل؟{" "}
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

// Sub-components
function BasicInfoStep({ form, role, onRoleChange }) {
  const { control } = form;

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الاسم الكامل</FormLabel>
            <FormControl>
              <Input type="text" placeholder="أحمد محمد" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>البريد الإلكتروني</FormLabel>
            <FormControl>
              <Input type="email" placeholder="name@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>رقم التليفون</FormLabel>
            <FormControl>
              <Input type="text" placeholder="012345678912" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>نوع الحساب</FormLabel>
            <FormControl>
              <Select
                value={role}
                onValueChange={(value) => {
                  field.onChange(value);
                  onRoleChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر نوع الحساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="pharmacy">صيدلية</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>كلمة المرور</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>تأكيد كلمة المرور</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function PharmacyInfoStep({ form, work24h, onLocationChange }) {
  const { control, setValue } = form;

  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id="work24h"
          checked={work24h}
          onCheckedChange={(checked) => setValue("work24h", checked)}
        />
        <Label htmlFor="work24h" className="cursor-pointer">
          الصيدلية تعمل 24 ساعة
        </Label>
      </div>

      {!work24h && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وقت البداية</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وقت النهاية</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <FormField
        control={control}
        name="location"
        render={() => {
          return (
            <FormItem>
              <FormLabel>موقع الصيدلية على الخريطة</FormLabel>
              <FormControl>
                <MapContainer
                  center={DEFAULT_MAP_CENTER}
                  zoom={DEFAULT_MAP_ZOOM}
                  className="h-64 rounded-lg border"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MarkerComp setPosition={onLocationChange} />
                </MapContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}

function ActionButtons({ isPharmacy, step, isSubmitting, onNext, onPrevious }) {
  const showNextButton = isPharmacy && step === STEPS.BASIC_INFO;
  const showSubmitButton = step === STEPS.PHARMACY_INFO || !isPharmacy;
  const showPreviousButton = step === STEPS.PHARMACY_INFO;

  return (
    <div className="w-full my-4">
      {showNextButton && (
        <Button type="button" className="w-full" onClick={onNext}>
          التالي
        </Button>
      )}

      {showSubmitButton && (
        <div
          className={`grid gap-2 ${
            showPreviousButton ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </Button>

          {showPreviousButton && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onPrevious}
            >
              السابق
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Signup;
