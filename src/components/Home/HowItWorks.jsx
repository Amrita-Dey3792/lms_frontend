import React from 'react';

// Inline SVG icon components (same as before)
const SearchIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComputerIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="20" x2="16" y2="20" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BadgeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1l3 5 5 .5-3.5 3 1 5-4.5-2.5L7.5 14l1-5L5 6.5l5-.5L12 1z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function HowItWorks() {
  const steps = [
    {
      Icon: SearchIcon,
      title: 'Browse Courses',
      desc: 'Explore a wide range of courses tailored to your learning needs.',
    },
    {
      Icon: ComputerIcon,
      title: 'Learn Online',
      desc: 'Watch lessons and practice with hands-on projects anytime, anywhere.',
    },
    {
      Icon: BadgeIcon,
      title: 'Get Certified',
      desc: 'Earn certificates to showcase your new skills and boost your career.',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-indigo-100 to-indigo-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-12 text-gray-700">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map(({ Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-indigo-300 transition-shadow p-6 sm:p-8 flex flex-col h-full"
            >
              <Icon className="text-indigo-600 w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">{title}</h3>
              <p className="text-gray-600 flex-grow">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
