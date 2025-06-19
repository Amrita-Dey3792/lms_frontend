import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  UserGroupIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const team = [
  {
    name: 'Sarah Patel',
    role: 'Lead Developer',
    bio: 'Sarah focuses on building scalable frontend architecture.',
    avatar: 'https://i.pravatar.cc/100?img=15',
  },
  {
    name: 'Michael Tan',
    role: 'Product Designer',
    bio: 'Michael ensures our LMS is intuitive and delightful to use.',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    name: 'Lena Kim',
    role: 'Education Strategist',
    bio: 'Lena helps align product features with modern learning models.',
    avatar: 'https://i.pravatar.cc/100?img=30',
  },
];

const About = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [openTeamIndex, setOpenTeamIndex] = useState(null);

  const toggleTeamBio = (index) => {
    setOpenTeamIndex(index === openTeamIndex ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-12 text-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 flex justify-center items-center gap-2">
           
            About LearnHub
          </h1>
          <p className="text-lg mt-3 text-gray-600">Making digital learning better for everyone.</p>
        </div>

        {/* Mission */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2 flex items-center gap-2">
            <LightBulbIcon className="w-6 h-6 text-blue-400" />
            Our Mission
          </h2>
          <p className="text-gray-700">
            LearnHub is built to simplify online education. We provide powerful tools for instructors to deliver, track, and improve their learning content with ease.
          </p>
        </div>

        {/* Features Accordion */}
        <div className="bg-white p-6 rounded-xl shadow-md transition duration-300">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex justify-between items-center w-full text-left"
          >
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2">
              <Cog6ToothIcon className="w-6 h-6 text-blue-400" />
              Core Features
            </h2>
            {showFeatures ? (
              <ChevronUpIcon className="w-6 h-6 text-blue-500" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-blue-500" />
            )}
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showFeatures ? 'mt-4 max-h-96' : 'max-h-0'
            }`}
          >
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Interactive course builder with drag & drop</li>
              <li>Real-time analytics & student insights</li>
              <li>Quizzes, assignments, and smart grading</li>
              <li>Role-based permissions for security</li>
              <li>Collaborative tools: chat, forums, feedback</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-500 mb-6 flex items-center gap-2">
            <UserGroupIcon className="w-6 h-6 text-blue-400" />
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer"
                onClick={() => toggleTeamBio(index)}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-blue-100 group-hover:border-blue-400 transition"
                />
                <h3 className="text-center text-lg font-semibold text-blue-600">{member.name}</h3>
                <p className="text-center text-sm text-gray-500">{member.role}</p>
                {openTeamIndex === index && (
                  <p className="mt-3 text-sm text-gray-700 text-center animate-fadeIn">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold text-blue-500 flex justify-center items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-blue-400" />
            Contact Us
          </h2>
          <p className="text-gray-700">
            Email us at{' '}
            <a href="mailto:support@learnhub.com" className="text-blue-600 underline hover:text-blue-800">
              support@learnhub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
