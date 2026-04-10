// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EnquirySkeleton from "./EnquirySkeleton";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 16, letterSpacing: "0.22em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0.08em",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function TrendyPortfolioCards() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5030/api/GetAllPhoto")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (loading) return <EnquirySkeleton />;

  return (
    <section className="py-15 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            relative inline-block
            text-3xl md:text-4xl
            font-heading
            mb-16
            text-[#d4af37]
            tracking-[0.22em]
            drop-shadow-[0_4px_14px_rgba(212,175,55,0.4)]
          "
        >
          SHOT FOR EVERY SEASON OF LIFE
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="
              absolute left-1/2 -bottom-3
              w-24 h-[1.5px]
              bg-gradient-to-r from-transparent via-[#d4af37] to-transparent
              -translate-x-1/2 origin-center
            "
          />
        </motion.h2>
        <p
          className="testimonial__quote 
          text-white 
          text-lg md:text-xl 
          leading-relaxed 
          tracking-wide 
          font-serif 
          animate-fadeInScale 
        mb-20 "
        >
          “Your wedding, as it felt — not just how it looked.
          <br />
          Our films focus on emotion, rhythm, and narrative. Every frame is
          intentional. Every transition meaningful. This is not a highlight reel
          stitched to music. It’s a story you’ll want to revisit for decades.
          <br />
          Shot discreetly. Edited cinematically. Delivered timelessly.”
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -8 }}
              className="
                relative h-[310px]
                overflow-hidden
                group
                cursor-pointer
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                border border-[#d4af37]/30
                hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
                transition-shadow duration-500 
              "
            >
              {/* Image */}
              {/* <div
                className="
                  absolute inset-0
                  bg-cover bg-center
                  transition-transform duration-700
                  group-hover:scale-105
                "
                style={{ backgroundImage: `url(${item.bg})` }}
              /> */}
              {/* <img
                src={item.filePath}
                alt={item.category}
                className="
                  absolute inset-0
                  bg-cover bg-center
                  transition-transform duration-700
                  group-hover:scale-105
                "
              /> */}
              {/* Image */}
              {item.isThumbnail ? (
                <img
                  src={item.filePath}
                  alt={item.category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                ""
              )}
              {/* Overlay */}
              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80 via-black/40 to-transparent
              "
              />
              {/* Border highlight on hover */}
              <div
                className="
                absolute inset-0
                
                border border-[#d4af37]/30
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-400
              "
              />
              {/* Button */}
              <div
                className="
                absolute inset-x-0 bottom-0
                pb-6
                flex justify-center
                translate-y-4
                opacity-0
                group-hover:translate-y-0
                group-hover:opacity-100
                transition-all duration-400
              "
              >
                <button
                  className="
                    px-8 py-2.5
                    rounded-full
                    text-xs md:text-sm
                    tracking-widest
                    text-black
                    bg-gradient-to-r from-[#d4af37] to-[#ffd700]
                    shadow-[0_8px_20px_rgba(212,175,55,0.35)]
                    hover:scale-105
                    transition-transform duration-300
                  "
                >
                  {item.category}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
