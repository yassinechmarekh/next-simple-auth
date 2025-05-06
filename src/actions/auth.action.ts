"use server";

import { Routes } from "@/constants/enums";
import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schemas/auth.schema";
import { ActionResponse, JosePayload } from "@/types";
import {
  ForgetPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
} from "@/types/auth";
import prisma from "@/utils/db";
import { sendResetPasswordLink, sendVerificationOTP } from "@/utils/mail";
import { decryptOtp, generateOtp, saveOtp } from "@/utils/otp";
import { createSession } from "@/utils/session";
import { generateResetPasswordToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const register = async ({
  username,
  email,
  password,
  confirm_password,
}: RegisterType): Promise<ActionResponse> => {
  try {
    const validation = registerSchema.safeParse({
      username,
      email,
      password,
      confirm_password,
    });
    if (!validation.success) {
      console.log("validation error:", validation);
      console.log("error:", validation.error);
      return { success: false, message: validation.error.errors[0].message };
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return { success: false, message: "This email is already in use." };
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    await verfiyEmail(user.id, user.email);

    return {
      success: true,
      message: "You have registered successfully. Please verify your email.",
      redirectTo: `/auth/verify/${user.id}`,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const login = async (data: LoginType): Promise<ActionResponse> => {
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors[0].message,
    };
  }
  const { email, password } = validation.data;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "Email or password invalid!",
      };
    }
    if (!user.emailVerified) {
      await verfiyEmail(user.id, user.email);
      return {
        success: false,
        message: "We send a email verification. Please check your email.",
        redirectTo: `/auth/verify/${user.id}`,
      };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Email or password invalid!",
      };
    }
    const payload: JosePayload = { id: user.id, isAdmin: user.isAdmin };
    await createSession(payload);
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
  redirect(Routes.DASHBOARD);
};

export async function logout() {
  // deleteSession();
  (await cookies()).delete("session");
  redirect(Routes.ROOT);
}

export const verfiyEmail = async (userId: string, email: string) => {
  const codeOtp = generateOtp();
  try {
    await sendVerificationOTP(email, codeOtp);
    await saveOtp(codeOtp, userId);
  } catch (error) {
    console.log("verifyEmail", error);
  }
};

export async function verifyOtp(
  userId: string,
  otpCode: string
): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (
      !user ||
      !user.otpCode ||
      !user.otpExpiresAt ||
      user.otpExpiresAt < new Date(Date.now())
    ) {
      return false;
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(Date.now()),
      },
    });
    return await decryptOtp(otpCode, user.otpCode);
  } catch (error) {
    console.log("verify otp", error);
    return false;
  }
}

export const forgetPassword = async (
  data: ForgetPasswordType
): Promise<ActionResponse> => {
  try {
    const validation = forgetPasswordSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, message: validation.error.errors[0].message };
    }
    const { email } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        success: false,
        message: `You don't have an account with ${email}.`,
      };
    }

    const token = await generateResetPasswordToken(email);
    await sendResetPasswordLink(email, token);

    return {
      success: true,
      message: "Reset password link sent. Please check your inbox!",
    };
  } catch (error) {
    console.log("forgetPassword : ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const resetPassword = async (
  data: ResetPasswordType,
  token: string
): Promise<ActionResponse> => {
  try {
    const validation = resetPasswordSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.errors[0].message,
      };
    }
    const { password } = validation.data;
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: { token },
    });
    if (!resetPasswordToken) {
      return {
        success: false,
        message: "Token not found !",
      };
    }
    const user = await prisma.user.findUnique({
      where: { email: resetPasswordToken.email },
    });
    if(!user) {
      return {
        success: false,
        message: "User not found !"
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: {id: user.id},
      data: {
        password: hashedPassword
      }
    })
    return {
      success: true,
      message: "Your password has changed succesffully. Plese log in !",
      redirectTo: Routes.LOGIN
    };
  } catch (error) {
    console.log("resetPassword : ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};
