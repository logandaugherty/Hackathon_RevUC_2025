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
    // Add your sign in logic here
  };

  const handleSignUp = () => {
    // Navigate to the sign-up page
    router.push("/signup");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign In to RxLogistics
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please sign in to your account.
      </p>

      {/* Tabs for user roles */}
      <div className="flex mt-4 mb-6 border-b">
        <button
          className={cn(
            "flex-1 py-2 text-center",
            activeTab === "patients"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          )}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-center",
            activeTab === "doctors"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          )}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-center",
            activeTab === "logistics"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          )}
          onClick={() => setActiveTab("logistics")}
        >
          Logistics
        </button>
      </div>

      {/* Sign in form */}
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="you@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>
      </form>

      {/* Sign up button */}
      <div className="text-center">
        <span className="text-neutral-600 dark:text-neutral-300 text-sm">
          Don&apos;t have an account?
        </span>
        <button
          className="ml-2 text-blue-500 font-medium"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
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

// Default export for Next.js page, including the Header component
export default function Page() {
  return (
    <>
      <Header />
      <SignInPage />
    </>
  );
}
