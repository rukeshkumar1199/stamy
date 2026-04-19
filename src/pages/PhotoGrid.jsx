// PhotoGrid.jsx — Picturemakers Final

import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BlurText from "../components/BlurText";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import cover from "../../public/images/cover.jpg";
import PhotoGridThumbnail from "../components/PhotoThumbnail";
import { staggerContainer } from "../animation";

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
      <div className="bg-white min-h-screen">
        {/* ── HERO ── */}
        <div className="relative w-full h-[75vh] md:h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 overflow-hidden">
            {/* IMAGE */}
            <motion.img
              src={cover}
              alt="Cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1.04 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 🔥 NOISE LAYER (dissolve feel) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/70 text-[11px] tracking-[0.45em] uppercase mb-6"
              style={{
                fontWeight: 300,
              }}
            >
              Wedding Photography
            </motion.p>

            <BlurText
              text="Capturing Your Forever"
              style={{
                maxWidth: 900,
              }}
              className="text-white flex items-center justify-center text-center tracking-widest bold text-9xl font-serif allura-regular"
            />
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-black font-serif text-2xl sm:text-3xl md:text-4xl allura-regular leading-snug mb-10"
            style={{
              fontWeight: 400,
              letterSpacing: "0.04em",
            }}
          >
            We believe that every couple has a unique story if you take the time
            to listen
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-black/50 text-sm leading-relaxed tracking-wide"
            style={{
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
        <motion.div
          variants={staggerContainer}
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 lg:px-16 pb-8"
        >
          {loading &&
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse" />
            ))}

          {!loading &&
            events.map((item, index) => (
              <PhotoGridThumbnail key={item._id} item={item} index={index} />
            ))}
        </motion.div>

        {/* ── BOTTOM STRIP ── */}
        <div className="bg-white border-t border-black/[0.06] px-6 py-8 flex items-center justify-between">
          <span
            className="text-black/25 text-[9px] tracking-[0.4em] uppercase"
            style={{
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
                fontWeight: 100,
              }}
            >
              Instagram
            </span>
            <span className="w-1 h-1 rounded-full bg-black/15" />
            <span
              className="text-black/25 text-[8px] tracking-[0.3em] uppercase cursor-pointer hover:text-black/50 transition-colors"
              style={{
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
