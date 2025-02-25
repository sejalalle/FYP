function Dashboard() {
  const stats = [
    { title: 'Total Visitors Today', count: 25 },
    { title: 'Currently Checked In', count: 8 },
    { title: 'Pre-scheduled Visits', count: 12 }
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard