/**
 * components/Navbar.js
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classes } from "@/lib/theme";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/add-expense", label: "Add Expense" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={classes.navbar}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Expense Tracker
          </Link>

          <div className="flex gap-1 sm:gap-2">
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
        </div>
      </div>
    </nav>
  );
}
