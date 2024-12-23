import ConnectButton from "../../components/ConnectButton";

function Publish() {
  return (
    <div>
      <main className="min-h-screen bg-yellow-300 p-6 font-mono relative overflow-hidden"></main>
      <nav className="flex items-center justify-between mb-20 relative z-10">
        <div className="text-2xl font-bold bg-black text-white px-4 py-2">
          <span className="text-yellow-300">META</span>Link
        </div>
        <ConnectButton />
      </nav>
    </div>
  );
}

export default Publish;
