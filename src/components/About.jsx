import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Calendar, MapPin, Award } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    { number: '3+', label: 'Years Experience', icon: '⏰' },
    { number: '10+', label: 'Projects Completed', icon: '🚀' },
    { number: '5+', label: 'Happy Clients', icon: '😊' },
    { number: '100%', label: 'Client Satisfaction', icon: '⭐' }
  ]

  const highlights = [
    {
      icon: '📱',
      title: 'Mobile-First Approach',
      description: 'Specialized in Flutter development with a focus on creating intuitive, high-performance mobile applications.'
    },
    {
      icon: '💻',
      title: 'web development',
      description: 'developing web applications using React, Node.js, Express, Postgres.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimized',
      description: 'Expert in building fast, scalable web and mobile applications with clean architecture and best practices.'
    },
    {
      icon: '🤝',
      title: 'Team Collaboration',
      description: 'Strong communication skills and experience working in agile environments with cross-functional teams.'
    }
  ]

  const timeline = [
    {
      year: '2023 - Present',
      title: 'Senior Flutter Developer',
      company: 'TechCorp Inc.',
      description: 'Leading Flutter mobile app development for enterprise applications, mentoring junior developers, and implementing cutting-edge mobile solutions.'
    },
    {
      year: '2021 - 2023',
      title: 'Flutter Developer',
      company: 'Digital Solutions Ltd.',
      description: 'Developed cross-platform mobile applications using Flutter and Dart, integrated with Firebase backend, and collaborated with design teams.'
    },
    {
      year: '2019 - 2021',
      title: 'Junior Developer',
      company: 'StartupXYZ',
      description: 'Built and maintained mobile applications with Flutter, learned modern development practices, and contributed to team projects.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate Flutter Mobile Developer and Fullstack Developer with a love for creating 
                exceptional digital experiences. With over 3 years of experience, I specialize in building 
                high-performance mobile applications that users love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-400 leading-relaxed">
                My journey in software development started with a curiosity about how mobile apps work. 
                Today, I'm proud to have built applications that serve thousands of users, from e-commerce 
                platforms to productivity tools and social networking apps.
              </p>
              {/* <p className="text-lg text-gray-400 leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                technologies and best practices. When I'm not coding, you can find me exploring new 
                technologies, contributing to open-source projects, or sharing knowledge with the developer community.
              </p> */}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <motion.div
                    className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <motion.div
                  className="text-3xl flex-shrink-0"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {highlight.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-20 text-6xl opacity-10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💻
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-20 text-6xl opacity-10"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎯
        </motion.div>
      </div>
    </section>
  )
}

export default About