import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { getExpenses } from "~/models/expense.server";
import { requireUserId } from "~/session.server";
import { ExpenseItem, List } from "~/components/Expenses";
import { AuthMenu } from "~/components/Menu";
import * as Forms from "~/components/Form";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const expenses = await getExpenses({ userId });
  return json({ expenses });
}

export const meta: MetaFunction = () => [{ title: "Expenses" }];

export default function ExpensesPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <AuthMenu current="expenses">
      <Forms.Form>
        <Forms.Title>Expenses</Forms.Title>
        <List>
          {data.expenses.map((expense) => (
            <ExpenseItem key={expense.id} {...expense} />
          ))}
        </List>
        <Forms.SubmitLink to="add">Add new expense</Forms.SubmitLink>
      </Forms.Form>
      <Outlet />
    </AuthMenu>
  );
}
