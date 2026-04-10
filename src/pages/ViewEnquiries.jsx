import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";

import axios from "axios";

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("http://localhost:8000/enquiries");
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchEnquiries();
  }, []);
  console.log(enquiries);

  return (
    <section className="min-h-screen bg-[#f9f9f9] px-6 md:px-16 py-16 mt-15">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl md:text-5xl text-black"
        >
          Client <span className="text-[#d4af37]">Enquiries</span>
        </h1>
        <div className="w-16 h-[2px] bg-[#d4af37] mx-auto mt-4"></div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {enquiries.map((item, index) => (
          <div
            key={index}
            className="
              group bg-white p-6 rounded-2xl
              shadow-sm hover:shadow-xl
              transition-all duration-300
              border border-gray-100
              relative overflow-hidden
            "
          >
            {/* Gold Hover Line */}
            <span
              className="
              absolute bottom-0 left-0 w-0 h-[2px]
              bg-[#d4af37]
              transition-all duration-500
              group-hover:w-full
            "
            ></span>

            {/* Name */}
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineUser className="text-[#d4af37]" />
              <h2 className="text-lg font-semibold text-black">{item.name}</h2>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <HiOutlineMail />
              <span>{item.emailId}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
              <HiOutlinePhone />
              <span>{item.mobileNo}</span>
            </div>

            {/* Message */}
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
              {item.message}
            </p>
            {item.createdAt && (
              <p className="text-[10px] text-gray-400 mb-2">
                {new Date(item.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {enquiries.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No enquiries found.</p>
      )}
    </section>
  );
};

export default ViewEnquiries;
