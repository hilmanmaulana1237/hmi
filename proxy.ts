import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Hanya set cache untuk GET request
  if (request.method !== "GET") return response;

  // Set Cache-Control: max-age=10800 (3 jam) di browser/local pengguna
  response.headers.set(
    "Cache-Control",
    "public, max-age=10800, stale-while-revalidate=59"
  );

  return response;
}

export const config = {
  // Hanya berlaku pada halaman public (kecuali api, admin, dan asset internal Next.js)
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico).*)",
  ],
};
