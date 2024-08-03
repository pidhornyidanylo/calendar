import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import type React from "react";

const Home: React.FC = () => {
	return (
		<>
			<HomeHeader />
			<HomeSchedule />
		</>
	);
};

export default Home;
