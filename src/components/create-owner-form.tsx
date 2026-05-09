"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

export default function CreateOwnerForm({
  businesses,
}: {
  businesses: {
    id: string;
    name: string;
  }[];
}) {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (
      formData: FormData,
    ) => {

      try {

        setLoading(true);

        const res =
          await fetch(
            "/api/create-owner",
            {
              method: "POST",

              body: JSON.stringify({
                email:
                  formData.get(
                    "email",
                  ),

                password:
                  formData.get(
                    "password",
                  ),

                businessId:
                  formData.get(
                    "businessId",
                  ),
              }),
            },
          );

        if (!res.ok) {
          throw new Error();
        }

        alert(
          "Owner created",
        );

        router.refresh();

      } catch {

        alert(
          "Something went wrong",
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-3xl border bg-white p-6 shadow-xl"
    >

      <h2 className="text-2xl font-bold">
        Create Owner
      </h2>

      {/* Email */}
      <input
        name="email"
        placeholder="Owner email"
        className="w-full rounded-2xl border p-4"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full rounded-2xl border p-4"
      />

      {/* Business */}
      <select
        name="businessId"
        className="w-full rounded-2xl border p-4"
      >

        {businesses.map(
          (business) => (
            <option
              key={business.id}
              value={business.id}
            >
              {business.name}
            </option>
          ),
        )}

      </select>

      {/* Button */}
      <button
        disabled={loading}
        className="w-full rounded-2xl bg-black py-4 text-white"
      >
        {loading
          ? "Creating..."
          : "Create Owner"}
      </button>

    </form>
  );
}