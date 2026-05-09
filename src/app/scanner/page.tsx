"use client";

import { useRouter }
from "next/navigation";

import QRScanner
from "~/components/qr-scanner";

export default function ScannerPage() {

  const router =
    useRouter();

  const handleScan = (
    result: string,
  ) => {

    console.log(result);

    // If full URL
    if (
      result.startsWith("http")
    ) {

      window.location.href =
        result;

      return;
    }

    // If route
    router.push(result);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-xl">

        <h1 className="mb-6 text-3xl font-bold">
          QR Scanner
        </h1>

        <p className="mb-6 text-gray-500">
          Scan QR code
        </p>

        <QRScanner
          onScan={handleScan}
        />

      </div>
    </main>
  );
}