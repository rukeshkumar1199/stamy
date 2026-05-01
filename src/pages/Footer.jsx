import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/people/Soulful-sonnets-by-sabari/61573614180526/#",
      label: "Facebook",
      color: "#3b5999",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/soulfulsonnetsbysabari/",
      label: "Instagram",
      color: "#e4405f",
    },
    {
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@Soulful_Sonnets_by_Sabari",
      label: "YouTube",
      color: "#cd201f",
    },
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/919585844625",
      label: "WhatsApp",
      color: "#25d366",
    },
    {
      icon: <SiThreads />,
      href: "https://soulfulsonnetsbysabari.pixieset.com/soulfulsonnetsbysabari/s",
      label: "Threads",
      color: "#000000",
    },
  ];

  return (
    <footer className="bg-[#fafafa] text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 text-center md:text-left">
          {/* LEFT — LOGO */}
          <div>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="
            uppercase leading-snug tracking-widest
            text-xl sm:text-2xl md:text-2xl lg:text-3xl
          "
            >
              Soulful Sonnets
              <br />
              by Sabari
            </h2>

            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mt-2">
              Photography &amp; Films
            </p>
          </div>

          {/* CENTER — SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 text-lg sm:text-xl">
            {socialLinks.map(({ icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-black transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* RIGHT — CONTACT */}
          <div className="flex flex-col gap-2 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 text-gray-700 text-sm sm:text-base">
              <HiOutlineLocationMarker />
              <span>Chennai, India</span>
            </div>

            <a
              href="tel:+919585844625"
              className="flex items-center justify-center md:justify-end gap-2 text-gray-700 hover:text-[#b89b5e] transition text-sm sm:text-base"
            >
              <HiOutlinePhone />
              <span>+91 95858 44625</span>
            </a>

            <a
              href="mailto:hello@stamycreations.com"
              className="flex items-center justify-center md:justify-end gap-2 text-gray-700 hover:text-[#b89b5e] transition text-sm sm:text-base"
            >
              <HiOutlineMail />
              <span>soulfulsonnets@gmail.com</span>
            </a>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-8 sm:mt-10 border-t border-gray-300" />

        {/* COPYRIGHT */}
        <div className="text-center text-[10px] sm:text-xs text-gray-500 mt-4 sm:mt-6">
          © {new Date().getFullYear()} Soulful Sonnets by Sabari. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
