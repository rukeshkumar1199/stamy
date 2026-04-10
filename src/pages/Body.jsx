import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AiFillPlayCircle } from "react-icons/ai";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

// const services = [
//   {
//     title: "Espresso Stories",
//     bg: "/images/insta1.jpg",
//     youtubeId: "https://www.youtube.com/watch?v=m4YL3DTIN7w&t=3s",
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Body() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [events, setEvents] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    <section className="pt-10 text-white">
      <div className="mx-auto px-4 sm:px-6 text-center">
        <div className="mt-12 mb-20 px-2 sm:px-4">
          {/* 🔥 Heading (Responsive Fixed) */}
          <div className="my-16">
            <p
              className="
                uppercase tracking-[0.2em]
                text-[10px] sm:text-xs md:text-sm
                text-[#d4af37] mb-3
              "
            >
              Elevating Moments Into Timeless Films
            </p>

            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="
                text-xl sm:text-3xl md:text-5xl lg:text-6xl
                text-black
                leading-snug md:leading-tight
                max-w-4xl mx-auto
              "
            >
              Turning Moments Into Cinematic Films & Videos
            </h2>
          </div>

          {/* 🔥 Grid (Responsive Fixed) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-2 sm:px-4 md:px-10">
            {events.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden cursor-pointer rounded-xl shadow-sm hover:shadow-xl transition duration-500"
              >
                {/* IMAGE / VIDEO */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AiFillPlayCircle
                          onClick={() => setPlayingVideo(idx)}
                          className="
                            text-white text-4xl sm:text-5xl md:text-6xl
                            opacity-90
                            transition duration-300
                            group-hover:scale-110 group-hover:opacity-100
                          "
                        />
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 text-left">
                        <p className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-white/70 uppercase mb-1">
                          {new Date(item.eventDate).toDateString()}
                        </p>

                        <h3
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="
                            text-white
                            text-sm sm:text-base md:text-lg lg:text-xl
                            leading-snug
                          "
                        >
                          {item.eventName}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
