import { useState } from "react";
import ConnectButton from "../../components/ConnectButton";
import DeviceMockup from "../../components/DeviceMockUp";
function Editor() {
  const [splitPosition] = useState(50);
  return (
    <div
      id="main"
      className="min-h-screen bg-yellow-300 p-6 font-mono relative overflow-hidden flex flex-col"
    >
      <nav className="flex items-center justify-between mb-4 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
      <div className="flex h-screen">
        <div
          id="left-panel"
          className=" overflow-auto"
          style={{ width: `${splitPosition}%` }}
        >
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
          <h1>hello worldyy</h1>
        </div>
        <div
          id="right-panel"
          className="bg-yellow-300 overflow-auto"
          style={{ width: `${100 - splitPosition}%` }}
        >
          <DeviceMockup>
            <h1>hello world</h1>
          </DeviceMockup>
        </div>
      </div>
    </div>
  );
}

export default Editor;
