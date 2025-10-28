import React, { useState, useEffect, useRef } from 'react';
import ImageCarousel from './ImageCarousel';

const AboutSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            id="sobre"
            className="relative py-24 px-5 text-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://i.ibb.co/LzqP3Pmr/Design-sem-nome-1.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black"></div>

            <div
                ref={sectionRef}
                className={`relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
            >
                <h2 className="mb-10 uppercase text-4xl lg:text-5xl tracking-widest font-orbitron text-glow" style={{fontFamily: "'Orbitron', sans-serif"}}>
                    Sobre o Artista
                </h2>

                <div className="flex flex-wrap lg:flex-nowrap justify-center items-start max-w-6xl mx-auto gap-10 text-left">
                    <ImageCarousel />
                    <div className="flex-1 min-w-[300px] text-justify">
                        <p className="max-w-full mt-5 text-lg leading-relaxed font-light">
                            Nascido e criado no Rio de Janeiro, <strong>DJ Calerc</strong> se apaixonou pela música eletrônica aos 12 anos, inspirado pela energia das pistas e pela força do som. Aos 20, iniciou sua trajetória como DJ e produtor musical, explorando sonoridades que vão do <strong>House</strong> e <strong>Tech House</strong> ao <strong>Bass House</strong> e <strong>Melodic Techno</strong>.
                            <br /><br />
                            Com influências que misturam groove, intensidade e melodia, constrói sets que unem pista e emoção, sempre buscando criar uma atmosfera única que conecta o público e transforma cada apresentação em experiência inesquecível.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;