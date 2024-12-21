import ConnectButton from "../../components/ConnectButton";
import { useState, useEffect } from "react";

const handles = ["anish.dev", "main.dev", "ashos.dev", "marc.dev"];

export default function Index() {
  const [handle, setHandle] = useState("");
  const [currentHandle, setCurrentHandle] = useState(0);

  // Animation effect for handles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHandle((prev) => (prev + 1) % handles.length);
    }, 2000); // Change handle every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-yellow-300 p-6 font-mono">
      {/* Header */}
      <nav className="flex items-center justify-between mb-20">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          Your Links,
          <br />
          Your Control,
          <br />
          <span className="bg-black text-yellow-300 px-4">Decentralized.</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl font-medium">
          Create your decentralized link hub. Own your content, control your
          presence. No intermediaries, just pure web3 freedom.
        </p>
      </div>

      {/* Links Section */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="bg-white border-4 border-black p-8 transform hover:translate-x-1 hover:translate-y-1 transition-transform">
          <div className="space-y-4">
            {/* Claim Your Handle Section */}
            <div className="bg-black text-white p-4">
              <h2 className="text-lg mb-2">Claim Your Handle</h2>
              <div className="flex gap-2">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Your handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-white text-black p-2 sm:p-3 text-sm sm:text-base outline-none"
                  />
                  <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
                    <span className="text-black font-medium transition-opacity duration-500 opacity-80 text-sm sm:text-base">
                      {handles[currentHandle]}
                    </span>
                  </div>
                </div>
                <button className="bg-yellow-300 text-black hover:bg-yellow-400 px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors whitespace-nowrap">
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
