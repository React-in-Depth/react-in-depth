import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";

import * as stories from "./Button.stories";

const { Default, Outline, Ghost, WithIcon, WithStartIcon, Disabled } =
  composeStories(stories);

describe("Button", () => {
  test("should be clickable", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Default onClick={mockOnClick} />);

    // ACT
    const user = userEvent.setup();
    await user.click(getByRole("button", { name: "Regular button" }));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should be clickable as outline", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Outline onClick={mockOnClick} />);

    // ACT
    const user = userEvent.setup();
    await user.click(getByRole("button", { name: "Fancy outline" }));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should be clickable as ghost", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Ghost onClick={mockOnClick} />);

    // ACT
    const user = userEvent.setup();
    await user.click(getByRole("button", { name: "Ghost-like!" }));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should be clickable with end icon", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(<WithIcon onClick={mockOnClick} />);

    // ACT
    const user = userEvent.setup();
    await user.click(getByRole("button", { name: "Send" }));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should be clickable with start icon", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(
      <WithStartIcon onClick={mockOnClick} />
    );

    // ACT
    const user = userEvent.setup();
    await user.click(getByRole("button", { name: "Profile" }));

    // ASSERT
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should not be clickable if disabled", async () => {
    // ARRANGE
    const mockOnClick = vi.fn();
    const { getByRole } = render(<Disabled onClick={mockOnClick} />);

    // ACT
    const user = userEvent.setup();
    const disabledButton = getByRole("button", {
      name: "I'm disabled",
    });
    expect(() => user.click(disabledButton)).rejects.toThrow();

    // ASSERT
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
