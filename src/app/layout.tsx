import type { Metadata } from "next";
import { getTheme } from "@/lib/data";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import Favicon from "../../public/favicon.ico";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const dbUser = await getTheme(user?.id as string);
	return (
		<html
			lang="en"
			className={`${dbUser.theme === "light" ? "" : "dark-mode"}`}
		>
			<body className={inter.className}>
				<Toaster position="bottom-right" />
				{children}
			</body>
		</html>
	);
}
