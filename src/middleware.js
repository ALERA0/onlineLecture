"use server";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "./utils/auth";
import { cookies } from "next/headers";
import { getCookies } from "cookies-next";
import createIntlMiddleware from "next-intl/middleware";

const AUTH_PAGES = ["/tr/auth", "/en/auth", "/admin/login"];
const PROTECTED_PAGES = ["/admin"];
const PROTECTED_PAGES_USER = ["/schools"];

const isAuthPages = (url) => AUTH_PAGES.some((page) => page == url);
const isProtectedPages = (url) =>
  PROTECTED_PAGES.some((page) => url.startsWith(page));
const isProtectedPagesUser = (url) =>
  PROTECTED_PAGES_USER.some((page) => url.startsWith(page));

const locales = ["tr", "en"];

const nextIntlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "tr",
  localeDetection: false,
});

export async function middleware(request) {
  const { nextUrl, headers } = request;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = headers.get("host");

  try {

    // Intl middleware
    const intlResult = await nextIntlMiddleware(request);
    if (intlResult instanceof Response) {
      return intlResult;
    }

    // Authentication checks
    const token = getCookies({ request }).token;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);
    const role = hasVerifiedToken && hasVerifiedToken.payload.roles;

    if (isAuthPageRequested && hasVerifiedToken) {
      return NextResponse.redirect(`${protocol}://${host}`);
    }

    if (!hasVerifiedToken) {
      if (!isAuthPageRequested) {
        const response = NextResponse.redirect(`${protocol}://${host}/tr/auth`);
        response.cookies.delete("token");
        return response;
      }
      return NextResponse.next();
    }

    if (role !== "ADMIN" && isProtectedPages(nextUrl.pathname)) {
      return NextResponse.redirect(`${protocol}://${host}`);
    }

    if (role !== "USER" && isProtectedPagesUser(nextUrl.pathname)) {
      return NextResponse.redirect(`${protocol}://${host}`);
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    "/tr/auth",
    "/en/auth",
    "/",
    "/en",
    "/tr",
    "/admin/:path*",
    "/schools/:path*",
    "/profile",
    "/classDetail/:path*",
    "/(tr|en)/:path*",
    "/((?!api|_next|.*\\..*).*)",
  ],
};
