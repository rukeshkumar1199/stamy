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

  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const observer = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 🔥 Fetch all images (only once)
  const fetchImages = async () => {
    try {
      const res = await axios.get(
        `https://node-stamy.vercel.app/events/${id}/images`,
      );
      setImages(res.data);
      setVisibleImages(res.data.slice(0, 12)); // first batch
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const headingVariants = {
    hidden: { opacity: 0, y: 16, letterSpacing: "0.22em" },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: "0.08em",
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };
  // 🔥 Load more images
  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * 12;
    const end = start + 12;

    setVisibleImages((prev) => [...prev, ...images.slice(start, end)]);

    setPage(nextPage);
  };

  // 🔥 Intersection Observer (scroll detect)
  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, images],
  );

  return (
    <div>
      <div className="mx-auto px-6 mt-30 text-center">
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
            {state.eventName || ""}
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
    my-3
    text-gray-600
    text-sm md:text-base
    tracking-wide
    max-w-xl mx-auto
    flex items-center justify-center gap-2
  "
          >
            <HiOutlineLocationMarker className="text-lg" />
            {state.eventPlace || ""}
          </p>
          <span
            className="
      absolute  left-1/2 -translate-x-1/2
      text-5xl text-[#d4af37]/40
      font-serif
    "
          >
            “
          </span>
          <p
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="
            pt-5
        text-lg md:text-xl
        text-gray-800
        leading-relaxed
        px-5
        italic
      "
          >
            {state.eventDescription || ""}
          </p>
          <div className="mt-6 flex justify-center">
            <span className="w-12 h-[1px] bg-[#d4af37]"></span>
          </div>
        </motion.div>
      </div>
      <div
        className="mt-10 mb-10 grid gap-x-8 gap-y-14 px-6 md:px-12
      [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
      >
        {/* Skeleton */}
        {loading && <EventCardSkeletonLoader />}

        {/* Images */}
        {visibleImages.length > 0 ? (
          visibleImages.map((img, index) => {
            const isLast = index === visibleImages.length - 1;

            return (
              <div
                key={img._id}
                ref={isLast ? lastImageRef : null} // 🔥 important
                className="group bg-white overflow-hidden shadow hover:shadow-xl transition duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={img.imageUrl.replace(
                      "/upload/",
                      "/upload/w_1200,q_auto:best,f_auto,dpr_auto/",
                    )} // 🔥 Cloudinary optimize
                    loading="lazy"
                    alt="event"
                    className="w-full  object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center font-bold">
            No images found for this event.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
