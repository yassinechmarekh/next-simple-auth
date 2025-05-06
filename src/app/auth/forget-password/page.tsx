import React from "react";
import ForgetPasswordForm from "./forget-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ForgetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgetPasswordPage;
