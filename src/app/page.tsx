import React from "react";
import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";

const Home = async (): Promise<JSX.Element> => {
  return (
    <>
      <HomeHeader />
      <HomeSchedule />
    </>
  );
};

export default Home;
