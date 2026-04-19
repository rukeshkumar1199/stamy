import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PhotoThumbnail({ item, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
      viewport={{ once: true }}
      onClick={() =>
        navigate(`/EventGallery/event/${item._id}`, {
          state: item,
        })
      }
      className="group relative overflow-hidden cursor-pointer 
  aspect-[4/5] md:aspect-[16/11] lg:aspect-[16/10]"
    >
      {/* IMAGE */}
      <img
        src={`${item.thumbnail}?tr=q-90,f-webp`}
        alt={item.eventName}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* 🔥 VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full 
      bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)] 
      opacity-70 group-hover:opacity-90 transition duration-500"
        />
      </div>

      {/* 🔥 DARK OVERLAY (fade) */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* 🔥 TEXT BLOCK */}
      <div
        className="
    absolute bottom-0 left-0 right-0 
    p-4 md:p-6 text-white
    opacity-100 sm:opacity-0 
    translate-y-0 sm:translate-y-6
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500
  "
      >
        <h2
          className="text-2xl  leading-tight"
          style={{
            fontWeight: 300,
            letterSpacing: "0.06em",
          }}
        >
          {item.eventName}
        </h2>

        <p className="text-white/70 text-xs  mt-2">{item.eventPlace}</p>
      </div>
    </motion.div>
  );
}

export default PhotoThumbnail;
