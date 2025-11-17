import React, { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 opacity-10" />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Pre‑launch • Early access open
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Your hiring, on autopilot
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Automate emails, AI assessments, interview reminders, offer letters, and more. A candidate-first portal keeps applicants informed—so you hire faster.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#waitlist" className="rounded-lg bg-indigo-600 px-5 py-3 text-white shadow-md transition hover:bg-indigo-700">Join Early Access</a>
            <a href="#workflow" className="rounded-lg px-5 py-3 text-indigo-700 ring-1 ring-indigo-200 transition hover:bg-indigo-50">See How It Works</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const list = [
    {
      title: 'Automation engine',
      desc: 'Stage progression, email sequences, offer automation with SLAs and escalations.'
    },
    {
      title: 'AI assessments',
      desc: 'Role-specific question generation, instant scoring, bias safeguards.'
    },
    {
      title: 'Candidate portal',
      desc: 'Credentials, reminders, updates, offer acceptance, document uploads.'
    },
    {
      title: 'Scheduling & reminders',
      desc: 'Portal, WhatsApp, and SMS reminders with calendar integration.'
    },
    {
      title: 'Best Match (NLP)',
      desc: 'Ranked candidates, rediscovery from your talent pool, explainable matches.'
    },
    {
      title: 'Bulk messaging',
      desc: 'Personalized WhatsApp/SMS at scale with templates and opt-in controls.'
    },
    {
      title: 'Reporting & dashboards',
      desc: 'To‑do view and advanced role-based analytics: time‑to‑hire, pipeline velocity, and more.'
    },
    {
      title: 'Security & compliance',
      desc: 'GDPR/CCPA-ready, SOC 2 roadmap, SSO/SAML planned, audit logs.'
    }
  ]
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Everything you need to automate hiring</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Workflow() {
  const steps = [
    'Post job → Applications stored',
    'AI tests → Auto-scoring',
    'Account created → Credentials sent',
    'Manual scheduling by HR',
    'Reminders via portal/WhatsApp/SMS',
    'Offer letters & automated follow-ups'
  ]
  return (
    <section id="workflow" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={i} className="rounded-lg bg-white p-4 ring-1 ring-gray-200">{i + 1}. {s}</li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Waitlist() {
  const [form, setForm] = useState({
    email: '', name: '', company: '', role: '', company_size: '', industry: '', monthly_openings: '', current_ats: '',
    bottlenecks: [], interests: [], channels: [], design_partner: false, timezone: '', notes: '', consent: true
  })
  const [status, setStatus] = useState({ loading: false, message: '' })

  const updateArray = (key, value) => {
    setForm(prev => {
      const arr = new Set(prev[key])
      if (arr.has(value)) arr.delete(value); else arr.add(value)
      return { ...prev, [key]: Array.from(arr) }
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, message: '' })
    try {
      const res = await fetch(`${backend}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus({ loading: false, message: 'Thanks! Please check your email for next steps.' })
      setForm({
        email: '', name: '', company: '', role: '', company_size: '', industry: '', monthly_openings: '', current_ats: '',
        bottlenecks: [], interests: [], channels: [], design_partner: false, timezone: '', notes: '', consent: true
      })
    } catch (err) {
      setStatus({ loading: false, message: 'Something went wrong. Please try again.' })
    }
  }

  const bottleneckOptions = ['Screening', 'Scheduling', 'Candidate updates', 'Offer management', 'Reporting']
  const interestOptions = ['Automation', 'Candidate Portal', 'Bulk Messaging', 'Reporting', 'NLP Matching']
  const channelOptions = ['Email', 'WhatsApp', 'SMS']

  return (
    <section id="waitlist" className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Join the early access</h2>
          <p className="mt-2 text-gray-600">Get priority onboarding, founder discount, and help shape the roadmap.</p>
          <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" placeholder="Work email" className="col-span-1 sm:col-span-2 rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} type="text" placeholder="Full name" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} type="text" placeholder="Company" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} type="text" placeholder="Role/Title" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />

            <input value={form.company_size} onChange={e=>setForm({...form,company_size:e.target.value})} type="text" placeholder="Company size" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})} type="text" placeholder="Industry" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.monthly_openings} onChange={e=>setForm({...form,monthly_openings:e.target.value})} type="text" placeholder="Monthly openings" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.current_ats} onChange={e=>setForm({...form,current_ats:e.target.value})} type="text" placeholder="Current ATS/Process" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />

            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Top bottlenecks</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {bottleneckOptions.map(b => (
                  <button type="button" key={b} onClick={()=>updateArray('bottlenecks', b)} className={`rounded-full px-3 py-1 text-sm ring-1 ${form.bottlenecks.includes(b)?'bg-indigo-600 text-white ring-indigo-600':'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}>{b}</button>
                ))}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Interests</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {interestOptions.map(b => (
                  <button type="button" key={b} onClick={()=>updateArray('interests', b)} className={`rounded-full px-3 py-1 text-sm ring-1 ${form.interests.includes(b)?'bg-indigo-600 text-white ring-indigo-600':'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}>{b}</button>
                ))}
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-700">Preferred channels</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {channelOptions.map(b => (
                  <button type="button" key={b} onClick={()=>updateArray('channels', b)} className={`rounded-full px-3 py-1 text-sm ring-1 ${form.channels.includes(b)?'bg-indigo-600 text-white ring-indigo-600':'text-gray-700 ring-gray-300 hover:bg-gray-50'}`}>{b}</button>
                ))}
              </div>
            </div>

            <label className="col-span-1 flex items-center gap-3 sm:col-span-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.design_partner} onChange={e=>setForm({...form,design_partner:e.target.checked})} />
              Interested in becoming a design partner
            </label>

            <input value={form.timezone} onChange={e=>setForm({...form,timezone:e.target.value})} type="text" placeholder="Time zone" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />
            <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} type="text" placeholder="Notes" className="rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none" />

            <label className="col-span-1 flex items-center gap-3 sm:col-span-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.consent} onChange={e=>setForm({...form,consent:e.target.checked})} required />
              I agree to receive product updates and understand the privacy policy.
            </label>

            <button disabled={status.loading} className="col-span-1 sm:col-span-2 mt-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60">
              {status.loading ? 'Submitting...' : 'Reserve My Spot'}
            </button>
            {status.message && <p className="col-span-2 text-sm text-gray-600">{status.message}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-gray-600">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Your ATS. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <Features />
      <Workflow />
      <Waitlist />
      <Footer />
    </div>
  )
}
