import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeaderMenu from "./HeaderMenu";

jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  LogoutLink: (props: any) => <a {...props}>Logout</a>,
}));

describe("Header Server Component", () => {
  it("renders <HeaderMenu />", () => {
    render(<HeaderMenu />);
    const helpIcon = screen.getByRole("img", {
      name: /help/i,
    });
    const settingsIcon = screen.getByRole("img", {
      name: /settings/i,
    });
    const appsIcon = screen.getByRole("img", {
      name: /apps/i,
    });
    const userIcon = screen.getByRole("img", {
      name: /avatar/i,
    });
    expect(helpIcon).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
    expect(appsIcon).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
  });
});
