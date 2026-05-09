"use client";

import { signIn }
from "next-auth/react";

import { useRouter }
from "next/navigation";

import { useState }
from "react";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {

      setLoading(true);

      const res =
        await signIn(
          "credentials",
          {
            email,
            password,
            redirect: false,
          },
        );

      setLoading(false);

      if (!res?.ok) {

        alert(
          "Invalid credentials",
        );

        return;
      }

      // Get session
      const sessionRes =
        await fetch(
          "/api/auth/session",
        );

      const session =
        await sessionRes.json();

      // Role redirect
      if (
        session?.user?.role ===
        "ADMIN"
      ) {

        router.push("/admin");

      } else {

        router.push("/owner");
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        {/* Title */}
        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Login
          </h1>

          <p className="mt-2 text-gray-500">
            Access your dashboard
          </p>

        </div>

        {/* Form */}
        <div className="mt-8 space-y-5">

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </div>
      </div>
    </main>
  );
}