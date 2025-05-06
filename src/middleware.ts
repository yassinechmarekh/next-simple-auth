import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./utils/session";
import { Routes } from "./constants/enums";

const protectedRoutes = [Routes.DASHBOARD] as string[];
const authRoutes = [
  Routes.LOGIN,
  Routes.REGISTER,
  Routes.FORGET_PASSWORD,
  Routes.RESET_PASSWORD,
] as string[];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL(Routes.LOGIN, req.nextUrl));
  }

  if (isAuthRoute && session?.id) {
    return NextResponse.redirect(new URL(Routes.ROOT, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
