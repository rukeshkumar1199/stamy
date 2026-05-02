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
      <section className="bg-[#f7f7f7] text-[#1a1a1a] py-[clamp(3rem,6vw,6rem)] mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          {/* 🔥 TOP SECTION */}
          <div className="grid md:grid-cols-2 gap-[clamp(2rem,5vw,4rem)] items-center">
            {/* LEFT BIG TEXT */}
            <div className="flex items-center justify-center md:justify-start">
              <h1
                style={{ fontFamily: "Ambroise, serif" }}
                className="
                  text-[clamp(2rem,6vw,4.5rem)]
                  leading-[1.1]
                  tracking-wide
                  text-gray-800 uppercase
                  text-center md:text-left
                "
              >
                Soulful Sonnets by Sabari
              </h1>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-[clamp(0.7rem,1.6vw,1.25rem)] font-semibold tracking-wide mb-4 text-center md:text-left">
                WELCOME TO OUR WORLD OF STORYTELLING
              </h2>

              <p
                className="
                  text-[clamp(0.8rem,1.4vw,1.05rem)]
                  text-gray-600
                  leading-[1.8]
                "
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
          <div className="mt-[clamp(2.5rem,6vw,5rem)]">
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src={coverImage}
                alt="wedding moment"
                className="w-full object-cover h-[clamp(220px,45vh,500px)]"
              />
            </div>
          </div>

          {/* 🔥 QUOTE SECTION */}
          <div className="mt-[clamp(3rem,7vw,6rem)] text-center max-w-3xl mx-auto px-2">
            <p
              className="
                text-[clamp(1.1rem,2.5vw,1.6rem)]
                text-gray-700
                leading-[1.7]
              "
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
