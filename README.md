# Expense Tracker — GraphQL

A modern **Expense Tracker** web application built with **Next.js** and **GraphQL** for a university assignment (Project 2).

Track your daily expenses, view dashboard statistics, and manage records — all powered by GraphQL instead of REST.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** (App Router) | React framework & routing |
| **JavaScript** | Programming language |
| **Apollo Client** | Frontend GraphQL client |
| **GraphQL Yoga** | GraphQL server (API route) |
| **GraphQL** | API query language |
| **Tailwind CSS** | Styling |


---

## Folder Structure

```
expense-tracker-graphql/
├── app/
│   ├── layout.js              # Root layout with Navbar & Apollo Provider
│   ├── page.js                # Dashboard (/)
│   ├── globals.css            # Global styles + Tailwind
│   ├── api/
│   │   └── graphql/
│   │       └── route.js       # GraphQL API endpoint
│   ├── expenses/
│   │   └── page.js            # All expenses list
│   ├── add-expense/
│   │   └── page.js            # Add new expense form
│   └── edit/
│       └── [id]/
│           └── page.js        # Edit expense by ID
├── components/
│   ├── Navbar.js              # Navigation bar
│   ├── ExpenseCard.js         # Single expense card
│   ├── ExpenseForm.js         # Reusable add/edit form
│   ├── DashboardCard.js       # Dashboard stat card
│   ├── LoadingSpinner.js      # Loading indicator
│   └── Providers.js           # Apollo Provider wrapper
├── graphql/
│   ├── typeDefs.js            # GraphQL schema definitions
│   ├── resolvers.js           # Query & mutation resolvers
│   ├── schema.js              # Combined schema
│   └── client.js              # Apollo Client + queries/mutations
├── lib/
│   └── store.js               # In-memory expense array
├── styles/
│   └── custom.css             # Additional custom styles
├── public/
├── package.json
└── README.md
```

---

## Installation Steps

### 1. Clone or navigate to the project

```bash
cd expense-tracker-graphql
```

### 2. Install dependencies

```bash
npm install
```

This installs:
- `next`, `react`, `react-dom`
- `@apollo/client`, `graphql`
- `graphql-yoga`, `@graphql-tools/schema`
- `tailwindcss`

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Other npm commands

```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Dashboard — total, count, pie chart placeholder, recent expenses |
| `/expenses` | All expenses with search, filter, edit, delete |
| `/add-expense` | Form to create a new expense |
| `/edit/[id]` | Form to update an existing expense |

---

## Expense Model

```javascript
{
  id: "1",
  title: "Groceries",
  amount: 85.50,
  category: "Food",
  date: "2026-07-01",
  description: "Weekly grocery shopping"
}
```

**Categories:** Food, Transport, Shopping, Bills, Entertainment, Other

---

## GraphQL API

**Endpoint:** `http://localhost:3000/api/graphql`

You can test queries in the browser at that URL (GraphQL Yoga provides GraphiQL).

### Sample Queries

```graphql
# Get all expenses
query {
  expenses {
    id
    title
    amount
    category
    date
    description
  }
}

# Get one expense by ID
query {
  expense(id: "1") {
    id
    title
    amount
    category
    date
    description
  }
}

# Get total expense amount
query {
  totalExpense
}

# Get expenses by category
query {
  expensesByCategory(category: "Food") {
    id
    title
    amount
  }
}
```

### Sample Mutations

```graphql
# Create a new expense
mutation {
  addExpense(
    title: "Coffee"
    amount: 4.50
    category: "Food"
    date: "2026-07-08"
    description: "Morning coffee"
  ) {
    id
    title
    amount
  }
}

# Update an expense
mutation {
  updateExpense(
    id: "1"
    title: "Updated Groceries"
    amount: 90.00
  ) {
    id
    title
    amount
  }
}

# Delete an expense
mutation {
  deleteExpense(id: "1")
}
```

---

## How It Works

1. **Frontend** — React pages use Apollo Client hooks (`useQuery`, `useMutation`) to fetch and modify data.
2. **API Route** — `/api/graphql` runs GraphQL Yoga, which processes queries and mutations.
3. **Resolvers** — Functions in `graphql/resolvers.js` read/write the in-memory array in `lib/store.js`.


---

## Features

- Dashboard with total expenses, count, and category breakdown
- Full CRUD (Create, Read, Update, Delete) via GraphQL mutations
- Search expenses by title or description
- Filter expenses by category
- Responsive card-based UI
- Loading spinners and error handling
- Beginner-friendly code with comments in every file


---

## Author

University Assignment — Project 2: Expense Tracker with GraphQL
