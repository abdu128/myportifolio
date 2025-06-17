import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import avatar from '../assets/avatar.jpg';

const Hero = () => {
  const containerRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const sentences = [
    "Software Engineer",
    "Mobile App Developer",
    "Web Developer",
    "Full-Stack Developer", 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % sentences.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [sentences.length]);

  // Simplified floating animation variants
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Simplified stagger animation for text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Simplified icon animation
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0">
        {/* Simplified animated background */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          {/* Avatar - No motion */}
          <div className="relative mb-8 mx-auto">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={avatar}
                alt="Abdulaziz Nejib"
                className="w-full h-full object-cover rounded-full border-4 border-emerald-500/30 shadow-2xl"
              />
              {/* Simplified glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-6xl font-bold mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <span className="text-white">
              Abdulaziz Nejib
            </span>
          </motion.h1>

          {/* Title - Typewriter effect */}
          <div className="text-xl md:text-2xl lg:text-3xl text-white mb-8 font-light h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="block"
              >
                {sentences[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

    

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={20} />
              View Projects
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.0 }}
          >
            {[
              { icon: Github, href: "https://github.com/abdu128", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/abdulaziz-nejib-7a0700354", label: "LinkedIn" },
              { icon: Mail, href: "mailto:abdulaziz.nejib@email.com", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 text-gray-400 hover:text-emerald-400"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

         
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-emerald-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;