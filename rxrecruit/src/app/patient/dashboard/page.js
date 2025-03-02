"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Chat from "@/components/Chat";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patientName, setPatientName] = useState("John Doe");
  const [medicationSchedule, setMedicationSchedule] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [filterGender, setFilterGender] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [volunteerConfirmation, setVolunteerConfirmation] = useState("");
  const [showChat, setShowChat] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clinics = [
    "Green Valley Health",
    "Sunrise Medical Center",
    "Wellness Hub Clinic",
    "HopeCare Hospital",
    "City Health Institute",
    "UC Health",
    "Pinecrest Medical",
    "Community Care Center",
    "Healing Hands Clinic",
    "Unity Medical Center",
    "Serenity Health",
  ];

  useEffect(() => {
    setMedicationSchedule([
      { time: "08:00 AM", medication: "Aspirin" },
      { time: "12:00 PM", medication: "Ibuprofen" },
      { time: "06:00 PM", medication: "Metformin" },
    ]);
  }, []);

  useEffect(() => {
    async function fetchOpportunities() {
      const response = await fetch("/api/get-requirements");
      const data = await response.json();
      if (data.success) {
        setOpportunities(data.requirements);
      }
    }
    fetchOpportunities();
  }, []);

  useEffect(() => {
    function getRandomNextVisit() {
      const now = new Date();
      const daysAhead = Math.floor(Math.random() * 7) + 1;
      const visitDate = new Date(now);
      visitDate.setDate(now.getDate() + daysAhead);
      visitDate.setHours(Math.floor(Math.random() * 10) + 8); // 8 AM - 5 PM
      visitDate.setMinutes(Math.floor(Math.random() * 60));
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return `${visitDate.toLocaleDateString(
        "en-US"
      )}, ${visitDate.toLocaleTimeString("en-US", options)}`;
    }
    setNextVisit(getRandomNextVisit());
    setClinicName(clinics[Math.floor(Math.random() * clinics.length)]);
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  const handleVolunteerClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowTermsPopup(true);
  };

  const handleAcceptTerms = () => {
    setShowTermsPopup(false);
    setVolunteerConfirmation(
      `You have successfully signed up for ${selectedOpportunity.title}.`
    );
    setSelectedOpportunity(null);
    setTimeout(() => setVolunteerConfirmation(""), 5001);
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const [minAge, maxAge] = opp.age_range.split("-").map(Number);
    const userAge = Number(filterAge);
    return (
      (!filterGender ||
        opp.gender.toLowerCase() === filterGender.toLowerCase()) &&
      (!filterAge || (userAge >= minAge && userAge <= maxAge))
    );
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
            &quot;Healing is a matter of time, but it is sometimes also a matter
            of opportunity.&quot; - Someone
          </h1>
          <p className="text-lg text-center mb-6">Welcome, {patientName}</p>

          <button
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Need Emergency Assistance?
          </button>

          {showChat && (
            <div className="fixed bottom-16 right-5 w-80 bg-gray-900 text-white shadow-lg rounded-lg p-4">
              <button
                onClick={() => setShowChat(false)}
                className="absolute top-6 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
              >
                ✖
              </button>
              <Chat user="Patient John Doe" recipient="Doctor" />
            </div>
          )}

          <div className="mb-6 border-b border-gray-600 flex justify-center">
            <nav className="flex space-x-10">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`pb-2 text-lg font-semibold ${
                  activeTab === "dashboard"
                    ? "border-b-4 border-blue-400 text-blue-400"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                Dashboard
              </button>
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
            </nav>
          </div>

          {activeTab === "dashboard" && (
            <>
              <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Next Doctor Visit
                </h2>
                <p className="text-lg">
                  {nextVisit} at {clinicName}
                </p>
              </section>
              <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Assigned Medications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {medicationSchedule.map((med, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-500 text-white rounded-lg shadow-md flex flex-col items-center"
                    >
                      <span className="text-lg font-semibold">
                        {med.medication}
                      </span>
                      <span className="text-sm mt-1">{med.time}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Daily Feedback</h2>
                <form onSubmit={handleFeedbackSubmit}>
                  <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
                    rows="4"
                    placeholder="How are you feeling today?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit Feedback
                  </button>
                </form>
              </section>
            </>
          )}

          {activeTab === "opportunities" && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Volunteering Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-6 border rounded-lg shadow-lg bg-gray-800 text-white hover:shadow-xl transition"
                  >
                    <h3 className="text-xl font-bold mb-2 text-blue-400">
                      {opp.title}
                    </h3>
                    <p className="mb-2">{opp.description}</p>
                    <p className="text-sm">
                      Age: {opp.age_range} | Gender: {opp.gender} | Pay:{" "}
                      {opp.pay}
                    </p>

                    <button
                      onClick={() => handleVolunteerClick(opp)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Volunteer
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {showTermsPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white">
                <h3 className="text-xl font-bold mb-4">Terms and Conditions</h3>
                <p className="mb-4">
                  By volunteering, you agree to participate responsibly and
                  follow all medical guidelines.
                </p>
                <button
                  onClick={handleAcceptTerms}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Accept
                </button>
              </div>
            </div>
          )}

          {volunteerConfirmation && (
            <p className="text-center text-green-400 mt-4">
              {volunteerConfirmation}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
