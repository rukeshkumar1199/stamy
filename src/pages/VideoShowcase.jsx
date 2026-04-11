// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import TrendySlideshow from "./TrendySlideshow";
import Gallery from "./Gallery";
import { FiCamera, FiVideo } from "react-icons/fi";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const headingVariants = {
  hidden: { opacity: 0, y: 16, letterSpacing: "0.22em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0.08em",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

// const services = [
//   {
//     title: "Espresso Stories",
//     bg: "/images/insta1.jpg",
//     youtubeId: "L_jWHffIx5E",
//     catagory: "cafe",
//   },
//   {
//     title: "Sweetness in Focus",
//     bg: "/images/insta3.jpg",
//     youtubeId: "3JZ_D3ELwOQ",
//     catagory: "Concert",
//   },
//   {
//     title: "Sweetness in Focus",
//     bg: "/images/insta2.jpg",
//     youtubeId: "3JZ_D3ELwOQ",
//     catagory: "Restaurant",
//   },
//   {
//     title: "Unfiltered Nights",
//     bg: "/images/instasix1.jpg",
//     youtubeId: "L_jWHffIx5E",
//     catagory: "Restobar",
//   },
//   {
//     title: "Espresso Stories",
//     bg: "/images/instafivth1.jpg",
//     youtubeId: "L_jWHffIx5E",
//     catagory: "cafe",
//   },
//   {
//     title: "Sweetness in Focus",
//     bg: "/images/instafour1.jpg",
//     youtubeId: "3JZ_D3ELwOQ",
//     catagory: "Concert",
//   },
// ];

export default function TrendyPortfolioCards() {
  const navigate = useNavigate();
  const [playingVideo, setPlayingVideo] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://node-stamy.vercel.app/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // already embed link
    if (url.includes("embed")) return url;

    // normal youtube link
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);

    if (!match) return "";

    return `https://www.youtube.com/embed/${match[1]}`;
  };

  return (
    <section className="py-20  text-white">
      <div className=" mx-auto text-center">
        {/* Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="
      relative inline-block
      text-3xl md:text-5xl lg:text-6xl
      font-medium
      tracking-[0.12em]
      leading-tight
      text-transparent bg-clip-text
      bg-gradient-to-r from-[#d4af37]  to-[#d4af37]
    "
          >
            CAPTURE LIFE IN EVERY FRAME
            {/* Animated underline */}
            <span
              className="
      absolute left-1/2 -bottom-3
      w-0 h-[2px]
      bg-gradient-to-r from-transparent via-[#d4af37] to-transparent
      -translate-x-1/2
      group-hover:w-full
      transition-all duration-700
    "
            ></span>
          </h2>

          {/* Subtitle (important for attraction) */}
          <p
            className="
    mt-3
    text-gray-600
    text-sm md:text-base
    tracking-wide
    max-w-xl mx-auto
  "
          >
            Turning moments into timeless stories through cinematic visuals
          </p>
        </motion.div>
        <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
          <TrendySlideshow />
        </div>
        <Gallery />

        <div className="mt-15 px-4">
          <blockquote className="relative max-w-3xl mx-auto text-center">
            {/* Quote Icon */}
            <span
              className="
      absolute -top-6 left-1/2 -translate-x-1/2
      text-5xl text-[#d4af37]/40
      font-serif
    "
            >
              “
            </span>

            {/* Text */}
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="
        text-lg md:text-2xl
        text-gray-800
        leading-relaxed
        italic
      "
            >
              Films are a powerful medium of storytelling, and weddings are
              where they truly come alive. One perfect shot can capture the
              magic and emotions forever.
            </p>

            {/* Divider */}
            <div className="mt-6 flex justify-center">
              <span className="w-12 h-[1px] bg-[#d4af37]"></span>
            </div>

            {/* Author / Tag */}
            <p className="mt-4 text-xs tracking-widest text-gray-500 uppercase">
              Our Philosophy
            </p>
          </blockquote>
        </div>

        {/* Cards */}
        <section className="pt-10  text-white">
          <div className=" mx-auto px-6 text-center">
            <div className="mt-12 mb-24">
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mx-5">
                {events.map(
                  (item, idx) =>
                    idx < 6 && (
                      <motion.div
                        key={idx}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="group relative overflow-hidden  cursor-pointer "
                      >
                        {/* IMAGE / VIDEO */}
                        <div className="relative w-full aspect-[3/2] overflow-hidden mx-5">
                          {playingVideo === idx ? (
                            <iframe
                              src={`${getEmbedUrl(item.youtubeId)}?autoplay=1&rel=0`}
                              title={item.eventName}
                              className="absolute inset-0 w-full h-full"
                              allow="autoplay; fullscreen"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              {/* Background Image */}
                              <img
                                src={item.thumbnail}
                                alt={item.eventName}
                                className="
                     w-full h-full object-cover
                     transition duration-700
                     group-hover:scale-105
                   "
                              />

                              {/* Gradient Overlay */}
                              <div
                                className="
                   absolute inset-0
                   bg-gradient-to-t from-black/70 via-black/20 to-transparent
                 "
                              ></div>

                              {/* Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <AiFillPlayCircle
                                  onClick={() => setPlayingVideo(idx)}
                                  className="
                       text-white text-5xl md:text-6xl
                       opacity-90
                       transition duration-300
                       group-hover:scale-110 group-hover:opacity-100
                     "
                                />
                              </div>

                              {/* Title Bottom */}
                              <div className="absolute bottom-0 left-0 w-full p-5">
                                <p className="text-[10px] tracking-[0.2em] font-bold text-white/70 uppercase mb-1">
                                  {item.eventName}
                                </p>

                                <h3
                                  style={{
                                    fontFamily: "'Playfair Display', serif",
                                  }}
                                  className="
           text-white
           text-lg md:text-xl
           leading-snug
         "
                                >
                                  {item.eventPlace}
                                </h3>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ),
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="
      flex items-center gap-2 cursor-pointer
      px-5 py-3
      rounded-xl
      bg-[#b59a5b]
      text-white text-sm tracking-wide
      transition-all duration-300
      hover:bg-[#c9ad6a]
      hover:shadow-[0_8px_25px_rgba(181,154,91,0.4)]
      hover:-translate-y-1
      active:scale-95
    "
            onClick={() => navigate("/Body")}
          >
            <FiVideo className="text-lg" /> Explore Films
          </button>
        </div>
      </div>
    </section>
  );
}
