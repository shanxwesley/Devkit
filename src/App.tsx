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
      <footer className="border-t bg-muted/20">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} DevKit · Built with ❤️ for developers & students</span>
          <div className="flex items-center gap-4">
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/tools/json-formatter" className="hover:text-foreground transition-colors">Tools</Link>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  )
}
