import heroVideo from "../assets/hero.mp4";
import { useNavigate } from "react-router-dom";
export default function HeroVideo() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay (for text contrast) */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex h-full items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-white">
            STAMY CREATIONS
          </h1>
          <p className="mt-6 text-sm md:text-base tracking-widest text-[#d4af37] max-w-2xl mx-auto">
            We create cinematic wedding films that capture love, joy, and
            timeless memories. Every story we tell is handcrafted with care,
            passion, and a touch of elegance, turning your special day into a
            beautiful visual journey.
          </p>

          <button
            className="mt-10 px-8 py-3 border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-black transition"
            onClick={() => navigate("/Enquiry")}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
}
