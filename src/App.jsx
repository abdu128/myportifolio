import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { ChevronUp } from 'lucide-react'
import './App.css'

// Particle Component for Background Effects
const Particle = ({ x, y, size, color, duration, delay }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -100, -200],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
};

// Floating Elements Component
const FloatingElements = () => {
  const elements = [
    { icon: '📱', x: '10%', y: '20%', delay: 0 },
    { icon: '⚛️', x: '85%', y: '30%', delay: 2 },
    { icon: '🎯', x: '15%', y: '70%', delay: 4 },
    { icon: '🚀', x: '80%', y: '80%', delay: 6 },
    { icon: '💻', x: '50%', y: '10%', delay: 8 },
    { icon: '🎨', x: '90%', y: '60%', delay: 10 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-10"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 z-50"
      style={{ width: `${scrollProgress}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
};

// Cursor Trail Effect
const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      className="fixed w-3 h-3 bg-emerald-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
};

// Memoized components for better performance
const MemoizedNavigation = React.memo(Navigation);
const MemoizedHero = React.memo(Hero);
const MemoizedAbout = React.memo(About);
const MemoizedSkills = React.memo(Skills);
const MemoizedProjects = React.memo(Projects);
const MemoizedBlog = React.memo(Blog);
const MemoizedContact = React.memo(Contact);
const MemoizedFooter = React.memo(Footer);

// Section transition variants
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('home')
  const [showBackToTop, setShowBackToTop] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 500)
    
    // Update current section based on scroll position
    const sections = ['home', 'about', 'skills', 'projects', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight / 2
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i])
      if (element && scrollPosition >= element.offsetTop) {
        setCurrentSection(sections[i])
        break
      }
    }
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Add event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    // Smooth scroll to section when navigation is clicked
    const handleNavClick = (e) => {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    // Add click listeners to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick)
    })

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick)
      })
    }
  }, [])

  // Memoized scroll progress value
  const scrollProgressValue = useMemo(() => scrollProgress.get(), [scrollProgress])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="App min-h-screen bg-gray-900 text-white overflow-x-hidden">
          {/* Global Effects */}
          <ScrollProgress />
          <FloatingElements />
          <CursorTrail />
          
          {/* Particles */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <Particle
                key={i}
                x={`${Math.random() * 100}%`}
                y={`${Math.random() * 100}%`}
                size={Math.random() * 3 + 1}
                color={`hsl(${Math.random() * 60 + 250}, 70%, 60%)`}
                duration={Math.random() * 10 + 10}
                delay={Math.random() * 5}
              />
            ))}
          </div>

          <MemoizedNavigation currentSection={currentSection} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key="app"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="relative z-10"
            >
              <main>
                <motion.section 
                  id="home"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <MemoizedHero />
                </motion.section>
                
                <motion.section 
                  id="about" 
                  className="section"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MemoizedAbout />
                </motion.section>
                
                <motion.section 
                  id="skills" 
                  className="section"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MemoizedSkills />
                </motion.section>
                
                <motion.section 
                  id="projects" 
                  className="section"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MemoizedProjects />
                </motion.section>
                
                {/* <motion.section 
                  id="blog" 
                  className="section"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MemoizedBlog />
                </motion.section> */}
                
                <motion.section 
                  id="contact" 
                  className="section"
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <MemoizedContact />
                </motion.section>
              </main>
              
              <MemoizedFooter />

              {/* Back to Top Button */}
              {showBackToTop && (
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg z-40 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                >
                  <ChevronUp className="text-white" size={20} />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
