"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InputTypes, Routes } from "@/constants/enums";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/ password-input";
import { loginSchema } from "@/schemas/auth.schema";
import { LoginType } from "@/types/auth";
import { login } from "@/actions/auth.action";
import { toast } from "sonner";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const loginHandler: SubmitHandler<LoginType> = (data) => {
    setIsLoading(true);
    login(data).then((result) => {
      setIsLoading(false);
      if (!result.success) {
        if(result.redirectTo) {
          router.push(result.redirectTo);
        }
        toast.error(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginHandler)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type={InputTypes.TEXT}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={Routes.FORGET_PASSWORD}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={
              Object.keys(form.formState.errors).length > 0 || isLoading
            }
            className="w-full disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className={"animate-spin"} size={20} />
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={`${Routes.REGISTER}`}
            className="underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
