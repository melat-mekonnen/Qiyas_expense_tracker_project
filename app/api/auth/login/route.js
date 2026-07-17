import { NextResponse } from "next/server";
import { authenticateWithPassport } from "@/lib/auth/passport";
import { getSession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await authenticateWithPassport(email, password);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    const session = await getSession();
    session.user = result.user;
    await session.save();

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
