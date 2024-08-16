import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import { getTasks } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type React from "react";

const Home: React.FC = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const schedule = await getTasks(user?.id as string);
	return (
		<>
			<HomeHeader />
			<HomeSchedule data={JSON.stringify(schedule)} />
		</>
	);
};

export const revalidate = 60;

export default Home;
