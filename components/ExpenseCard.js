/**
 * components/ExpenseCard.js
 */

"use client";

import Link from "next/link";
import { classes, getCategoryBadgeClass } from "@/lib/theme";

export default function ExpenseCard({ expense, onDelete, deleting }) {
  return (
    <div className={`${classes.card} p-5 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-lg font-semibold truncate ${classes.textBody}`}>
              {expense.title}
            </h3>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryBadgeClass(expense.category)}`}
            >
              {expense.category}
            </span>
          </div>

          {expense.description && (
            <p className={`text-sm mt-1 line-clamp-2 ${classes.textMuted}`}>
              {expense.description}
            </p>
          )}

          <p className={`${classes.caption} mt-2`}>
            {new Date(expense.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <p className={classes.amountLarge}>${expense.amount.toFixed(2)}</p>
      </div>

      <div className={`flex gap-2 mt-4 pt-4 border-t ${classes.divider}`}>
        <Link href={`/edit/${expense.id}`} className={classes.btnSecondary}>
          Edit
        </Link>
        <button
          onClick={() => onDelete(expense.id)}
          disabled={deleting}
          className={classes.btnDanger}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
