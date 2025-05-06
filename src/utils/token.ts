"use server";

import { randomUUID } from "crypto";
import prisma from "./db";

export const generateResetPasswordToken = async (email: string) => {
  const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
    where: { email },
  });

  if (resetPasswordToken) {
    await prisma.resetPasswordToken.delete({ where: { id: resetPasswordToken.id } });
  }

  const newResetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
        email,
        token: randomUUID(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
    }
  });

  return newResetPasswordToken.token;
};
