"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { classes } from "@/lib/theme";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/add-expense", label: "Add Expense" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className={classes.navbar}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link
            href={user ? "/" : "/login"}
            className="text-xl font-bold tracking-tight text-white shrink-0"
          >
            Expense Tracker
          </Link>

          {!isAuthPage && user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={isActive ? classes.navLinkActive : classes.navLink}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <span className="hidden md:inline text-sm text-indigo-100 truncate max-w-[160px]">
                {user.name}
              </span>

              <button
                onClick={logout}
                disabled={loading}
                className="px-3 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
