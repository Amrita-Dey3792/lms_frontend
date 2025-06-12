export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          
          {/* Logo & Description */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold text-white mb-4">LMS Platform</h3>
            <p className="text-gray-400">
              Empowering you to learn anytime, anywhere. Explore courses, connect with instructors, and grow your skills.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-20 md:w-2/3">
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-500 transition">Home</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Courses</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">About</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-500 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition">Terms of Service</a></li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-indigo-500 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.77-1.63 1.56v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-indigo-500 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.98-2.48c-.88.52-1.85.9-2.88 1.1A4.52 4.52 0 0 0 16.1 2c-2.5 0-4.52 2.03-4.52 4.52 0 .36.04.7.12 1.03-3.76-.19-7.1-2-9.32-4.76a4.5 4.5 0 0 0-.61 2.28c0 1.57.8 2.96 2.03 3.77a4.48 4.48 0 0 1-2.05-.57v.06c0 2.19 1.56 4.01 3.63 4.42-.38.1-.77.15-1.18.15-.29 0-.57-.03-.85-.08.57 1.79 2.22 3.1 4.17 3.13A9.05 9.05 0 0 1 2 19.58 12.7 12.7 0 0 0 8.29 21c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.36 8.36 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-indigo-500 transition">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.88 1.5 3 1.5 4.98 2.4 4.98 3.5zM.5 21.5H5.5V8H.5v13.5zM8 8v13.5h5v-7.4c0-3.9 5-4.2 5 0v7.4h5V12c0-6-6.8-5.8-7.5-2.9V8H8z"/>
                  </svg>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LMS Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
