import Header from "@/components/HeaderComponents/header/Header";
import Sidebar from "@/components/SideBarComponents/sidebar/Sidebar";
import Favicon from "../../../public/favicon.ico";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "home",
    template: "%s | calendar"
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div className="main-content">
          <Toaster position="bottom-left" />
          {children}
        </div>
      </main>
    </>
  );
}
