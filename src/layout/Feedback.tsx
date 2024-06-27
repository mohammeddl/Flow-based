import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../img/image.png'
const FeedbackSection: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with your form submission logic
    console.log({ name, email, message });
    // Example: Call API or dispatch Redux action here
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 md:mr-8 mb-6 md:mb-0">
          <center>
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-blue-800 sm:text-4xl sm:leading-10">
            <span className="bg-gradient-to-r from-gray-400 via-blue-300 to-purple-500 text-transparent bg-clip-text">Give Us Your Feedback</span>
          </h2>
          </center> <br />
          <div className="text-center">
            <strong>
            <p className="text-lg leading-relaxed mb-8 from-slate-500 to-red-600">
    We value your feedback! Please feel free to send us your thoughts, questions, or suggestions.
  </p>
            </strong>
</div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full h-12 rounded-md border border-purple-300 py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 resize-none bg-gradient-to-br from-blue-200 to-purple-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email Address"
                  className="w-full h-12 rounded-md border border-purple-300 py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 resize-none bg-gradient-to-br from-blue-200 to-purple-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
              <textarea
  id="message"
  placeholder="Your Message"
  className="w-full h-32 rounded-md border border-purple-300 py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 resize-none bg-gradient-to-br from-blue-200 to-purple-200"
  rows={4}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  required
/>

              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
          <div className=" bg-slate-400 md:w-1/2 md:ml-8">
            <img
              src={image} // Replace with your image path
              alt="Feedback"
              className="w-full h-auto object-cover rounded-md shadow-xl transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
