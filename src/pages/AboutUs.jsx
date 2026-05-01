import Footer from "./Footer";
import coverImage from "../assets/images/dashboardGrid/dash14.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutUs() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <section className="bg-[#f7f7f7] text-[#1a1a1a] py-16 md:py-24 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          {/* 🔥 TOP SECTION */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* LEFT BIG TEXT */}
            <div className="flex items-center justify-center md:justify-start">
              <h1
                style={{ fontFamily: "Ambroise, serif" }}
                className="
                  text-3xl sm:text-5xl md:text-6xl lg:text-7xl
                  leading-tight tracking-wide
                  text-gray-800 uppercase text-center md:text-left
                "
              >
                Soulful Sonnets by Sabari
              </h1>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-wide mb-4">
                WELCOME TO OUR WORLD OF STORYTELLING
              </h2>

              {/* ✨ Divider */}
              <div className="w-10 h-[1px] bg-[#c9a857] mb-6"></div>

              <p
                className="text-sm sm:text-[15px] md:text-base text-gray-600 leading-relaxed"
                style={{ fontFamily: "proximanovaexcn light" }}
              >
                For over a decade, we’ve captured life’s most precious moments
                with a unique blend of candid and documentary styled photography
                and films. Our core expertise lies in capturing genuine,
                unscripted emotions — the quiet glances, heartfelt laughter, and
                intimate exchanges that often go unnoticed. We blend into your
                world and let your story unfold naturally, creating memories
                that feel real, timeless, and deeply personal.
              </p>
            </div>
          </div>

          {/* 🔥 IMAGE SECTION */}
          <div className="mt-14 md:mt-20">
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src={coverImage}
                alt="wedding moment"
                className="w-full object-cover"
                style={{ height: "50vh" }}
              />
            </div>
          </div>

          {/* 🔥 HIGHLIGHT POINTS */}
          {/* <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center ">
            {[
              "Candid Storytelling",
              "Emotion-Driven Films",
              "Timeless Memories",
            ].map((item, i) => (
              <div key={i}>
                <h3 className="uppercase text-sm tracking-[0.3em] text-gray-800 mb-3">
                  {item}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  We focus on capturing moments as they happen — natural,
                  unfiltered, and deeply meaningful.
                </p>
              </div>
            ))}
          </div> */}

          {/* 🔥 QUOTE SECTION */}
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-700  leading-relaxed"
              style={{ fontFamily: "'Ambroise', serif" }}
            >
              “Your story is not staged — it’s lived. We’re here to preserve it
              just the way it felt.”
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
