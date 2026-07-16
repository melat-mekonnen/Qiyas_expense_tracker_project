/**
 * app/edit/[id]/page.js
 * Edit Expense page (dynamic route).
 */

"use client";

import { use } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import {
  GET_DASHBOARD_DATA,
  GET_EXPENSE,
  GET_EXPENSES,
  UPDATE_EXPENSE,
} from "@/graphql/client";
import ExpenseForm from "@/components/ExpenseForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { classes } from "@/lib/theme";

export default function EditExpensePage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EXPENSE, {
    variables: { id },
  });

  const [updateExpense, { loading: updating }] = useMutation(UPDATE_EXPENSE);

  if (loading) return <LoadingSpinner message="Loading expense..." />;

  if (error || !data?.expense) {
    return (
      <div className={`${classes.pageNarrow} text-center py-16`}>
        <p className="text-red-600 mb-4">
          {error ? error.message : "Expense not found"}
        </p>
        <Link href="/expenses" className={classes.link}>
          ← Back to Expenses
        </Link>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      await updateExpense({
        variables: {
          id,
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
      alert("Failed to update expense: " + err.message);
    }
  };

  return (
    <div className={classes.pageNarrow}>
      <div className="mb-8">
        <Link href="/expenses" className={classes.linkSmall}>
          ← Back to Expenses
        </Link>
        <h1 className={`${classes.pageTitle} mt-2`}>Edit Expense</h1>
        <p className={classes.pageSubtitle}>
          Update the expense details below.
        </p>
      </div>

      <div className={`${classes.card} ${classes.cardPadding}`}>
        <ExpenseForm
          initialValues={data.expense}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          loading={updating}
        />
      </div>
    </div>
  );
}
