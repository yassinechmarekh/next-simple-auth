import React from "react";
import { LoginForm } from "./login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="container">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full md:w-1/2">
          <div className={"flex flex-col gap-6"}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
