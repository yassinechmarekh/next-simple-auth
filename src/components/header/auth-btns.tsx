"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Routes } from "@/constants/enums";
import { User } from "@/generated/prisma";
import { logout } from "@/actions/auth.action";

function AuthBtns({ user }: { user: User | null }) {
  return (
    <>
      {user ? (
        <form action={logout} className={"flex items-center gap-4"}>
          <span>{user.username}</span>
          <Button variant={"outline"} type="submit">Logout</Button>
        </form>
      ) : (
        <div className={"flex items-center gap-4"}>
          <Button variant={"outline"} asChild>
            <Link href={`${Routes.REGISTER}`}>Register</Link>
          </Button>
          <Button variant={"default"} asChild>
            <Link href={`${Routes.LOGIN}`}>Login</Link>
          </Button>
        </div>
      )}
    </>
  );
}

export default AuthBtns;
