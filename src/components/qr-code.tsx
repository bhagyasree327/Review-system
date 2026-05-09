"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  url: string;
};

export default function QRCodeCard({
  url,
}: Props) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(url)
      .then(setQr)
      .catch(console.error);
  }, [url]);

  const downloadQR = () => {
    const link =
      document.createElement("a");

    link.href = qr;
    link.download = "reviewflow-qr.png";

    link.click();
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold">
        Business QR
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Customers scan this QR to
        leave reviews instantly.
      </p>

      {qr && (
        <img
          src={qr}
          alt="QR Code"
          className="mx-auto mt-6 h-64 w-64 rounded-2xl border p-3"
        />
      )}

      <button
        onClick={downloadQR}
        className="mt-6 w-full rounded-2xl bg-black py-4 text-white transition hover:bg-gray-800"
      >
        Download QR
      </button>
    </div>
  );
}