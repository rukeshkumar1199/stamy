import heroVideo from "../assets/hero.mp4";
import { useNavigate } from "react-router-dom";
import BlurText from "../components/BlurText";
import { fadeUp } from "../animation";
import { motion } from "motion/react";
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
      <div className="relative flex-col z-20 flex h-full items-center justify-center text-center px-6">
        <BlurText
          className="text-3xl md:text-7xl font-medium tracking-widest text-white font-serif"
          text="STAMY CREATIONS"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "ease" }}
        >
          <p className="mt-6 text-center text-xs md:text-base tracking-wide text-[#d4af37] max-w-2xl mx-auto">
            We don’t just film weddings, we tell stories. Stories of love,
            laughter, and fleeting moments that deserve to last forever. Each
            film is crafted with intention, passion, and a cinematic touch,
            turning your day into a timeless visual journey.
          </p>
          <motion.button
            onClick={() => navigate("/Enquiry")}
            className="relative mt-10 px-8 cursor-pointer py-3 border border-[#d4af37] hover:text-black text-[#d4af37] uppercase tracking-[0.15em] text-xs overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            {/* Text */}
            <motion.span
              variants={{
                rest: { y: 0 },
                hover: { y: -2 },
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              Enquire Now
            </motion.span>

            {/* Background fill */}
            <motion.div
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#d4af37] origin-left"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
