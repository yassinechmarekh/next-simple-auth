import { Resend } from "resend";
// import VerifyEmail from "@/emails/verify-email";
import { Routes } from "@/constants/enums";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationOTP(email: string, codeOtp: string) {
  try {
    const { error } = await resend.emails.send({
      from: process.env.APP_EMAIL as string,
      to: email,
      subject: "Verify your account.",
      // react: VerifyEmail({ codeOtp }),
      html: `<p>The verification code is : ${codeOtp}</p>`,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  } catch (error) {
    console.log("sendVerificationOTP", error);
    throw error;
  }
}

export async function  sendResetPasswordLink(email: string, token: string) {
  const link = `${process.env.DOMAIN}${Routes.RESET_PASSWORD}?token=${token}`;
  const { error } = await resend.emails.send({
    from: process.env.APP_EMAIL as string,
    to: email,
    subject: "Reset password.",
    html: `<a href="${link}">Click here to reset your password</a>`,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

}