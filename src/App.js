// Import React hooks for state management and useEffect for side effects.
import React, { useState, useEffect, useRef } from 'react';
// Import icons from lucide-react for a clean, modern look.
import { Github, Linkedin, Mail, Rocket, Award, ArrowLeft } from 'lucide-react';

// The main App component, which acts as the entry point for the application.
export default function App() {
  // State hook to manage which page is currently being displayed.
  // 'home' is the default page.
  const [currentPage, setCurrentPage] = useState('home');

  // State to manage which design case study is currently being displayed.
  const [designCaseStudy, setDesignCaseStudy] = useState(null);

  // State to manage which design category is currently selected.
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Use a ref to get access to the video element.
  const videoRef = useRef(null);

  // This effect runs once after the component mounts to set the video playback speed.
  useEffect(() => {
      if (videoRef.current) {
        // Set the playback rate to 0.5 for half speed.
        // Adjust this value to your preference.
        videoRef.current.playbackRate = 0.75;
      }
  }, []);
  
  // Utility function to handle page changes.
  const navigate = (page) => {
    setCurrentPage(page);
    // When navigating away from the design page, reset the case study and category state.
    if (page !== 'design') {
      setDesignCaseStudy(null);
      setSelectedCategory(null);
    }
    // Optional: Scroll to the top of the page when navigating.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ...existing code...

  // State to manage the active link in the navigation bar.
  const [activeLink, setActiveLink] = useState('home');

  // Effect to update the active link state whenever the currentPage changes.
  useEffect(() => {
    setActiveLink(currentPage);
  }, [currentPage]);

  // Helper component for the navigation links.
  const NavLink = ({ to, children }) => (
    <button
      onClick={() => navigate(to)}
      className={`
        px-4 py-2 text-sm md:text-lg font-medium rounded-full transition-colors duration-300
        ${activeLink === to 
          ? 'bg-white text-gray-900 shadow-md transform scale-105' 
          : 'text-gray-200 hover:bg-gray-700/50'
        }
      `}
    >
      {children}
    </button>
  );

  // Helper component to render a single project card.
  const ProjectCard = ({ title, description, link }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-gray-800">
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base mb-4">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 text-sm font-semibold text-gray-900 bg-white rounded-full hover:bg-gray-200 transition-colors duration-300"
      >
        View Project
      </a>
    </div>
  );

  // Helper component for the "About Me" page content.
  const HomePage = () => (
    <div className="text-center p-8 md:p-12 relative z-20">
      <div className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          Hello, I'm Peter Umezaki
        </h1>
      </div>
      <p className="mt-4 md:mt-6 text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto">
        Front-End Developer & Full Stack Designer. I build beautiful and functional web applications with a passion for clean code and intuitive design.
      </p>
      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => navigate('development')}
          className="px-8 py-3 bg-white text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          My Work
        </button>
        <button
          onClick={() => navigate('contact')}
          className="px-8 py-3 bg-transparent text-white font-bold text-lg border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
        >
          Get In Touch
        </button>
      </div>
    </div>
  );

  // New "About Me" page component.
  const AboutMePage = () => {
    return (
      <div className="p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Peter Umezaki is a quadralingual and passionate front-end developer with expertise in building dynamic and responsive user interfaces. With a strong foundation in HTML, CSS, and JavaScript, I specialize in crafting modern web applications using the React library. I am dedicated to writing clean, maintainable code and solving complex problems to deliver exceptional user experiences.
          <br/><br/>
          Additionally, I have a proficient background in Graphic Design (6+ years), focused on Branding & Marketing. I am excited to bring my skills to a new team and design/build something amazing.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-4 border border-gray-700">
            <Rocket size={24} className="text-purple-400" />
            <span className="text-gray-300 text-sm">Passionate about building intuitive UI/UX</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-4 border border-gray-700">
            <Award size={24} className="text-yellow-400" />
            <span className="text-gray-300 text-sm">Committed to clean and efficient code</span>
          </div>
        </div>
      </div>
    );
  };

  // New "Design" page component - shows design categories.
  // New "Design" page component - shows all projects directly.
  const DesignPage = () => {
    // All projects from all categories, flattened into a single array.
    const allProjects = [
      // Branding & Marketing
      {
        id: 'OBP',
        title: 'Ocean Blue Prime',
        description: 'Complete branding for a premium steakhouse.'
      },
      {
        id: 'AGT',
        title: 'A&G Transportation',
        description: 'Branding and marketing for a transportation company.'
      },
      {
        id: 'NCC',
        title: 'North Corner Consulting',
        description: 'Professional branding for a consulting firm.'
      },
      {
        id: 'EFC',
        title: 'Elite Fitness Center',
        description: 'Complete brand identity for a modern fitness center.'
      },
      {
        id: 'UC',
        title: 'Urban Café',
        description: 'Branding and visual identity for an urban café.'
      },
      {
        id: 'TSG',
        title: 'Tech Solutions Group',
        description: 'Corporate branding for a technology solutions company.'
      },
      // Mobile App UI
      {
        id: 'threadbox',
        title: 'Threadbox',
        description: 'Weather-based outfit generator app.'
      },
      // Promotional
      {
        id: 'NBPA',
        title: 'NBPA Events',
        description: 'Promotional materials for NBPA events.'
      },
      // Social Media
      {
        id: 'posters',
        title: 'Pop Culture Art',
        description: 'Social media posts for pop culture communities.'
      },
      // Sports
      {
        id: 'sports',
        title: 'Athlete Celebrations',
        description: 'Graphics celebrating athlete accomplishments.'
      },
      // Ads
      {
        id: 'ads',
        title: 'Product Advertisements',
        description: 'Advertisements for various products.'
      }
    ];

    return (
      <div className="p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">Graphic Design</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Proficient in Figma, Adobe: Photoshop, Illustrator, InDesign, Premier Pro
        </p>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Click on a project to view its case study!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setDesignCaseStudy(project.id)}
              className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-gray-800 cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // CategoryProjectsPage removed. Projects are now shown directly in DesignPage.

  // Component for displaying a single case study.
  const CaseStudyPage = ({ caseStudyId }) => {
    const caseStudies = {
      'OBP': {
        title: 'Ocean Blue Prime',
        content: 'This case study outlines the design process for a premium steakhouse. The goal was to create a modern, scalable, and memorable mark. I began with competitor analysis and mood boarding, then moved on to functional designing using the client color palette selection. The final designs are sleek, and strong, all while maintaining a certain poise.',
        images: [
          '/images/OBP.jpg',
        ]
      },
      'AGT': {
        title: 'A&G Transportation',
        content: 'Complete branding package for A&G Transportation, including logo design, vehicle wraps, and marketing materials. The design emphasizes reliability, professionalism, and efficiency in the transportation industry.',
        images: [
          '/images/ag.jpg',
        ]
      },
      'NCC': {
        title: 'North Corner Consulting',
        content: 'Professional branding for North Corner Consulting, a firm specializing in business strategy. The design conveys trust, expertise, and modern professionalism through clean typography and strategic color choices.',
        images: [
          '/images/BG1.jpg',
          '/images/BG2.jpg',
          '/images/BG3.jpg',
          '/images/BG4.jpg',
          '/images/BG5.jpg'
        ]
      },
      'WE': {
        title: 'Wine Enthusiast',
        content: 'Dynamic brand identity for Wine Enthusiast, combining energy, strength, and motivation. The design system includes logo, signage, apparel, and promotional materials that inspire action and commitment.',
        images: [
          '/images/WEA.jpg',
        ]
      },
      'KBH': {
        title: 'Klean Bee Housekeeping',
        content: 'Dynamic brand identity for Klean Bee Housekeeping, combining energy, strength, and motivation. The design system includes logo, signage, apparel, and promotional materials that inspire action and commitment.',
        images: [
          '/images/KB1.png',
        ]
      },
      'NBPA': {
        title: 'National Basketball Players Association (NBPA)',
        content: 'This project involved print and production for promotional items for an NBPA event. My approach was to use a limited color palette and bold typography to create a cohesive and usable look. Each item in the series was unique but maintained a consistent logo to build recognition for the organization.',
        images: [
          '/images/NBPA.jpg',
        ]
      },
      'posters': {
        title: 'Social Media: Pop Culture Art',
        content: 'For this project, used Adobe Creative Suite to edit and create these pieces. The goal was to expand following by creating original and eye magnetizing artwork to attract a formerly untapped niche of individuals.',
        images: [
          '/images/YACHTY.jpg',
          '/images/SPIDERMAN.png',
          '/images/TYLERTHECREATOR.jpg'
        ]
      },
      'sports': {
        title: 'Sports Social Media Graphics',
        content: 'Using Adobe Creative Suite I created celebratory media for accomplished athletes. Designs embodied the athlete and their specific tone and aura. This was primarily done using color theory, typography, and texture.',
        images: [
          '/images/RICHARDSON.png',
          '/images/JAMORANT.png'
        ]
      },
      'ads': {
        title: 'Product Ads: Guarana, Spider-man Movie, Rolex',
        content: 'This project consisted of creating ads elevated through creativity and relatability. The key challenge was to embody a lifestyle that a consumer relates to. This is visible through components such as the children plating soccer around the soda bottle, a core memory for Brasileros.',
        images: [
          '/images/GUARANA.png',
          '/images/MARCJACOBS.png',
          '/images/ROLEX.png'
        ]
      },
      'threadbox': {
        title: 'UI Wireframe: Threadbox',
        content: 'For this project, I designed the user interface for a weather based fashion app. The key challenge was to create an intuitive and visually appealing experience that makes it easy for users to receive output based off their input entry. I used Figma to create wireframes and high-fidelity mockups, focusing on clear navigation, and a consistent design system.',
        images: [
          '/images/threadbox.jpg',
        ]
      },
    };

    const currentCaseStudy = caseStudies[caseStudyId];
    return (
      <div className="p-8 md:p-12 text-left max-w-4xl mx-auto">
        <button
          onClick={() => {
            setDesignCaseStudy(null);
            if (!selectedCategory) {
              // If no category is selected, we came from old navigation, so do nothing special
            }
          }}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </button>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{currentCaseStudy.title}</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {currentCaseStudy.content}
        </p>
        <div className="space-y-8">
          {currentCaseStudy.images && currentCaseStudy.images.length > 0 && currentCaseStudy.images.map((image, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 shadow-lg">
              <img
                src={image}
                alt={`${currentCaseStudy.title} - Visual ${index + 1}`}
                className="w-full h-auto rounded-xl object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x600?text=Image+Not+Found"; }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper component for the "Projects" page content.
  const ProjectsPage = () => {
    // Placeholder data for your projects. You can easily replace this with your own.
    const projects = [
      {
        title: 'Routed Philanthropy Website',
        description: 'This non-profit philanthropy website, built with React, showcases skills in database management, user interface design, and content organization.',
        link: 'https://routedphilanthropy.org/'
      },
      {
        title: 'Pocket Watching',
        description: 'This application is designed to help users manage their personal finances. It includes features for tracking income, expenses, and budgeting, all built with React and integrated with a backend API for data persistence.',
        link: 'https://pocketwatching.netlify.app/'
      },
      {
        title: 'Curated Colors',
        description: 'This code features a clean, visually-driven layout with high-quality images of modern and contemporary art. It is highly functional, serving as both a promotional tool and an information portal.',
        link: 'https://github.com/umezakip/curated.colors'
      }
    ];
    return (
      <div className="p-8 md:p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">Development</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Proficient in: HTML, CSS, JavaScript, React
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    );
  };

  // Helper component for the "Contact" page content.
  const ContactPage = () => (
    <div className="p-8 md:p-12 text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Me</h2>
      <p className="text-lg text-gray-300 mb-8">
        I'm currently seeking new opportunities and challenges. Feel free to reach out to me!
      </p>
      {/* Updated contact icons with new styling */}
      <div className="flex justify-center space-x-6">
        <a href="mailto:peterumezaki@gmail.com" className="flex items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 text-white transition-all duration-300 transform hover:scale-110 hover:bg-white/10">
          <Mail size={32} />
        </a>
        <a href="https://www.linkedin.com/in/peter-umezaki-504bb5192/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 text-white transition-all duration-300 transform hover:scale-110 hover:bg-white/10">
          <Linkedin size={32} />
        </a>
        <a href="https://github.com/umezakip" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 text-white transition-all duration-300 transform hover:scale-110 hover:bg-white/10">
          <Github size={32} />
        </a>
      </div>
    </div>
  );

  // A switch statement to conditionally render the correct page component.
  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutMePage />;
      case 'design':
        if (designCaseStudy) {
          return <CaseStudyPage caseStudyId={designCaseStudy} />;
        }
        return <DesignPage />;
      case 'development':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    // Main container with a dark background and text color.
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col items-center relative overflow-hidden">
      
      {/* Video Background for the Home Page */}
      {currentPage === 'home' && (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
            style={{ opacity: 1 }}
          >
            {/* Replace this URL with your own video URL. */}
            <source src="/images/backgroundvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Semi-transparent overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gray-900/60 z-10"></div>
        </>
      )}

      {/* Navigation bar at the top */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-gray-900/50 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto flex justify-center space-x-2 md:space-x-4">
          <NavLink to="home">Home</NavLink>
          <NavLink to="about">About Me</NavLink>
          <NavLink to="design">Design</NavLink>
          <NavLink to="development">Development</NavLink>
          <NavLink to="contact">Contact</NavLink>
        </div>
      </nav>
      {/* Main content area. mt-20 provides space for the fixed nav bar. z-20 ensures content is above the video and overlay. */}
      <main className="container mx-auto px-4 py-20 flex-grow flex items-center justify-center relative z-20">
        {renderPage()}
      </main>
      {/* Simple footer for copyright information */}
      <footer className="w-full text-center py-4 text-gray-400 text-sm relative z-20">
        © 2024 Peter Umezaki. All rights reserved.
      </footer>
    </div>
  );
}