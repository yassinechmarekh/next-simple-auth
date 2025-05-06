import React from "react";
import Logo from "../Logo";
import AuthBtns from "./auth-btns";
import { cookies } from "next/headers";
import prisma from "@/utils/db";
import { User } from "@/generated/prisma";
import { decrypt } from "@/utils/session";
import { JosePayload } from "@/types";

const getUser = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } }) as User;
  return user;
};

async function Header() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie) as JosePayload;
  let user: User | null = null;
  if(session?.id) {
    user = await getUser(session?.id);
  }
  return (
    <div className={'py-4 container'}>
      <div className="flex items-center justify-between">
        <Logo />
        <AuthBtns user={user} />
      </div>
    </div>
  );
}

export default Header;
