import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail, HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { primary } = theme.colors;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (param) => {
    if (param === "Upload") navigate("/upload");
    else if (param === "About") navigate("/AboutUs");
    else if (param === "Enquiry") navigate("/Enquiry");
    else if (param === "Films") navigate("/Body");
    else if (param === "Photography") navigate("/PhotoGrid");
    else navigate("/");
  };

  // 🔥 Scroll + direction
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) return;

    const prev = scrollY.getPrevious() ?? 0;

    if (latest > prev && latest > 100) {
      setHidden(true);
    } else if (prev - latest > 5) {
      setHidden(false);
    }
  });

  const width = useTransform(scrollY, [0, 300], ["100vw", "60vw"]);
  const borderRadius = useTransform(scrollY, [0, 300], ["0px", "40px"]);
  const marginTop = useTransform(scrollY, [0, 300], ["0px", "16px"]);
  const bg = useTransform(
    scrollY,
    [0, 300],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"],
  );
  const scale = useTransform(scrollY, [0, 300], [1, 0.97]);

  // 🔥 Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <motion.nav
      style={!isMobile ? { marginTop } : {}}
      animate={
        !isMobile
          ? {
              y: hidden ? -120 : 0,
              opacity: hidden ? 0 : 1,
            }
          : {}
      }
      className="fixed top-0 left-0 w-full z-[9999] flex justify-center"
    >
      <motion.div
        style={
          !isMobile
            ? {
                width,
                borderRadius,
                backgroundColor: bg,
                scale,
              }
            : {}
        }
        className={`px-6 ${
          isMobile
            ? "w-full bg-black/80 backdrop-blur-md"
            : "backdrop-blur-xl border border-white/10"
        }`}
      >
        {/* Navbar */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 md:h-12 cursor-pointer"
            onClick={() => handleClick("Home")}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-sm">
            {["Home", "Photography", "Films", "About", "Enquiry", "Upload"].map(
              (item) => (
                <span
                  key={item}
                  onClick={() => handleClick(item)}
                  className="cursor-pointer relative uppercase tracking-widest text-white group"
                >
                  <span className="group-hover:opacity-80 transition">
                    {item}
                  </span>

                  {/* underline */}
                  <span
                    style={{ backgroundColor: primary }}
                    className="absolute left-0 -bottom-2 w-0 h-[1px] group-hover:w-full transition-all duration-300"
                  />
                </span>
              ),
            )}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex gap-5 text-white">
            <FaInstagram
              size={18}
              className="cursor-pointer transition hover:opacity-80"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/stamy_creations/?hl=en",
                  "_blank",
                )
              }
            />
            <FaFacebookF
              size={18}
              className="cursor-pointer transition hover:opacity-80"
            />
            <HiOutlineMail
              size={20}
              className="cursor-pointer transition hover:opacity-80"
              onClick={() =>
                window.open("mailto:stamycreations@gmail.com", "_blank")
              }
            />
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full border bg-black/50 backdrop-blur-xl"
            style={{ borderColor: primary, color: primary }}
          >
            {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-2xl transition-all duration-500 ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-5"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6"
            style={{ color: primary }}
          >
            <HiX size={32} />
          </button>

          <div className="flex flex-col items-center justify-center h-full gap-8">
            {["Home", "Photography", "Films", "About", "Enquiry", "Upload"].map(
              (item) => (
                <div key={item} className="text-center">
                  <span
                    onClick={() => {
                      handleClick(item);
                      setOpen(false);
                    }}
                    className="cursor-pointer uppercase tracking-widest text-white hover:opacity-80 transition"
                  >
                    {item}
                  </span>

                  <span
                    style={{ backgroundColor: primary }}
                    className="block h-[1px] w-10 mt-2 mx-auto opacity-70"
                  />
                </div>
              ),
            )}

            {/* Social Icons */}
            <div className="flex gap-8 pt-8" style={{ color: primary }}>
              <FaInstagram size={24} />
              <FaFacebookF size={22} />
              <HiOutlineMail size={24} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
