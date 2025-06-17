import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navigation = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Logic to hide/show navbar on scroll
      if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down and past initial threshold
        setIsNavbarVisible(false)
      } else if (window.scrollY < lastScrollY) { // Scrolling up
        setIsNavbarVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY]) // Depend on lastScrollY to ensure correct comparison

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navVariants = {
    hidden: { opacity: 0, y: -100 }, // Off-screen top
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="visible"
      animate={isNavbarVisible ? "visible" : "hidden"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center"
              whileHover={{
                rotate: [0, 5, -5, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg">AN</span>
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-white hidden sm:block"
              whileHover={{ color: '#10b981' }}
              transition={{ duration: 0.3 }}
            >
              Abdulaziz Nejib
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentSection === item.name
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            
            {/* CTA Button */}
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    variants={menuItemVariants}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-300 ${
                      currentSection === item.name
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-emerald-400'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                {/* Mobile Hire Me Button */}
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  variants={menuItemVariants}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg mt-4"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation 