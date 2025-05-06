import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required !",
        invalid_type_error: "Username must be a string !",
      })
      .trim()
      .min(2)
      .max(30),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(30)
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirm_password: z
      .string()
      .min(6)
      .max(30)
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do no match!",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(30)
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6)
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirm_password: z
      .string()
      .min(6)
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords not match!",
    path: ["confirm_password"],
  });
