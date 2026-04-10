import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { HiOutlineMail, HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = (param) => {
    if (param === "Upload") navigate("/upload");
    else if (param === "About") navigate("/AboutUs");
    else if (param === "Enquiry") navigate("/Enquiry");
    else if (param === "Films") navigate("/Body");
    else if (param === "Photography") navigate("/PhotoGrid");
    else navigate("/");
  };

  // 🔥 Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-[9999]">
      {/* Navbar */}
      <div className="bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between relative">
          {/* Logo */}
          <img
            src="https://cdn.myportfolio.com/1484c4ff-5164-49fb-ae57-3d516ab86e23/4224bf9d-0cfb-49de-8a32-a2949ebd4b6b_rwc_1129x986x1717x1717x4096.png?h=a3903ef093236fba5f7ed5f2b12a1e07"
            alt="Picture Makers"
            className="h-12 md:h-14 w-auto cursor-pointer"
            onClick={() => handleClick("Home")}
          />

          {/* ✅ Responsive Desktop Menu FIXED */}
          <nav
            className="
              hidden md:flex
              md:gap-6 lg:gap-12
              text-xs md:text-sm lg:text-base
              md:static lg:absolute
              lg:left-1/2 lg:-translate-x-1/2
            "
          >
            {["Home", "Photography", "Films", "About", "Enquiry", "Upload"].map(
              (item) => (
                <span
                  key={item}
                  onClick={() => handleClick(item)}
                  className="cursor-pointer relative uppercase tracking-widest text-white group whitespace-nowrap"
                >
                  <span className="group-hover:text-[#d4af37] transition">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </span>
              ),
            )}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex gap-5 text-white">
            <FaInstagram
              size={18}
              className="cursor-pointer hover:text-[#d4af37]"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/stamy_creations/?hl=en",
                  "_blank",
                )
              }
            />
            <FaFacebookF
              size={18}
              className="cursor-pointer hover:text-[#d4af37]"
            />
            <HiOutlineMail
              size={20}
              className="cursor-pointer hover:text-[#d4af37]"
              onClick={() =>
                window.open("mailto:stamycreations@gmail.com", "_blank")
              }
            />
          </div>

          {/* ✅ Mobile Burger (z-index FIX) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#d4af37] text-[#d4af37] bg-black/80 backdrop-blur-lg z-[10001]"
          >
            {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Premium Mobile Menu FIXED */}
      <div
        className={`md:hidden fixed inset-0 z-[10000]
        bg-black/60 backdrop-blur-2xl
        transition-all duration-500
        ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"}
      `}
      >
        {/* ✅ Dedicated Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-[#d4af37] z-[10001]"
        >
          <HiX size={32} />
        </button>

        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {["Home", "Photography", "Films", "About", "Enquiry", "Upload"].map(
            (item) => (
              <div key={item} className="text-center">
                <span
                  onClick={() => {
                    handleClick(item);
                    setOpen(false);
                  }}
                  className="cursor-pointer uppercase tracking-widest text-xl text-white hover:text-[#d4af37] transition duration-300"
                >
                  {item}
                </span>
                <span className="block h-[2px] w-10 bg-[#d4af37] mt-2 mx-auto opacity-70"></span>
              </div>
            ),
          )}

          {/* Social Icons */}
          <div className="flex gap-8 pt-8 text-[#d4af37]">
            <FaInstagram size={24} />
            <FaFacebookF size={22} />
            <HiOutlineMail size={24} />
          </div>
        </nav>
      </div>
    </header>
  );
}
