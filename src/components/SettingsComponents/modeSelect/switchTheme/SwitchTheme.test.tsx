import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SwitchTheme from "./SwitchTheme";
import { getTheme } from "@/lib/data";
import { updateTheme } from "@/lib/actions";

jest.mock("../../../../lib/data.ts", () => ({
  getTheme: jest.fn(),
}));

jest.mock("../../../../lib/actions.ts", () => ({
  updateTheme: jest.fn(),
}));

describe("SwitchTheme Component", () => {
  it("renders switch element properly", async () => {
    jest
      .mocked(getTheme)
      .mockResolvedValueOnce({ success: true, theme: "light" });
    render(<SwitchTheme token={"kp_afb8efa4d6dd66ca83008aeas7nbbda1"} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
  });

  it("changes theme properly", async () => {
    jest
      .mocked(getTheme)
      .mockResolvedValueOnce({ success: true, theme: "light" });
    jest.mocked(updateTheme).mockResolvedValueOnce({
      success: true,
      message: "Theme changed!",
      theme: "light",
    });

    render(<SwitchTheme token={"kp_afb8efa4d6dd66ca83008aeas7nbbda1"} />);

    const switchElement = screen.getByRole("switch");

    fireEvent.click(switchElement);

    await waitFor(() => {
      expect(updateTheme).toHaveBeenCalledWith({
        theme: "dark",
        token: "kp_afb8efa4d6dd66ca83008aeas7nbbda1",
      });
      expect(switchElement).not.toBeChecked();
    });
  });
});
