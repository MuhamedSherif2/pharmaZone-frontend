import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

// Signup Schema
export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "الاسم مطلوب")
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .regex(
        /^[\u0600-\u06FFa-zA-Z\s]+$/,
        "الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط"
      ),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صحيح"),
    role: z.enum(["user", "pharmacy"], {
      required_error: "الدور مطلوب",
    }),
    password: z
      .string()
      .min(1, "كلمة المرور مطلوبة")
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "كلمة المرور يجب أن تحتوي على حرف صغير وحرف كبير ورقم على الأقل"
      ),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

// Verify Schema
export const verifySchema = z.object({
  code: z
    .string()
    .min(6, "الكود يجب أن يكون 6 أرقام")
    .max(6, "الكود يجب أن يكون 6 أرقام")
    .regex(/^\d+$/, "الكود يجب أن يحتوي على أرقام فقط"),
});
