import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getEmbedUrl = (url) => {
  if (!url) return "";
  if (url.includes("embed")) return url;
  const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export default function VideoSlideshow() {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [playingIdx] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

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

  // 🔥 Auto Slide
  useEffect(() => {
    if (!trackRef.current || events.length === 0) return;

    const container = trackRef.current;

    const interval = setInterval(() => {
      const cardWidth = container.firstChild?.offsetWidth || 0;
      const gap = 12;
      const scrollAmount = cardWidth + gap;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);

  // 🔥 Drag Handlers
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (loading) {
    return (
      <div className="flex gap-3 px-6 py-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex-none w-56 h-40 bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full py-2">
        <h1
          className=""
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(14px, 2vw, 40px)",
            fontWeight: 300,
            letterSpacing: "10px",
            wordSpacing: "0px",
            stroke: "#000",
            color: "#1a1a1a",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "30px",
            padding: "50px 0px 50px",
          }}
        >
          Moments That Move You
        </h1>
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex  overflow-x-auto px-6 cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {events.map((item, idx) => (
            <div
              key={idx}
              className="
              flex-none 
              w-[260px] h-[200px]
              sm:w-[320px] sm:h-[245px]
              md:w-[400px] md:h-[280px]
              lg:w-[507px] lg:h-[350px]
            "
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative w-full h-full overflow-hidden cursor-pointer group">
                {playingIdx === idx && item.youtubeId ? (
                  <iframe
                    src={`${getEmbedUrl(item.youtubeId)}?autoplay=1&rel=0&controls=1&modestbranding=1`}
                    title={item.eventName}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={item.videoThumbnailImage || item.thumbnail}
                      alt={item.eventName}
                      draggable={false}
                      className="w-full h-full object-cover transition duration-700 pointer-events-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/85 flex items-center justify-center rounded-full transition duration-300 group-hover:scale-110 group-hover:bg-white">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="#222"
                          onClick={() => {
                            const videoUrl = item.youtubeId?.includes("http")
                              ? item.youtubeId
                              : `https://www.youtube.com/watch?v=${item.youtubeId}`;

                            window.open(videoUrl, "_blank");
                          }}
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                    </div>

                    {/* <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-[9px] tracking-[0.2em] font-bold text-white/65 uppercase mb-1">
                      {item.eventDate
                        ? new Date(item.eventDate).toDateString()
                        : ""}
                    </p>
                    <h3
                      className="text-white text-sm leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.eventName}
                    </h3>
                  </div> */}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-20">
          <button
            onClick={() => navigate("/Body")}
            className="px-10 py-4 font-bold cursor-pointer border border-gray-600 text-gray-700 tracking-widest uppercase text-sm hover:bg-gray-800 hover:text-white transition duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </>
  );
}
