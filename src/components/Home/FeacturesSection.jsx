// src/components/Home/FeaturesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ChartBarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: BookOpenIcon,
    title: "Interactive Courses",
    description:
      "Engaging lessons with quizzes and multimedia content to reinforce learning.",
  },
  {
    icon: ChartBarIcon,
    title: "Progress Tracking",
    description:
      "Visual dashboards to monitor your course completion and achievements.",
  },
  {
    icon: UsersIcon,
    title: "Community Support",
    description:
      "Join study groups, participate in forums, and collaborate with peers.",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-12">
          Why Choose Our LMS?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="card bg-white shadow-lg rounded-lg p-6"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="h-12 w-12 text-[#3E64FF]" />
                </div>
                <h3 className="text-2xl font-semibold text-grey-700 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-grey-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
