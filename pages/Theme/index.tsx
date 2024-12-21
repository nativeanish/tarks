import { useState, useEffect } from "react";
import {
  FaArrowLeft as ChevronLeft,
  FaArrowRight as ChevronRight,
} from "react-icons/fa";
import useTheme, { theme } from "../../store/useTheme";
import { useNavigate } from "react-router-dom";
import useAddress from "../../store/useAddress";
import ConnectButton from "../../components/ConnectButton";
const images: Array<{ desktop: string; mobile: string; tag: theme }> = [
  {
    desktop: "classicLight.png",
    mobile: "classicLightM.png",
    tag: "classicLight",
  },
  {
    desktop: "classicDark.png",
    mobile: "classicDarkM.png",
    tag: "classicDark",
  },
  {
    desktop: "classicBrut.png",
    mobile: "classicBrutM.png",
    tag: "classicBrut",
  },
  {
    desktop: "bentoLight.png",
    mobile: "bentoLightM.png",
    tag: "bentoLight",
  },
  {
    desktop: "bentoDark.png",
    mobile: "bentoDarkM.png",
    tag: "bentoDark",
  },
  {
    desktop: "windowLight.png",
    mobile: "windowLightM.png",
    tag: "windowLight",
  },
  {
    desktop: "windowDark.png",
    mobile: "windowDarkM.png",
    tag: "windowDark",
  },
];

function Theme() {
  const address = useAddress((state) => state.address);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const setTheme = useTheme((state) => state.setTheme);
  const theme = useTheme((state) => state.theme);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const router = useNavigate();
  useEffect(() => {
    if (theme) {
      router(`/editor?theme=${theme}`);
    }
  }, [theme]);
  useEffect(() => {
    if (!address || !address?.length) {
      router("/");
    }
  }, [address]);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleApply = () => {
    setTheme(images[currentIndex].tag);
  };

  return (
    <div>
      <div className="min-h-screen bg-yellow-300 flex flex-col p-4 sm:p-6 font-mono">
        <nav className="flex items-center justify-between mb-8 sm:mb-16">
          <div className="text-xl sm:text-2xl font-bold bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded">
            <span className="text-yellow-300">META</span>Link
          </div>
          <ConnectButton />
        </nav>
      </div>
      <div className="flex flex-col bg-black text-white">
        <div className="relative flex-grow w-full">
          <div className="absolute inset-0">
            {isMobile ? (
              <img
                src={`./image/${images[currentIndex].mobile}`}
                alt={`Theme ${images[currentIndex].tag}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`./image/${images[currentIndex].desktop}`}
                alt={`Theme ${images[currentIndex].tag}`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {images[currentIndex].tag}
            </div>
          </div>
          <button
            onClick={goToPrevious}
            className="text-black absolute rounded-md left-2 md:left-8 top-1/2 transform -translate-y-1/2 h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={goToNext}
            className="absolute text-black rounded-md right-2 md:right-8 top-1/2 transform -translate-y-1/2 h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 gap-4">
            <div className="flex gap-2 border-2 border-black p-2 rounded-full bg-[#f5f5f5]">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full border-2 border-black ${
                    index === currentIndex ? "bg-[#A6FAFF]" : "bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleApply}
              className="h-14 pl-8 pr-8 border-black border-2 p-2.5 bg-[#A6FAFF] rounded-md hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] text-black text-2xl font-bold uppercase tracking-widest"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;
