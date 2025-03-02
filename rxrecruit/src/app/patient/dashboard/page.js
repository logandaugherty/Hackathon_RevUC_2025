"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patientName, setPatientName] = useState("John Doe");
  const [medicationSchedule, setMedicationSchedule] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    setMedicationSchedule([
      { time: "08:00 AM", medication: "Aspirin" },
      { time: "12:00 PM", medication: "Ibuprofen" },
      { time: "06:00 PM", medication: "Metformin" },
    ]);
  }, []);

  useEffect(() => {
    async function fetchOpportunities() {
      const response = await fetch("/api/gr");
      const data = await response.json();
      if (data.success) {
        setOpportunities(data.requirements);
      }
    }
    fetchOpportunities();
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
        <p className="text-lg mb-6">Welcome, {patientName}</p>

        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "dashboard"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("opportunities")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "opportunities"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Opportunities
            </button>
          </nav>
        </div>

        {activeTab === "dashboard" && (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Medication Schedule
              </h2>
              <ul className="space-y-4">
                {medicationSchedule.map((item, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white dark:bg-gray-800"
                  >
                    <span className="font-medium">{item.time}</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.medication}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Daily Feedback</h2>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                  rows="4"
                  placeholder="How are you feeling today?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Submit Feedback
                </button>
              </form>
            </section>
          </>
        )}

        {activeTab === "opportunities" && (
          <>
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Volunteering Opportunities
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-500">
                      {opp.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {opp.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted by: {opp.postedBy || "Unknown"}
                    </p>
                    <button
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() =>
                        console.log(`Volunteer action for ${opp.title}`)
                      }
                    >
                      Volunteer
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
