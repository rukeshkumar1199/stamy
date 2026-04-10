export default function OurServices() {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-gray py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
        {/* Image Section */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src="/images/pic5.jpg"
              alt="Wedding moment"
              className="w-full h-80 md:h-[28rem] lg:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            {/* Always-on gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-3xl"></div>
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="md:w-1/2 w-full text-center md:text-left max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Animated Heading Lines */}
          <motion.h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 leading-snug drop-shadow-sm">
            {[
              "Preserve your precious memories",
              "with our expert capture.",
            ].map((line, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={headingVariants}
                className="overflow-hidden"
              >
                <span className="inline-block">{line}</span>
              </motion.div>
            ))}
          </motion.h2>

          <motion.p
            className="text-xs md:text-sm uppercase text-gray-500 tracking-widest mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Your perfect day, our perfect story.
          </motion.p>

          <motion.div
            className="text-gray-800 space-y-3 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p>Weddings, Pre-Weddings, and Family Sessions.</p>
            <p>Trust Us to Create the Perfect Story for You.</p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <button
              className="
                    px-8 py-2.5 my-10 cursor-pointer
                    rounded-full
                    text-xs md:text-sm
                    tracking-widest
                    text-black
                    bg-gradient-to-r from-[#d4af37] to-[#ffd700]
                    shadow-[0_8px_20px_rgba(212,175,55,0.35)]
                    hover:scale-105
                    transition-transform duration-300
                  "
            >
              View Portfolio
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
