
import bcrypt from "bcryptjs";
import prisma from "./db";

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function encryptOtp(otp: string) {
  try {
    return await bcrypt.hash(otp, 10);
  } catch (error) {
    console.log("encryptOtp:", error);
  }
}

export async function decryptOtp(
  otp: string,
  hashedOtp: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(otp, hashedOtp);
  } catch (error) {
    console.log("decrypt otp:", error);
    return false;
  }
}

export async function saveOtp(otpCode: string, userId: string) {
  try {
    const hashedOtp = await encryptOtp(otpCode);
    await prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: hashedOtp,
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
  } catch (error) {
    console.log("save otp:", error);
  }
}

// export async function verifyOtp(
//   userId: string,
//   otpCode: string
// ): Promise<boolean> {
//   try {
//     const user = await prisma.user.findFirst({ where: { id: userId } });
//     if (
//       !user ||
//       !user.otpCode ||
//       !user.otpExpiresAt ||
//       user.otpExpiresAt < new Date(Date.now())
//     ) {
//       return false;
//     }
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         emailVerified: new Date(Date.now()),
//       },
//     });
//     return await decryptOtp(otpCode, user.otpCode);
//   } catch (error) {
//     console.log("verify otp", error);
//     return false;
//   }
// }
