import React, { useState, useEffect, useRef } from 'react';

type PlayerStatus = 'loading' | 'loaded' | 'error';

const MusicSection: React.FC = () => {
  const [spotifyStatus, setSpotifyStatus] = useState<PlayerStatus>('loading');
  const [soundcloudStatus, setSoundcloudStatus] = useState<PlayerStatus>('loading');
  
  const spotifyTimeoutRef = useRef<number | null>(null);
  const soundcloudTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    spotifyTimeoutRef.current = window.setTimeout(() => {
        if (spotifyStatus === 'loading') setSpotifyStatus('error');
    }, 15000); // 15-second timeout
    return () => { if (spotifyTimeoutRef.current) clearTimeout(spotifyTimeoutRef.current) };
  }, [spotifyStatus]);

  useEffect(() => {
    soundcloudTimeoutRef.current = window.setTimeout(() => {
        if (soundcloudStatus === 'loading') setSoundcloudStatus('error');
    }, 15000); // 15-second timeout
    return () => { if (soundcloudTimeoutRef.current) clearTimeout(soundcloudTimeoutRef.current) };
  }, [soundcloudStatus]);

  const handleSpotifyLoad = () => {
    if (spotifyTimeoutRef.current) clearTimeout(spotifyTimeoutRef.current);
    setSpotifyStatus('loaded');
  };

  const handleSoundCloudLoad = () => {
    if (soundcloudTimeoutRef.current) clearTimeout(soundcloudTimeoutRef.current);
    setSoundcloudStatus('loaded');
  };

  const Loader: React.FC<{ serviceName: string }> = ({ serviceName }) => (
    <div className="text-center text-gray-400 animate-fade-in">
        <svg className="animate-spin h-10 w-10 text-[#8B0000] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-3">Carregando player do {serviceName}...</p>
    </div>
  );

  const ErrorMessage: React.FC<{ serviceName: string }> = ({ serviceName }) => (
     <div className="text-center text-gray-300 animate-fade-in">
        <h3 className="font-bold text-lg mb-2">Ocorreu um erro ao carregar</h3>
        <p className="text-sm">O player do {serviceName} não respondeu. Por favor, utilize o botão abaixo para abrir diretamente na plataforma.</p>
    </div>
  );

  return (
    <section id="musicas" className="py-24 px-5 text-center bg-black">
      <h2 className="mb-12 uppercase text-4xl lg:text-5xl tracking-widest font-orbitron text-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        OUÇA AGORA!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Spotify Player */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-full h-[352px] overflow-hidden rounded-3xl shadow-lg shadow-black/50 isolate relative bg-[#121212] flex items-center justify-center p-4">
            {spotifyStatus === 'loading' && <Loader serviceName="Spotify" />}
            {spotifyStatus === 'error' && <ErrorMessage serviceName="Spotify" />}
            <iframe
              title="Spotify Player for DJ Calerc"
              src="https://open.spotify.com/embed/artist/6l329vrowVAqGi128rTu6d?utm_source=generator"
              className={`w-full h-full block border-none rounded-3xl absolute top-0 left-0 transition-opacity duration-500 ${spotifyStatus === 'loaded' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={handleSpotifyLoad}
              aria-hidden={spotifyStatus !== 'loaded'}
            ></iframe>
          </div>
          <a
            href="https://open.spotify.com/artist/6l329vrowVAqGi128rTu6d"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-decoration-none text-[#f0f0f0] bg-red-900/20 border border-[#8B0000] py-3 px-8 rounded-full transition-all duration-400 uppercase tracking-wider text-sm hover:bg-[#8B0000] hover:text-white hover:shadow-[0_0_10px_#600000,0_0_20px_#8B0000] hover:-translate-y-0.5"
          >
            Abrir no Spotify
          </a>
        </div>

        {/* SoundCloud Player */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-full h-[352px] overflow-hidden rounded-3xl shadow-lg shadow-black/50 isolate relative bg-[#121212] flex items-center justify-center p-4">
            {soundcloudStatus === 'loading' && <Loader serviceName="SoundCloud" />}
            {soundcloudStatus === 'error' && <ErrorMessage serviceName="SoundCloud" />}
            <iframe
              title="SoundCloud Player for DJ Calerc"
              className={`w-full h-full block border-none rounded-3xl absolute top-0 left-0 transition-opacity duration-500 ${soundcloudStatus === 'loaded' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              scrolling="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/joao-victor-cavalcante-819727275&color=%238B0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              onLoad={handleSoundCloudLoad}
              aria-hidden={soundcloudStatus !== 'loaded'}
            ></iframe>
          </div>
          <a
            href="https://soundcloud.com/joao-victor-cavalcante-819727275"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-decoration-none text-[#f0f0f0] bg-red-900/20 border border-[#8B0000] py-3 px-8 rounded-full transition-all duration-400 uppercase tracking-wider text-sm hover:bg-[#8B0000] hover:text-white hover:shadow-[0_0_10px_#600000,0_0_20px_#8B0000] hover:-translate-y-0.5"
          >
            Abrir no SoundCloud
          </a>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
