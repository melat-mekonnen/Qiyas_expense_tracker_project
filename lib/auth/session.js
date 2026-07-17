import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const secret =
  process.env.SESSION_SECRET ||
  "development-session-secret-change-in-production-min-32-chars";

export const sessionOptions = {
  password: secret,
  cookieName: "expense_tracker_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export async function getSession() {
  return getIronSession(await cookies(), sessionOptions);
}
