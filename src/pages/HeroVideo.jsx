import heroVideo from "../assets/hero.mp4";
import { useNavigate } from "react-router-dom";
import BlurText from "../components/BlurText";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HeroVideo() {
  const navigate = useNavigate();

  return (
    <>
      {/* FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:wght@300;400&display=swap');
      `}</style>

      <section className="relative h-dvh md:h-screen w-full overflow-hidden">
        {/* VIDEO */}
        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* CONTENT */}
        <div className="relative z-20 flex h-full items-center justify-center text-center px-4 sm:px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.3 },
              },
            }}
            className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl"
          >
            {/* TITLE */}
            <BlurText
              className="text-white flex items-center justify-center text-center tracking-wide bold text-9xl font-serif allura-regular"
              text="Stamy Creations"
            />

            {/* LINE */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                visible: { scaleX: 1, opacity: 1 },
              }}
              transition={{ duration: 1 }}
              className="w-10 sm:w-12 h-px bg-[#d4af37] mx-auto mt-5 sm:mt-6 origin-left"
            />

            {/* TAGLINE */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-4 sm:mt-5 text-[#d4af37] text-[9px] sm:text-xs md:text-sm tracking-[0.25em] uppercase"
              style={{
                fontWeight: 300,
              }}
            >
              Cinematic Wedding Films
            </motion.p>

            {/* DESCRIPTION */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="mt-5 sm:mt-6 text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-[90%] sm:max-w-md md:max-w-xl mx-auto"
              style={{
                fontWeight: 300,
              }}
            >
              We craft timeless wedding films that capture emotion, elegance,
              and the essence of your story — turning fleeting moments into
              memories that last forever.
            </motion.p>

            {/* BUTTON */}
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/Enquiry")}
              className="mt-8 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 border border-[#d4af37] text-[#d4af37] uppercase tracking-[0.2em] text-[9px] sm:text-xs 
              hover:bg-[#d4af37] hover:text-black transition-all duration-500"
              style={{
                fontWeight: 400,
              }}
            >
              Enquire Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
