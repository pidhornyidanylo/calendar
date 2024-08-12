import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "apps",
    template: "%s | calendar",
  },
};

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
