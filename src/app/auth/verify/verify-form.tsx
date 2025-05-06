"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { verifyOtp } from "@/utils/otp";
import { toast } from "sonner";
import { Routes } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/actions/auth.action";

interface VerifyFormProps {
  userId: string;
}

function VerifyForm({ userId }: VerifyFormProps) {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("OTP entered:", otp);
    await verifyOtp(userId, otp).then((isVerify) => {
      if (isVerify) {
        router.replace(Routes.LOGIN);
        toast.success("Your account is verified", {
          description: "Please login to your account !",
        });
      } else {
        toast.error("Invalid Code !", {
          description: "Please enter the valid OTP!",
        });
      }
    });
    setLoading(false);
  };
  return (
    <form
      className={"flex flex-col items-center space-y-6"}
      onSubmit={handleSubmit}
    >
      <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        variant={"default"}
        type="submit"
        disabled={loading}
        className={"w-full disabled:opacity-50 disabled:pointer-events-none"}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className={"animate-spin"} size={20} />
        ) : (
          "Confirm"
        )}
      </Button>
    </form>
  );
}

export default VerifyForm;
