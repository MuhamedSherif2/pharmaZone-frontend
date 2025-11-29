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

const baseSignupSchema = z.object({
  name: z.string().min(2, "الاسم قصير جدًا"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(8, "كلمة المرور 8 أحرف على الأقل")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "يجب أن تحتوي على حرف صغير وكبير ورقم"
    ),
  phone: z
    .string({ error: "رقم التليفون مطلوب" })
    .regex(/^01[0125][0-9]{8}$/, "رقم الموبايل غير صحيح"),
  confirmPassword: z.string(),
  role: z.enum(["user", "pharmacy"]),
});

const withPasswordMatch = (schema) =>
  schema.refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

const userSchema = withPasswordMatch(
  baseSignupSchema.extend({ role: z.literal("user") })
);

const pharmacySchema = withPasswordMatch(
  baseSignupSchema
    .extend({
      role: z.literal("pharmacy"),
      work24h: z.boolean(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      location: z.object({
        lat: z.number({ required_error: "إحداثيات lat مطلوبة" }).nullable(),
        lng: z.number({ required_error: "إحداثيات lng مطلوبة" }).nullable(),
        address: z.string().optional(),
      }),
    })
    .superRefine((data, ctx) => {
      // check location
      if (!data.location.lng && !data.location.lat) {
        return ctx.addIssue({
          code: "custom",
          message: "اختيار موقع الصيدلية على الخريطة مطلوب",
          path: ["location"],
        });
      }

      // check from work 24 hours or not
      if (data.work24h === false) {
        if (!data.startTime) {
          return ctx.addIssue({
            code: "custom",
            message: "وقت بدء العمل مطلوب",
            path: ["startTime"],
          });
        }
        if (!data.endTime) {
          return ctx.addIssue({
            code: "custom",
            message: "وقت نهاية العمل مطلوب",
            path: ["endTime"],
          });
        }
      }

      // check on end time before start time.
      if (data.startTime && data.endTime) {
        const [sh, sm] = data.startTime.split(":").map(Number);
        const [eh, em] = data.endTime.split(":").map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;

        if (endMinutes <= startMinutes) {
          ctx.addIssue({
            code: "custom",
            message: "وقت الانتهاء لازم يكون بعد وقت البداية",
            path: ["endTime"],
          });
        }
      }
    })
);

export const signupSchema = z.discriminatedUnion("role", [
  userSchema,
  pharmacySchema,
]);

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

// reset password schema

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص واحد على الأقل",
      }),
    confirmPassword: z.string().min(8, {
      message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });
