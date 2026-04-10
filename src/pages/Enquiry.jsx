import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default function Enquiry() {
  const [form, setForm] = useState({
    name: "",
    emailId: "",
    mobileNo: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNo" && !/^\d*$/.test(value)) return;

    setStatus({ message: "", type: "" });
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.emailId.trim() ||
      !form.mobileNo.trim() ||
      !form.message.trim()
    ) {
      return setStatus({
        message: "Please fill in all fields.",
        type: "error",
      });
    }

    if (!emailRegex.test(form.emailId)) {
      return setStatus({
        message: "Please enter a valid email address.",
        type: "error",
      });
    }

    if (form.mobileNo.length !== 10) {
      return setStatus({
        message: "Mobile number must be exactly 10 digits.",
        type: "error",
      });
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/enquiry", form);

      setStatus({
        message: "Enquiry submitted successfully 🎉",
        type: "success",
      });

      setForm({ name: "", emailId: "", mobileNo: "", message: "" });
    } catch {
      setStatus({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Spinner size={40} />
        </div>
      ) : (
        <section className="bg-white min-h-screen flex items-center">
          <div className="w-full grid md:grid-cols-2">
            {/* 🔥 LEFT SIDE (Responsive Fixed) */}
            <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-20">
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="
              text-2xl sm:text-4xl md:text-6xl
              leading-snug md:leading-tight
              text-black
            "
              >
                Let’s Create <br />
                <span className="text-[#d4af37]">Something Timeless</span>
              </h1>

              <p className="mt-4 md:mt-6 text-gray-500 max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
                Every wedding holds a story worth remembering. Share your vision
                with us and we’ll turn it into a cinematic experience that lasts
                forever.
              </p>

              <div className="mt-6 md:mt-10 w-12 md:w-16 h-[2px] bg-[#d4af37]"></div>

              <div className="mt-6 md:mt-10 text-xs sm:text-sm text-gray-400 space-y-1 md:space-y-2">
                <p>Chennai, India</p>
                <p>+91 95858 44625</p>
                <p>hello@stamycreations.com</p>
              </div>
            </div>

            {/* 🔥 RIGHT SIDE (Form Responsive Fixed) */}
            <div className="bg-[#fafafa] px-6 sm:px-10 md:px-16 py-16 md:py-20 flex items-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto space-y-6 md:space-y-8"
              >
                {[
                  { name: "name", label: "Your Name", maxLength: 50 },
                  { name: "emailId", label: "Email Address", maxLength: 50 },
                  { name: "mobileNo", label: "Mobile Number", maxLength: 10 },
                ].map((field, i) => (
                  <div key={i} className="relative">
                    <input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder=" "
                      maxLength={field.maxLength}
                      className="
                    peer w-full py-2 md:py-3
                    bg-transparent border-b border-gray-300
                    focus:border-[#d4af37]
                    outline-none text-black text-sm md:text-base
                  "
                    />
                    <label
                      className="
                    absolute left-0 top-2 text-xs md:text-sm text-gray-400
                    transition-all
                    peer-focus:-top-3 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-[#d4af37]
                    peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-[10px] md:peer-not-placeholder-shown:text-xs
                  "
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    rows="3"
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="
                  peer w-full py-2 md:py-3
                  bg-transparent border-b border-gray-300
                  focus:border-[#d4af37]
                  outline-none text-black resize-none
                  text-sm md:text-base
                "
                  />
                  <label
                    className="
                  absolute left-0 top-2 text-xs md:text-sm text-gray-400
                  transition-all
                  peer-focus:-top-3 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-[#d4af37]
                  peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-[10px] md:peer-not-placeholder-shown:text-xs
                "
                  >
                    Your Message
                  </label>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                w-full py-2 md:py-3
                bg-black text-white
                text-xs sm:text-sm tracking-widest uppercase
                transition duration-300
                hover:bg-[#d4af37] hover:text-black
              "
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {/* Status */}
                {status.message && (
                  <div
                    className={`text-xs md:text-sm text-center px-3 py-2 rounded-md ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-600 border border-red-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
