"use client";

import { forgetPassword } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPasswordSchema } from "@/schemas/auth.schema";
import { ForgetPasswordType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

function ForgetPasswordForm() {
    const form = useForm<ForgetPasswordType>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        }
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const onsubmit: SubmitHandler<ForgetPasswordType> = (data) => {
        setLoading(true);
        forgetPassword(data).then((result) => {
          setLoading(false);
          if(result.success) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        }).catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("Something went wrong. Please try again later.")
        })
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <div className="grid gap-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full disabled:opacity-50 disabled:pointer-events-none">
            
            {isLoading ? (
              <AiOutlineLoading3Quarters className={"animate-spin"} size={20} />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ForgetPasswordForm;
