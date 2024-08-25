import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import User from "./page";

jest.mock("@kinde-oss/kinde-auth-nextjs/server", () => ({
  getKindeServerSession: () => ({
    getUser: jest.fn().mockResolvedValue({
      family_name: "Johnson",
      given_name: "Boris",
      picture: "https://avatars.githubusercontent.com/u/105637978?v=4",
      email: undefined,
      id: "kp_afb8efa4d6dd66ca83008aeas7nbbda1",
      phone_number: null,
      username: null,
      properties: {
        city: undefined,
        industry: undefined,
        job_title: undefined,
        middle_name: undefined,
        postcode: undefined,
        salutation: undefined,
        state_region: undefined,
        street_address: undefined,
        street_address_2: undefined,
      },
    }),
  }),
}));

jest.mock("../../../lib/db.ts", () => ({
  connectToDb: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@kinde-oss/kinde-auth-nextjs", () => ({
  LogoutLink: (props: any) => <a {...props}>Logout</a>,
}));

describe("User Server Component", () => {
  it("renders page heading", async () => {
    render(await User());
    const heading = screen.getByRole("heading", {
      name: /user information/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("renders users info", async () => {
    render(await User());
    const userGivenName = screen.getByText(/boris/i);
    const userFamilyName = screen.getByText(/johnson/i);

    expect(userGivenName).toBeInTheDocument();
    expect(userFamilyName).toBeInTheDocument();
  });
});
