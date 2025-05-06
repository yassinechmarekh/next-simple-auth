import { z } from "zod";
import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schemas/auth.schema";

export type RegisterType = z.infer<typeof registerSchema>;

export type LoginType = z.infer<typeof loginSchema>;

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;