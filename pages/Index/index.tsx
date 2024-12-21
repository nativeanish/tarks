import ConnectButton from "../../components/ConnectButton";
import { useState, useEffect } from "react";
import GlitchText from "../../components/Glitch";
import { glitchText } from "../../utils/glitchEffect";
import "../../components/Glitch/style.css";

const handles = ["anish.dev", "main.dev", "ashos.dev", "marc.dev"];

export default function Index() {
  const [handle, setHandle] = useState("");
  const [currentHandle, setCurrentHandle] = useState(0);
  const [glitchText1, setGlitchText1] = useState("Your Links,");
  const [glitchText2, setGlitchText2] = useState("Your Control,");
  const [glitchText3, setGlitchText3] = useState("Decentralized.");
  const [glitchComplete, setGlitchComplete] = useState(false);

  // Handle rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHandle((prev) => (prev + 1) % handles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Single glitch effect on mount
  useEffect(() => {
    if (glitchComplete) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchText1(glitchText("Your Links,", iteration));
      setGlitchText2(glitchText("Your Control,", iteration));
      setGlitchText3(glitchText("Decentralized.", iteration));

      iteration += 1;

      if (iteration >= 12) {
        clearInterval(interval);
        setGlitchText1("Your Links,");
        setGlitchText2("Your Control,");
        setGlitchText3("Decentralized.");
        setGlitchComplete(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [glitchComplete]);

  return (
    <main className="min-h-screen bg-yellow-300 p-6 font-mono">
      <nav className="flex items-center justify-between mb-20">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>

      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <GlitchText text={glitchText1} />
          <br />
          <GlitchText text={glitchText2} />
          <br />
          <GlitchText
            text={glitchText3}
            variant="black"
            className="transform hover:scale-105 transition-transform duration-300"
          />
        </h1>
        <p className="text-xl mb-8 max-w-2xl font-medium">
          Create your decentralized link hub. Own your content, control your
          presence. No intermediaries, just pure web3 freedom.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-20">
        <div className="bg-white border-4 border-black p-8 transform hover:translate-x-1 hover:translate-y-1 transition-transform">
          <div className="space-y-4">
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
