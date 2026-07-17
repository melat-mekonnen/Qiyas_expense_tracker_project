import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findUserByEmail, formatUser } from "@/lib/auth/users";

let configured = false;

export function configurePassport() {
  if (configured) return;

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }

          return done(null, formatUser(user));
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  configured = true;
}

export function authenticateWithPassport(email, password) {
  configurePassport();

  return new Promise((resolve, reject) => {
    const req = { body: { email, password } };
    const res = {
      setHeader() {},
      end() {},
    };

    passport.authenticate("local", (error, user, info) => {
      if (error) {
        reject(error);
        return;
      }

      if (!user) {
        resolve({
          error: info?.message || "Invalid email or password",
        });
        return;
      }

      resolve({ user });
    })(req, res);
  });
}
