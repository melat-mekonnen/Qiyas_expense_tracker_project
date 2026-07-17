/**
 * components/AuthForm.js
 * Reusable form for login and register pages (same pattern as ExpenseForm).
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { classes } from "@/lib/theme";

export default function AuthForm({
  mode = "login",
  onSubmit,
  submitLabel,
  loading = false,
  error = "",
}) {
  const isRegister = mode === "register";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isRegister && (
        <div>
          <label htmlFor="name" className={classes.label}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={classes.input}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className={classes.label}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={classes.input}
        />
      </div>

      <div>
        <label htmlFor="password" className={classes.label}>
          Password *
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          className={classes.input}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className={classes.btnPrimaryFull}>
        {loading ? "Please wait..." : submitLabel}
      </button>

      <p className={`${classes.mutedLight} text-center`}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isRegister ? "/login" : "/register"} className={classes.link}>
          {isRegister ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
