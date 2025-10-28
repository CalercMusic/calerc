import React from 'react';
import { CONTACT_LINKS } from '../constants';

const ContactSection: React.FC = () => {
    return (
        <section id="contato" className="py-24 px-5 text-center bg-black">
            <h2 className="mb-8 uppercase text-4xl lg:text-5xl tracking-widest font-orbitron text-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Contato e Booking
            </h2>
            <div className="relative z-10 text-center mb-8">
                {CONTACT_LINKS.map((link) => (
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
            <a
                href="https://drive.google.com/drive/folders/1q1bz3J6CiXqIOSfbqkYd_wRPvyMmk3-1?usp=sharing"
                className="inline-block text-decoration-none text-white bg-[#8B0000] py-4 px-8 mt-8 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#600000] hover:shadow-[0_0_10px_#8B0000]"
                target="_blank"
                rel="noopener noreferrer"
            >
                Download do Presskit
            </a>
        </section>
    );
};

export default ContactSection;