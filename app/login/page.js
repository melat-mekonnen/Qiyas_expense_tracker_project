/**
 * app/login/page.js
 */

"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/components/AuthProvider";
import { classes } from "@/lib/theme";

function LoginForm() {
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setUser(data.user);
      window.location.href = searchParams.get("from") || "/";
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="login"
      submitLabel="Sign In"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}

export default function LoginPage() {
  return (
    <div className={classes.pageNarrow}>
      <div className="mb-8">
        <h1 className={classes.pageTitle}>Sign In</h1>
        <p className={classes.pageSubtitle}>
          Sign in to access your expense tracker
        </p>
      </div>

      <div className={`${classes.card} ${classes.cardPadding}`}>
        <Suspense fallback={<p className={classes.mutedLight}>Loading...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
