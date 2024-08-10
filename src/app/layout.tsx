import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import Header from "@/components/HeaderComponents/header/Header";
import Sidebar from "@/components/SideBarComponents/sidebar/Sidebar";
import ThemeProvider from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Page",
  description: "This is a description of my page",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main>
            <Sidebar />
            <div className="main-content">
              <Toaster position="bottom-left" />
              {children}
            </div>
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
