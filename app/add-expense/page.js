/**
 * app/add-expense/page.js
 * Add Expense page.
 */

"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { ADD_EXPENSE, GET_DASHBOARD_DATA, GET_EXPENSES } from "@/graphql/client";
import ExpenseForm from "@/components/ExpenseForm";
import Link from "next/link";
import { classes } from "@/lib/theme";

export default function AddExpensePage() {
  const router = useRouter();
  const [addExpense, { loading }] = useMutation(ADD_EXPENSE);

  const handleSubmit = async (formData) => {
    try {
      await addExpense({
        variables: {
          title: formData.title,
          amount: formData.amount,
          category: formData.category,
          date: formData.date,
          description: formData.description || null,
        },
        refetchQueries: [{ query: GET_EXPENSES }, { query: GET_DASHBOARD_DATA }],
      });
      router.push("/expenses");
    } catch (err) {
      alert("Failed to add expense: " + err.message);
    }
  };

  return (
    <div className={classes.pageNarrow}>
      <div className="mb-8">
        <Link href="/expenses" className={classes.linkSmall}>
          ← Back to Expenses
        </Link>
        <h1 className={`${classes.pageTitle} mt-2`}>Add Expense</h1>
        <p className={classes.pageSubtitle}>
          Fill in the details below to add a new expense.
        </p>
      </div>

      <div className={`${classes.card} ${classes.cardPadding}`}>
        <ExpenseForm
          onSubmit={handleSubmit}
          submitLabel="Add Expense"
          loading={loading}
        />
      </div>
    </div>
  );
}
