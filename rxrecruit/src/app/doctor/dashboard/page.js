"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("opportunities");
  const [opportunities, setOpportunities] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [pay, setPay] = useState("");
  const [patientFeedback, setPatientFeedback] = useState([]);

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

  const handleOpportunitySubmit = async (e) => {
    e.preventDefault();
    const newOpportunity = {
      title,
      description,
      requirements,
      pay,
    };

    const response = await fetch("/api/pr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOpportunity),
    });
    const data = await response.json();
    if (data.success) {
      setOpportunities([...opportunities, newOpportunity]);
      setTitle("");
      setDescription("");
      setRequirements("");
      setPay("");
      setActiveTab("opportunities");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
        <p className="text-lg mb-6">Welcome, Dr. [Your Name]</p>

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
          </nav>
        </div>

        {activeTab === "opportunities" && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Posted Opportunities
            </h2>
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
      </div>
    </>
  );
}
