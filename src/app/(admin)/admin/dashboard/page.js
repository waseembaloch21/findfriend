import AnalyticsChart from "@/components/BarChart/BarChart";

export default function Dashboard() {
    return (
      <div className="min-h-screen container mx-auto">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
      <AnalyticsChart/>
      </div>
    );
  }