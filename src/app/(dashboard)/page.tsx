import HomeHeader from "@/components/HomeComponents/homeHeader/HomeHeader";
import HomeSchedule from "@/components/HomeComponents/homeSchedule/HomeSchedule";
import Spinner from "@/components/reusable/Spinner/Spinner";
import { getTasks } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type React from "react";

const Home: React.FC = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    const schedule = await getTasks(user?.id as string);
    return (
      <>
        <HomeHeader />
        <HomeSchedule data={JSON.stringify(schedule.tasks)} />
      </>
    );
  }
  return <Spinner />;
};

export const revalidate = 60;

export default Home;
