import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VerifyForm from "../verify-form";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";

interface VerifyPageProps {
  params: Promise<{
    userId: string;
  }>;
}

async function VerifyPage({ params }: VerifyPageProps) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return notFound();
  }
  return (
    <div className="container">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full md:w-1/2">
          <Card className={"text-center"}>
            <CardHeader>
              <CardTitle className="text-2xl">OTP Verification</CardTitle>
              <CardDescription>
                We have send the verification code to your email address. Enter
                your OTP code to verify your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerifyForm userId={userId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
