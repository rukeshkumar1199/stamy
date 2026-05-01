import { useEffect, useRef, useState, useCallback } from "react";
import Glimpse1 from "../assets/images/dashboardGrid/dash13.jpg";
import Glimpse2 from "../assets/images/dashboardGrid/dash11.jpg";
import Glimpse3 from "../assets/images/dashboardGrid/dash8.jpg";
import Glimpse4 from "../assets/images/dashboardGrid/dash9.jpg";
import Glimpse5 from "../assets/images/dashboardGrid/dash5.jpg";
import Glimpse6 from "../assets/images/dashboardGrid/dash1.jpg";
import Glimpse7 from "../assets/images/dashboardGrid/dash2.jpg";
import Glimpse8 from "../assets/images/dashboardGrid/dash6.jpg";
import Glimpse9 from "../assets/images/dashboardGrid/dash3.jpg";
const PHOTOS = [
  {
    id: 1,
    thumbnail: `${Glimpse1}?w=500&q=90`,
    full: `${Glimpse1}?w=1200&q=90`,
    alt: "Couple ceremony",
  },
  {
    id: 2,
    thumbnail: `${Glimpse2}?w=500&q=90`,
    full: `${Glimpse2}?w=1200&q=90`,
    alt: "Sky confetti",
  },
  {
    id: 3,
    thumbnail: `${Glimpse3}?w=500&q=90`,
    full: `${Glimpse3}?w=1200&q=90`,
    alt: "Pink couple",
  },
  {
    id: 4,
    thumbnail: `${Glimpse4}?w=700&q=85`,
    full: `${Glimpse4}?w=1200&q=90`,
    alt: "Arch ceremony",
  },
  {
    id: 5,
    thumbnail: `${Glimpse5}?w=500&q=85`,
    full: `${Glimpse5}?w=1200&q=90`,
    alt: "Venue landscape",
  },
  {
    id: 6,
    thumbnail: `${Glimpse6}?w=600&q=85`,
    full: `${Glimpse6}?w=1200&q=90`,
    alt: "Garland exchange",
  },
  {
    id: 7,
    thumbnail: `${Glimpse7}?w=600&q=85`,
    full: `${Glimpse7}?w=1200&q=90`,
    alt: "Band procession",
  },
  {
    id: 8,
    thumbnail: `${Glimpse8}?w=600&q=85`,
    full: `${Glimpse8}?w=1200&q=90`,
    alt: "Couple portrait tall",
  },
  {
    id: 9,
    thumbnail: `${Glimpse9}?w=500&q=85`,
    full: `${Glimpse9}?w=1200&q=90`,
    alt: "Sitting couple",
  },
];

// Diagonal staircase flow — left-top → right-bottom
const POSITIONS = [
  // Col 1 — 2 small, left side, starts mid
  { left: "0%", top: "30%", width: "17.5%", height: "28%", delay: 0.3 },
  { left: "0%", top: "59%", width: "17.5%", height: "33%", delay: 0.4 },
  // Col 2 — tall single
  { left: "18%", top: "16%", width: "21.5%", height: "70%", delay: 0.52 },
  // Col 3 — large top + small bottom (highest starting point)
  { left: "40%", top: "3%", width: "23.5%", height: "48%", delay: 0.64 },
  { left: "40%", top: "52%", width: "23.5%", height: "30%", delay: 0.76 },
  // Col 4 — 2 stacked, shifts lower
  { left: "64%", top: "0%", width: "18.5%", height: "38%", delay: 0.88 },
  { left: "64%", top: "39%", width: "18.5%", height: "38%", delay: 1.0 },
  // Col 5 — 2 stacked, lowest (diagonal endpoint)
  { left: "83%", top: "11%", width: "17%", height: "34%", delay: 1.12 },
  { left: "83%", top: "46%", width: "17%", height: "34%", delay: 1.24 },
];

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({ photos, currentIndex, onClose, onNavigate }) {
  const [visible, setVisible] = useState(false);
  const [imgStyle, setImgStyle] = useState({
    opacity: 1,
    transform: "translateX(0)",
    transition: "none",
  });
  // useCallback imported from parent scope

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const navigate = useCallback(
    (dir) => {
      setImgStyle({
        opacity: 0,
        transform: `translateX(${dir > 0 ? "30px" : "-30px"})`,
        transition: "opacity 0.2s, transform 0.2s",
      });
      setTimeout(() => {
        onNavigate(dir);
        setImgStyle({
          opacity: 1,
          transform: "translateX(0)",
          transition: "opacity 0.2s, transform 0.2s",
        });
      }, 200);
    },
    [onNavigate],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, handleClose]);

  const btnBase = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1001,
    transition: "background 0.2s",
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: visible ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s ease",
      }}
    >
      {/* Close btn */}
      <button
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 20,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1001,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
        }
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={() => navigate(-1)}
        style={{ ...btnBase, left: 16 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
        }
      >
        ←
      </button>

      {/* Image */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.92)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          maxWidth: "90vw",
          maxHeight: "88vh",
        }}
      >
        <img
          src={photos[currentIndex].full}
          alt={photos[currentIndex].alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "85vh",
            objectFit: "contain",
            display: "block",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            ...imgStyle,
          }}
        />
      </div>

      {/* Next */}
      <button
        onClick={() => navigate(1)}
        style={{ ...btnBase, right: 16 }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
        }
      >
        →
      </button>

      {/* Counter */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "'Jost', sans-serif",
          fontSize: 12,
          letterSpacing: "0.2em",
          zIndex: 1001,
        }}
      >
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function GlimpseGallery() {
  // const navigate = useNavigate();
  const sectionRef = useRef(null);
  const photoRefs = useRef([]);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const [lbIndex, setLbIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (headingRef.current)
            headingRef.current.style.animation =
              "ssb-fadeUp 0.8s ease forwards 0.2s";
          photoRefs.current.forEach((el, i) => {
            if (el)
              el.style.animation = `ssb-popIn 0.55s ease forwards ${POSITIONS[i].delay}s`;
          });
          if (btnRef.current)
            btnRef.current.style.animation =
              "ssb-fadeUp 0.7s ease forwards 1.7s";
          observer.disconnect();
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((dir) => {
    setLbIndex((prev) => (prev + dir + PHOTOS.length) % PHOTOS.length);
  }, []);

  return (
    <>
      <style>{`
  @keyframes ssb-fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes ssb-popIn {
    from { opacity:0; transform:scale(0.87) translateY(20px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }

  .ssb-photo {
    position: absolute;
    overflow: hidden;
    opacity: 0;
    cursor: pointer;
    box-shadow: 0 6px 28px rgba(0,0,0,0.13);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .ssb-photo img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.6s ease;
  }
  .ssb-heading { opacity: 0; }
  .ssb-btn     { opacity: 0; }

  /* ── TABLET (600px – 1023px): 3-column grid ── */
  @media (max-width: 1023px) {
    .ssb-collage {
      position: static !important;
      height: auto !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 10px !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
    }
    .ssb-photo {
      position: static !important;
      width: 100% !important;
      height: 200px !important;
    }
    /* last image full width on tablet if 9 images (odd) */
    .ssb-photo:last-child {
      grid-column: span 3 !important;
      height: 200px !important;
    }
  }

  /* ── MOBILE (<600px): 2-column grid ── */
  @media (max-width: 599px) {
    .ssb-collage {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 7px !important;
    }
    .ssb-photo {
      height: 130px !important;
    }
    .ssb-photo:last-child {
      grid-column: span 2 !important;
      height: 150px !important;
    }
  }
`}</style>

      <section
        ref={sectionRef}
        style={{ background: "#fff" }}
        className="mx-4 sm:mx-6 md:mx-10 lg:mx-20 mt-5"
      >
        {/* HEADING */}
        <div
          ref={headingRef}
          className="ssb-heading"
          style={{ textAlign: "center", marginBottom: 50 }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2vw, 40px)",
              fontWeight: 300,
              letterSpacing: "0.45em",
              color: "#1a1a1a",
              textTransform: "uppercase",
            }}
            className="pb-5"
          >
            A Glimpse of Our Memories
          </h1>
        </div>

        {/* COLLAGE */}
        <div
          style={{ width: "100%", overflow: "hidden", padding: "25px 0 0px" }}
        >
          <div
            className="ssb-collage"
            style={{
              position: "relative",
              width: "80vw",
              maxWidth: 1400,
              margin: "0 auto",
              height: "56vw",
              maxHeight: 700,
              minHeight: 380,
            }}
          >
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.id}
                ref={(el) => (photoRefs.current[i] = el)}
                className="ssb-photo"
                onClick={() => setLbIndex(i)}
                style={{
                  left: POSITIONS[i].left,
                  top: POSITIONS[i].top,
                  width: POSITIONS[i].width,
                  height: POSITIONS[i].height,
                }}
              >
                <img src={photo.thumbnail} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* VIEW MORE */}
        {/* <div className="flex items-center justify-center mt-6 sm:mt-8">
          <button
            onClick={() => navigate("/PhotoGrid")}
            className="
      px-5 sm:px-8 md:px-10
      py-2.5 sm:py-3 md:py-4
      font-bold cursor-pointer
      border border-gray-600 text-gray-700
      tracking-widest uppercase
      text-xs sm:text-sm md:text-base
      hover:bg-gray-800 hover:text-white
      transition duration-300
    "
          >
            View Photos
          </button>
        </div> */}
      </section>

      {/* LIGHTBOX */}
      {lbIndex !== null && (
        <Lightbox
          photos={PHOTOS}
          currentIndex={lbIndex}
          onClose={() => setLbIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
