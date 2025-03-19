"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaProductHunt, FaTwitter } from "react-icons/fa";
import { SiIndiehackers } from "react-icons/si";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set loaded state after mount to avoid hydration issues
  useEffect(() => {
    setIsLoaded(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  // Track mouse movement for 3D effects with throttling
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 20; // More responsive for enhanced 3D effect

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      
      lastTime = currentTime;
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    if (!isLoaded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [isLoaded]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home", color: "#4682B4" },
    { id: "projects", label: "Projects", color: "#9ACD32" },
    { id: "connect", label: "Let's Chat!", color: "#FF6347" }
  ];

  const projects = [
    { 
      title: "✨ CryptoMonkey",
      description: "Your friendly guide to the crypto universe",
      link: "https://cryptomonkey.vercel.app",
      color: "#FFD700"
    },
    { 
      title: "🎨 PageMonkey",
      description: "Beautiful landing pages at your fingertips",
      link: "https://pagemonkey.vercel.app",
      color: "#9ACD32"
    },
    { 
      title: "⌛ Time Zenith",
      description: "Master your time, master your life",
      link: "https://tz2-delta.vercel.app",
      color: "#4682B4"
    },
    { 
      title: "📸 Framerr",
      description: "Turn screenshots into works of art",
      link: "https://framerr.vercel.app/",
      color: "#FF6347"
    },
    { 
      title: "🎧 Echo Suggest",
      description: "Your AI-powered content curator",
      link: "https://echo-suggest.vercel.app/",
      color: "#9370DB"
    },
    {
      title: "🗳️ SupVote",
      description: "Your voice matters - Simple & secure voting platform",
      link: "https://supvote.vercel.app/",
      color: "#FF6B6B"
    },
    {
      title: "🤖 GamAI",
      description: "AI-powered gaming companion",
      link: "https://gamai.vercel.app/",
      color: "#4ECDC4"
    },
    {
      title: "📅 PlanZenith",
      description: "Elevate your planning experience",
      link: "https://planzenith-eight.vercel.app/",
      color: "#45B7D1"
    },
    {
      title: "🌟 IndieHub",
      description: "Connect with fellow indie makers",
      link: "https://indie-hub-g1xg.vercel.app/",
      color: "#96CEB4"
    },
    { 
      title: "📚 BooksFlick",
      description: "Your next literary adventure awaits",
      link: "https://books-flcik.vercel.app/",
      color: "#20B2AA"
    },
    { 
      title: "📊 Readometer",
      description: "Level up your reading game",
      link: "https://readometer.vercel.app/",
      color: "#FF7F50"
    },
    { 
      title: "🚀 Dare Beyond",
      description: "Push your limits, embrace growth",
      link: "https://dare-beyond.vercel.app/",
      color: "#6A5ACD"
    }
  ];

  const socials = [
    { 
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/sahil-khan-indie"
    },
    { 
      name: "Product Hunt",
      icon: <FaProductHunt size={20} />,
      url: "https://www.producthunt.com/@sahil_khan_coder"
    },
    { 
      name: "Indie Hackers",
      icon: <SiIndiehackers size={20} />,
      url: "https://www.indiehackers.com/SahilKhan"
    },
    { 
      name: "X",
      icon: <FaTwitter size={20} />,
      url: "https://x.com/Sahil_Khan2008"
    },
    {
      name: "Chess.com",
      icon: "♟️",
      url: "https://www.chess.com/member/sahil_khan3"
    }
  ];

  // Enhanced 3D transform based on mouse position
  const getTransform = (factor = 1, depth = 30) => {
    if (!isLoaded) return {};
    
    return {
      transform: `perspective(1000px) rotateX(${-mousePosition.y * depth * factor}deg) rotateY(${mousePosition.x * depth * factor}deg) translateZ(15px)`,
      transition: "transform 0.08s ease-out"
    };
  };

  // Only render 3D effects if device is likely not mobile/tablet
  const is3DEnabled = isLoaded && windowSize.width >= 768;

  // Three.js components
  const ThreeBackground = () => {
    const { camera } = useThree();
    const particlesRef = useRef();
    
    useEffect(() => {
      camera.position.z = 5;
    }, [camera]);
    
    useFrame((state, delta) => {
      if (particlesRef.current) {
        particlesRef.current.rotation.x += delta * 0.05;
        particlesRef.current.rotation.y += delta * 0.075;
      }
    });
    
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={1000}
              array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.05} color="#000000" sizeAttenuation transparent opacity={0.3} />
        </points>
      </>
    );
  };

  // Enhanced 3D card effect for projects
  const Card3D = ({ children, depth = 40, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useTransform(y, [-300, 300], [20, -20]);
    const rotateY = useTransform(x, [-300, 300], [-20, 20]);
    
    const handleMouseMove = (e) => {
      if (!is3DEnabled) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    return (
      <motion.div
        className={`relative ${className}`}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          perspective: 1200,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ 
          transformStyle: "preserve-3d", 
          transform: is3DEnabled ? `translateZ(${depth}px)` : "none",
          transition: "transform 0.2s ease-out"
        }}>
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-white text-black font-mono perspective-1200"
      ref={mainRef}
      style={{ perspective: "1200px" }}
    >
      <div className="fixed inset-0 z-0 opacity-30">
        <Canvas>
          <ThreeBackground />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50"
        style={{ 
          scaleX: scrollYProgress,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}
      />
      
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-black">
        <nav className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
          <motion.span 
            className="text-xl font-bold tracking-tight font-sans"
            style={is3DEnabled ? getTransform(0.7, 15) : {}}
          >
             Sahil Khan
          </motion.span>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm transition-all ${
                  activeSection === link.id ? "text-black font-bold" : "text-gray-500 hover:text-black"
                }`}
                style={is3DEnabled ? getTransform(0.5, 20) : {}}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            style={is3DEnabled ? getTransform(0.5, 20) : {}}
          >
            {menuOpen ? "×" : "≡"}
          </motion.button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-black">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-black hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16 relative z-10" style={{ transformStyle: "preserve-3d" }}>
        <section 
          id="home" 
          className="min-h-[85vh] flex flex-col items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="mb-8"
              style={is3DEnabled ? getTransform(1.2, 40) : {}}
            >
              <Image 
                src="/logo1.png" 
                alt="Logo" 
                width={140} 
                height={140} 
                className="mx-auto drop-shadow-2xl" 
                priority
              />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-sans"
              style={is3DEnabled ? getTransform(1, 35) : {}}
            >
              Sahil Khan
            </motion.h1>
            <motion.p 
              className="text-gray-700 mb-10 text-xl font-mono"
              style={is3DEnabled ? getTransform(0.8, 30) : {}}
            >
              Founder of Solo Business Brief
            </motion.p>
            <div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              {socials.map((social, index) => (
                <Card3D key={index} depth={25}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 border-2 border-black transition-all"
                    style={{ 
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm font-mono">{social.name}</span>
                  </a>
                </Card3D>
              ))}
            </div>
            <Card3D depth={35}>
              <a
                href="https://solobusinessbrief.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 border-2 border-black bg-black text-white font-bold transition-all"
                style={{ 
                  boxShadow: "5px 5px 0px rgba(0,0,0,0.8)",
                  transformStyle: "preserve-3d"
                }}
              >
                <span className="font-mono">✨ Join Solo Business Brief</span>
              </a>
            </Card3D>
          </div>
        </section>

        <section 
          id="projects" 
          className="py-32 bg-gray-50"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="max-w-4xl mx-auto px-4" style={{ transformStyle: "preserve-3d" }}>
            <motion.h2 
              className="text-4xl font-bold mb-16 tracking-tight text-center font-sans"
              style={is3DEnabled ? getTransform(0.8, 30) : {}}
            >
              🚀 Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8" style={{ transformStyle: "preserve-3d" }}>
              {projects.map((project, index) => (
                <Card3D key={index} depth={30}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 border-2 border-black bg-white transition-all"
                    style={{ 
                      boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                      transformStyle: "preserve-3d"
                    }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <h3 className="text-2xl font-bold mb-3 font-sans">
                      {project.title}
                    </h3>
                    <p className="text-md opacity-80 mb-4 font-mono">
                      {project.description}
                    </p>
                    <div 
                      className="w-full h-2 rounded-full mb-4"
                      style={{ 
                        backgroundColor: project.color,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-70 font-mono">
                        Explore →
                      </span>
                      {hoveredProject === index && (
                        <span className="text-lg">✨</span>
                      )}
                    </div>
                  </a>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        <section 
          id="connect" 
          className="py-24 border-t border-black"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="max-w-4xl mx-auto px-4" style={{ transformStyle: "preserve-3d" }}>
            <motion.h2 
              className="text-3xl font-bold mb-12 tracking-tight text-center font-sans"
              style={is3DEnabled ? getTransform(0.8, 30) : {}}
            >
              Let's Connect
            </motion.h2>
            <div 
              className="flex flex-wrap justify-center gap-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              {socials.map((social, index) => (
                <Card3D key={index} depth={25}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors"
                    style={{ 
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm font-mono">{social.name}</span>
                  </a>
                </Card3D>
              ))}
            </div>
            <motion.div 
              className="mt-16 text-center"
              style={is3DEnabled ? getTransform(0.6, 25) : {}}
            >
              <p className="text-gray-600 mb-4 font-mono">
                Have a project in mind? Let's collaborate!
              </p>
              <a 
                href="mailto:contact@sahilkhan.dev" 
                className="inline-block text-lg font-medium underline hover:no-underline font-mono"
              >
                sahil423701@gmail.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-black bg-gray-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p 
            className="text-md text-gray-600 font-mono"
            style={is3DEnabled ? getTransform(0.5, 15) : {}}
          >
            ©Sahil Khan
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
