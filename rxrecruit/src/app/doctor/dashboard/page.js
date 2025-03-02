"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Chat from "@/components/Chat";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, Radar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("opportunities");
  const [DoctorName, setDoctorName] = useState("Nishit Grover");
  const [opportunities, setOpportunities] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [pay, setPay] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch("/api/get-requirements");
        const data = await response.json();
        if (data.success && Array.isArray(data.requirements)) {
          setOpportunities(data.requirements);
        } else {
          console.error("Failed to fetch requirements:", data.error);
        }
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    }
    fetchOpportunities();
  }, []);

  const handleOpportunitySubmit = async (e) => {
    e.preventDefault();
    const newOpportunity = {
      doctor_id: 1,
      title,
      description,
      age_range: ageRange,
      gender,
      location,
      pay,
    };
    const response = await fetch("/api/post-requirement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOpportunity),
    });
    const data = await response.json();
    if (data.success) {
      setOpportunities([...opportunities, newOpportunity]);
      setTitle("");
      setDescription("");
      setAgeRange("");
      setGender("");
      setLocation("");
      setPay("");
      setActiveTab("opportunities");
      setConfirmationMessage("Requirement posted successfully!");
      setTimeout(() => setConfirmationMessage(""), 3000);
    }
  };

  // Hardcoded analytics data

  // Bar Chart: Monthly Opportunities Posted
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Opportunities Posted",
        data: [3, 5, 2, 6, 4, 7],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Opportunities Posted" },
    },
  };

  // Pie Chart: Patient Gender Distribution
  const pieData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Patient Gender Distribution",
        data: [50, 40, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(234, 88, 12, 0.5)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(234, 88, 12, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Patient Gender Distribution" },
    },
  };

  // Line Chart: Weekly Patient Consultations
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Patient Consultations",
        data: [12, 19, 7, 15, 10, 5, 8],
        fill: false,
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.1,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Weekly Patient Consultations" },
    },
  };

  // Doughnut Chart: Consultation Types
  const doughnutData = {
    labels: ["In-Person", "Telemedicine", "Home Visit"],
    datasets: [
      {
        label: "Consultation Types",
        data: [40, 35, 25],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(234, 88, 12, 0.5)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(234, 88, 12, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Consultation Types" },
    },
  };

  // Radar Chart: Skill Proficiency
  const radarData = {
    labels: [
      "Diagnosis",
      "Treatment",
      "Patient Care",
      "Communication",
      "Research",
    ],
    datasets: [
      {
        label: "Skill Proficiency",
        data: [80, 90, 70, 85, 60],
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };
  const radarOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Doctor Skill Proficiency" },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
            &quot;Empowering Healthcare Through Collaboration&quot;
          </h1>
          <p className="text-lg text-center mb-6">Welcome, Dr. {DoctorName}</p>

          <button
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Need to contact Patient?
          </button>

          {showChat && (
            <div className="fixed bottom-16 right-5 w-80 bg-gray-900 text-white shadow-lg rounded-lg p-4">
              <button
                onClick={() => setShowChat(false)}
                className="absolute top-6 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
              >
                ✖
              </button>
              <Chat user="Doctor" recipient="Patient John Doe" />
            </div>
          )}

          <div className="mb-6 border-b border-gray-600 flex justify-center">
            <nav className="flex space-x-10">
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`pb-2 text-lg font-semibold ${
                  activeTab === "opportunities"
                    ? "border-b-4 border-blue-400 text-blue-400"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                Opportunities
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`pb-2 text-lg font-semibold ${
                  activeTab === "new"
                    ? "border-b-4 border-blue-400 text-blue-400"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                Add Opportunity
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`pb-2 text-lg font-semibold ${
                  activeTab === "analytics"
                    ? "border-b-4 border-blue-400 text-blue-400"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          {activeTab === "opportunities" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Posted Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opp, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg shadow-lg bg-gray-800 hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-400">
                      {opp.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{opp.description}</p>
                    <p className="text-sm text-gray-400">
                      Pay Scale: {opp.pay || "Unpaid"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Location: {opp.location || "Remote"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Gender: {opp.gender || "Any"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "new" && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Add a New Opportunity
              </h2>
              <form
                onSubmit={handleOpportunitySubmit}
                className="space-y-4 flex flex-col items-center"
              >
                <div className="w-3/4">
                  <Label htmlFor="title">Opportunity Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Clinical Study: Diabetes Management"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-700 text-white"
                  />
                </div>
                <div className="w-3/4">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="Enter a detailed description..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 w-3/4">
                  <div>
                    <Label htmlFor="ageRange">Age Range</Label>
                    <Input
                      id="ageRange"
                      placeholder="e.g., 18-50"
                      type="text"
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      placeholder="e.g., Male, Female, Any"
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-gray-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-3/4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, USA"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pay">Pay</Label>
                    <Input
                      id="pay"
                      placeholder="Enter compensation details..."
                      type="text"
                      value={pay}
                      onChange={(e) => setPay(e.target.value)}
                      className="w-full bg-gray-700 text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Submit Opportunity
                </button>
              </form>
              {confirmationMessage && (
                <p className="text-center text-green-400 mt-4">
                  {confirmationMessage}
                </p>
              )}
            </section>
          )}

          {activeTab === "analytics" && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Analytics Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <Bar data={barData} options={barOptions} />
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <Line data={lineData} options={lineOptions} />
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
