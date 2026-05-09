"use client";

import { useEffect, useRef } from "react";

import QrScanner from "qr-scanner";

type Props = {
  onScan: (
    result: string,
  ) => void;
};

export default function QRScanner({
  onScan,
}: Props) {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (!videoRef.current)
      return;

    const scanner =
      new QrScanner(
        videoRef.current,

        (result) => {
          onScan(result.data);
        },

        {
          highlightScanRegion:
            true,

          highlightCodeOutline:
            true,
        },
      );

    "use client";

import { useEffect, useRef }
from "react";

import QrScanner
from "qr-scanner";

type Props = {
  onScan: (
    result: string,
  ) => void;
};

export default function QRScanner({
  onScan,
}: Props) {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (!videoRef.current)
      return;

    const scanner =
      new QrScanner(
        videoRef.current,

        (result) => {

          console.log(
            result.data,
          );

          onScan(
            result.data,
          );
        },

        {
          highlightScanRegion:
            true,

          highlightCodeOutline:
            true,
        },
      );

    scanner.start();

    return () => {
      scanner.stop();
      scanner.destroy();
    };

  }, [onScan]);

  return (
    <video
      ref={videoRef}
      className="w-full rounded-3xl"
    />
  );
}
  