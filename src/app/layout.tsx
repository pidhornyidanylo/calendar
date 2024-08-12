import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "calendar",
    template: "%s | calendar",
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
