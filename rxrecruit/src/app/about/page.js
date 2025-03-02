"use client";

import React from "react";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-gray-900 text-white p-6">
      <Header />
      <div className="max-w-3xl mx-auto mt-8 bg-gray-900 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">
          About RxRecruit
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Overview</h2>
          <p>
            RxRecruit is a cutting-edge platform designed to revolutionize patient recruitment
            and medicine logistics. By connecting doctors, researchers, and patients in a
            seamless digital environment, RxRecruit simplifies the process of enrolling
            volunteers for medical trials while optimizing the distribution of essential
            medications.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">How It Works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Patient Recruitment & Enrollment:</strong> Doctors can create recruitment posts with
              eligibility criteria, and patients can browse and apply.
            </li>
            <li>
              <strong>Real-Time Patient Monitoring & Feedback:</strong> Patients provide daily updates on their
              condition, allowing doctors to analyze drug efficacy.
            </li>
            <li>
              <strong>Medicine Logistics & Distribution:</strong> A logistics system ensures efficient medication
              distribution between hospitals, pharmacies, and healthcare providers.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Why Use RxRecruit?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>📌 <strong>Efficient Patient Recruitment:</strong> Find eligible volunteers easily.</li>
            <li>📌 <strong>Enhanced Patient Care:</strong> Monitor patient feedback in real-time.</li>
            <li>📌 <strong>Optimized Medicine Distribution:</strong> Reduce waste and ensure accessibility.</li>
            <li>📌 <strong>User-Friendly Interface:</strong> Simple and intuitive experience for all users.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Getting Started</h2>
          <p><strong>For Doctors & Researchers:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
            <li>Sign up and create recruitment posts.</li>
            <li>Monitor patient feedback and engagement.</li>
            <li>Manage medicine logistics efficiently.</li>
          </ul>
          <p><strong>For Patients & Volunteers:</strong></p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Browse and enroll in medical trials.</li>
            <li>Receive prescribed medications and provide progress reports.</li>
            <li>Contribute to medical research.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
