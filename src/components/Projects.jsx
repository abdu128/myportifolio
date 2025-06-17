import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../data/projects.json'

const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))]

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filters = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    { key: 'flutter', label: 'Flutter Apps', icon: '📱' },
    { key: 'web', label: 'Web Apps', icon: '🌐' },
    { key: 'fullstack', label: 'Fullstack', icon: '⚡' }
  ]

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === filter))
    }
  }, [filter])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my latest work in mobile and web development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.key}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              <span className="text-lg">{filterOption.icon}</span>
              {filterOption.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                whileHover="hover"
                layout
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-4 left-4 px-3 py-1 bg-emerald-600/80 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {project.category}
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {project.technologies && project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 relative z-10">
                  <motion.h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-gray-400 mb-4 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Project Links */}
                  <motion.div
                    className="flex gap-3 relative z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 cursor-pointer"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 cursor-pointer"
                      >
                        GitHub
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Hover Overlay - Only on image area */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-10 text-6xl opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-10 text-6xl opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💻
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 