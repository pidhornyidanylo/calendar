import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeaderBurger from "./HeaderBurger";

jest.mock("../../../lib/db.ts", () => ({
  connectToDb: jest.fn().mockResolvedValue(undefined),
}));

describe("Header Server Component", () => {
  it("renders <HeaderBurger />", () => {
    render(<HeaderBurger />);
    const headerBurger = screen.getByRole("img", {
      name: /burger/i,
    });
    expect(headerBurger).toBeInTheDocument();
  });
});
