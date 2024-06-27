import React from 'react';
import logo from '../img/logo.png'; // Assurez-vous d'ajuster le chemin de l'image en fonction de votre structure de dossiers
import abouut from '../img/abouut.png'
import { useNavigate } from 'react-router-dom';
const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-sky-200 via-purple-200 to-mauve-200 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 md:mr-8 mb-6 md:mb-0 relative overflow-hidden">
            <img
              src={abouut}
              alt="About Us"
              className="w-full h-auto object-cover rounded-md shadow-xl transform hover:scale-110 transition duration-500"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <img src={logo} alt="Logo" className="h-16 mb-6 mx-auto md:mx-0" />
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900">About Us</h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-800">
              We are a dedicated team focused on delivering high-quality API testing solutions. Our mission is to help developers build, test, and optimize their applications with ease.
            </p>
            <div className="flex justify-center md:justify-start">
            <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Quickstart</button>

              <button type="button"   onClick={() => navigate('/feedback')} className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
