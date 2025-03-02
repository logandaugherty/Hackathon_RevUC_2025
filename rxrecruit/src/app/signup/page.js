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

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role =
      activeTab === "patients"
        ? "patient"
        : activeTab === "doctors"
        ? "doctor"
        : "enterprise";

    const payload = {
      role,
      name,
      email,
      password,
      ...(role === "patient" ? { age, location, gender, allergies } : {}),
      ...(role !== "patient" ? { company } : {}),
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        setMessage("Sign up successful! Redirecting to sign in...");
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

        {/* Role Selection Tabs */}
        <div className="flex mt-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("patients")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "patients"
                ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            Patients
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "doctors"
                ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveTab("enterprise")}
            className={cn(
              "flex-1 py-2 text-center",
              activeTab === "enterprise"
                ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            )}
          >
            Enterprise
          </button>
        </div>

        {/* Sign Up Form */}
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {activeTab === "patients" && (
            <>
              <div className="mb-4">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  placeholder="Male/Female/Other"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="Any allergies?"
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
            </>
          )}

          {(activeTab === "doctors" || activeTab === "enterprise") && (
            <div className="mb-4">
              <Label htmlFor="company">Company ID / Work Email</Label>
              <Input
                id="company"
                placeholder="Company ID or work email"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
          >
            Sign Up &rarr;
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </>
  );
}
