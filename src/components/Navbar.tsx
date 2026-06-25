"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const C = { blue: "#0B3D91", green: "#2F8F57", cream: "#F6F1E8", dark: "#1A2C1E" } as const;

const navLinks = [
  { name: "الرئيسية",  href: "#" },
  { name: "منتجاتنا",  href: "#products" },
  { name: "تشكيلة الأجبان", href: "#catalog" },
  { name: "قصتنا",    href: "#story" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on scroll */
  useEffect(() => {
    if (isOpen) {
      const close = () => setIsOpen(false);
      window.addEventListener("scroll", close, { once: true, passive: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/97 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)] py-2"
          : "bg-transparent py-4"
      )}>

      <div className="max-w-[1320px] mx-auto px-5 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0">
          <div className={cn(
            "relative transition-all duration-500",
            isScrolled ? "w-24 h-12" : "w-28 h-14"
          )}>
            <Image src="/logo-deiratna-v2.png" alt="ديرتنا" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href}
              className={cn(
                "font-[600] text-[14px] transition-all duration-300 relative group",
                isScrolled ? "text-[#1A2C1E]" : "text-white drop-shadow-sm"
              )}>
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#2F8F57] rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="https://wa.me/962796875461"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "px-5 py-2.5 rounded-full font-[700] text-[13px] transition-all duration-300 border-2 inline-flex items-center gap-2",
              isScrolled
                ? "border-[#2F8F57] bg-[#2F8F57] text-white hover:bg-[#1A2C1E] hover:border-[#1A2C1E]"
                : "border-white/80 text-white hover:bg-white hover:text-[#1A2C1E]"
            )}>
            تواصل معنا
          </motion.a>
        </div>

        {/* Mobile hamburger — larger touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden relative z-10 p-2.5 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",
            isScrolled ? "text-[#1A2C1E]" : "text-white"
          )}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-[-1] lg:hidden"
              style={{ background: "rgba(26,44,30,0.35)", backdropFilter: "blur(4px)" }}
              onClick={() => setIsOpen(false)} />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="absolute top-full left-0 right-0 lg:hidden"
              style={{
                background: C.cream,
                borderBottom: "1px solid rgba(11,61,145,0.08)",
                boxShadow: "0 12px 40px rgba(26,44,30,0.15)",
              }}>

              <div className="px-5 pt-4 pb-5">
                {navLinks.map((link, i) => (
                  <Link key={i} href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3.5 font-[600] text-[15px] transition-colors"
                    style={{ color: C.dark, borderBottom: "1px solid rgba(11,61,145,0.07)" }}>
                    {link.name}
                  </Link>
                ))}

                {/* WhatsApp CTA */}
                <motion.a
                  href="https://wa.me/962796875461"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl py-3.5 font-[700] text-[14px] cursor-pointer"
                  style={{ background: C.green, color: C.cream }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل عبر واتساب
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
