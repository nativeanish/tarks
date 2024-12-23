import { useState } from "react";
import ConnectButton from "../../components/ConnectButton";
import DeviceMockup from "../../components/DeviceMockUp";
import ImageUploader from "../../components/Editor/ImageUploader";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import SearchBar from "../../components/SearchBar";
import useLink from "../../store/useLink";
import { LinkDisplay } from "../../components/LinkDisplay";

function Editor() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const link = useLink((state) => state.link);
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
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Panel - 25% */}
        <div className="w-1/4 flex flex-col gap-6  border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-auto bg-white items-center">
          <h2 className="text-2xl font-bold uppercase border-b-4 border-black pb-4">
            Edit Content
          </h2>
          <ImageUploader />
          <Input value={text} onChange={(e) => setText(e)} width="w-full" />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e)}
            width="w-full"
          />
          <SearchBar />
          {link.map((l, e) => (
            <LinkDisplay key={e} id={l.id} />
          ))}
        </div>

        {/* Right Panel - 75% */}
        <div className="w-3/4 overflow-auto">
          <DeviceMockup>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Your Content</h1>
              <p className="text-sm">
                This is a preview of how your content will look on different
                devices
              </p>
            </div>
          </DeviceMockup>
        </div>
      </div>
    </div>
  );
}

export default Editor;
