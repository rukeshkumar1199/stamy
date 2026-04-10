import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

export default function DashboardVideojsxjsx() {
  const [play, setPlay] = useState(false);

  const video = {
    title: "Espresso Stories",
    category: "Cafe",
    thumbnail: "/images/insta1.jpg",
    youtubeId: "L_jWHffIx5E",
  };

  return (
    <div className="w-full relative mt-20">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full h-[60vh] md:h-[75vh] lg:h-[90vh] relative overflow-hidden">
        {/* VIDEO / IMAGE */}
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            {/* THUMBNAIL */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            {/* DARK CINEMATIC OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setPlay(true)}
                className="
                  w-16 h-16 md:w-20 md:h-20
                  rounded-full bg-white/90
                  flex items-center justify-center
                  shadow-xl
                  transition duration-300
                  hover:scale-110
                "
              >
                <AiFillPlayCircle className="text-black text-4xl md:text-5xl" />
              </button>
            </div>

            {/* TEXT CONTENT */}
            <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-8 md:pb-12">
              <p className="text-xs tracking-[0.3em] text-gray-300 uppercase mb-2">
                {video.category}
              </p>

              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl"
              >
                {video.title}
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
