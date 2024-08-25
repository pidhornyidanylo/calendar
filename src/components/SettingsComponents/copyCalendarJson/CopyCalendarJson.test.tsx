import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyCalendarJson from "./CopyCalendarJson";

describe("CopyCalendarJson component", () => {
  it("renders button", () => {
    render(<CopyCalendarJson schedule={"[]"} />);
    const getPdfButton = screen.getByRole("button", {
      name: /get pdf preview/i,
    });
    expect(getPdfButton).toBeInTheDocument();
  });
});
