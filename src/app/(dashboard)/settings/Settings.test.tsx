import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Settings from "./page";
import { getAutoDelete, getTasks, getTheme } from "@/lib/data";

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

jest.mock("../../../lib/data.ts", () => ({
  getTasks: jest.fn(),
  getAutoDelete: jest.fn(),
  getTheme: jest.fn(),
}));

describe("Settings Server Component", () => {
  it("renders page heading", async () => {
    jest.mocked(getTasks).mockResolvedValueOnce({
      success: false,
      tasks: [
        {
          date: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
          },
          tasks: [
            {
              addInfo: "swimming pool",
              info: "swim",
              recurrenceEndDate: null,
              recurrenceFrequency: null,
              recurring: false,
              time: {
                timeFrom: "10:00",
                timeTo: "12:00",
              },
              _id: "66c6fbacdd9b3c4895e0b331",
            },
          ],
          dateIdentifier: "2482024",
        },
      ],
    });
    jest.mocked(getAutoDelete).mockResolvedValueOnce({
      success: true,
      message: "Successfully fetched data.",
      autoDelete: "monthly",
    });
    jest.mocked(getTheme).mockResolvedValueOnce({
      success: true,
      theme: "light",
    });
    render(await Settings());
    const subHeader = screen.getByText(
      /customize your calendar application settings below\. adjust your preferences to tailor the app to your needs\./i
    );
    expect(subHeader).toBeInTheDocument();
  });
});
