import AutoDeleteSelect from "./AutoDeleteSelect";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { updateAutoDelete } from "@/lib/actions";
import toast from "react-hot-toast";

jest.mock("../../../lib/actions.ts", () => ({
  updateAutoDelete: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("AutoDeleteSelect component", () => {
  it("renders heading", () => {
    render(
      <AutoDeleteSelect
        value={"daily"}
        token={"kp_afb8efa4d6dd66ca83008aeas7nbbda1"}
      />
    );
    const componentHeading = screen.getByRole("heading", {
      name: /automated deletion/i,
    });
    expect(componentHeading).toBeInTheDocument();
  });

  it("calls updateAutoDelete with the selected value and displays success toast", async () => {
    jest.mocked(updateAutoDelete).mockResolvedValueOnce({
      success: true,
      message: "Frequency updated successfully!",
    });

    render(
      <AutoDeleteSelect
        value={"daily"}
        token={"kp_afb8efa4d6dd66ca83008aeas7nbbda1"}
      />
    );

    const selectButton = screen.getByTestId("daily-option");
    fireEvent.click(selectButton);

    const dropdown = screen.getByRole("combobox");
    fireEvent.click(dropdown);

    const monthlyOption = screen.getByRole("option", { name: /monthly/i });
    fireEvent.click(monthlyOption);

    await waitFor(() => {
      expect(updateAutoDelete).toHaveBeenCalledWith({
        frequency: "monthly",
        token: "kp_afb8efa4d6dd66ca83008aeas7nbbda1",
      });
      expect(toast.success).toHaveBeenCalledWith(
        "Frequency updated successfully!"
      );
    });
  });
});
