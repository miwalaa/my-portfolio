'use client'

import { cn } from '@/lib/utils'
import React, { useCallback, useEffect, useRef } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { MovingBorderBtn } from '@/components/ui/moving.border'
import { socials } from '../HeroSection/HeroSection'

// Constants
const NAV_ITEMS = ['Projects', 'Blog', 'Contact'] as const
const CV_LINK =
  'https://drive.google.com/file/d/1nlsZP4AClli1VIMrD3yONkvF8XpjNtik/view?usp=sharing'

// Types
type NavItem = (typeof NAV_ITEMS)[number]

// Components
const scrollToSection = (id: string, onClick?: () => void) => {
  const element = document.getElementById(id.toLowerCase())
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  if (onClick) onClick()
}

const NavLink = ({
  item,
  onClick,
  isMobile = false,
}: {
  item: NavItem
  onClick?: () => void
  isMobile?: boolean
}) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const targetId = item.toLowerCase()
  
  // Blog should navigate to /blog page, not scroll
  const isBlogLink = item === 'Blog'
  const href = isBlogLink ? '/blog' : `/#${targetId}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // For blog link, use default navigation
    if (isBlogLink) {
      if (onClick) onClick()
      return
    }

    e.preventDefault()

    if (isHomePage) {
      // If already on home page, just scroll to section
      scrollToSection(targetId, onClick)
    } else {
      // If on another page, navigate to home with hash
      if (onClick) onClick()
      window.location.href = href
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        isMobile
          ? 'text-gray-300 hover:text-green-500 font-medium py-2 transition-colors duration-200'
          : 'relative font-semibold hover:text-green-500 transition-colors duration-300 group cursor-pointer'
      )}
    >
      {item}
      {!isMobile && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
      )}
    </a>
  )
}

const MobileMenuButton = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean
  toggleMenu: () => void
}) => (
  <motion.button
    whileTap={{ scale: 0.7 }}
    onClick={toggleMenu}
    className="md:hidden text-white w-8 h-8 flex items-center justify-center"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <motion.span
      animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <FiMenu className="h-6 w-6" />
    </motion.span>
  </motion.button>
)

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
    aria-label="Close menu"
  >
    <FiX className="h-6 w-6" />
  </button>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  // Handle click outside and scroll lock
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        closeMenu()
      }
    }

    // Toggle scroll lock based on menu state
    document.body.style.overflow = isOpen ? 'hidden' : ''
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen, closeMenu])

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <nav
        className={cn(
          'py-10 flex justify-between items-center animate-move-down relative z-10'
        )}
      >
        <Link href="/" className="block">
          <Image
            src="/favicon.ico"
            alt="Home"
            width={40}
            height={40}
            className="w-10 h-10 hover:opacity-80 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} item={item} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </nav>

      {/* Mobile Menu */}
      <motion.div
        ref={menuRef}
        initial={{ x: '100%', opacity: 0 }}
        animate={{
          x: isOpen ? 0 : '100%',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden fixed inset-0 left-auto w-64 bg-black/95 backdrop-blur-sm shadow-2xl px-6 py-8 z-50 overflow-y-auto"
      >
        <div className="flex justify-end mb-8">
          <CloseButton onClick={closeMenu} />
        </div>

        <nav className="flex flex-col space-y-3">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} item={item} onClick={closeMenu} isMobile />
          ))}
        </nav>

        <div className="pt-4 border-t border-white/20 w-full">
          {/* <MovingBorderBtn
            borderRadius="0.5rem"
            className="w-full p-3 font-semibold transition-all duration-200 hover:bg-sky-400/20 hover:shadow-lg"
            containerClassName="w-full"
          >
            <a
              href={CV_LINK}
              className="w-full flex justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚀 Download CV
            </a>
          </MovingBorderBtn> */}
          <div className="flex flex-row justify-center gap-8 mt-4">
            {socials.map((social, index) => {
              const Icon = social.Icon

              return (
                <Link href={social.link} key={index} aria-label={social.label}>
                  <Icon className="w-5 h-5 hover:scale-125 transition-all" />
                </Link>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
