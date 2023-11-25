import { AuthMenu } from "~/components/Menu";
import { requireUserId } from "~/session.server";
import { updateUser } from "~/models/user.server";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useUser } from "~/utils";

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

export default function Income() {
  const user = useUser();
  return (
    <AuthMenu current="income">
      <h1>Income</h1>
      <pre
        style={{
          maxWidth: "90vw",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {JSON.stringify(user)}
      </pre>
    </AuthMenu>
  );
}
