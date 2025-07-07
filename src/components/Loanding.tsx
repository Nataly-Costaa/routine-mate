"use client";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/Animation - 1751912066165.json";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-123">
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}
