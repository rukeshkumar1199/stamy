import { useEffect, useState } from "react";

const images = [
  "/images/decor1.jpg",
  "/images/decor2.jpg",
  "/images/decor3.jpg",
  "/images/decor4.jpg",
];

export default function TrendySlideshow() {
  const [index, setIndex] = useState(0);

  // Preload next image
  useEffect(() => {
    const nextIndex = (index + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [index]);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="slide"
          loading="lazy"
          decoding="async"
          className={`
            absolute inset-0 w-full h-full
            object-cover object-center
            transition-all duration-[1800ms] ease-in-out
            ${
              i === index
                ? "opacity-100 scale-105 z-10"
                : "opacity-0 scale-100 z-0"
            }
          `}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              rounded-full transition-all duration-500
              ${
                i === index
                  ? "w-8 h-2 bg-[#d4af37]"
                  : "w-2 h-2 bg-white/60 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
