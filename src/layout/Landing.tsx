import React from 'react';
import LandingComponent from './logo'; // Assurez-vous de corriger le chemin si nécessaire
import Features from './Features';
import AboutUs from './About '
import ProjectShowcase from './ProjectShowcaseProps '
import Feedback from './Feedback'
import Sponsor from './Sponsors'
const Landing: React.FC = () => {
    return (
        <div>
          <LandingComponent />
          <Features />
          <Sponsor/>
          <AboutUs />
          <ProjectShowcase/>
          <Feedback  />
        </div>
      );
};

export default Landing;
