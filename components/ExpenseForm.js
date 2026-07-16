/**
 * components/ExpenseForm.js
 * Reusable form for adding or editing an expense.
 */

"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, classes } from "@/lib/theme";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function ExpenseForm({
  initialValues = {},
  onSubmit,
  submitLabel = "Save Expense",
  loading = false,
}) {
  const [formData, setFormData] = useState({
    title: initialValues.title || "",
    amount: initialValues.amount || "",
    category: initialValues.category || "Food",
    date: initialValues.date || "",
    description: initialValues.description || "",
  });

  useEffect(() => {
    if (!initialValues.date) {
      setFormData((prev) => ({
        ...prev,
        date: prev.date || getTodayDate(),
      }));
    }
  }, [initialValues.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className={classes.label}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g. Groceries"
          className={classes.input}
        />
      </div>

      <div>
        <label htmlFor="amount" className={classes.label}>
          Amount ($) *
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
          className={classes.input}
        />
      </div>

      <div>
        <label htmlFor="category" className={classes.label}>
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={classes.input}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className={classes.label}>
          Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={classes.input}
        />
      </div>

      <div>
        <label htmlFor="description" className={classes.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Optional notes about this expense..."
          className={`${classes.input} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={classes.btnPrimaryFull}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
