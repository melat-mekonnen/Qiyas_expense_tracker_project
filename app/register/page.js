/**
 * app/register/page.js
 */

"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/components/AuthProvider";
import { classes } from "@/lib/theme";

export default function RegisterPage() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async ({ name, email, password }) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setUser(data.user);
      window.location.href = "/";
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.pageNarrow}>
      <div className="mb-8">
        <h1 className={classes.pageTitle}>Create Account</h1>
        <p className={classes.pageSubtitle}>
          Register to start tracking your expenses
        </p>
      </div>

      <div className={`${classes.card} ${classes.cardPadding}`}>
        <AuthForm
          mode="register"
          submitLabel="Create Account"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
