import Header from "@/components/HeaderComponents/header/Header";
import Sidebar from "@/components/SideBarComponents/sidebar/Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import Favicon from "../../../public/favicon.ico";

export const metadata: Metadata = {
  title: {
    default: "home",
    template: "%s | calendar",
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div className="main-content">{children}</div>
      </main>
    </>
  );
}
