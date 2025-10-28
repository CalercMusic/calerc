
import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection';
import MusicSection from './components/MusicSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black text-[#f0f0f0] overflow-x-hidden">
      <Header />
      <main>
        <AboutSection />
        <VideoSection />
        <MusicSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
