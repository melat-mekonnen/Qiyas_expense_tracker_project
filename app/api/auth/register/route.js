import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth/users";
import { getSession } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password });
    const session = await getSession();
    session.user = user;
    await session.save();

    return NextResponse.json({ user });
  } catch (error) {
    if (error.code === "EMAIL_EXISTS") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
