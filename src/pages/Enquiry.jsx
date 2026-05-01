import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Footer from "./Footer";

export default function Enquiry() {
  const API = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    name: "",
    emailId: "",
    mobileNo: "",
    message: "",
    dob: "",
    place: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNo" && !/^\d*$/.test(value)) return;

    setStatus({ message: "", type: "" });
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.emailId.trim()) newErrors.emailId = "Email is required";
    else if (!emailRegex.test(form.emailId))
      newErrors.emailId = "Invalid email address";

    if (!form.mobileNo.trim()) newErrors.mobileNo = "Mobile number is required";
    else if (form.mobileNo.length !== 10)
      newErrors.mobileNo = "Must be 10 digits";

    if (!form.dob) newErrors.dob = "Select your date of birth";

    if (!form.place.trim()) newErrors.place = "Place is required";

    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      setLoading(true);
      await axios.post(`${API}/enquiry`, form);

      setStatus({
        message: "Enquiry submitted successfully 🎉",
        type: "success",
      });

      setForm({
        name: "",
        emailId: "",
        mobileNo: "",
        message: "",
        dob: "",
        place: "",
      });
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
    <>
      <div>
        {loading ? (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <Spinner size={40} />
          </div>
        ) : (
          <section className="bg-white min-h-screen flex items-center mt-10 mx-5">
            <div className="w-full grid md:grid-cols-2">
              {/* LEFT */}
              <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-20">
                <h1
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-2xl sm:text-4xl md:text-6xl leading-tight text-black"
                >
                  Let’s Create <br />
                  <span className="text-[#d4af37]">Something Timeless</span>
                </h1>

                <p className="mt-6 text-gray-500 max-w-md text-sm leading-relaxed">
                  Every wedding holds a story worth remembering. Share your
                  vision with us and we’ll turn it into a cinematic experience.
                </p>

                <div className="mt-10 w-12 h-[2px] bg-[#d4af37]" />

                <div className="mt-10 text-sm text-gray-400 space-y-2">
                  <p>Chennai, India</p>
                  <p>+91 95858 44625</p>
                  <p>hello@stamycreations.com</p>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div className="bg-[#fafafa] px-6 sm:px-10 md:px-16 py-16 md:py-20 flex items-center">
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md mx-auto space-y-8"
                >
                  {[
                    { name: "name", label: "Your Name" },
                    { name: "emailId", label: "Email Address" },
                    { name: "mobileNo", label: "Mobile Number" },
                    {
                      name: "dob",
                      label: "DATE OF YOUR CELEBRATION",
                      type: "date",
                    },
                    { name: "place", label: "Place" },
                  ].map((field, i) => (
                    <div key={i} className="relative">
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder=" "
                        className={`peer w-full py-3 bg-transparent border-b
                        ${
                          errors[field.name]
                            ? "border-red-400"
                            : "border-gray-300"
                        }
                        focus:border-[#d4af37]
                        outline-none text-black transition-all duration-300`}
                      />

                      <label
                        className="absolute left-0 top-2 text-sm text-gray-400 transition-all
                      peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#d4af37]
                      peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
                      >
                        {field.label}
                      </label>

                      {errors[field.name] && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors[field.name]}
                        </p>
                      )}
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
                      className={`peer w-full py-3 bg-transparent border-b
                      ${errors.message ? "border-red-400" : "border-gray-300"}
                      focus:border-[#d4af37]
                      outline-none resize-none`}
                    />

                    <label
                      className="absolute left-0 top-2 text-sm text-gray-400 transition-all
                    peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#d4af37]
                    peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
                    >
                      Your Message
                    </label>

                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white text-sm tracking-widest uppercase transition hover:bg-[#d4af37] hover:text-black"
                  >
                    Send Message
                  </button>

                  {/* Status */}
                  {status.message && (
                    <div
                      className={`text-sm text-center px-3 py-2 rounded-md ${
                        status.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
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
      <Footer />
    </>
  );
}
