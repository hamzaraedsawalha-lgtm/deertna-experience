"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════
   UNIFIED BRAND TOKENS — matches Products.tsx
   ═══════════════════════════════════════ */
const C = {
  blue:  "#0B3D91",
  green: "#2F8F57",
  cream: "#F6F1E8",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

/* Footer olive-black for ticker — connects to footer */
const TICKER_BG = "#0F1C12";

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

const HEADLINES = [
  { l1: "من مزارعنا",  l2: "إلى مائدتكم"  },
  { l1: "الطعم الذي",  l2: "تربّينا عليه" },
];

const TICKER = [
  "طازج يومياً","·","طبيعي ١٠٠٪","·","من مزارعنا","·","بدون إضافات","·",
  "منذ ٢٠٠٣","·","صناعة تقليدية","·","طازج يومياً","·","طبيعي ١٠٠٪","·",
  "من مزارعنا","·","بدون إضافات","·","منذ ٢٠٠٣","·","صناعة تقليدية","·",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY  = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HEADLINES.length), 4400);
    return () => clearInterval(t);
  }, []);

  const hl = HEADLINES[idx];

  return (
    <section ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: C.cream }}>

      {/* ══════════════════════════════════════════
          BACKGROUND — warm graded farm image
      ══════════════════════════════════════════ */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src="/hero-premium.png" alt="" fill priority sizes="100vw"
          className="object-cover object-[60%_40%]"
          style={{
            /* Warmer, less dark — preserve natural colours */
            filter: "brightness(0.82) saturate(0.95) sepia(0.10) contrast(1.05)",
          }}
        />

        {/* LEFT — warm cream text-backing (NOT dark navy) */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to right,
            rgba(246,241,232,0.97) 0%,
            rgba(246,241,232,0.88) 22%,
            rgba(246,241,232,0.52) 42%,
            rgba(246,241,232,0.14) 60%,
            transparent 76%)`,
        }} />

        {/* BOTTOM — cream fade to connect with Products section */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to top,
            ${C.cream} 0%,
            rgba(246,241,232,0.60) 10%,
            transparent 28%)`,
        }} />

        {/* TOP — very soft cream haze (replaces cold blue grade) */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(246,241,232,0.22) 0%, transparent 35%)",
        }} />

        {/* Warm amber sunray — replaces cold blue-white ray */}
        <motion.div
          className="absolute top-0 origin-top z-[1] pointer-events-none"
          style={{
            left: "55%", rotate: -3, width: 240, height: "65%",
            background: "linear-gradient(to bottom, rgba(201,164,106,0.14), transparent)",
            filter: "blur(70px)",
          }}
          animate={{ opacity: [0.50, 0.85, 0.50] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} />
      </motion.div>

      {/* Fine grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-multiply pointer-events-none z-[1]" />

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <motion.div style={{ opacity: fade }} className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1320px] mx-auto w-full px-5 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center min-h-[85vh]">

            {/* ── LEFT — typography block ── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: E }}
              className="flex flex-col items-start order-1 py-16 lg:py-0 max-w-[520px]">

              {/* Eyebrow — same style as all sections */}
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: E }}
                className="flex items-center gap-3 mb-8">
                <div className="w-5 h-px rounded-full" style={{ background: C.green, opacity: 0.80 }} />
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", color: C.green }}>
                  ديرتنا · ألبان طبيعية منذ ٢٠٠٣
                </span>
              </motion.div>

              {/* Headline — warm charcoal on cream backing */}
              <div className="mb-6 overflow-hidden"
                style={{ minHeight: "clamp(4rem, 10vw, 9rem)" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={idx}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
                    exit={{ opacity: 0, y: -22,   filter: "blur(8px)"  }}
                    transition={{ duration: 0.85, ease: E }}>
                    <h1 className="font-[800] tracking-[-0.028em]"
                      style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)", lineHeight: 1.08, color: C.dark }}>
                      {hl.l1}<br />
                      <span style={{ color: C.green }}>{hl.l2}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Gold divider */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: ES }}
                className="origin-left h-px mb-7"
                style={{ width: 300, background: `linear-gradient(to right, ${C.gold}70, ${C.gold}20, transparent)` }} />

              {/* Body text — warm charcoal */}
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.50, ease: E }}
                style={{
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  color: "rgba(26,44,30,0.58)",
                  lineHeight: 1.82, maxWidth: "100%", fontWeight: 400, marginBottom: "2rem",
                }}>
                منتجات ألبان طبيعية تُحضَّر يومياً من أجود الحليب الطازج،
                بنفس الجودة التي بدأت بها ديرتنا منذ ٢٠٠٣.
              </motion.p>

              {/* CTAs — matches Products.tsx button style exactly */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.62, ease: E }}
                className="flex flex-wrap gap-3 mb-12">

                <motion.button
                  onClick={() => {
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  whileHover={{ y: -2, boxShadow: `0 12px 36px rgba(11,61,145,0.30)` }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[14px] px-8 py-4 cursor-pointer"
                  style={{ background: C.blue, color: C.cream, boxShadow: `0 4px 22px rgba(11,61,145,0.22)` }}>
                  اكتشف منتجاتنا <span style={{ fontSize: "15px", lineHeight: 1 }}>←</span>
                </motion.button>

                <motion.a href="#catalog"
                  whileHover={{ y: -2, background: `rgba(11,61,145,0.06)`, borderColor: `rgba(11,61,145,0.28)` }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2.5 rounded-full font-[600] text-[14px] px-8 py-4 cursor-pointer border"
                  style={{ borderColor: `rgba(11,61,145,0.18)`, color: C.blue }}>
                  تشكيلة منتجاتنا
                </motion.a>
              </motion.div>

              {/* Stats row — warm charcoal */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.88, ease: E }}
                className="flex items-center gap-8 border-t pt-7"
                style={{ borderColor: "rgba(11,61,145,0.10)" }}>
                {[
                  { n: "+٢٦", l: "سنة خبرة" },
                  { n: "١٠٠٪", l: "طبيعي" },
                  { n: "٢٠+",  l: "منتج" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-[800] leading-none"
                      style={{ fontSize: "1.15rem", color: C.blue }}>
                      {s.n}
                    </span>
                    <span className="font-[500] mt-1"
                      style={{ fontSize: "10px", color: "rgba(26,44,30,0.38)", letterSpacing: "0.07em" }}>
                      {s.l}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT — atmospheric depth, image shows through ── */}
            <div className="relative hidden lg:block" style={{ height: "85vh" }}>

              {/* Warm gold glow around bottle area */}
              <div className="absolute pointer-events-none"
                style={{
                  top: "20%", bottom: "20%", left: "20%", right: "5%",
                  background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(201,164,106,0.10) 0%, transparent 72%)",
                }} />

              {/* Ground mist — warm cream instead of cold dark */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: 160,
                  background: `linear-gradient(to top, rgba(246,241,232,0.55), transparent)`,
                  filter: "blur(12px)",
                }}
                animate={{ opacity: [0.60, 1, 0.60] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} />

              {/* Floating dust motes — warm gold instead of cold blue */}
              {[
                { x: "35%", y: "60%", d: 0   },
                { x: "55%", y: "42%", d: 2.0 },
                { x: "70%", y: "68%", d: 3.5 },
                { x: "44%", y: "30%", d: 1.1 },
                { x: "78%", y: "52%", d: 4.2 },
              ].map((m, i) => (
                <motion.div key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{ left: m.x, top: m.y, width: 2.5, height: 2.5, background: `${C.gold}80` }}
                  animate={{ y: [0, -26, 0], opacity: [0, 0.55, 0] }}
                  transition={{ repeat: Infinity, duration: 6 + m.d, ease: "easeInOut", delay: m.d }} />
              ))}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll cue — warm tones */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-20 left-12 z-10 flex items-center gap-3">
        <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: `${C.green}40` }}>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            style={{ width: "2.5px", height: 8, borderRadius: 99, background: `${C.green}70` }} />
        </div>
        <span style={{ color: "rgba(26,44,30,0.30)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em" }}>
          اكتشف أكثر
        </span>
      </motion.div>

      {/* ══════════════════════════════════════════
          TICKER — warm deep olive (matches footer)
      ══════════════════════════════════════════ */}
      <div className="relative z-10 border-t overflow-hidden"
        style={{ background: TICKER_BG, borderColor: "rgba(246,241,232,0.06)" }}>
        <div className="flex py-3">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-8 flex-shrink-0">
            {TICKER.map((t, i) => (
              <span key={i} style={{
                color: t === "·" ? `${C.gold}CC` : "rgba(246,241,232,0.45)",
                fontSize: t === "·" ? "14px" : "10px",
                fontWeight: 600, letterSpacing: "0.13em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
