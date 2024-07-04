import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";

import { ToggleButton } from "./ToggleButton";
import { DarkModeContext } from "./DarkModeContext";

function setup() {
  const toggleDarkMode = vi.fn();
  const value = { toggleDarkMode };
  render(
    <DarkModeContext.Provider value={value}>
      <ToggleButton />
    </DarkModeContext.Provider>
  );
  return { button: screen.getByRole("button"), toggleDarkMode };
}

describe("ToggleButton component", () => {
  test("should invoke the toggle on click", async () => {
    // ARRANGE
    const { button, toggleDarkMode } = setup();
    // ACT
    const user = userEvent.setup();
    await user.click(button);
    // ASSERT
    expect(toggleDarkMode).toHaveBeenCalledTimes(1);
  });
});
