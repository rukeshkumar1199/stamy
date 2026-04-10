import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const gallery = [
//   {
//     img: "/images/instathird1.jpg",
//     title: "Akshka Shanil Wedding Fairmont Jaipur",
//     date: "Mar 21, 2025",
//   },
//   {
//     img: "/images/instafour1.jpg",
//     title: "Yashvi X Karan",
//     date: "Dec 14, 2024",
//   },
//   {
//     img: "/images/insta1.jpg",
//     title: "Armaan and Aashna",
//     date: "Oct 22, 2023",
//   },
//   {
//     img: "/images/instasix1.jpg",
//     title: "Yashvi and Parth",
//     date: "Jan 02, 2024",
//   },
// ];

export default function WeddingGallery() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/events");
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
    <section className="bg-[#fafafa] pt-20 pb-10">
      {/* Heading */}
      <div className="text-center mb-24 px-4">
        {/* Small Tagline */}
        <p
          className="
    uppercase tracking-[0.25em] text-[11px] md:text-sm
    text-[#d4af37] mb-4
  "
        >
          SHOT FOR EVERY SEASON OF LIFE
        </p>

        {/* Main Heading */}
        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="
      text-3xl md:text-5xl lg:text-6xl
      text-black
      leading-tight
      max-w-4xl mx-auto
    "
        >
          Capturing Love, Chaos & Timeless Moments
        </h2>

        {/* Sub Text */}
        <p
          className="
    mt-6 text-gray-500
    max-w-2xl mx-auto
    text-sm md:text-base
    leading-relaxed
  "
        >
          Every wedding is a story of emotions, fleeting moments, and
          unforgettable connections. We craft these memories into timeless
          visuals you can relive forever.
        </p>

        {/* Elegant Divider */}
        <div className="mt-8 flex justify-center">
          <span className="w-16 h-[1px] bg-[#d4af37]"></span>
        </div>
      </div>

      {/* 🔥 AUTO RESPONSIVE GRID */}
      <div
        className="
          grid
          gap-x-8 gap-y-14
          px-6 md:px-12
          [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
        "
      >
        {events.map(
          (item, i) =>
            i < 4 && (
              <div
                className="
              group
              bg-white
              overflow-hidden
              shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
              transition duration-500
            "
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
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.eventName}
                    className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  transition duration-700
                  group-hover:scale-105
                "
                  />
                </div>

                {/* Text */}
                <div className="p-5 cursor-pointer">
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-[16px] text-black leading-snug"
                  >
                    {item.eventName}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.eventDate).toDateString()}
                  </p>
                </div>
              </div>
            ),
        )}
      </div>
    </section>
  );
}
