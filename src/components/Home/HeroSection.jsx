
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const arrowVariant = {
  animate: {
    y: [0, 10, 0],
    transition: { repeat: Infinity, duration: 1.5 }
  }
};

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
      {/* Motion Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')"
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 opacity-85"></div>

      {/* Decorative Shapes */}
      <motion.div
        className="absolute w-40 h-40 bg-pink-600 rounded-full mix-blend-multiply opacity-30 top-10 left-5"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply opacity-25 bottom-20 right-10"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* Central Decorative Shape */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-700 rounded-full mix-blend-multiply opacity-20 inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 270, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto p-10 text-center text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={contentVariants}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl">
          Master New Skills Online
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-medium drop-shadow-lg">
          Join thousands of learners and transform your career with expert-led courses.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="btn btn-lg bg-pink-600 hover:bg-pink-700 border-none shadow-lg text-white"
          >
            Get Started
          </Link>
          <Link
            to="/courses"
            className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-indigo-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </motion.div>

      {/* Scroll Arrow Centered */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        variants={arrowVariant}
        animate="animate"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
