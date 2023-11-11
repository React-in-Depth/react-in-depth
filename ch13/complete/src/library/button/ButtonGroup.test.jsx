import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";

import * as stories from "./ButtonGroup.stories";

const { HorizontalGroup, VerticalGroup } = composeStories(stories);

describe("ButtonGroup", () => {
  test("should have 3 buttons horizontally", async () => {
    // ARRANGE
    const { queryAllByRole } = render(<HorizontalGroup />);

    // ASSERT
    expect(queryAllByRole("button")).toHaveLength(3);
  });

  test("should have 3 buttons vertically", async () => {
    // ARRANGE
    const { queryAllByRole } = render(<VerticalGroup />);

    // ASSERT
    expect(queryAllByRole("button")).toHaveLength(3);
  });
});
