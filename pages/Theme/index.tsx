import { useState, useEffect } from "react";
import {
  FaArrowLeft as ChevronLeft,
  FaArrowRight as ChevronRight,
} from "react-icons/fa";
import { theme } from "../../store/useTheme";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleApply = () => {
    // Here you would typically set the theme in your application
    console.log(`Applying theme: ${images[currentIndex].tag}`);
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
        <main className="flex-grow flex flex-col items-center justify-center -mt-8">
          {/* Carousel */}
          <div className="relative w-full max-w-6xl aspect-video bg-white border-4 border-black">
            <img
              src={`/image/${
                isMobile
                  ? images[currentIndex].mobile
                  : images[currentIndex].desktop
              }`}
              alt={`Theme ${images[currentIndex].tag}`}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black p-2 rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous theme</span>
            </button>
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black p-2 rounded-full"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next theme</span>
            </button>
          </div>

          {/* Theme name and apply button */}
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 uppercase">
              {images[currentIndex].tag}
            </h2>
            <button
              className="bg-black text-yellow-400 text-xl py-3 px-8 hover:bg-yellow-400 hover:text-black border-2 border-black transition-colors"
              onClick={handleApply}
            >
              APPLY THEME
            </button>
          </div>

          {/* Indicator dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 p-0 rounded-none ${
                  index === currentIndex
                    ? "bg-black"
                    : "bg-white border-2 border-black hover:bg-yellow-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Theme {index + 1}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Theme;
