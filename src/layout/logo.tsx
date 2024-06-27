import React from 'react';
import './style.css'; // Importez vos styles personnalisés si nécessaire
import image from '../img/logo.png'
import { useNavigate } from 'react-router-dom';
const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-blue-100'>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={image} className="h-14" alt="Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <button type="button"  onClick={() => navigate('/main')} class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
            </ul>
          </div>
        </div>
      </nav>
      <div className='pb-0.1'>
      <section className="relative bg-center bg-no-repeat bg-cover bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 bg-blend-multiply h-96">
  <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
    <div className="px-4 mx-auto max-w-screen-xl text-center text-white">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
        Empowering <br className="lg:hidden" /> Innovations <br className="lg:hidden" /> with Flow-based
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-100 lg:text-xl sm:px-6 lg:px-48">
        Transforming ideas into reality with cutting-edge technology and strategic investments.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <a
  href="/main"
  className="inline-block py-3 px-8 text-lg font-semibold text-white bg-gradient-to-r from-sky-400 to-green-400 rounded-lg hover:from-sky-200 hover:to-green-200 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800"
>
 Start now
</a>

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

      </div>
    </div>
  );
};

export default Logo;
