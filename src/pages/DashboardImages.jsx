import { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DashboardImages() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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

  return (
    <>
      <h1
        className=""
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(16px, 2vw, 40px)",
          fontWeight: 300,
          letterSpacing: "10px",
          wordSpacing: "0px",
          stroke: "#000",
          color: "#1a1a1a",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "30px",
          padding: "100px 0px 50px",
        }}
      >
        KNOT JUST ANOTHER BLOG
      </h1>
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-9 px-4 md:px-10 lg:px-16 pb-12">
        {/* Skeleton */}
        {loading &&
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-full aspect-[16/9] bg-gray-200 animate-pulse"
            />
          ))}

        {/* Cards */}
        {!loading &&
          events.slice(0, 6).map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() =>
                navigate(`/EventGallery/event/${item._id}`, {
                  state: item,
                })
              }
              className="group relative overflow-hidden cursor-pointer w-full aspect-[14/9]"
            >
              {/* IMAGE */}
              <img
                src={`${item.thumbnail}?tr=q-90,f-webp`}
                alt={item.eventName}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* OVERLAY (appears on hover) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500" />

              {/* EVENT NAME (only on hover) */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4
    opacity-0 translate-y-6
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500"
              >
                <h2
                  className="text-white uppercase"
                  style={{
                    fontFamily: "'Aesthet light', serif",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  }}
                >
                  {item.eventName}
                </h2>
              </div>
            </motion.div>
          ))}
      </div>
      <div className="flex items-center justify-center my-10">
        <button
          onClick={() => navigate("/PhotoGrid")}
          className="px-10 py-4 font-bold cursor-pointer border border-gray-600 text-gray-700 tracking-widest uppercase text-sm hover:bg-gray-800 hover:text-white transition duration-300"
        >
          View Photos
        </button>
      </div>
    </>
  );
}
