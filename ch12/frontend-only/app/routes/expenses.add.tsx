import * as Forms from "~/components/Form";
import { Dialog } from "~/components/Dialog";
import { MetaFunction } from "@remix-run/node";

enum CategoryType {
  Existing = "existing",
  New = "new",
}

export const meta: MetaFunction = () => [{ title: "Add expense" }];

export default function AddExpense() {
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
                <option>Food</option>
                <option>Housing</option>
                <option>Utilities</option>
                <option>Transport</option>
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
