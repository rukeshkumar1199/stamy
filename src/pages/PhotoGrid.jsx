import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventCardSkeletonLoader from "./EventCardSkeletonLoader";

export default function PhotoGrid() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {/* 🔥 Heading Section (Responsive Fixed) */}
      <div className="mt-24 md:mt-28 px-4">
        <p
          className="
            uppercase tracking-[0.2em]
            text-[10px] sm:text-xs md:text-sm
            text-[#d4af37] mb-3 text-center
          "
        >
          Elevating Moments Into Timeless Photographs
        </p>

        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="
            text-xl sm:text-3xl md:text-5xl lg:text-6xl
            text-black
            leading-snug md:leading-tight
            max-w-4xl mx-auto text-center
            px-2
          "
        >
          Moments fade, but memories captured last forever.
        </h2>
      </div>

      {/* 🔥 Grid (Responsive Fixed) */}
      <div
        className="
          mt-14 md:mt-20 mb-10
          grid gap-6 sm:gap-8 md:gap-10
          px-4 sm:px-6 md:px-12
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        "
      >
        {/* Skeleton */}
        {loading && <EventCardSkeletonLoader />}

        {/* Events */}
        {!loading &&
          events.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/EventGallery/event/${item._id}`, {
                  state: {
                    eventId: item._id,
                    eventName: item.eventName,
                    eventPlace: item.eventPlace,
                    eventDate: item.eventDate,
                    eventDescription: item.eventDescription,
                    youtubeId: item.youtubeId,
                  },
                })
              }
              className="
                group bg-white overflow-hidden cursor-pointer
                
                shadow-sm hover:shadow-xl
                transition duration-500
              "
            >
              <div className="overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.eventName}
                  loading="lazy"
                  className="
                    w-full aspect-[4/5] object-cover
                    transition duration-700 group-hover:scale-105
                  "
                />
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-sm sm:text-base md:text-lg text-black">
                  {item.eventName}
                </h3>

                <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
                  {new Date(item.eventDate).toDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
