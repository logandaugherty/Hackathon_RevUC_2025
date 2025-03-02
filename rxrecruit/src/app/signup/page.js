"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const router = useRouter();
  // Use only two tabs: "patients" and "doctor"
  const [activeTab, setActiveTab] = useState("patients");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    location: "",
    gender: "",
    weight: "",
    bloodType: "",
    allergies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the payload based on the active tab
    const payload =
      activeTab === "patients"
        ? {
            role: "patient",
            name: formData.name,
            email: formData.email,
            password: formData.password,
            age: formData.age,
            location: formData.location,
            gender: formData.gender,
            weight: formData.weight,
            bloodType: formData.bloodType,
            allergies: formData.allergies,
          }
        : {
            role: "doctor",
            name: formData.name,
            email: formData.email,
            password: formData.password,
            // For doctors, we no longer need company fields.
            // Pass an empty string for the company field.
            company: "",
          };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        router.push("/");
      } else {
        alert("Sign-up failed: " + data.error);
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-gray-900">
        <div className="flex w-full max-w-6xl mx-auto px-2">
          <div className="flex-1 text-white flex items-center justify-center">
            <div>
              <h2 className="font-bold text-4xl mb-4">Join RxRecruits</h2>
              <p className="text-lg mb-4">
                Create an account to connect with patients, doctors, and medical
                professionals.
              </p>
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <button
                  className="ml-1 text-blue-500 font-medium hover:underline"
                  onClick={() => router.push("/")}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
          <div className="w-96 max-w-md mx-auto rounded-lg p-6 md:p-8 shadow-xl bg-white dark:bg-gray-800">
            <h2 className="font-bold text-2xl text-gray-800 dark:text-white text-center">
              Sign Up for RxRecruits
            </h2>
            <p className="text-gray-600 text-sm mt-2 dark:text-gray-300 text-center">
              Create your account by filling in the details below.
            </p>
            <div className="flex mt-6 mb-6 border-b border-gray-300 dark:border-gray-700">
              {["patients", "doctor"].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveTab(role)}
                  className={cn(
                    "flex-1 py-2 text-center transition-all duration-200",
                    activeTab === role
                      ? "border-b-2 border-blue-500 font-semibold text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  )}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-lg"
                />
              </LabelInputContainer>
              {activeTab === "patients" && (
                <>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      placeholder="30"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      placeholder="70"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      placeholder="O+"
                      type="text"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      placeholder="e.g., Peanuts"
                      type="text"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      placeholder="Male/Female"
                      type="text"
                      value={formData.gender}
                      onChange={handleChange}
                      className="rounded-lg"
                    />
                  </LabelInputContainer>
                </>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white w-full rounded-lg h-11 font-medium shadow-md flex items-center justify-center"
              >
                Sign Up &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
