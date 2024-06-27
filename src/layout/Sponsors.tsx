import React from 'react';
import sponsor1 from '../img/sponsor1.png'; // Assurez-vous d'ajuster le chemin de l'image en fonction de votre structure de dossiers
import sponsor2 from '../img/sponsor2.png';
import sponsor3 from '../img/sponsor3.png';
import sponsor4 from '../img/sponsor4.png';
import sponsor5 from '../img/sponsor5.png';
import sponsor6 from '../img/sponsor6.png';
const Sponsors: React.FC = () => {
  return (
    <div className="bg-slate-200  to-blue-200 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-blue-800 sm:text-4xl sm:leading-10">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Our Sponsors</span>
          </h2>
          <p className="mt-2 text-xl leading-9 text-gray-700">We are proud to be supported by these amazing sponsors.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-6 md:gap-12">
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor1} alt="Sponsor 1" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor2} alt="Sponsor 2" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor3} alt="Sponsor 3" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor4} alt="Sponsor 4" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor5} alt="Sponsor 4" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
          <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 ease-in-out">
            <img src={sponsor6} alt="Sponsor 4" className="h-16 md:h-24 object-contain rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
