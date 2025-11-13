"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
              IM
            </div>
            <span className="font-bold text-gray-900 hidden sm:inline">INSAF</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-amber-800 transition">
              ABOUT US
            </Link>
            <Link href="#sustainability" className="text-sm font-medium text-gray-700 hover:text-amber-800 transition">
              SUSTAINABILITY
            </Link>
            <Link href="#projects" className="text-sm font-medium text-gray-700 hover:text-amber-800 transition">
              PROJECTS
            </Link>
            <Link href="#careers" className="text-sm font-medium text-gray-700 hover:text-amber-800 transition">
              CAREERS
            </Link>
            <Link href="#tender" className="text-sm font-medium text-gray-700 hover:text-amber-800 transition">
              TENDER
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/media" className="text-sm text-gray-600 hover:text-amber-800">
              Media
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-amber-800">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 hover:text-amber-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="#about" className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-amber-800">
              ABOUT US
            </Link>
            <Link
              href="#sustainability"
              className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-amber-800"
            >
              SUSTAINABILITY
            </Link>
            <Link href="#projects" className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-amber-800">
              PROJECTS
            </Link>
            <Link href="#careers" className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-amber-800">
              CAREERS
            </Link>
            <Link href="#tender" className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-amber-800">
              TENDER
            </Link>
            <Link href="/media" className="block px-2 py-2 text-sm text-gray-600 hover:text-amber-800">
              Media
            </Link>
            <Link href="/contact" className="block px-2 py-2 text-sm text-gray-600 hover:text-amber-800">
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
