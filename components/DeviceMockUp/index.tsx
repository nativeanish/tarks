import React from "react";

interface MobileDeviceMockupProps {
  children: React.ReactNode;
  deviceColor?: "black" | "white" | "gold";
}

const DeviceMockup: React.FC<MobileDeviceMockupProps> = ({
  children,
  deviceColor = "black",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div
        className={`relative w-[375px] h-[667px]  overflow-hidden shadow-xl border-black border-2 ${
          deviceColor === "white"
            ? "bg-gray-100"
            : deviceColor === "gold"
            ? "bg-yellow-100"
            : "bg-gray-800"
        }`}
      >
        {/* Device frame */}
        <div className="absolute inset-0 border-[14px] border-black  pointer-events-none"></div>

        {/* Top notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-black"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black "></div>

        {/* Side button */}
        <div className="absolute top-20 -right-3 w-3 h-16 bg-gray-400 "></div>

        {/* Content area */}
        <div className="absolute inset-0 overflow-y-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceMockup;
