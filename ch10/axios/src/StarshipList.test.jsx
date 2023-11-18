import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { vi } from "vitest";

import { StarshipList } from "./StarshipList";

vi.mock("axios", () => ({
  default: { get: vi.fn() },
}));

describe("StarshipList component", () => {
  test("should initially be in a loading state while fetching", () => {
    // ARRANGE
    axios.get.mockImplementationOnce(() => new Promise(() => {}));
    render(<StarshipList />);
    // ASSERT
    const heading = screen.getByRole("heading", { name: "Loading..." });
    expect(heading).toBeInTheDocument();
  });

  test("should show an error message on failure", async () => {
    // ARRANGE
    axios.get.mockImplementationOnce(() =>
      Promise.reject({ message: "Request failed" })
    );
    render(<StarshipList />);
    // ASSERT
    const title = await screen.findByRole("heading", {
      name: "Error: Request failed",
    });
    expect(title).toBeInTheDocument();
  });

  test("should show a list of ships when all goes well", async () => {
    // ARRANGE
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { results: [{ name: "Tardis", url: "/tardis" }] },
      })
    );
    render(<StarshipList />);
    // ASSERT
    const heading = await screen.findByRole("heading", {
      name: "List of Starships:",
    });
    expect(heading).toBeInTheDocument();
    const firstName = screen.getByRole("cell", { name: "Tardis" });
    expect(firstName).toBeInTheDocument();
  });
});
