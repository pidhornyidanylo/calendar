import React from "react";
import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import { getTasks } from "@/lib/data";

const Home: React.FC = async () => {
  const schedule = await getTasks();
  return (
    <>
      <HomeHeader />
      <HomeSchedule data={JSON.stringify(schedule)} />
    </>
  );
};

export const revalidate = 60;

export default Home;