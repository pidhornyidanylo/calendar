import React from "react";
import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import { getTasks } from "@/lib/data";

const Home = ({ schedule }: { schedule: string }) => {
  return (
    <>
      <HomeHeader />
      <HomeSchedule data={schedule} />
    </>
  );
};

export const getStaticProps = async () => {
  const schedule = await getTasks();
  return {
    props: {
      schedule: JSON.stringify(schedule),
    },
    revalidate: 60,
  };
};

export default Home;
