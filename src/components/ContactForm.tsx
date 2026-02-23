'use client'

import { useState } from 'react'

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validate = () => {
    const e: FormErrors = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email address'
    if (!formData.subject.trim()) e.subject = 'Subject is required'
    if (!formData.message.trim()) e.message = 'Message is required'
    else if (formData.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (!FORMSPREE_URL) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-5 py-4 bg-slate-800/60 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all duration-300'
  const errorClass = 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30'

  if (!FORMSPREE_URL) {
    return (
      <div className="p-8 glass-card rounded-2xl border-amber-500/20">
        <p className="text-slate-400 mb-4">
          To enable the contact form, add your Formspree form ID to <code className="text-amber-400/80">.env.local</code>:
        </p>
        <code className="block text-sm text-slate-500 bg-slate-900/60 p-4 rounded-lg">
          NEXT_PUBLIC_FORMSPREE_ID=your_form_id
        </code>
        <p className="text-slate-500 text-sm mt-4">
          Get a free form at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">formspree.io</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card card-glow rounded-2xl p-8">
      <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`${inputClass} ${errors.name ? errorClass : ''}`}
            placeholder="John Doe"
            disabled={status === 'loading'}
          />
          {errors.name && <p className="text-red-400/90 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
            Your Email *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${inputClass} ${errors.email ? errorClass : ''}`}
            placeholder="john@example.com"
            disabled={status === 'loading'}
          />
          {errors.email && <p className="text-red-400/90 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={`${inputClass} ${errors.subject ? errorClass : ''}`}
          placeholder="Project inquiry / Collaboration"
          disabled={status === 'loading'}
        />
        {errors.subject && <p className="text-red-400/90 text-sm mt-1">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none ${errors.message ? errorClass : ''}`}
          placeholder="Tell me about your project..."
          disabled={status === 'loading'}
        />
        {errors.message && <p className="text-red-400/90 text-sm mt-1">{errors.message}</p>}
      </div>
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p>Thanks! Your message was sent successfully. I&apos;ll get back to you soon.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Something went wrong. Please try again or email me directly.</p>
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-shine w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-full transition-all duration-500 hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-label="Sending">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <span>→</span>
          </>
        )}
      </button>
      </div>
    </form>
  )
}
