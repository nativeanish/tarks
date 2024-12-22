import { useState } from "react";
import ConnectButton from "../../components/ConnectButton";
import DeviceMockup from "../../components/DeviceMockUp";

function Editor() {
  const [splitPosition] = useState(50);
  return (
    <div
      id="main"
      className="h-screen bg-yellow-300 p-6 font-mono relative overflow-hidden flex flex-col"
    >
      <nav className="flex items-center justify-between mb-4 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <div
          id="left-panel"
          className="overflow-y-auto"
          style={{ width: `${splitPosition}%` }}
        ></div>
        <div
          id="right-panel"
          className="bg-yellow-300 overflow-y-auto flex items-center justify-center"
          style={{ width: `${100 - splitPosition}%` }}
        >
          <DeviceMockup>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Mobile Title</h1>
              <p className="text-sm">
                This content will display in a mobile-friendly way
              </p>
            </div>
          </DeviceMockup>
        </div>
      </div>
    </div>
  );
}

export default Editor;
