const PreArrival = () => {
    const [preArrivals] = useState([
      {
        id: 1,
        name: "Alice Johnson",
        expectedTime: "14:30",
        contactPerson: "Bob Wilson",
        purpose: "Interview",
        status: "pending"
      },
      // Add more sample data
    ]);
  
    const handleApproval = (id, status) => {
      // Add approval logic here
      console.log(`Visitor ${id} ${status}`);
    };
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pre-Arrival Requests</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Pre-Arrival
          </button>
        </div>
  
        {preArrivals.map((visitor) => (
          <div key={visitor.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{visitor.name}</h3>
                <p className="text-sm text-gray-500">Expected: Today, {visitor.expectedTime}</p>
                <p className="text-sm text-gray-500">Contact: {visitor.contactPerson}</p>
                <p className="text-sm text-gray-500">Purpose: {visitor.purpose}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApproval(visitor.id, 'approved')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(visitor.id, 'denied')}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PreArrival;