import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import { getTheme } from "@/lib/data";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "calendar",
    template: "%s | calendar",
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  return (
    <html lang="en" className={`${theme === "light" ? "" : "dark-mode"}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
