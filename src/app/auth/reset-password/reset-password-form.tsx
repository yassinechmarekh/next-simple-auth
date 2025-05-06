"use client";

import { resetPassword } from "@/actions/auth.action";
import { PasswordInput } from "@/components/ui/ password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputTypes } from "@/constants/enums";
import { resetPasswordSchema } from "@/schemas/auth.schema";
import { ResetPasswordType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

interface RestPasswordFromProps {
  token: string;
}

function ResetPasswordForm({ token }: RestPasswordFromProps) {
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onsubmit: SubmitHandler<ResetPasswordType> = (data) => {
    console.log(data);
    setIsLoading(true);
    resetPassword(data, token)
      .then((result) => {
        setIsLoading(false);
        if (result.success) {
          if (result.redirectTo) {
            router.replace(result.redirectTo);
          }
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("resetPassword client :", error);
        toast.error("Something went wrong. Please try again later.");
      });
  };
  const resetPasswordInputs: {
    name: keyof ResetPasswordType;
    label: string;
    type: InputTypes;
    placeholder: string;
  }[] = [
    {
      name: "password",
      label: "New Password",
      type: InputTypes.PASSWORD,
      placeholder: "Create a new password",
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: InputTypes.PASSWORD,
      placeholder: "Confirm your password",
    },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <div className="grid gap-4">
          {resetPasswordInputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id={input.name}
                      placeholder={input.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

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
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
