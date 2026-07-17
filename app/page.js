/**
 * app/page.js
 * Dashboard page (home route "/").
 */

"use client";

import { useQuery } from "@apollo/client/react";
import { GET_DASHBOARD_DATA } from "@/graphql/client";
import DashboardCard from "@/components/DashboardCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { classes, getCategoryHex } from "@/lib/theme";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA, {
    skip: authLoading || !user,
    fetchPolicy: "network-only",
  });

  if (authLoading || loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (!user) {
    return (
      <div className={classes.error}>
        Please sign in to view your dashboard.
      </div>
    );
  }
  if (error)
    return (
      <div className={classes.error}>
        Error loading dashboard: {error.message}
      </div>
    );

  const expenses = data?.expenses || [];
  const totalExpense = data?.totalExpense || 0;
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className={classes.page}>
      <h1 className={`${classes.pageTitle} mb-8`}>Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Expenses"
          value={`$${totalExpense.toFixed(2)}`}
          icon="💰"
        />
        <DashboardCard
          title="Number of Expenses"
          value={expenses.length}
          icon="📋"
        />
        <DashboardCard
          title="Categories Used"
          value={Object.keys(categoryTotals).length}
          icon="🏷️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`${classes.card} ${classes.cardPadding}`}>
          <h2 className={`${classes.sectionTitle} mb-4`}>
            Expenses by Category
          </h2>

          {Object.keys(categoryTotals).length === 0 ? (
            <div className={`flex items-center justify-center h-48 ${classes.textSubtle}`}>
              No expenses to display
            </div>
          ) : (
            <div className="space-y-4">
              <div className={classes.chartTrack}>
                {Object.entries(categoryTotals).map(([category, amount]) => {
                  const percentage = (amount / totalExpense) * 100;
                  return (
                    <div
                      key={category}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getCategoryHex(category),
                      }}
                      title={`${category}: ${percentage.toFixed(1)}%`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <div key={category} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: getCategoryHex(category) }}
                    />
                    <span className={`${classes.textMuted} truncate`}>{category}</span>
                    <span className={`${classes.textBody} font-medium ml-auto`}>
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <p className={`${classes.caption} text-center mt-2`}>
                Category breakdown by amount
              </p>
            </div>
          )}
        </div>

        <div className={`${classes.card} ${classes.cardPadding}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={classes.sectionTitle}>Recent Expenses</h2>
            <Link href="/expenses" className={classes.linkSmall}>
              View All →
            </Link>
          </div>

          {recentExpenses.length === 0 ? (
            <p className={`${classes.textSubtle} text-center py-8`}>No expenses yet</p>
          ) : (
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className={`flex items-center justify-between py-3 border-b ${classes.divider} last:border-0`}
                >
                  <div>
                    <p className={`font-medium ${classes.textBody}`}>{expense.title}</p>
                    <p className={classes.caption}>
                      {expense.category} · {expense.date}
                    </p>
                  </div>
                  <p className={classes.amount}>
                    ${expense.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
