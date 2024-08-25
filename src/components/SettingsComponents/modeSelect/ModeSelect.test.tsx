import { render, screen } from "@testing-library/react";
import ModeSelect from "./ModeSelect";

describe("ModeSelect Server Component", () => {
  it("renders heading", () => {
    render(<ModeSelect token={"kp_afb8efa4d6dd66ca83008aeas7nbbda1"} />);
    const modeSelectHeading = screen.getByRole("heading", {
      name: /enable dark mode/i,
    });
    expect(modeSelectHeading).toBeInTheDocument();
  });
});
