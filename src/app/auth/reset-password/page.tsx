import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "./reset-password-form";
import { notFound } from "next/navigation";
import prisma from "@/utils/db";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;
  const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
    where: { token },
  });
  if (!token || !resetPasswordToken || resetPasswordToken.expiresAt < new Date(Date.now())) {
    return notFound();
  }
  return (
    <div className="container">
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your new password to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
