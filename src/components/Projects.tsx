'use client'

import { useState, useEffect } from 'react'
import { AnimateOnScroll } from './AnimateOnScroll'
import { SectionHeader } from './SectionHeader'
import { TiltCard } from './TiltCard'
import { ExternalLink, Github, X, ChevronRight, Layout, Code, Palette, Grid, Link as LinkIcon, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/projects'
import Link from 'next/link'

const categories = [
  { name: 'All', icon: Grid },
  { name: 'Softwares', icon: Code },
  { name: 'Websites', icon: Layout },
  { name: 'Graphic Designs', icon: Palette },
]

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data)
        // Filter and limit to 3 featured projects for the home page
        const featured = data.filter(p => p.featured).slice(0, 3)
        setFeaturedProjects(featured)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch projects', err)
        setLoading(false)
      })
  }, [])

  const nextImage = () => {
    if (!selectedProject?.images) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = () => {
    if (!selectedProject?.images) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <AnimateOnScroll effect="blur">
            <SectionHeader number="04" title="Featured" accent="Projects" />
            <p className="text-slate-400 max-w-lg mt-4 leading-relaxed">
              A curated selection of my top-tier work across software development, web design, and creative branding.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <Link 
              href="/projects" 
              className="group flex items-center gap-3 text-amber-500 font-bold hover:text-amber-400 transition-colors"
            >
              View All Projects
              <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10 transition-all">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </AnimateOnScroll>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} delay={index * 100}>
                  <TiltCard className="h-full">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => {
                        setSelectedProject(project)
                        setCurrentImageIndex(0)
                      }}
                      className="group relative glass-card card-glow rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden h-full flex flex-col cursor-pointer"
                    >
                    {/* Image Container */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code className="w-12 h-12 text-slate-800" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-amber-400 text-sm font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Project Details <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-slate-950/60 backdrop-blur-md text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-white/5">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-slate-800/50 text-slate-500 text-[10px] font-medium rounded-lg border border-slate-700/30 group-hover:border-amber-500/20 group-hover:text-slate-400 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-3 py-1 bg-slate-800/50 text-slate-500 text-[10px] font-medium rounded-lg border border-slate-700/30">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  </TiltCard>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-950/50 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-3/5 bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative group/slider">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <>
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    
                    {selectedProject.images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-amber-500 hover:text-slate-950"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-amber-500 hover:text-slate-950"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-amber-500 w-6' : 'bg-white/20 hover:bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center">
                    <Code className="w-20 h-20 text-slate-800" />
                  </div>
                )}
              </div>

              <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-amber-500/20 mb-6 inline-block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white mb-6 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mb-10">
                  <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-amber-500/50" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-xs font-medium rounded-xl border border-slate-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/10 group"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Project
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all border border-slate-700"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {selectedProject.customLinks?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold py-3 rounded-xl transition-all"
                      >
                        <LinkIcon className="w-4 h-4" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
