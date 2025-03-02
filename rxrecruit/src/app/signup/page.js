"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("patients");
  const [message, setMessage] = useState("");

  // Patient fields
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientLocation, setPatientLocation] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAllergies, setPatientAllergies] = useState("");

  // Doctor/Enterprise fields
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [doctorCompany, setDoctorCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {};
    if (activeTab === "patients") {
      payload = {
        role: "patient",
        name: patientName,
        email: patientEmail,
        password: patientPassword,
        age: patientAge,
        location: patientLocation,
        gender: patientGender,
        allergies: patientAllergies,
      };
    } else if (activeTab === "doctors" || activeTab === "enterprise") {
      payload = {
        // Convert "doctors" tab to role "doctor"
        role: activeTab === "doctors" ? "doctor" : "enterprise",
        name: doctorName,
        email: doctorEmail,
        password: doctorPassword,
        company: doctorCompany,
      };
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Sign up successful! Redirecting to sign in...");
        // Redirect to sign in page after 2 seconds
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage("Sign up failed: " + data.error);
      }
    } catch (error) {
      setMessage("Sign up error: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md w-full mx-auto rounded-md p-4 md:p-8 shadow bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Sign Up for RxLogistics
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Create your account by filling in the details below.
        </p>

        {/* Tabs for user roles */}
        <div className="flex mt-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("patients")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "patients"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            )}
          >
            Patients
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "doctors"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            )}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveTab("enterprise")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "enterprise"
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            )}
          >
            Enterprise
          </button>
        </div>

        {/* Sign up form */}
        <form className="my-8" onSubmit={handleSubmit}>
          {activeTab === "patients" && (
            <>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientName">Name</Label>
                <Input
                  id="patientName"
                  placeholder="John Doe"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientEmail">Email</Label>
                <Input
                  id="patientEmail"
                  placeholder="john@example.com"
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientPassword">Password</Label>
                <Input
                  id="patientPassword"
                  placeholder="••••••••"
                  type="password"
                  value={patientPassword}
                  onChange={(e) => setPatientPassword(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientAge">Age</Label>
                <Input
                  id="patientAge"
                  placeholder="30"
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientLocation">Location</Label>
                <Input
                  id="patientLocation"
                  placeholder="New York"
                  type="text"
                  value={patientLocation}
                  onChange={(e) => setPatientLocation(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientGender">Gender</Label>
                <Input
                  id="patientGender"
                  placeholder="Male/Female/Other"
                  type="text"
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="patientAllergies">Allergies</Label>
                <Input
                  id="patientAllergies"
                  placeholder="Any allergies?"
                  type="text"
                  value={patientAllergies}
                  onChange={(e) => setPatientAllergies(e.target.value)}
                />
              </LabelInputContainer>
            </>
          )}

          {(activeTab === "doctors" || activeTab === "enterprise") && (
            <>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="doctorName">Name</Label>
                <Input
                  id="doctorName"
                  placeholder="Dr. John Doe"
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="doctorEmail">Email</Label>
                <Input
                  id="doctorEmail"
                  placeholder="dr.john@example.com"
                  type="email"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="doctorPassword">Password</Label>
                <Input
                  id="doctorPassword"
                  placeholder="••••••••"
                  type="password"
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="doctorCompany">
                  Company ID / Work Email
                </Label>
                <Input
                  id="doctorCompany"
                  placeholder="Company ID or work email"
                  type="text"
                  value={doctorCompany}
                  onChange={(e) => setDoctorCompany(e.target.value)}
                />
              </LabelInputContainer>
            </>
          )}

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign Up &rarr;
          <BottomGradient />
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
