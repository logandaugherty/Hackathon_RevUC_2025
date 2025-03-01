"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignUpPage() {
  const [activeTab, setActiveTab] = useState("patients");

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", { ...formData, role: activeTab });
    // Add API call or processing logic here
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-6 md:p-10 shadow-xl bg-white dark:bg-gray-900 transition-all">
      <h2 className="font-extrabold text-2xl text-neutral-900 dark:text-neutral-100">
        Create an Account
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-2">
        Sign up to continue using RxRecruits.
      </p>

      {/* Tabs for user roles */}
      <div className="flex mt-5 mb-6 border-b dark:border-gray-700">
        {["patients", "doctors", "enterprise"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2 text-center transition-all",
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold text-black dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Sign up form */}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        {activeTab === "patients" && (
          <>
            <LabelInputContainer>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                placeholder="30"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="New York"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                placeholder="Male/Female/Other"
                type="text"
                value={formData.gender}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                name="allergies"
                placeholder="Any known allergies?"
                type="text"
                value={formData.allergies}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </>
        )}

        {(activeTab === "doctors" || activeTab === "enterprise") && (
          <LabelInputContainer>
            <Label htmlFor="company">Company ID / Work Email</Label>
            <Input
              id="company"
              name="company"
              placeholder="Company ID or work email"
              type="text"
              value={formData.company}
              onChange={handleChange}
            />
          </LabelInputContainer>
        )}

        <button
          className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-gray-700 w-full text-white rounded-lg h-12 font-semibold transition-all transform hover:scale-[1.02] hover:shadow-lg"
          type="submit"
        >
          Sign Up &rarr;
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

// Default export for Next.js page
export default function Page() {
  return <SignUpPage />;
}
