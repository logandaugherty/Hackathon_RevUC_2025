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

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-gray-900">
        <div className="flex w-full max-w-6xl mx-auto px-2">
          {/* Left Section - Informational */}
          <div className="flex-1 text-white flex items-center justify-center">
            <div>
              <h2 className="font-bold text-4xl mb-4">Welcome to RxRecruits</h2>
              <p className="text-lg mb-4">
                Join our platform to connect with patients, doctors, and
                logistics professionals. Sign in to get started.
              </p>
              <p className="text-sm text-gray-300">
                Don&apos;t have an account?{" "}
                <button
                  className="ml-1 text-blue-500 font-medium hover:underline"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
          {/* Right Section - Sign In Form */}
          <div className="w-96 max-w-md mx-auto rounded-lg p-6 md:p-8 shadow-xl bg-white dark:bg-gray-800">
            <h2 className="font-bold text-2xl text-gray-800 dark:text-white text-center">
              Sign In to RxRecruits
            </h2>
            <p className="text-gray-600 text-sm mt-2 dark:text-gray-300 text-center">
              Please enter your credentials.
            </p>
            {/* Role Selection Tabs */}
            <div className="flex mt-6 mb-6 border-b border-gray-300 dark:border-gray-700">
              {["patients", "doctors", "enterprise"].map((role) => (
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
            {/* Sign In Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
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
                  className="rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white w-full rounded-lg h-11 font-medium shadow-md flex items-center justify-center"
              >
                Sign In &rarr;
              </button>
            </form>
            {message && (
              <p className="mt-4 text-center text-green-500">{message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
