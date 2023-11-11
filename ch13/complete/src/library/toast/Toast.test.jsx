import { render } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";

import * as ToastStories from "./Toast.stories";
import { act } from "react-dom/test-utils";

const { Normal, Outline, Dismissible, Persistent } =
  composeStories(ToastStories);

vi.useFakeTimers({ shouldAdvanceTime: true });

function setup(Component) {
  const { getByRole, queryAllByRole } = render(<Component />);
  const user = userEvent.setup();
  const getToasts = () => queryAllByRole("article");
  const getFirstDismissButton = () =>
    queryAllByRole("button", { name: "Dismiss" })[0];

  return {
    button: getByRole("button"),
    user,
    getToasts,
    getFirstDismissButton,
  };
}

describe("Toast", () => {
  test("should render a normal toast and close it after 3 seconds", async () => {
    // ARRANGE
    const { button, user, getToasts } = setup(Normal);

    // ACT
    await user.click(button);

    // ASSERT
    expect(getToasts()).toHaveLength(1);

    // ACT
    act(() => vi.advanceTimersByTime(5000));

    // ASSERT
    expect(getToasts()).toHaveLength(0);
  });

  test("should render an outline toast and close it after 3 seconds", async () => {
    // ARRANGE
    const { button, user, getToasts } = setup(Outline);

    // ACT
    await user.click(button);

    // ASSERT
    expect(getToasts()).toHaveLength(1);

    // ACT
    act(() => vi.advanceTimersByTime(3000));

    // ASSERT
    expect(getToasts()).toHaveLength(0);
  });

  test("should render a dismissaible toast", async () => {
    // ARRANGE
    const { button, user, getToasts, getFirstDismissButton } =
      setup(Dismissible);

    // ACT
    await user.click(button);

    // ASSERT
    expect(getToasts()).toHaveLength(1);

    // ACT
    await user.click(getFirstDismissButton());

    // ASSERT
    expect(getToasts()).toHaveLength(0);
  });

  test("should render a persistent toast that has to be dismissed", async () => {
    // ARRANGE
    const { button, user, getToasts, getFirstDismissButton } =
      setup(Persistent);

    // ACT
    await user.click(button);

    // ASSERT
    expect(getToasts()).toHaveLength(1);

    // ACT
    act(() => vi.advanceTimersByTime(4000));

    // ASSERT
    expect(getToasts()).toHaveLength(1);

    // ACT
    await user.click(getFirstDismissButton());

    // ASSERT
    expect(getToasts()).toHaveLength(0);
  });
});
