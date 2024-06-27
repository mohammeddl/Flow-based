import React from 'react';
import react from '../img/react.png'
const Features: React.FC = () => {
  return (
    <>
        <section className="bg-gradient-to-br from-sky-200 via-purple-200 to-mauve-200 py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="mr-24">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4"><center>Features</center></h2>
          <p className="text-lg text-gray-500">
            <center>
            Explore the powerful features that drive Flow-based to success.
            </center>
          </p><br />
          <img src={react} className="w-full h-auto max-w-xl rounded-lg" alt="image description" />
        </div>
        <div className="flex flex-col mt-4 md:mt-0 ml-10"> {/* Added ml-10 for margin-left */}
          {/* Feature 1 */}
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gray-100 rounded-full">
              {/* Icon */}
              <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Easy Integration</h3>
              <p className="mt-2 text-base text-gray-600">
                Seamlessly integrate Flow-based into your existing workflows with minimal effort.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gray-100 rounded-full">
              {/* Icon */}
              <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a3 3 0 116 0 3 3 0 01-6 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Scalability</h3>
              <p className="mt-2 text-base text-gray-600">
                Grow your capabilities effortlessly with Flow-based's scalable architecture.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gray-100 rounded-full">
              {/* Icon */}
              <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">JSON File Support</h3>
              <p className="mt-2 text-base text-gray-600">
                Import and export JSON files seamlessly with Flow-based for efficient data management.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gray-100 rounded-full">
              {/* Icon */}
              <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">API Integration</h3>
              <p className="mt-2 text-base text-gray-600">
                Connect seamlessly to external APIs with Flow-based to leverage external data sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
};

export default Features;




