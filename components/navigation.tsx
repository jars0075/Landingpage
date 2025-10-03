'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    { href: '#why-softwave', label: 'Why SoftWave' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#conditions', label: 'Conditions' },
    { href: '#faq', label: 'FAQ\'s' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3" onClick={closeMenu}>
            <div className="flex flex-col">
              <Image 
                src="/Preferred_Therapy_Services_logo.png" 
                alt="Preferred Therapy Services Logo" 
                width={isScrolled ? 150 : 200}
                height={isScrolled ? 36 : 48}
                className="h-8 lg:h-12 w-auto object-contain transition-all duration-300"
                priority
              />
              <p className={`text-xs font-bold mt-1 transition-all duration-300 ${
                isScrolled ? 'hidden' : 'block'
              }`} style={{ color: '#27ae60' }}>
                6962 Boulder Ave, Highland, CA 92346
              </p>
            </div>
          </Link>
          
          {/* Center SoftWave Logo - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              <Image 
                src="/SoftWave_logo_trans.png" 
                alt="SoftWave Therapy Logo" 
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 50 : 60}
                className="h-8 lg:h-10 w-auto object-contain transition-all duration-300"
                priority
              />
              <p className="text-blue-400 text-sm font-bold mt-2 top-4">
                Official SoftWave Provider
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-green-500 hover:text-blue-700 transition-colors text-sm font-bold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-2">
            {/* Mobile SoftWave Logo */}
            <div className="flex flex-col items-center mb-4">
              <Image 
                src="/SoftWave_logo_trans.png" 
                alt="SoftWave Therapy Logo" 
                width={100}
                height={50}
                className="h-8 w-auto object-contain"
              />
              <p className="text-blue-500 text-sm font-bold mt-2">
                Official SoftWave Provider
              </p>
            </div>
            
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors text-sm font-medium rounded-md"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
