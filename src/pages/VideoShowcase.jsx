// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlimpseGallery from "./GlimpseGallery";
import VideoSlideshow from "./VideoSlideShow";
import DashboardImages from "./DashboardImages";

export default function PhilosophyPremium() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400&display=swap');
      `}</style>
      <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-16 md:py-24">
        {/* 📝 HEADING */}
        <h1
          className="text-center uppercase text-[#1a1a1a] mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 4vw, 42px)",
            fontWeight: 300,
            letterSpacing: "6px",
          }}
        >
          Your story deserves more than just a camera
        </h1>

        {/* ✨ SUBTITLE */}
        <p className="font-semibold text-center text-sm sm:text-base tracking-wide mb-4">
          Welcome to our world of storytelling
        </p>

        {/* 📖 DESCRIPTION */}
        <p
          className="
            text-center mx-auto 
            leading-relaxed tracking-wide
            text-sm sm:text-base md:text-lg
            max-w-3xl md:max-w-5xl
            px-2 sm:px-4
          "
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#000",
          }}
        >
          Soulful Sonnets by Sabari is a wedding photography and film brand that
          is dedicated to capturing the most special moments of your big day in
          the most authentic and creative way possible. Led by Sabari, a
          talented and passionate photographer with years of experience in the
          industry, this brand offers a unique style of documentary wedding
          photography that is infused with live audio recordings.
        </p>

        {/* 🔘 BUTTON */}
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => navigate("/AboutUs")}
            className="
              px-6 sm:px-8 py-3 sm:py-4 
              font-bold border border-gray-600 
              text-gray-700 tracking-widest uppercase 
              text-xs sm:text-sm
              hover:bg-gray-800 hover:text-white 
              transition duration-300
            "
          >
            Read More
          </button>
        </div>
      </section>

      <GlimpseGallery />
      <VideoSlideshow />
      <DashboardImages />
      {/* <section className=" py-14 md:py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {data.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center text-center px-6 md:px-10 py-14 md:py-16
              ${index !== 2 ? "md:border-r border-black/5" : ""}`}
            >
              <div className="h-[120px] md:h-[140px] flex items-center justify-center mb-8">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="max-h-full object-contain opacity-70 transition duration-500 hover:opacity-100 hover:scale-105"
                />
              </div>

              <h2
                className="uppercase text-black mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "15px",
                  letterSpacing: "0.35em",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </h2>

              <div className="w-8 h-px bg-[#c9a857] mb-8" />

              <p
                className="text-[#5a5a5a]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  maxWidth: "360px",
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section> */}
    </>
  );
}
