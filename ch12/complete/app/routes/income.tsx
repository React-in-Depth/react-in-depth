import { AuthMenu } from "~/components/Menu";
import { IncomeInput } from "~/components/IncomeInput";
import { requireUserId } from "~/session.server";
import { updateUser } from "~/models/user.server";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useUser } from "~/utils";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const incomeAsString = formData.get("income");

  if (typeof incomeAsString !== "string" || parseFloat(incomeAsString) <= 0) {
    return json(
      { errors: { title: "Income is required", body: null } },
      { status: 400 },
    );
  }

  const income = parseFloat(incomeAsString);

  await updateUser(userId, income);

  return null;
}

export const meta: MetaFunction = () => [{ title: "Update Income" }];

export default function Income() {
  const { income } = useUser();
  return (
    <AuthMenu current="income">
      <Form method="post">
        <IncomeInput defaultValue={income} />
      </Form>
    </AuthMenu>
  );
}
