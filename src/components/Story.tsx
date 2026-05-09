"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const C = {
  blue:  "#1D4999",
  green: "#5B8A52",
  cream: "#F6F1E8",
  gold:  "#C8A96B",
  text:  "#2E342B",
} as const;

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  /* Parallax — image drifts slower than scroll */
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "92vh", background: C.cream }}>

      {/* ════════════════════════════════════════════════
          LAYER 0 — Full-bleed farm image (parallax)
      ════════════════════════════════════════════════ */}
      <motion.div style={{ y: imgY }}
        className="absolute inset-0 z-0 scale-110">
        <Image
          src="/farm-story.png"
          alt=""
          fill priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            filter: "brightness(0.76) saturate(1.08) contrast(1.12) sepia(0.06)",
          }}
        />
      </motion.div>

      {/* ════════════════════════════════════════════════
          LAYER 1 — Cinematic warm overlay (image grading)
          Creates Mediterranean warmth, not washed-out
      ════════════════════════════════════════════════ */}
      {/* Overall warm amber wash — lighter */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(155,115,60,0.10)", mixBlendMode: "multiply" }} />

      {/* Content-side cream fade — LEFT → transparent RIGHT */}
      {/* Content-side cream fade — stays left, stays light */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `linear-gradient(to left,
            transparent 0%,
            rgba(244,238,226,0.04) 22%,
            rgba(244,238,226,0.22) 38%,
            rgba(246,241,232,0.48) 52%,
            rgba(246,241,232,0.72) 64%,
            rgba(246,241,232,0.88) 76%,
            ${C.cream} 100%)`,
        }} />

      {/* Top fade */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(46,52,43,0.14) 0%, transparent 22%)" }} />

      {/* Bottom anchor */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(46,52,43,0.38) 0%, transparent 28%)" }} />

      {/* Warm edge vignette — very soft, almost invisible */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 95% 90% at 50% 50%, transparent 55%, rgba(46,52,43,0.12) 100%)" }} />

      {/* Grain texture */}
      <div className="absolute inset-0 z-[3] bg-grain opacity-[0.055] mix-blend-overlay pointer-events-none" />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px z-[4]"
        style={{ background: `linear-gradient(to right, transparent, rgba(201,164,106,0.30), transparent)` }} />

      {/* ════════════════════════════════════════════════
          LAYER 3 — Soft floating warm glow (breathing)
      ════════════════════════════════════════════════ */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute pointer-events-none z-[3]"
        style={{
          top: "15%", left: "38%", width: "42%", height: "55%",
          background: `radial-gradient(ellipse 70% 65% at 40% 45%, rgba(200,169,107,0.16) 0%, transparent 68%)`,
          filter: "blur(40px)",
        }} />

      {/* ════════════════════════════════════════════════
          LAYER 4 — Content (rides on top of blended image)
      ════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-14
                      min-h-[92vh] flex items-center py-28 lg:py-36">

        {/* Content column — max 52% width on desktop, full on mobile */}
        <div className="w-full lg:max-w-[52%]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.10, ease: E }}
            className="flex items-center gap-3 mb-10">
            <div className="w-5 h-px rounded-full" style={{ background: C.green, opacity: 0.80 }} />
            <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", color: C.green }}>
              قصتنا · من أرضنا منذ ٢٠٠٣
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.05, delay: 0.08, ease: E }}
            className="mb-8">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-[900] leading-none"
                style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", color: C.blue, letterSpacing: "-0.03em" }}>
                ٢٦
              </span>
              <span className="font-[700]"
                style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)", color: C.blue, opacity: 0.88, letterSpacing: "-0.02em" }}>
                عاماً
              </span>
            </div>
            <h2 className="font-[800] tracking-[-0.024em]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 3.2rem)", lineHeight: 1.16, color: C.text }}>
              من صناعة{" "}
              <span style={{ color: C.green, fontStyle: "italic", fontWeight: 700 }}>
                الطعم الحقيقي
              </span>
            </h2>

            {/* Micro emotional detail */}
            <p className="mt-3 font-[500]"
              style={{ fontSize: "clamp(0.85rem, 1vw, 0.92rem)", color: `rgba(46,52,43,0.50)`, letterSpacing: "0.05em" }}>
              نكهات تشبه البيت
            </p>
          </motion.div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.22, ease: ES }}
            className="origin-right h-px mb-9"
            style={{ width: 220, background: `linear-gradient(to left, ${C.gold}72, ${C.gold}1A, transparent)` }} />

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.30, ease: E }}
            className="leading-[1.96] mb-9"
            style={{
              fontSize: "clamp(0.92rem, 1.05vw, 1.01rem)",
              color: `rgba(46,52,43,0.82)`,
              fontWeight: 400,
              maxWidth: 390,
            }}>
            من مزارعنا الحقيقية نصنع منتجاتنا كل يوم بنفس الحب والجودة.
            لا وسطاء، لا إضافات — فقط حليب طبيعي وعائلة تعشق ما تصنعه.
          </motion.p>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.37, ease: E }}
            className="relative pr-5 mb-11"
            style={{ borderRight: `2px solid ${C.green}45`, maxWidth: 360 }}>
            <p className="italic leading-[1.80]"
              style={{ fontSize: "0.96rem", fontWeight: 600, color: `rgba(46,52,43,0.70)` }}>
              الطعم الحقيقي لا يحتاج إضافات.
            </p>
          </motion.div>

          {/* Quiet stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.44, ease: E }}
            className="flex items-center gap-8 mb-12 flex-wrap">
            {[
              { num: "+٢٦", label: "سنة خبرة" },
              { num: "١٠٠٪", label: "طبيعي" },
              { num: "+٨٠٠", label: "عائلة تثق بنا" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-[900] leading-none mb-1"
                  style={{ fontSize: "1.4rem", color: C.text, letterSpacing: "-0.02em" }}>
                  {s.num}
                </span>
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.07em", color: `rgba(46,52,43,0.45)` }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.52, ease: E }}
            className="flex flex-wrap gap-3">
            <motion.a href="#products"
              whileHover={{ y: -2.5, boxShadow: `0 16px 44px rgba(30,79,163,0.28)` }}
              transition={{ duration: 0.22 }}
              className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[14px] px-8 py-4 cursor-pointer"
              style={{ background: C.blue, color: C.cream, boxShadow: `0 6px 22px rgba(30,79,163,0.22)` }}>
              اطّلع على منتجاتنا
              <span style={{ fontSize: "15px", lineHeight: 1 }}>←</span>
            </motion.a>
            <motion.a href="https://wa.me/962796875461?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D8%AF%D9%8A%D8%B1%D8%AA%D9%86%D8%A7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2.5, background: "rgba(246,241,232,0.65)", borderColor: `rgba(200,169,107,0.45)` }}
              transition={{ duration: 0.22 }}
              className="inline-flex items-center gap-2.5 rounded-full font-[600] text-[14px] px-8 py-4 cursor-pointer border"
              style={{
                borderColor: `rgba(200,169,107,0.30)`,
                color: C.text,
                background: "rgba(246,241,232,0.42)",
                backdropFilter: "blur(8px)",
              }}>
              تواصل معنا
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════
          Image-side minimal badges
          Positioned in the right half of the screen
      ════════════════════════════════════════════════ */}

      {/* Founding year badge — upper right area */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.90 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.90, ease: E }}
        whileHover={{ y: -2 }}
        className="absolute top-[10%] right-[10%] lg:right-[12%] z-20 flex items-center gap-2 rounded-xl px-3 py-2"
        style={{
          background: "rgba(246,241,232,0.80)",
          backdropFilter: "blur(14px)",
          border: `1px solid rgba(200,169,107,0.24)`,
          boxShadow: "0 4px 16px rgba(46,52,43,0.10), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}>
        <div className="w-1 h-1 rounded-full" style={{ background: C.gold }} />
        <div className="flex flex-col leading-tight">
          <span style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.11em", color: `rgba(46,52,43,0.38)` }}>
            تأسست
          </span>
          <span style={{ fontSize: "12px", fontWeight: 800, color: C.text }}>
            ٢٠٠٣
          </span>
        </div>
      </motion.div>

      {/* Freshness card — lower right area */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.90 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75, duration: 0.90, ease: E }}
        whileHover={{ y: -3 }}
        className="absolute bottom-[10%] right-[8%] lg:right-[10%] z-20 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
        style={{
          background: "rgba(246,241,232,0.80)",
          backdropFilter: "blur(14px)",
          border: `1px solid rgba(91,138,82,0.18)`,
          boxShadow: "0 4px 16px rgba(46,52,43,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: C.green }} />
        <div className="flex flex-col leading-tight">
          <span style={{ fontSize: "10.5px", fontWeight: 700, color: C.green, letterSpacing: "0.04em" }}>
            طازج يومياً
          </span>
          <span style={{ fontSize: "8px", fontWeight: 500, color: `rgba(46,52,43,0.40)`, letterSpacing: "0.06em" }}>
            بدون مواد حافظة
          </span>
        </div>
      </motion.div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: `linear-gradient(to right, transparent, rgba(200,169,107,0.22), transparent)` }} />
    </section>
  );
}
