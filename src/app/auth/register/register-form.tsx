"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputTypes, Routes } from "@/constants/enums";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType } from "@/types/auth";
import { registerSchema } from "@/schemas/auth.schema";
import { PasswordInput } from "@/components/ui/ password-input";
import { register } from "@/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function RegisterForm() {
  const [isLoding, setIsLoding] = useState<boolean>(false);
  const form = useForm<RegisterType>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();
  const onsubmit: SubmitHandler<RegisterType> = async (data) => {
    setIsLoding(true);
    await register(data).then((result) => {
      setIsLoding(false);
      if (result.success) {
        if(result.redirectTo) {
          router.push(result.redirectTo);
        }
        toast.success(result.message);
      } else {
        console.log(result);
        toast.error(result.message);
      }
    });
    form.reset();
  };
  const resgisterInputs: {
    name: keyof RegisterType;
    label: string;
    type: InputTypes;
    placeholder: string;
  }[] = [
    {
      name: "username",
      label: "Username",
      type: InputTypes.TEXT,
      placeholder: "Your username",
    },
    {
      name: "email",
      label: "Email",
      type: InputTypes.TEXT,
      placeholder: "Your email",
    },
    {
      name: "password",
      label: "Password",
      type: InputTypes.PASSWORD,
      placeholder: "Create a password",
    },
    {
      name: "confirm_password",
      label: "Confirm password",
      type: InputTypes.PASSWORD,
      placeholder: "Confirm your password",
    },
  ];
  return (
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
              <div className="space-y-4">
                {resgisterInputs.map((input, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          {input.type === InputTypes.PASSWORD ? (
                            <PasswordInput
                              placeholder={input.placeholder}
                              {...field}
                            />
                          ) : (
                            <Input
                              type={input.type}
                              placeholder={input.placeholder}
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="submit"
                  disabled={
                    Object.keys(form.formState.errors).length > 0 || isLoding
                  }
                  className="w-full disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoding ? <AiOutlineLoading3Quarters className={'animate-spin'} size={20} /> : "Create account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                You already have an account?{" "}
                <Link
                  href={`${Routes.LOGIN}`}
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
  );
}

export default RegisterForm;
