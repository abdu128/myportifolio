import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Database, 
  Globe, 
  Palette, 
  Zap,
  Smartphone as FlutterIcon,
  Atom,
  Server,
  GitBranch,
  Box,
  Flame,
  FileText,
  FileCode,
  Circle
} from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Skills', icon: Zap },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Backend', icon: Database },
  ];

  const skills = [
    // Mobile Development
    { name: 'Flutter', level: 95, category: 'mobile', icon: FlutterIcon, color: '#00d4ff' },
    { name: 'Dart', level: 90, category: 'mobile', icon: Circle, color: '#00b4d8' },
    { name: 'React Native', level: 85, category: 'mobile', icon: Atom, color: '#61dafb' },
    
    // Frontend
    { name: 'React', level: 90, category: 'frontend', icon: Atom, color: '#61dafb' },
    { name: 'JavaScript', level: 88, category: 'frontend', icon: FileCode, color: '#f7df1e' },
    { name: 'TypeScript', level: 85, category: 'frontend', icon: FileText, color: '#3178c6' },
    { name: 'HTML/CSS', level: 92, category: 'frontend', icon: Code, color: '#e34f26' },
    
    // Backend
    { name: 'Node.js', level: 80, category: 'backend', icon: Server, color: '#339933' },
    { name: 'Python', level: 75, category: 'backend', icon: Circle, color: '#3776ab' },
    { name: 'Firebase', level: 85, category: 'backend', icon: Flame, color: '#ffca28' },
    
    // Tools
    // { name: 'Git', level: 88, category: 'tools', icon: GitBranch, color: '#f05032' },
    // { name: 'Docker', level: 70, category: 'tools', icon: Box, color: '#2496ed' },
    
    // Design
    // { name: 'UI/UX Design', level: 80, category: 'design', icon: Palette, color: '#ff6b6b' },
    // { name: 'Responsive Design', level: 90, category: 'design', icon: Globe, color: '#4ecdc4' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="relative py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit for building exceptional mobile and web experiences
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
              }`}
            >
              <category.icon size={20} />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${skill.color}20` }}
                >
                  <skill.icon size={24} style={{ color: skill.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">{skill.name}</h3>
                  <p className="text-gray-400">{skill.level}%</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 
