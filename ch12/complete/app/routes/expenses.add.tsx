import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createCategory, getCategories } from "~/models/category.server";
import { createExpense } from "~/models/expense.server";
import { requireUserId } from "~/session.server";
import * as Forms from "~/components/Form";
import { Dialog } from "~/components/Dialog";

enum CategoryType {
  Existing = "existing",
  New = "new",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const categories = await getCategories({ userId });
  return json({ categories });
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const item = formData.get("item");
  const valueAsString = formData.get("value");

  if (typeof item !== "string" || item.length <= 0) {
    return json(
      { errors: { title: "Item is required", body: null } },
      { status: 400 },
    );
  }
  if (typeof valueAsString !== "string" || parseFloat(valueAsString) <= 0) {
    return json(
      { errors: { title: "Value is required", body: null } },
      { status: 400 },
    );
  }

  const value = parseFloat(valueAsString);

  let categoryId;
  const categoryType = formData.get("categoryType");

  switch (categoryType) {
    case CategoryType.Existing: {
      categoryId = formData.get("categoryId");

      if (typeof categoryId !== "string" || categoryId.length <= 0) {
        return json(
          { errors: { title: "Category selection is required", body: null } },
          { status: 400 },
        );
      }

      break;
    }

    case CategoryType.New: {
      const categoryName = formData.get("name");
      const categoryColor = formData.get("color");

      if (typeof categoryName !== "string" || categoryName.length <= 0) {
        return json(
          { errors: { title: "Category name is required", body: null } },
          { status: 400 },
        );
      }
      if (typeof categoryColor !== "string" || categoryColor.length !== 7) {
        return json(
          { errors: { title: "Category color is required", body: null } },
          { status: 400 },
        );
      }
      const newCategory = await createCategory({
        name: categoryName,
        color: categoryColor,
        userId,
      });
      categoryId = newCategory.id;
      break;
    }

    default:
      return json(
        { errors: { title: "Category must be selected", body: null } },
        { status: 400 },
      );
  }

  await createExpense({ item, value, userId, categoryId });

  return redirect("/expenses");
}

export const meta: MetaFunction = () => [{ title: "Add new expense" }];

export default function AddExpense() {
  const data = useLoaderData<typeof loader>();
  return (
    <Dialog>
      <Forms.Form method="post">
        <Forms.Title>Add expense</Forms.Title>
        <Forms.Label>
          <Forms.LabelSpan>Description</Forms.LabelSpan>
          <Forms.Input name="item" />
        </Forms.Label>
        <Forms.Label>
          <Forms.LabelSpan>Amount</Forms.LabelSpan>
          <Forms.Input name="value" type="number" />
        </Forms.Label>
        <Forms.Label>
          <Forms.LabelSpan>Category</Forms.LabelSpan>
          <Forms.OptionGroup>
            <Forms.Option
              defaultChecked
              id="cat-exist"
              type="radio"
              name="categoryType"
              value={CategoryType.Existing}
            />
            <Forms.OptionName htmlFor="cat-exist">
              Select existing category
            </Forms.OptionName>
            <Forms.OptionContent>
              <Forms.Select name="categoryId">
                {data.categories.map(({ name, id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Forms.Select>
            </Forms.OptionContent>
          </Forms.OptionGroup>
          <Forms.OptionGroup>
            <Forms.Option
              id="cat-new"
              type="radio"
              name="categoryType"
              value={CategoryType.New}
            />
            <Forms.OptionName htmlFor="cat-new">
              Create new category
            </Forms.OptionName>
            <Forms.OptionContent>
              <Forms.Label>
                <Forms.LabelSpan>Category name</Forms.LabelSpan>
                <Forms.Input name="name" />
              </Forms.Label>
              <Forms.Label>
                <Forms.LabelSpan>Color</Forms.LabelSpan>
                <Forms.Input name="color" type="color" />
              </Forms.Label>
            </Forms.OptionContent>
          </Forms.OptionGroup>
        </Forms.Label>
        <Forms.Buttons>
          <Forms.CancelLink to="..">Cancel</Forms.CancelLink>
          <Forms.Submit>Add</Forms.Submit>
        </Forms.Buttons>
      </Forms.Form>
    </Dialog>
  );
}
