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

  // Unified State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    location: "",
    gender: "",
    allergies: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            allergies: formData.allergies,
          }
        : {
            role: activeTab === "doctors" ? "doctor" : "enterprise",
            name: formData.name,
            email: formData.email,
            password: formData.password,
            company: formData.company,
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
      <div className="max-w-md w-full mx-auto rounded-md p-4 md:p-8 shadow bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Sign Up for RxLogistics
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Create your account by filling in the details below.
        </p>

        {/* Tabs for user roles */}
        <div className="flex mt-4 mb-6 border-b">
          {["patients", "doctors", "enterprise"].map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={cn(
                "flex-1 py-2 text-center",
                activeTab === role
                  ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              )}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {/* Sign-up form */}
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  placeholder="Male/Female/Other"
                  type="text"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="Any allergies?"
                  type="text"
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </LabelInputContainer>
            </>
          )}

          {(activeTab === "doctors" || activeTab === "enterprise") && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="company">Company / Work Email</Label>
              <Input
                id="company"
                placeholder="Company name or work email"
                type="text"
                value={formData.company}
                onChange={handleChange}
              />
            </LabelInputContainer>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white w-full rounded-lg h-11 font-medium shadow-md flex items-center justify-center"
          >
            Sign Up &rarr;
          </button>
        </form>
      </div>
    </>
  );
}

// Reusable Input Container
const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
