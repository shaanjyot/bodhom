'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Image, 
  FileText, 
  FolderTree,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Store,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Video
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/slides', label: 'Hero Slides', icon: Image },
  { href: '/admin/reels', label: 'Reels & Shorts', icon: Video },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/menu', label: 'Menu Items', icon: Menu },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/content', label: 'Page Content', icon: Settings },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, loading, logout } = useAdminAuth()

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState))
  }

  // Don't show the admin layout on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Drawer style for both mobile and desktop */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-charcoal text-white transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
        w-64
      `}>
        {/* Header */}
        <div className={`flex items-center h-16 px-4 border-b border-charcoal-700 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <Link href="/admin" className="text-xl font-serif font-bold text-brass-gold">
              BodhOm
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/admin" className="text-xl font-serif font-bold text-brass-gold">
              B
            </Link>
          )}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative group
                  ${sidebarCollapsed ? 'justify-center' : ''}
                  ${isActive 
                    ? 'bg-brass-gold text-charcoal font-semibold' 
                    : 'text-gray-300 hover:bg-charcoal-700 hover:text-white'
                  }
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-charcoal-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-charcoal-700 space-y-1">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-charcoal-700 hover:text-white transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
            title={sidebarCollapsed ? 'View Store' : undefined}
          >
            <Store className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>View Store</span>}
          </Link>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle Button - Desktop only */}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-brass-gold rounded-full items-center justify-center text-charcoal hover:bg-primary-dark transition-colors shadow-lg"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top bar - Dark theme for contrast */}
        <header className="sticky top-0 z-30 h-16 bg-charcoal shadow-lg flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-charcoal-700 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-charcoal-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brass-gold flex items-center justify-center text-charcoal font-semibold">
                  {loading ? '...' : user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">
                    {loading ? 'Loading...' : user?.name || 'admin'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Administrator
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-charcoal">{user?.name}</p>
                      <p className="text-sm text-charcoal-400">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/"
                        target="_blank"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-charcoal-500 hover:bg-gray-100 transition-colors"
                      >
                        <Store className="w-5 h-5" />
                        View Store
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
