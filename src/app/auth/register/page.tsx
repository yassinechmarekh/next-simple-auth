import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./register-form";

function RegisterPage() {
  return (
    <div className="container">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full md:w-1/2">
          <div className={"flex flex-col gap-6"}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
