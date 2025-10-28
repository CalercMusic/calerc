import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';

const Header: React.FC = () => {
  const [logoOpacity, setLogoOpacity] = useState(1);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        const headerHeight = headerRef.current.offsetHeight;
        
        const startFade = headerHeight * 0.1;
        const endFade = headerHeight * 0.7;

        if (scrollPosition > startFade) {
          let opacity = 1 - ((scrollPosition - startFade) / (endFade - startFade));
          opacity = Math.max(0, opacity);
          setLogoOpacity(opacity);
        } else {
          setLogoOpacity(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="relative text-center h-[750px] flex flex-col justify-end items-center px-5 pb-32 overflow-hidden z-10">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('https://i.ibb.co/Xrp9FVxS/Design-sem-nome.jpg')", filter: 'brightness(0.3) grayscale(0.1)' }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black"></div>


      <img
        src="https://i.ibb.co/S7W5p82p/CALERC-BRANCO-a-baixo.png"
        alt="DJ Calerc Logo"
        className="relative w-[550px] max-w-[90%] h-auto mb-8 transition-opacity duration-300 ease-out animate-pulse-glow"
        style={{ opacity: logoOpacity }}
      />

      <div className="relative z-10 text-center mb-5">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-decoration-none text-[#f0f0f0] bg-red-900/10 border border-[#8B0000] py-3 px-6 m-2 rounded-full transition-all duration-400 uppercase tracking-wider hover:bg-[#8B0000] hover:text-white hover:shadow-[0_0_10px_#600000,0_0_20px_#8B0000] hover:-translate-y-0.5"
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;