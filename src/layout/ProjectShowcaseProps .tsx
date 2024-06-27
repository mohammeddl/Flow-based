import React from 'react';
import file from '../img/file.png';

const ProjectShowcase: React.FC = () => {
  return (
    <section className="bg-slate-200  to-blue-700 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-2">ProjectShowcase</h2>
          <p className="text-gray-800 text-lg">Explore some of our featured projects</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={file} alt="Project Showcase" className="w-full lg:w-1/2 rounded-lg lg:rounded-l-lg lg:rounded-r-none object-cover h-96 lg:h-auto mb-6 lg:mb-0" />
          <div className="p-8 lg:w-1/2">
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">Flowed Based </h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
            here is an image illustrating some of our features, there are four types of nodes (https, run, response and more to add text) and they are released by an edge            </p>
            <a
              href="https://reactflow.dev/"
              className="inline-block py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-pink-500 hover:to-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
