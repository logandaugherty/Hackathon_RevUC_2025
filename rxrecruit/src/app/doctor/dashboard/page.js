"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function DoctorDashboard() {
  // Three tabs: "opportunities", "new", "patients"
  const [activeTab, setActiveTab] = useState("opportunities");
  const [opportunities, setOpportunities] = useState([]);
  // Form fields for adding a new opportunity
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [pay, setPay] = useState("");
  
  // Simulated patient feedback/progress data
  const [patientFeedback, setPatientFeedback] = useState([]);

  // Simulate fetching existing opportunities (replace with API calls later)
  useEffect(() => {
    setOpportunities([
      {
        id: 1,
        title: "Clinical Study: Heart Health",
        description: "Study on a novel medication for heart disease management.",
        requirements: "Patients aged 50+, with pre-existing cardiac conditions.",
        pay: "$500",
      },
      {
        id: 2,
        title: "Clinical Trial: Respiratory Relief",
        description: "Trial for an innovative asthma relief inhaler.",
        requirements: "Patients aged 30-60, non-smokers preferred.",
        pay: "$300",
      },
    ]);
    // Simulate fetching patient feedback/progress data
    setPatientFeedback([
      { id: 1, name: "Alice", feedback: "Feeling great and energetic.", status: "Improving", date: "2025-03-01" },
      { id: 2, name: "Bob", feedback: "Mild side effects but overall stable.", status: "Stable", date: "2025-03-01" },
      { id: 3, name: "Charlie", feedback: "Experiencing some challenges.", status: "Declining", date: "2025-03-01" },
    ]);
  }, []);

  const handleOpportunitySubmit = (e) => {
    e.preventDefault();
    const newOpportunity = {
      id: Date.now(),
      title,
      description,
      requirements,
      pay,
    };
    setOpportunities([...opportunities, newOpportunity]);
    // Clear form fields
    setTitle("");
    setDescription("");
    setRequirements("");
    setPay("");
    // Optionally switch back to the opportunities tab to view the new entry
    setActiveTab("opportunities");
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
        <p className="text-lg mb-6">Welcome, Dr. [Your Name]</p>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
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
            <button
              onClick={() => setActiveTab("new")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "new"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Add Opportunity
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`pb-2 text-lg font-medium ${
                activeTab === "patients"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Patients
            </button>
          </nav>
        </div>

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Posted Opportunities</h2>
            {opportunities.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                No opportunities posted yet.
              </p>
            ) : (
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
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Requirements:</strong> {opp.requirements}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Pay:</strong> {opp.pay}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Add Opportunity Tab */}
        {activeTab === "new" && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Add a New Opportunity
            </h2>
            <form onSubmit={handleOpportunitySubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Opportunity Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Clinical Study: Diabetes Management"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Enter a detailed description..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <textarea
                  id="requirements"
                  placeholder="List all requirements for this opportunity..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                  rows="3"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
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
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit Opportunity
              </button>
            </form>
          </section>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Patient Feedback & Progress
            </h2>
            {patientFeedback.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                No patient feedback available.
              </p>
            ) : (
              <div className="space-y-4">
                {patientFeedback.map((pf) => (
                  <div
                    key={pf.id}
                    className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-blue-500">
                        {pf.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {pf.date}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {pf.feedback}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <strong>Status:</strong> {pf.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
