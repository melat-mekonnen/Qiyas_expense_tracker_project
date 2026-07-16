/**
 * lib/theme.js
 * Central design tokens and reusable Tailwind class names.
 */

export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

export const CATEGORY_THEME = {
  Food: { hex: "#f59e0b", badge: "bg-amber-100 text-amber-800" },
  Transport: { hex: "#4f46e5", badge: "bg-indigo-100 text-indigo-800" },
  Shopping: { hex: "#7c3aed", badge: "bg-violet-100 text-violet-800" },
  Bills: { hex: "#dc2626", badge: "bg-red-100 text-red-800" },
  Entertainment: { hex: "#db2777", badge: "bg-pink-100 text-pink-800" },
  Other: { hex: "#64748b", badge: "bg-slate-100 text-slate-700" },
};

export const DEFAULT_CATEGORY_COLOR = CATEGORY_THEME.Other.hex;

export function getCategoryHex(category) {
  return CATEGORY_THEME[category]?.hex ?? DEFAULT_CATEGORY_COLOR;
}

export function getCategoryBadgeClass(category) {
  return CATEGORY_THEME[category]?.badge ?? CATEGORY_THEME.Other.badge;
}

export const classes = {
  body: "min-h-full flex flex-col bg-gray-50 text-gray-900",
  page: "max-w-6xl mx-auto px-4 py-8",
  pageNarrow: "max-w-xl mx-auto px-4 py-8",
  pageTitle: "text-3xl font-bold text-gray-900",
  pageSubtitle: "text-gray-600 mt-1",
  sectionTitle: "text-lg font-semibold text-gray-900",
  card: "bg-white rounded-xl shadow-sm border border-gray-200",
  cardPadding: "p-6",
  divider: "border-gray-200",
  textBody: "text-gray-900",
  textMuted: "text-gray-600",
  textSubtle: "text-gray-500",
  textEmpty: "text-gray-500 text-lg",
  link: "text-indigo-600 hover:text-indigo-700 font-medium transition-colors",
  linkSmall:
    "text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors",
  btnPrimary:
    "inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  btnPrimaryFull:
    "w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  btnSecondary:
    "flex-1 text-center py-2 px-4 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors",
  btnDanger:
    "flex-1 py-2 px-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50",
  input:
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors",
  inputInline:
    "flex-1 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors",
  select:
    "px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors",
  label: "block text-sm font-medium text-gray-700 mb-1.5",
  amount: "font-semibold text-indigo-600",
  amountLarge: "text-xl font-bold text-indigo-600 whitespace-nowrap",
  statValue: "text-2xl font-bold text-gray-900",
  muted: "text-sm text-gray-600",
  mutedLight: "text-sm text-gray-500",
  caption: "text-xs text-gray-500",
  error: "text-center py-16 text-red-600",
  statIcon:
    "w-14 h-14 rounded-full flex items-center justify-center text-2xl border bg-indigo-50 text-indigo-600 border-indigo-200",
  navbar: "bg-indigo-600 text-white shadow-md border-b border-indigo-700",
  navLink:
    "px-3 py-2 rounded-lg text-sm font-medium transition-colors text-indigo-100 hover:bg-indigo-500 hover:text-white",
  navLinkActive: "px-3 py-2 rounded-lg text-sm font-medium bg-indigo-700 text-white",
  spinner:
    "w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin",
  chartTrack: "flex h-8 rounded-full overflow-hidden bg-gray-100",
};
