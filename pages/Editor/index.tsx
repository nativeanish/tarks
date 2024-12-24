import ConnectButton from "../../components/ConnectButton";
import DeviceMockup from "../../components/DeviceMockUp";
import ImageUploader from "../../components/Editor/ImageUploader";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import SearchBar from "../../components/SearchBar";
import { LinkDisplay } from "../../components/LinkDisplay";
import useProfile from "../../store/useProfile";
import ClassicLight from "../../theme/ClassicLight";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import themes from "../../constants/themes";

function Editor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Access the 'theme' query parameter
  const _theme = searchParams.get("theme");
  const theme = themes.find((t) => t.title === _theme);
  useEffect(() => {
    if (!theme) {
      navigate("/theme");
    }
  }, [theme]);

  const name = useProfile((state) => state.name);
  const setName = useProfile((state) => state.setName);
  const description = useProfile((state) => state.description);
  const setDescription = useProfile((state) => state.setDescription);
  const link = useProfile((state) => state.links);
  const image = useProfile((state) => state.image);
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
          <Input value={name} onChange={(e) => setName(e)} width="w-full" />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e)}
            width="w-full"
          />
          <SearchBar />
          {link.map((l, e) => (
            <LinkDisplay key={e} id={l.uuid} />
          ))}
        </div>

        {/* Right Panel - 75% */}
        <div className="w-3/4 overflow-auto">
          <DeviceMockup>
            <ClassicLight
              name={name}
              description={description}
              image={image}
              links={link}
            />
          </DeviceMockup>
        </div>
      </div>
    </div>
  );
}

export default Editor;
