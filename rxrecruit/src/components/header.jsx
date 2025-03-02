"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulating authentication check (Replace with actual auth check)
    const user = localStorage.getItem("user"); // Example: Check for user session
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <header className="bg-white dark:bg-black shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-500 cursor-pointer">
                RxRecruit
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/">
              <span className="text-gray-800 dark:text-gray-200 hover:text-blue-500 cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-800 dark:text-gray-200 hover:text-blue-500 cursor-pointer">
                About
              </span>
            </Link>
            {/* Show Sign Up & Sign In only if user is NOT authenticated */}
            {!isAuthenticated && (
              <>
                
                
              </>
            )}
            {/* Show Logout if user IS authenticated */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  localStorage.removeItem("user"); // Simulated Logout
                  setIsAuthenticated(false);
                }}
                className="text-gray-800 dark:text-gray-200 hover:text-red-500 cursor-pointer"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="block text-gray-800 dark:text-gray-200 hover:text-blue-500">
                About
              </span>
            </Link>
            {!isAuthenticated && (
              <>
                
              
              </>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  localStorage.removeItem("user"); // Simulated Logout
                  setIsAuthenticated(false);
                }}
                className="block text-gray-800 dark:text-gray-200 hover:text-red-500 w-full text-left px-2"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
