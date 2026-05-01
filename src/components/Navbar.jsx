import { useState, useEffect } from "react";
import {
  // eslint-disable-next-line no-unused-vars
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
import { useLocation } from "react-router-dom";

// 🔥 Fonts (safe load once)
if (!document.getElementById("premium-fonts")) {
  const link = document.createElement("link");
  link.id = "premium-fonts";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { neutral } = theme.colors;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
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

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) {
      // ✅ Mobile: show ONLY at top
      if (latest <= 10) {
        setHidden(false);
      } else {
        setHidden(true);
      }
      return;
    }

    if (latest > 100) {
      setHidden(true); // hide after scroll
    } else {
      setHidden(false); // only visible at top
    }
  });

  const bg = useTransform(
    scrollY,
    [0, 300],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"],
  );

  // 🔥 prevent scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const SOCIALS = [
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/soulfulsonnetsbysabari/",
    },
    {
      icon: FaFacebookF,
      link: "https://www.facebook.com/people/Soulful-sonnets-by-sabari/61573614180526/#",
    },
    {
      icon: HiOutlineMail,
      link: "mailto:hello@stamycreations.com",
    },
  ];
  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-[9999]"
      >
        <motion.div
          style={{
            backgroundColor:
              pathname === "/Enquiry" ||
              pathname === "/upload" ||
              pathname === "/ViewEnquiries" ||
              pathname === "/AboutUs"
                ? "black"
                : bg,
          }}
          className="px-6"
        >
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              className="h-10 md:h-12 cursor-pointer"
              onClick={() => handleClick("Home")}
            />

            {/* Desktop Menu */}
            <div
              className="hidden md:flex gap-10 text-sm text-white"
              style={{
                fontFamily: "Aesthet light,serif",
                fontSize: "clamp(12px, 1vw, 13px)",
                letterSpacing: "0.25em",
              }}
            >
              {[
                // { name: "Home", path: "/" },
                { name: "Photography", path: "/PhotoGrid" },
                { name: "Films", path: "/Body" },
                { name: "About", path: "/AboutUs" },
                { name: "Enquiry", path: "/Enquiry" },
                { name: "Upload", path: "/upload" },
              ].map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <div key={item.name} className="flex flex-col items-center">
                    <span
                      onClick={() => navigate(item.path)}
                      className={`cursor-pointer uppercase transition-all duration-300 inline-block ${
                        isActive
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      style={{ fontFamily: "Aesthet light,serif" }}
                    >
                      {item.name}

                      {/* 🔥 Underline */}

                      <span
                        className={`block h-[2px] mt-1 transition-all duration-300 ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-0"
                        }`}
                        style={{ backgroundColor: neutral }}
                      />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {SOCIALS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center text-white transition-all duration-300 cursor-pointer hover:scale-110 hover:text-[#d4af37]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Mobile Burger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden z-[10001] w-12 h-12 flex items-center justify-center"
              style={{ color: "#ffffff" }}
            >
              {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* 🔥 MOBILE MENU FIXED */}
      <div
        className={`md:hidden fixed inset-0 z-[10000]
        bg-black/80 backdrop-blur-2xl
        transition-all duration-500
        ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 z-[10002]"
          style={{ color: "#ffffff" }}
        >
          <HiX size={32} />
        </button>

        {/* Menu */}
        <div
          className="flex flex-col items-center justify-center h-full gap-8 text-white"
          style={{ fontFamily: "Aesthet light,serif" }}
        >
          {["Home", "Photography", "Films", "About", "Enquiry", "Upload"].map(
            (item) => (
              <div key={item} className="text-center">
                <span
                  onClick={() => {
                    handleClick(item);
                    setOpen(false);
                  }}
                  className="cursor-pointer uppercase tracking-[0.3em] text-lg"
                >
                  {item}
                </span>
              </div>
            ),
          )}

          {/* Social */}
          <div className="flex gap-8 pt-8" style={{ color: "#ffffff" }}>
            <FaInstagram size={24} />
            <FaFacebookF size={22} />
            <HiOutlineMail size={24} />
          </div>
        </div>
      </div>
    </>
  );
}
