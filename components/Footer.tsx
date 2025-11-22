'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/register#categories' },
    { label: 'About', href: '/#hero' },
    { label: 'Results', href: '/results' },
    { label: 'Contact', href: '/#contact' },
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/AhmdMarathon/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/AhmdMarathon/', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/AhmdMarathon', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCNHy1hdVgMyAAcfat04tTow', label: 'YouTube' },
  ]

  return (
    <footer className="bg-[#640D5F] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Visnagar Marathon 2025 - Run for Cervical Cancer Awareness. Organized by Rotary Club
              of Visnagar to promote fitness, health education, and social responsibility.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Email: contact@rotaryvisnagar.org</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Rotary Club of Visnagar</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#FFB200]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-white/60 text-sm">
          <p>Copyright © Visnagar Marathon {new Date().getFullYear()}. All rights reserved.</p>
          <p className="mt-2">Organized by Rotary Club of Visnagar</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
