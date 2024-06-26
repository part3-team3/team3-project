import { Dashboard } from '@/types/myDashboardTypes';
import Image from 'next/image';


interface MyDashboardItemProps {
  myDashboard: Dashboard;
}
const SideBarItem = ({ myDashboard }: MyDashboardItemProps) => {
  const dashboardColor: { [coloKkey: string]: string } = {
    '#7AC555': 'bg-green',
    '#760DDE': 'bg-purple',
    '#FFA500': 'bg-orange',
    '#E876EA': 'bg-pink',
    '#76A5EA': 'bg-blue',
  };
  return (
    <>
      <div className="flex flex-row items-center xl:w-276 xl:h-45">
        <div
          className={`${dashboardColor[myDashboard.color]} h-8 w-8 rounded-full`}
        ></div>
        <p className="ml-12 mr-4 text-sm font-semibold hidden md:block">{myDashboard.title}</p>
        {myDashboard.createdByMe && (
          <div className="relative h-12 w-15 hidden md:block">
            <Image
              fill
              src="/images/icon/ic-crown.svg"
              alt="내가 만든 대시보드"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SideBarItem;