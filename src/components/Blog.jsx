import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import blogData from '../data/blog.json'

const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">
          Latest <span className="gradient-text">Blog</span>
        </h2>
        <p className="section-subtitle">
          Insights, tutorials, and thoughts on modern web development
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.slice(0, 3).map((post, i) => (
          <motion.a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
            className="card-hover block h-full"
            aria-label={post.title}
          >
            <div className="h-40 w-full rounded-xl overflow-hidden mb-4">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <h3 className="text-lg font-bold gradient-text mb-2">{post.title}</h3>
            <p className="text-white/80 text-sm mb-2">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

export default Blog 