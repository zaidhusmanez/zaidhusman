'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, LogOut, LayoutGrid, List, PlusCircle, ExternalLink, Github, Image as ImageIcon, Check, X, Link as LinkIcon, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Project, CustomLink } from '@/lib/projects'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (err) {
      alert('Failed to delete project')
    }
  }

  const openAddForm = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const openEditForm = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Admin Header */}
      <nav className="bg-slate-900/50 border-b border-slate-800/50 sticky top-0 z-[100] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
              <LayoutGrid className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Manage your portfolio projects</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={openAddForm}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/10"
            >
              <PlusCircle className="w-4 h-4" />
              Add Project
            </button>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white p-2 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
            <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-slate-500 mb-6">Start by adding your first project showcase</p>
            <button
              onClick={openAddForm}
              className="text-amber-500 hover:text-amber-400 font-bold transition-colors"
            >
              + Add Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card rounded-2xl border border-slate-800/50 overflow-hidden group hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="aspect-video relative bg-slate-900 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => openEditForm(project)}
                      className="w-9 h-9 bg-slate-950/80 backdrop-blur-md rounded-lg flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors border border-white/5"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="w-9 h-9 bg-slate-950/80 backdrop-blur-md rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors border border-white/5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-slate-800/50 text-slate-500 text-[10px] rounded-md border border-slate-700/30">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/50">
                    {project.link && (
                      <a href={project.link} target="_blank" className="text-slate-500 hover:text-amber-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" className="text-slate-500 hover:text-amber-400 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.customLinks?.map((link, idx) => (
                      <a key={idx} href={link.url} target="_blank" className="text-slate-500 hover:text-amber-400 transition-colors" title={link.label}>
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Project Form Modal */}
      {isFormOpen && (
        <ProjectForm 
          project={editingProject} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={() => {
            setIsFormOpen(false)
            fetchProjects()
          }} 
        />
      )}
    </div>
  )
}

function ProjectForm({ 
  project, 
  onClose, 
  onSuccess 
}: { 
  project: Project | null, 
  onClose: () => void, 
  onSuccess: () => void 
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      title: '',
      description: '',
      tech: [],
      category: 'Softwares',
      image: '',
      images: [],
      featured: false,
      link: '',
      github: '',
      customLinks: []
    }
  )
  const [techInput, setTechInput] = useState(project?.tech.join(', ') || '')
  const [newLinkLabel, setNewLinkLabel] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const uploadFiles = Array.from(files).slice(0, 5 - (formData.images?.length || 0))
    
    for (const file of uploadFiles) {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })
        const data = await res.json()
        if (data.url) {
          setFormData(prev => ({
            ...prev,
            image: prev.image || data.url, // Set main image if not set
            images: [...(prev.images || []), data.url]
          }))
        }
      } catch (err) {
        alert('Upload failed')
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...(prev.images || [])]
      const removed = newImages.splice(index, 1)[0]
      return {
        ...prev,
        images: newImages,
        image: prev.image === removed ? (newImages[0] || '') : prev.image
      }
    })
  }

  const addCustomLink = () => {
    if (!newLinkLabel || !newLinkUrl) return
    setFormData(prev => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), { label: newLinkLabel, url: newLinkUrl }]
    }))
    setNewLinkLabel('')
    setNewLinkUrl('')
  }

  const removeCustomLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customLinks: prev.customLinks?.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      ...formData,
      tech: techInput.split(',').map(t => t.trim()).filter(t => t !== '')
    }

    try {
      const method = project ? 'PUT' : 'POST'
      const body = project ? { id: project.id, ...data } : data

      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        onSuccess()
      } else {
        alert('Failed to save project')
      }
    } catch (err) {
      alert('Error saving project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-4xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all"
                  >
                    <option value="Softwares">Softwares</option>
                    <option value="Websites">Websites</option>
                    <option value="Graphic Designs">Graphic Designs</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer group bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 w-full transition-all hover:border-amber-500/30">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-800 bg-slate-900 text-amber-500 focus:ring-amber-500/20"
                    />
                    <span className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors">Featured</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, Next.js, Tailwind..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Custom Links</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Label (e.g. Behance)"
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-amber-500/50 outline-none"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    className="flex-[2] bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:border-amber-500/50 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCustomLink}
                    className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.customLinks?.map((link, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium text-white">{link.label}</span>
                        <span className="text-xs text-slate-500 truncate max-w-[150px]">{link.url}</span>
                      </div>
                      <button type="button" onClick={() => removeCustomLink(index)} className="text-slate-500 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 ml-1">
                  Project Images (Max 5)
                </label>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {formData.images?.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 group">
                      <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded uppercase">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                  {(formData.images?.length || 0) < 5 && (
                    <div className="relative aspect-video rounded-xl border-2 border-dashed border-slate-800 hover:border-amber-500/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-950/30">
                      <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <ImageIcon className="w-8 h-8 text-slate-700" />
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Upload Images</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Main Links</label>
                <div>
                  <div className="flex items-center gap-3 mb-2 ml-1">
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Live Demo</span>
                  </div>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 ml-1">
                    <Github className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">GitHub Repo</span>
                  </div>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:outline-none transition-all"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 px-12 rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  {project ? 'Update Project' : 'Create Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
