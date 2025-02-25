import Sidebar from "./Sidebar";  // ✅ CORRECT

function VDashboard() {
  const stats = [
    { title: "Total Visitors Today", count: 25 },
    { title: "Currently Checked In", count: 8 },
    { title: "Pre-scheduled Visits", count: 12 }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <div className="flex w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-gray-500 text-sm font-semibold">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Additional Content (Optional) */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Recent Visitors</h3>
          <p className="text-gray-600 mt-2">No recent visitors to display.</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
