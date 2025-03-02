"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("patients");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role =
      activeTab === "patients"
        ? "patient"
        : activeTab === "doctors"
        ? "doctor"
        : "enterprise";

    const payload = { role, email, password };

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        setMessage("Sign in successful! Redirecting...");
        setTimeout(() => {
          if (data.user.role === "patient") {
            router.push("/patient/dashboard");
          } else if (data.user.role === "doctor") {
            router.push("/doctor/dashboard");
          } else if (data.user.role === "enterprise") {
            router.push("/enterprise/dashboard");
          } else {
            router.push("/dashboard");
          }
        }, 2000);
      } else {
        setMessage("Sign in failed: " + data.error);
      }
    } catch (error) {
      setMessage("Sign in error: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md w-full mx-auto rounded-md p-4 md:p-8 shadow bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Sign In to RxLogistics
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Please enter your credentials.
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

        {/* Sign In Form */}
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email Address</Label>
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
          <button
            type="submit"
            className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
          >
            Sign In &rarr;
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}
      </div>
    </>
  );
}
