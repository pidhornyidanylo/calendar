import type React from "react";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";

const Home: React.FC = () => {
	return (
		<>
			<HomeHeader />
			<HomeSchedule />
		</>
	);
};

export default Home;
