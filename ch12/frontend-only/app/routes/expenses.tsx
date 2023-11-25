import { Outlet, Link } from "@remix-run/react";
import { ExpenseItem, List } from "~/components/Expenses";
import { AuthMenu } from "~/components/Menu";
import * as Forms from "~/components/Form";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Expenses" }];

export default function ExpensesPage() {
  const expenses = [
    {
      id: "a",
      item: "Groceries",
      value: 300,
      category: { name: "Food", color: "lightblue" },
    },
    {
      id: "b",
      item: "Shoes",
      value: 460,
      category: { name: "Clothing", color: "pink" },
    },
  ];
  return (
    <AuthMenu current="expenses">
      <Forms.Form>
        <Forms.Title>Expenses</Forms.Title>
        <List>
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} {...expense} />
          ))}
        </List>
        <Forms.SubmitLink to="add">Add new expense</Forms.SubmitLink>
      </Forms.Form>
      <Outlet />
    </AuthMenu>
  );
}
