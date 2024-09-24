import { type NextRequest, NextResponse } from "next/server";

const THRESHOLD = 0.8; // initial threshold for the frontier variant (80%)
const COOKIE_NAME = "experiment-cookie-frontier"; // name of the cookie to store the variant

export function middleware(req: NextRequest) {
  // get the variant from the cookie
  // if not found, randomly set a variant based on threshold
  const variant =
    req.cookies.get(COOKIE_NAME) || Math.random() < THRESHOLD
      ? "frontier"
      : "origin";

  const url = req.nextUrl;

  const res = NextResponse.rewrite(url);

  // set the variant in the cookie if not already set
  if (!req.cookies.get(COOKIE_NAME)) {
    res.cookies.set(COOKIE_NAME, variant as string, {
      maxAge: 60 * 60 * 24 * 2,
    }); // 2 days
  }
  return res;
}

export const config = {
  matcher: "/",
};
