// PhotoGrid.jsx — Picturemakers Final

import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import cover from "../../public/images/cover.jpg";

export default function PhotoGrid() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300&family=Cormorant+Garamond:wght@300;400&display=swap");
      `}</style>

      <div className="bg-white min-h-screen">
        {/* ── HERO ── */}
        <div className="relative w-full h-[75vh] md:h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6">
          <img
            src={cover}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/70 text-[11px] tracking-[0.45em] uppercase mb-6"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Wedding Photography
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-white text-4xl sm:text-6xl md:text-7xl tracking-[0.2em] uppercase leading-tight"
              style={{
                fontFamily: "Josefin Sans, sans-serif",
                fontWeight: 200,
              }}
            >
              Capturing
              <br />
              Your Forever
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="w-8 h-px bg-white/25 mt-6 mb-4 origin-left"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-white/65 text-[11px] tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Timeless moments · Crafted with care
            </motion.p>

            {/* Scroll button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              onClick={scrollToGrid}
              className="mt-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0"
            >
              <div className="w-1 h-1 rounded-full bg-white/60 animate-bounce" />
              <span
                className="text-white/55 text-[9px] tracking-[0.35em] uppercase"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                Scroll
              </span>
            </motion.button>
          </div>
        </div>

        {/* ── EDITORIAL QUOTE SECTION ── */}
        <div className="bg-white px-8 md:px-24 py-20 md:py-28 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-black text-2xl sm:text-3xl md:text-4xl uppercase italic leading-snug mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              letterSpacing: "0.04em",
            }}
          >
            "We believe that every couple has a unique story if you take the
            time to listen"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-black/50 text-sm leading-relaxed tracking-wide max-w-3xl mx-auto"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
            }}
          >
            Our portraits are a reflection of each couple — born from honest
            conversations, genuine connections, and the comfort we build before
            we ever pick up a camera. Getting to know you both, individually and
            together, is always our first step in capturing your most precious
            day.
          </motion.p>
        </div>

        {/* ── GRID ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 lg:px-16 pb-8"
        >
          {loading &&
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse" />
            ))}

          {!loading &&
            events.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() =>
                  navigate(`/EventGallery/event/${item._id}`, {
                    state: item,
                  })
                }
                className="group relative overflow-hidden cursor-pointer 
                aspect-[4/5] sm:aspect-[5/4] md:aspect-[16/11] lg:aspect-[16/10] 
                active:scale-[0.98] transition-transform"
              >
                {/* IMAGE */}
                <img
                  src={`${item.thumbnail}?tr=q-90,f-webp`}
                  alt={item.eventName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* TOP LEFT */}
                <div className="absolute top-3 left-3 flex items-center gap-2 opacity-80 sm:opacity-0 sm:group-hover:opacity-100">
                  <div className="w-4 h-px bg-white/60" />
                  <span className="text-white/70 text-[8px] tracking-[0.3em] uppercase">
                    Photos
                  </span>
                </div>

                {/* DATE */}
                <span className="absolute top-3 right-3 text-white/70 text-[9px] tracking-[0.2em] uppercase opacity-80 sm:opacity-0 sm:group-hover:opacity-100">
                  {new Date(item.eventDate).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                {/* BOTTOM TEXT */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                  <h2
                    className="text-white uppercase leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                      fontSize: "clamp(1.3rem, 3.8vw, 2.6rem)", // ✅ tablet fixed
                    }}
                  >
                    {item.eventName}
                  </h2>

                  <p className="text-white/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2">
                    {item.eventPlace}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="bg-white border-t border-black/[0.06] px-6 py-8 flex items-center justify-between">
          <span
            className="text-black/25 text-[9px] tracking-[0.4em] uppercase"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 100,
            }}
          >
            Your Studio Name
          </span>
          <div className="flex items-center gap-4">
            <span className="w-1 h-1 rounded-full bg-black/15" />
            <span
              className="text-black/25 text-[8px] tracking-[0.3em] uppercase cursor-pointer hover:text-black/50 transition-colors"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 100,
              }}
            >
              Instagram
            </span>
            <span className="w-1 h-1 rounded-full bg-black/15" />
            <span
              className="text-black/25 text-[8px] tracking-[0.3em] uppercase cursor-pointer hover:text-black/50 transition-colors"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 100,
              }}
            >
              Contact
            </span>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
