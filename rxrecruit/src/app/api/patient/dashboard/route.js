// File: app/api/patient/dashboard/route.js
export async function GET(request) {
  // Return hard-coded sample data for testing purposes
  const sampleData = {
    schedule: [
      { time: "08:00 AM", medication: "Aspirin" },
      { time: "12:00 PM", medication: "Ibuprofen" },
      { time: "06:00 PM", medication: "Metformin" },
    ],
  };

  return new Response(JSON.stringify(sampleData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
