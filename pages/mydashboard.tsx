import SideBar from '@/components/sidebar/SideBar';
import DashboardList from '@/components/dashboardPage/DashboardList';

const dashboardExample: React.FC = () => {
  return (
    <div className="flex bg-gray-10">
      <SideBar />
      <main className="flex flex-1">
        <DashboardList />
      </main>
    </div>
  );
};
export default dashboardExample;
