
import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <section id="video" className="relative h-[40vh] md:h-[60vh] overflow-hidden bg-black">
      <video
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        poster="https://i.ibb.co/Hf0mLbKt/gfgfd.jpg"
      >
        <source src="https://www.dropbox.com/scl/fi/vq9s95gg1uyu9aufkmpm3/V-deo-do-WhatsApp-de-2025-10-06-s-19.07.50_1c912b35.mp4?rlkey=cihyboabpwzu00dethvll3ag1&st=mlpqf316&raw=1" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
    </section>
  );
};

export default VideoSection;
