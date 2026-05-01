// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Footer from "./Footer";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { HiOutlineLocationMarker } from "react-icons/hi";
import EventCardSkeletonLoader from "./EventCardSkeletonLoader";

export default function EventGallery() {
  const { id } = useParams();
  const { state, pathname } = useLocation();

  const API = import.meta.env.VITE_API_URL;

  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const observer = useRef();

  const optimize = (url, w = 1600) =>
    `${url}?tr=w-${w},q-100,f-webp,pr-true,fo-auto`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  /* ================= FETCH ================= */
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API}/events/${id}/images`);
      setImages(res.data);
      setVisibleImages(res.data.slice(0, 10));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id]);

  /* ================= LOAD MORE ================= */
  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * 10;
    if (start >= images.length) return;
    const end = start + 10;
    setVisibleImages((prev) => [...prev, ...images.slice(start, end)]);
    setPage(nextPage);
  };

  /* ================= OBSERVER ================= */
  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMore();
      });
      if (node) observer.current.observe(node);
    },
    [loading, images, page],
  );

  /* ================= DATA ================= */
  const cover = state?.coverImage || "";
  const name = state?.eventName || "";
  const place = state?.eventPlace || "";
  // const description = state?.eventDescription || "";

  return (
    <>
      {/* Google Fonts */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');        html { scroll-behavior: smooth; }
        `}</style>

      <div
        style={{ fontFamily: "'Jost', sans-serif" }}
        className="bg-[#f5f0e8]"
      >
        {/* ================= HERO ================= */}
        {cover && (
          <div className="relative h-[100vh] w-full overflow-hidden bg-[#1a1714]">
            <motion.img
              src={optimize(cover, 2000)}
              srcSet={`
                  ${optimize(cover, 800)} 800w,
                  ${optimize(cover, 1200)} 1200w,
                  ${optimize(cover, 2000)} 2000w
                `}
              sizes="100vw"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.95) contrast(1.05)" }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white pb-[10vh]">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "Ambroise, serif",
                  fontSize: "clamp(20px, 7vw, 50px)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                }}
              >
                {name.toUpperCase()}
              </motion.h1>

              {/* Location */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.3,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-2"
                style={{
                  fontFamily: "Ambroise, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <HiOutlineLocationMarker style={{ opacity: 0.7 }} />
                {place}
              </motion.p>
            </div>

            {/* Scroll hint line */}
            <motion.div
              className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.9 }}
            >
              <motion.div
                style={{
                  width: "1px",
                  height: "40px",
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45))",
                }}
                animate={{ scaleY: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
              />
            </motion.div>
          </div>
        )}

        {/* ================= GALLERY GRID ================= */}
        <div className="px-5 md:px-15 lg:px-15 pb-20 mt-10">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-2 gap-[14px]">
            {loading && <EventCardSkeletonLoader />}

            {visibleImages.map((img, index) => {
              const isLast = index === visibleImages.length - 1;

              return (
                <motion.div
                  key={img._id}
                  ref={isLast ? lastImageRef : null}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 4) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.05 }}
                  className="mb-[14px] break-inside-avoid group relative overflow-hidden"
                >
                  <img
                    src={optimize(img.imageUrl, 800)}
                    className="w-full object-cover block"
                    style={{
                      filter: "saturate(0.92)",
                      transition:
                        "transform 1s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                      e.currentTarget.style.filter =
                        "saturate(1.05) brightness(0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.filter = "saturate(0.92)";
                    }}
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(26,23,20,0.22))",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
