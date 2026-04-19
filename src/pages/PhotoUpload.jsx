import { useState } from "react";
import axios from "axios";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function PhotoUpload() {
  const navigate = useNavigate();

  // ✅ Safe env usage
  const API = import.meta.env.VITE_API_URL || "";

  const [form, setForm] = useState({
    eventName: "",
    eventPlace: "",
    eventDate: "",
    eventDescription: "",
    youtubeId: "",
    thumbnail: null, // ✅ changed
    coverImage: null, // ✅ new
  });

  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [message, setMessage] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // ✅ new
  const [coverPreview, setCoverPreview] = useState("");
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  /* =========================
     🔹 HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    setMessage("");

    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      if (!file) return;

      setForm({ ...form, thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    } else if (e.target.name === "coverImage") {
      const file = e.target.files[0];
      if (!file) return;

      setForm({ ...form, coverImage: file });
      setCoverPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  /* =========================
     🔹 CREATE EVENT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.eventName ||
      !form.eventDate ||
      !form.thumbnail ||
      !form.coverImage
    ) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("eventName", form.eventName);
    data.append("eventPlace", form.eventPlace);
    data.append("eventDate", form.eventDate);
    data.append("eventDescription", form.eventDescription);
    data.append("youtubeId", form.youtubeId);
    data.append("thumbnail", form.thumbnail);
    data.append("coverImage", form.coverImage);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${API}/events`, data);

      setEventId(res.data._id);
      setMessage("✅ Event created! Now upload gallery images");

      // reset form
      setForm({
        eventName: "",
        eventPlace: "",
        eventDate: "",
        eventDescription: "",
        youtubeId: "",
        thumbnail: null,
        coverImage: null,
      });

      setThumbnailPreview("");
      setCoverPreview("");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          err.message ||
          "❌ Failed to create event",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     🔹 MULTI IMAGE SELECT
  ========================= */
  const handleMultiChange = (e) => {
    const selectedFiles = [...e.target.files];
    setFiles(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  /* =========================
     🔹 MULTI IMAGE UPLOAD
  ========================= */
  const handleMultiUpload = async () => {
    if (!eventId) {
      setMessage("⚠️ Create event first");
      return;
    }

    if (files.length === 0) {
      setMessage("⚠️ Select images");
      return;
    }

    const data = new FormData();
    files.forEach((file) => data.append("images", file));

    try {
      setLoading(true);
      setMessage("");

      await axios.post(`${API}/events/${eventId}/images`, data);

      setMessage("🔥 Images uploaded successfully");
      setFiles([]);
      setPreviewImages([]);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || err.message || "❌ Upload failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
      <Spinner size={40} />
    </div>
  ) : (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-4 py-30">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10 space-y-10 border border-gray-100">
        {/* 🔥 TITLE */}
        <div className="text-center space-y-3">
          <p className="text-[12px] tracking-[0.3em] text-[#d4af37] uppercase">
            Wedding Admin Panel
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl md:text-4xl text-gray-800"
          >
            Create Your Event
          </h2>
        </div>

        {/* 🔥 MESSAGE */}
        {message && (
          <div className="text-center text-sm font-medium text-green-700 bg-green-50 p-3 rounded-xl border border-green-100">
            {message}
          </div>
        )}

        {/* ========================= EVENT FORM ========================= */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
            Event Details
            <HiOutlinePencilAlt
              className="text-lg cursor-pointer"
              title="View Enquiries"
              onClick={() => navigate("/ViewEnquiries")}
            />
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={form.eventName}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <input
              type="text"
              name="eventPlace"
              placeholder="Event Location"
              value={form.eventPlace}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="eventDescription"
            placeholder="Describe the event..."
            value={form.eventDescription}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-28"
          />

          <input
            type="text"
            name="youtubeId"
            placeholder="YouTube Video ID (optional)"
            value={form.youtubeId}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          {/* Thumbnail */}
          {/* Thumbnail */}
          <input type="file" name="thumbnail" onChange={handleChange} />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              className="w-full h-40 object-cover rounded-xl mt-2"
            />
          )}

          {/* Cover Image */}
          <input type="file" name="coverImage" onChange={handleChange} />

          {coverPreview && (
            <img
              src={coverPreview}
              className="w-full h-40 object-cover rounded-xl mt-2"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-white py-3 rounded-xl"
          >
            Create Event
          </button>
        </form>

        {/* ========================= GALLERY ========================= */}
        {eventId && (
          <div>
            <input type="file" multiple onChange={handleMultiChange} />

            <div className="grid grid-cols-3 gap-3 mt-3">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  loading="lazy"
                  className="h-24 object-cover rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={handleMultiUpload}
              disabled={loading}
              className="w-full bg-black text-white py-3 mt-4 rounded-xl"
            >
              Upload Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
