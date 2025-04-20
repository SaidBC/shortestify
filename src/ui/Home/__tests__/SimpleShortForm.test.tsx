import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import SimpleShortForm from "../SimpleShortForm";
import userEvent from "@testing-library/user-event";

vi.mock("@/auth", () => ({
  authOptions: {},
  default: {},
}));

describe("SimpleShortForm component tests", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(<SimpleShortForm />);
  });

  it("should render form with url input and submit button", () => {
    const form = screen.getByTestId("public-create-shortlink-form");
    const button = screen.getByRole("button");
    const urlInput = screen.getByRole("textbox");

    expect(form).toBeDefined();
    expect(button.textContent).toBe("Create");
    expect(urlInput).toBeDefined();
  });
  it("should render error components if not providing correct url", async () => {
    const button = screen.getByRole("button");
    await user.click(button);
    waitFor(() => {
      const errorText = screen.getByText("Error");
      expect(errorText).toBeInTheDocument();
    });
  });
  it("should create shortlink if form submission is valid", async () => {
    const button = screen.getByRole("button");
    const urlInput = screen.getByRole("textbox");
    await user.type(urlInput, "https://example.com");
    await user.click(button);
    waitFor(() => {
      const successText = screen.getByText("Success");
      expect(successText).toBeInTheDocument();
    });
  });
});
