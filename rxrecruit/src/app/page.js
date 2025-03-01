"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

export function SignInPage() {
  const [activeTab, setActiveTab] = useState("patients");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in submitted for:", activeTab);
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-gray-900 relative">
      {/* Shapes Background */}
      <div className="absolute inset-0 z-0 bg-pattern"></div>

      <div className="flex w-full max-w-6xl mx-auto px-2">
        {/* Left Section - Explanatory Text */}
        <div className="flex-1 text-white flex items-center justify-center">
          <div>
            <h2 className="font-bold text-4xl mb-4">Welcome to RxRecruits</h2>
            <p className="text-lg mb-4">
              Join our platform to connect with patients, doctors, and logistics professionals. 
              Sign in to get started and explore the features tailored to your role.
            </p>
            <p className="text-sm text-gray-300">
              Already have an account? Sign in to continue. Don't have one? 
              <button 
                className="ml-1 text-blue-500 font-medium hover:underline" 
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Right Section - Sign-in Form */}
        <div className="w-96 max-w-md mx-auto rounded-lg p-6 md:p-8 shadow-xl bg-white dark:bg-gray-800 relative z-10">
          <h2 className="font-bold text-2xl text-gray-800 dark:text-white text-center">
            Sign In to RxRecruits
          </h2>
          <p className="text-gray-600 text-sm mt-2 dark:text-gray-300 text-center">
            Please sign in to your account.
          </p>

          {/* User Role Tabs */}
          <div className="flex mt-6 mb-6 border-b border-gray-300 dark:border-gray-700">
            {["patients", "doctors", "logistics"].map((role) => (
              <button
                key={role}
                className={cn(
                  "flex-1 py-2 text-center transition-all duration-200",
                  activeTab === role
                    ? "border-b-2 border-blue-500 font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                )}
                onClick={() => setActiveTab(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          {/* Sign-in Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="you@example.com" type="email" className="rounded-lg" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" className="rounded-lg" />
            </LabelInputContainer>

            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white w-full rounded-lg h-11 font-medium shadow-md flex items-center justify-center relative group"
              type="submit"
            >
              Sign In &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover:opacity-100 transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover:opacity-100 blur-sm transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children }) => (
  <div className="flex flex-col space-y-2">{children}</div>
);

// Page export with Header
export default function Page() {
  return (
    <>
      <Header />
      <SignInPage />
    </>
  );
}
