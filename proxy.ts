import { NextRequest, NextResponse } from "next/server";

// Development console: intentionally public. Do not use this configuration in production.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
