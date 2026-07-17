import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { findUserById, formatUser } from "@/lib/auth/users";

export async function GET() {
  const session = await getSession();

  if (!session.user) {
    return NextResponse.json({ user: null });
  }

  const user = await findUserById(session.user.id);
  if (!user) {
    session.destroy();
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: formatUser(user) });
}
