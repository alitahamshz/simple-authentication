// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // ارسال به وب‌سرویس لاگین شما
  const res = await fetch(
    "https://temp2.avalkeshavarz.ir/api/otp/verification",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  console.log({ data });
  if (!res.ok) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }

  // ست‌کردن توکن در کوکی HttpOnly
  const response = NextResponse.json({ success: true });
  response.cookies.set("access_token", data.data.result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 ساعت
    sameSite: "lax",
  });

  return response;
}
