import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { SECURE_ROUTES, LOGIN_ROUTE, AUTH_ROUTES, ROOT } from "@/lib/routes";

const secret = process.env.NEXTAUTH_SECRET as string;
const salt = process.env.NEXTAUTH_SALT as string;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret, salt: salt });

  const { pathname } = req.nextUrl;

  const isAuthenticated = !!token;
  const isSecureRoute = SECURE_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!isAuthenticated && isSecureRoute) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(ROOT, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/settings", "/help", "/apps", "/user", "/login", "/register", "/"],
};
