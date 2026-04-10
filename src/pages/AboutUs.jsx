export default function AboutUs() {
  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 🔥 HEADING (Responsive Fixed) */}
        <div className="text-center mb-16 md:mb-20">
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="
              text-2xl sm:text-4xl md:text-6xl
              tracking-wide
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#d4af37]
            "
          >
            About Stamy Creations
          </h1>

          <p className="mt-3 md:mt-4 text-gray-400 italic text-sm sm:text-base md:text-lg">
            Crafting stories that live beyond moments
          </p>
        </div>

        {/* 🔥 CONTENT */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* LEFT TEXT */}
          <div className="space-y-5 md:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-[15px] md:text-base">
            <p>
              <span className="text-[#d4af37] font-semibold">
                Stamy Creations by Sabari
              </span>{" "}
              is more than just a content studio — it’s a space where stories
              are transformed into timeless visual experiences.
            </p>

            <p>
              We specialize in cinematic storytelling, social media branding,
              and high-end visual production that connects deeply with your
              audience. Every frame is designed with purpose, emotion, and
              precision.
            </p>

            <p>
              From weddings to brand campaigns, we craft visuals that not only
              look stunning but also create lasting impressions.
            </p>

            <p>
              Our mission is simple — to turn your vision into a story worth
              remembering.
            </p>

            {/* SIGNATURE */}
            <div className="pt-4 md:pt-6">
              <p className="text-xs md:text-sm text-gray-500">Founder</p>
              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-lg md:text-xl text-white"
              >
                Sabari
              </h3>
            </div>
          </div>

          {/* 🔥 RIGHT IMAGE */}
          <div className="relative">
            <div
              className="
                rounded-2xl md:rounded-3xl overflow-hidden
                shadow-[0_10px_40px_rgba(0,0,0,0.6)] md:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              "
            >
              <img
                src="/images/pic5.jpg"
                alt="About visual"
                className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover"
              />
            </div>

            {/* GOLD BORDER */}
            <div
              className="
                absolute -inset-1 md:-inset-2 rounded-2xl md:rounded-3xl
                border border-[#d4af37]/30
                pointer-events-none
              "
            ></div>
          </div>
        </div>

        {/* 🔥 QUOTE */}
        <div className="mt-16 md:mt-24 text-center max-w-3xl mx-auto px-2">
          <p
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="
              text-base sm:text-lg md:text-2xl
              text-gray-200
              italic leading-relaxed
            "
          >
            “Every frame tells a story. We make sure yours is unforgettable.”
          </p>

          <div className="mt-4 md:mt-6 w-10 md:w-12 h-[1px] bg-[#d4af37] mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
