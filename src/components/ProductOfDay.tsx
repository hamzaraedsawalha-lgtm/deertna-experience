"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const E = [0.16, 1, 0.3, 1] as const;
const AUTO_MS = 6000;

/* ─────────────────────────────────────
   Brand palette — zero neon, zero cyan
───────────────────────────────────── */
const C = {
  blue:  "#0B3D91",
  green: "#2F8F57",
  cream: "#F6F1E8",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

const SLIDES = [
  {
    id: 1,
    name: "لبنة بالزيت",
    sub: "كرات لبنة مع زعتر بلدي",
    headline: "كل صباح يستحق",
    desc: "لبنة كريمية ناعمة، تغمرها قطرات زيت الزيتون البكر، مع الزعتر البلدي الجاف. على الخبز الطازج — لا يوجد أفضل من هذا.",
    img: "/p-labneh-zaatar-new.jpg",
    badge: "طازج يومياً",
  },
  {
    id: 2,
    name: "جبنة عكاوي",
    sub: "صناعة تقليدية أصيلة",
    headline: "طعم لا يُنسى",
    desc: "جبنة عكاوي طازجة بنسجتها الرقيقة وطعمها الأصيل. تُصنَع يدوياً بنفس الطريقة التقليدية منذ أكثر من ست وعشرين عاماً.",
    img: "/p-cheese-akkawi.png",
    badge: "صناعة تقليدية",
  },
  {
    id: 3,
    name: "حلوم براغي",
    sub: "حلوم طبيعي من مزارعنا",
    headline: "ذهبي من الخارج",
    desc: "حلوم طبيعي من أبقار ترعى في المراعي المفتوحة. يُشوى على نار حقيقية ليخرج بقشرة ذهبية مقرمشة وداخل طري لا يُقاوم.",
    img: "/p-halloum-shepherd.png",
    badge: "طبيعي ١٠٠٪",
  },
  {
    id: 4,
    name: "لبنة طرية",
    sub: "ناعمة كالحرير",
    headline: "نعومة من الطبيعة",
    desc: "لبنة ناعمة كريمية مصنوعة من أجود أنواع الحليب الطازج. بدون إضافات، بدون مواد حافظة — فقط الطعم الحقيقي.",
    img: "/p-labneh-soft-new.jpg",
    badge: "طبيعي ١٠٠٪",
  },
  {
    id: 5,
    name: "فيتا ديرتنا",
    sub: "بطعم البحر المتوسط",
    headline: "من البحر المتوسط",
    desc: "جبنة فيتا كريمية في محلول ملحي طبيعي. غنية، دسمة، بنكهة حمضية خفيفة — مثالية مع الطماطم والزيتون.",
    img: "/p-cheese-feta.png",
    badge: "جبنة مميزة",
  },
  {
    id: 6,
    name: "شنكليش ديرتنا",
    sub: "تراث الجبل الأصيل",
    headline: "عبق التراث",
    desc: "كرات شنكليش مدحرجة بالتوابل الطبيعية وزيت الزيتون. وصفة موروثة من جبال الشام — لا يوجد مثلها في أي مكان.",
    img: "/p-cheese-shanklish.png",
    badge: "صناعة تقليدية",
  },
];

const imgVariants = {
  enter:  { opacity: 0, scale: 0.92, filter: "blur(8px)"  },
  center: { opacity: 1, scale: 1,    filter: "blur(0px)",  transition: { duration: 1.0, ease: E } },
  exit:   { opacity: 0, scale: 1.04, filter: "blur(6px)",  transition: { duration: 0.7, ease: E } },
};
const textVariants = {
  enter:  { opacity: 0, y: 30, filter: "blur(6px)"  },
  center: (d: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, delay: d, ease: E } }),
  exit:   { opacity: 0, y: -20, filter: "blur(4px)", transition: { duration: 0.5, ease: E } },
};

export default function ProductOfDay() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go   = useCallback((next: number) => setIdx((next + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, paused, next]);

  const slide = SLIDES[idx];

  return (
    <section
      className="relative overflow-hidden z-10"
      style={{ background: C.cream }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply pointer-events-none z-[1]" />

      {/* ── Hero-matched edge lighting — linear directional, not radial blobs ── */}
      {/* Top vignette — barely-visible blue-gray */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-0"
        style={{ height: "38%", background: "linear-gradient(to bottom, rgba(11,61,145,0.04) 0%, transparent 100%)" }} />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0"
        style={{ height: "28%", background: "linear-gradient(to top, rgba(11,61,145,0.04) 0%, transparent 100%)" }} />
      {/* Left — faint blue depth on text side */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "linear-gradient(to right, rgba(11,61,145,0.03) 0%, transparent 48%)" }} />
      {/* Right — warm gold on image side */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "linear-gradient(to left, rgba(201,164,106,0.07) 0%, transparent 55%)" }} />
      {/* Single soft sunray column — same technique as hero, gold for cream bg */}
      <div className="absolute top-0 pointer-events-none z-0"
        style={{
          right: "28%", width: 160, height: "70%",
          background: "linear-gradient(to bottom, rgba(201,164,106,0.05), transparent)",
          filter: "blur(72px)",
        }} />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(to right, transparent, rgba(11,61,145,0.12), transparent)` }} />

      {/* Main layout */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-14 py-20 md:py-28 min-h-[82vh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Product image */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">

            {/* Soft white studio spotlight to make product colors pop */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none z-0"
              style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,0.50) 0%, transparent 65%)` }} />

            {/* Soft warm ambient glow around the spotlight */}
            <div className="absolute w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full pointer-events-none z-0"
              style={{ background: `radial-gradient(ellipse at center, rgba(201,164,106,0.18) 0%, transparent 70%)` }} />

            <AnimatePresence mode="wait">
              <motion.div key={`img-${idx}`}
                variants={imgVariants}
                initial="enter" animate="center" exit="exit"
                className="relative z-10">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                  <Image
                    src={slide.img} alt={slide.name}
                    width={420} height={420}
                    className="object-contain"
                    style={{ filter: "contrast(1.06) brightness(1.03)", mixBlendMode: "multiply" }}
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Text */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div key={`text-${idx}`} className="flex flex-col">

                {/* Badge */}
                <motion.div custom={0} variants={textVariants} initial="enter" animate="center" exit="exit">
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-[700] tracking-[0.08em] mb-8 border"
                    style={{
                      color: C.green,
                      borderColor: `${C.green}30`,
                      backgroundColor: `${C.green}10`,
                    }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: C.green }} />
                    {slide.badge}
                  </span>
                </motion.div>

                {/* Sub-label */}
                <motion.p custom={0.08} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="font-[500] text-[13px] tracking-[0.08em] mb-3"
                  style={{ color: `rgba(26,44,30,0.48)` }}>
                  {slide.sub}
                </motion.p>

                {/* Headline */}
                <motion.h2 custom={0.15} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="font-[800] leading-[1.05] tracking-[-0.025em] mb-4"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: C.blue }}>
                  {slide.headline}
                </motion.h2>

                {/* Product name accent */}
                <motion.div custom={0.22} variants={textVariants} initial="enter" animate="center" exit="exit">
                  <span className="font-[500] leading-none tracking-[-0.015em]"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", color: C.green }}>
                    {slide.name}
                  </span>
                </motion.div>

                {/* Gold divider */}
                <motion.div custom={0.28} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="my-7 h-px w-24 rounded-full"
                  style={{ backgroundColor: C.gold, opacity: 0.55 }} />

                {/* Description */}
                <motion.p custom={0.32} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="font-[400] leading-[1.7] mb-9 max-w-sm"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", color: `rgba(26,44,30,0.62)` }}>
                  {slide.desc}
                </motion.p>

                {/* CTAs */}
                <motion.div custom={0.38} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="flex flex-wrap gap-4 mb-12">
                  <motion.a href="#order"
                    whileHover={{ y: -2, boxShadow: `0 10px 28px rgba(11,61,145,0.30)` }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-[700] text-[14px] cursor-pointer"
                    style={{ backgroundColor: C.blue, color: C.cream, boxShadow: `0 4px 18px rgba(11,61,145,0.22)` }}>
                    اطلب الآن <span className="text-[16px] leading-none">←</span>
                  </motion.a>
                  <motion.a href="#products"
                    whileHover={{ y: -2, background: `rgba(11,61,145,0.06)` }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2.5 rounded-full border px-7 py-3 font-[600] text-[14px] cursor-pointer"
                    style={{ borderColor: `rgba(11,61,145,0.20)`, color: C.blue }}>
                    عرض التشكيلة
                  </motion.a>
                </motion.div>

                {/* Nav controls */}
                <motion.div custom={0.44} variants={textVariants} initial="enter" animate="center" exit="exit"
                  className="flex items-center gap-5">

                  {/* Prev */}
                  <button onClick={prev}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer"
                    style={{ borderColor: `rgba(11,61,145,0.18)`, color: `rgba(11,61,145,0.55)` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = `${C.blue}0D`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(11,61,145,0.18)`; e.currentTarget.style.background = "transparent"; }}>
                    <span className="text-base">→</span>
                  </button>

                  {/* Next */}
                  <button onClick={next}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer"
                    style={{ borderColor: `rgba(11,61,145,0.18)`, color: `rgba(11,61,145,0.55)` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = `${C.blue}0D`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `rgba(11,61,145,0.18)`; e.currentTarget.style.background = "transparent"; }}>
                    <span className="text-base">←</span>
                  </button>

                  {/* Progress dots */}
                  <div className="flex items-center gap-2 mr-2">
                    {SLIDES.map((_, i) => (
                      <button key={i} onClick={() => go(i)}
                        className="relative flex items-center justify-center transition-all duration-400 cursor-pointer"
                        style={{ width: i === idx ? 28 : 8, height: 8 }}>
                        <span className="absolute inset-0 rounded-full transition-all duration-400"
                          style={{ backgroundColor: i === idx ? C.blue : `rgba(11,61,145,0.20)` }} />
                        {i === idx && !paused && (
                          <motion.span key={`prog-${idx}`}
                            className="absolute inset-0 rounded-full origin-right"
                            style={{ backgroundColor: `${C.gold}70` }}
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: AUTO_MS / 1000, ease: "linear" }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Slide count */}
                  <span className="text-[12px] font-[500] mr-1"
                    style={{ color: `rgba(26,44,30,0.30)` }}>
                    {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                  </span>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{ background: `linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)` }} />
    </section>
  );
}
