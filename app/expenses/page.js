/**
 * app/expenses/page.js
 * Expenses list page.
 */

"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_EXPENSES, DELETE_EXPENSE } from "@/graphql/client";
import ExpenseCard from "@/components/ExpenseCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CATEGORIES, classes } from "@/lib/theme";
import Link from "next/link";

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_EXPENSES);
  const [deleteExpense] = useMutation(DELETE_EXPENSE);

  if (loading) return <LoadingSpinner message="Loading expenses..." />;
  if (error)
    return <div className={classes.error}>Error: {error.message}</div>;

  const expenses = data?.expenses || [];

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      exp.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    setDeletingId(id);
    try {
      await deleteExpense({ variables: { id } });
      refetch();
    } catch (err) {
      alert("Failed to delete: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={classes.page}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className={classes.pageTitle}>All Expenses</h1>
        <Link href="/add-expense" className={classes.btnPrimary}>
          + Add Expense
        </Link>
      </div>

      <div
        className={`${classes.card} p-4 mb-6 flex flex-col sm:flex-row gap-4`}
      >
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.inputInline}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={classes.select}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <p className={`${classes.mutedLight} mb-4`}>
        Showing {filteredExpenses.length} of {expenses.length} expenses
      </p>

      {filteredExpenses.length === 0 ? (
        <div className={`text-center py-16 ${classes.card}`}>
          <p className={classes.textEmpty}>No expenses found</p>
          <Link href="/add-expense" className={`inline-block mt-4 ${classes.link}`}>
            Add your first expense →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={handleDelete}
              deleting={deletingId === expense.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
