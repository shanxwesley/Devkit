import { Routes, Route, Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { ToastContainer } from '@/components/Toast'
import { Home } from '@/pages/Home'
import { Pricing } from '@/pages/Pricing'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { Dashboard } from '@/pages/Dashboard'
import { ToolPage } from '@/pages/ToolPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
        </Routes>
      </main>
      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} DevKit. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            <Link to="/" className="transition-colors hover:text-foreground">Tools</Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link to="/login" className="transition-colors hover:text-foreground">Sign in</Link>
          </nav>
        </div>
      </footer>
      <ToastContainer />
    </div>
  )
}
