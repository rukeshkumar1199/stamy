import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] text-black ">
      <div className="max-w-6xl mx-auto  py-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-8">
          {/* CONTACT */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase">
              Contact
            </h3>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                <HiOutlineLocationMarker className="text-[#b89b5e]" />
                <span className="text-sm">Chennai, India</span>
              </div>

              <a
                href="mailto:hello@stamycreations.com"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-700 hover:text-[#b89b5e] transition"
              >
                <HiOutlineMail className="text-[#b89b5e]" />
                <span className="text-sm">hello@stamycreations.com</span>
              </a>
            </div>
          </div>

          {/* LINE */}
          <div className="hidden md:block h-10 w-[1px] bg-gray-300"></div>

          {/* LOGO */}
          <div>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl tracking-widest text-[#b89b5e]"
            >
              STAMY CREATIONS
            </h2>
          </div>

          {/* LINE */}
          <div className="hidden md:block h-10 w-[1px] bg-gray-300"></div>

          {/* PHONE */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase">
              Call
            </h3>

            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-gray-800 hover:text-[#b89b5e] transition cursor-pointer">
              <HiOutlinePhone className="text-[#b89b5e]" />
              <span className="text-sm tracking-wide">+91 95858 44625</span>
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="mt-10 border-t border-gray-300"></div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Stamy Creations. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
