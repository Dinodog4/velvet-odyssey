'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      {/* Top contact bar */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm">
        Contact us now at info@velvetodyssey.com or 800-123-4567
      </div>
      
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-48">
              {/* Replace with actual logo */}
              <div className="text-2xl font-script text-blue-600">Velvet Odyssey</div>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About Velvet Odyssey" />
          <NavLink href="/cruises" label="Upcoming Cruises" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/blog" label="Blog" />
          <SearchButton />
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <MobileNavLink href="/" label="Home" />
            <MobileNavLink href="/about" label="About Velvet Odyssey" />
            <MobileNavLink href="/cruises" label="Upcoming Cruises" />
            <MobileNavLink href="/contact" label="Contact" />
            <MobileNavLink href="/blog" label="Blog" />
            <div className="py-2">
              <SearchButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href}
      className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href}
      className="block py-2 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-200"
    >
      {label}
    </Link>
  );
}

function SearchButton() {
  return (
    <button 
      className="p-2 text-gray-700 hover:text-blue-600"
      aria-label="Search"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  );
}
