import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { AiFillPlayCircle } from "react-icons/ai";
import heroVideo from "../assets/hero.mp4";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
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
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="
      text-white 
      text-3xl 
      sm:text-5xl 
      md:text-6xl 
      lg:text-7xl 
      leading-tight 
      uppercase 
      text-center 
      max-w-5xl
    "
            style={{
              fontFamily: "Ambroise, serif",
            }}
          >
            THERE’S NOTHING THAT WE ENJOY MORE THAN TELLING YOUR STORY
          </motion.h1>
        </div>
      </div>
      <section className="pt-10 text-white">
        <div className="mx-auto px-4 sm:px-6 text-center">
          <div className="mt-10  px-2 sm:px-4">
            {/* 🔥 Heading (Responsive Fixed) */}
            <div className="my-10 px-4 sm:px-8 md:px-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="
      text-black 
      uppercase 
      text-center 
      mb-6 sm:mb-8 md:mb-10
      text-xl 
      sm:text-3xl 
      md:text-5xl 
      lg:text-6xl
      leading-snug
    "
                style={{
                  fontFamily: "Ambroise, serif",
                  letterSpacing: "0.04em",
                }}
              >
                Bringing Your Vision to Life
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="
      text-center 
      leading-relaxed 
      tracking-wide 
      text-sm 
      sm:text-base 
      md:text-lg 
      lg:text-xl 
      max-w-6xl 
      mx-auto
    "
                style={{
                  fontFamily: "proximanovaexcn light",
                  color: "#000000",
                }}
              >
                There is a magic in storytelling that only film can truly
                capture. We are constantly inspired by the raw, unscripted
                beauty of weddings the split second where an emotion peaks and a
                memory is born. By positioning ourselves at the heart of the
                action, we document the dynamics of your celebration to create a
                story that feels as real as the day it happened. We love what we
                do because we believe your most precious memories deserve to be
                relived, not just remembered.
              </motion.p>
            </div>

            {/* 🔥 Grid (Responsive Fixed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-2 lg:gap-4 px-4 sm:px-6 md:px-10 lg:px-16 pb-8 mt-20">
              {events.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative overflow-hidden cursor-pointer transition duration-500"
                >
                  {/* IMAGE / VIDEO */}
                  <div
                    className="relative w-full aspect-[5/4] sm:aspect-[5/4] md:aspect-[16/11] lg:aspect-[16/10] 
                active:scale-[0.98] transition-transform overflow-hidden"
                  >
                    {playingVideo === idx ? (
                      <iframe
                        src={`${getEmbedUrl(item.youtubeId)}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&fs=1`}
                        title={item.eventName}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {/* Background Image */}
                        <img
                          src={item.videoThumbnailImage || item.thumbnail}
                          alt={item.eventName}
                          className="
                          w-full h-full object-cover
                          transition duration-700
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
                          <h2
                            style={{
                              fontFamily: "'Aesthet light', serif",
                              fontWeight: 300,
                              letterSpacing: "0.06em",
                              fontSize: "clamp(0.6rem, 2.2vw, 1.6rem)",
                            }}
                            className="
                            text-white
                            text-sm sm:text-base md:text-lg lg:text-xl
                            leading-snug
                          "
                          >
                            {item.eventName}
                          </h2>
                          <p
                            style={{
                              fontFamily: "proximanovaexcn light,serif",
                              fontSize: "clamp(0.4rem, 1.5vw, 0.65rem)",
                            }}
                            className="tracking-[0.2em] font-bold  uppercase mb-1"
                          >
                            {new Date(item.eventDate).toDateString()}
                          </p>
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
    </>
  );
}
