import { AuthMenu } from "~/components/Menu";
import { IncomeInput } from "~/components/IncomeInput";
import { Form } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Income" }];

export default function Income() {
  const income = 12000;
  return (
    <AuthMenu current="income">
      <Form method="post">
        <IncomeInput defaultValue={income} />
      </Form>
    </AuthMenu>
  );
}
