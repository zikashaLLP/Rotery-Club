'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard,
  Trophy,
  Users,
  Award,
  BarChart3,
  Upload,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const { logout, admin } = useAuth()

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/marathons', label: 'Marathons', icon: Trophy },
    { href: '/admin/participants', label: 'Participants', icon: Users },
    { href: '/admin/results', label: 'Results', icon: Award },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin/import-excel', label: 'Import Excel', icon: Upload },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg border-2 border-[#F8C8DC]"
      >
        {isOpen ? <X className="w-6 h-6 text-[#640D5F]" /> : <Menu className="w-6 h-6 text-[#640D5F]" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 h-screen lg:h-auto w-64 bg-white border-r-2 border-[#F8C8DC] z-40 flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b-2 border-[#F8C8DC]">
            <h2 className="text-2xl font-bold text-[#640D5F]">Admin Panel</h2>
            {admin && (
              <p className="text-sm text-[#2B1341]/70 mt-1">{admin.Mobile_Number}</p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Close mobile menu on navigation
                    if (window.innerWidth < 1024) {
                      onToggle()
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-[#640D5F] to-[#D91656] text-white shadow-lg'
                        : 'text-[#2B1341] hover:bg-[#FFF1F5] hover:text-[#640D5F]'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t-2 border-[#F8C8DC]">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  )
}

