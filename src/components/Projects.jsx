import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import projectsData from '../data/projects.json'

const ITEMS_PER_PAGE = 6

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filters = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    { key: 'flutter', label: 'Flutter Apps', icon: '📱' },
    { key: 'web', label: 'Web Apps', icon: '🌐' },
    { key: 'fullstack', label: 'Fullstack', icon: '⚡' }
  ]

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    if (filter === 'all') {
      return projectsData
    }
    return projectsData.filter(project => project.category === filter)
  }, [filter])

  // Memoized paginated projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => handleFilterChange(filterOption.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              <span className="text-lg">{filterOption.icon}</span>
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {project.category}
                </div>

                {/* Tech Stack */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                    <div
                      key={tech}
                      className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-300"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex gap-3 relative z-20">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 cursor-pointer"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 cursor-pointer"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-2"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
              >
                {page}
              </button>
            ))}
          </motion.div>
        )}

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-gray-400"
        >
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 