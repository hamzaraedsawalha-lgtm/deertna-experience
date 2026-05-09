"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

const PILLARS = [
  { icon: "🌿", label: "طبيعي ١٠٠٪",     sub: "بدون مواد حافظة أو إضافات صناعية" },
  { icon: "🥛", label: "طازج يومياً",     sub: "من المزرعة إلى المائدة في نفس اليوم" },
  { icon: "🏡", label: "صناعة تقليدية",   sub: "وصفات موروثة وأساليب أصيلة" },
];

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section ref={ref} id="story" className="relative overflow-hidden"
      style={{ background: "#F7F4EC" }}>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(10,47,115,0.12), transparent)" }} />

      <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">

          {/* ─────────────────────────────────────────
              LEFT — Editorial brand story copy
          ───────────────────────────────────────── */}
          <motion.div style={{ y: textY }} className="order-1 flex flex-col items-start">

            {/* Year badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}
              className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-[700] tracking-[0.12em]"
                style={{ color: "#2E8B57" }}>قصتنا</span>
              <div className="w-4 h-px" style={{ background: "#2E8B57", opacity: 0.6 }} />
              <span className="font-[800] text-[13px]"
                style={{ color: "#0A2F73", letterSpacing: "0.04em" }}>منذ ٢٠٠٣</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.95, delay: 0.08, ease: E }}
              className="font-[800] tracking-[-0.025em] mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)", lineHeight: 1.1, color: "#0A2F73" }}>
              نصنع الطعم<br />
              <span style={{ color: "#2E8B57" }}>الحقيقي</span>
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: ES }}
              className="origin-left h-px mb-8"
              style={{ width: 300, background: "linear-gradient(to right, #C9A46A80, #C9A46A20, transparent)" }} />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.18, ease: E }}
              className="font-[400] leading-[1.82] mb-5"
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)", color: "rgba(26,44,30,0.62)", maxWidth: 460 }}>
              من مزارعنا إلى مائدتكم، نحافظ على نفس الجودة والطعم الطبيعي منذ أكثر من عشرين عاماً.
              كل منتج يُحضَّر بنفس العناية التي بدأنا بها عام ٢٠٠٣.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.26, ease: E }}
              className="font-[400] leading-[1.82] mb-12"
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)", color: "rgba(26,44,30,0.62)", maxWidth: 460 }}>
              لأننا نؤمن أن الألبان الطبيعية ليست رفاهية — بل حق لكل عائلة تريد الأفضل لأبنائها.
            </motion.p>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.32, ease: E }}
              className="flex flex-col gap-5 mb-12 w-full">
              {PILLARS.map((p, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg"
                    style={{ background: "rgba(10,47,115,0.06)", border: "1px solid rgba(10,47,115,0.08)" }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-[700] mb-0.5" style={{ fontSize: "0.95rem", color: "#0A2F73" }}>{p.label}</p>
                    <p className="font-[400]" style={{ fontSize: "0.82rem", color: "rgba(26,44,30,0.50)", lineHeight: 1.5 }}>{p.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a href="#products"
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.4, ease: E }}
              whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(10,47,115,0.22)" }}
              className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[14px] px-8 py-4 cursor-pointer"
              style={{ background: "#0A2F73", color: "#F7F4EC", boxShadow: "0 4px 18px rgba(10,47,115,0.20)" }}>
              اكتشف منتجاتنا <span style={{ fontSize: "15px", lineHeight: 1 }}>←</span>
            </motion.a>
          </motion.div>

          {/* ─────────────────────────────────────────
              RIGHT — Farm editorial image, layered
          ───────────────────────────────────────── */}
          <motion.div style={{ y: imgY }} className="order-2 relative">

            {/* Large founding year — decorative */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.1, ease: E }}
              className="absolute -top-6 -right-4 lg:-right-8 select-none pointer-events-none z-10"
              style={{
                fontSize: "clamp(5rem, 11vw, 10rem)", fontWeight: 900,
                color: "rgba(10,47,115,0.055)", lineHeight: 1, letterSpacing: "-0.05em"
              }}>
              ٢٠٠٣
            </motion.div>

            {/* Main image — rounded editorial card */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.12, ease: E }}
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{
                aspectRatio: "4/5",
                maxHeight: "65vh",
                boxShadow: "0 32px 80px rgba(10,47,115,0.14), 0 8px 24px rgba(10,47,115,0.08)",
                border: "1px solid rgba(10,47,115,0.06)",
              }}>
              <Image
                src="/hero-premium.png"
                alt="مزارع ديرتنا"
                fill
                className="object-cover object-[55%_40%]"
                style={{ filter: "brightness(0.96) saturate(1.08)" }}
                sizes="(max-width:1024px) 90vw, 42vw"
              />
              {/* Subtle inner frame */}
              <div className="absolute inset-0 rounded-[2.5rem]"
                style={{ boxShadow: "inset 0 -50px 60px rgba(247,244,236,0.25)" }} />
            </motion.div>

            {/* Floating stat card — quality */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.9, ease: E }}
              className="absolute -bottom-4 -left-4 md:-left-8 rounded-2xl px-5 py-4 border"
              style={{
                background: "#FFFFFF",
                borderColor: "rgba(10,47,115,0.08)",
                boxShadow: "0 10px 32px rgba(10,47,115,0.10)",
              }}>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center"
                  style={{ borderRight: "1px solid rgba(10,47,115,0.08)", paddingRight: "1rem" }}>
                  <span className="font-[900] leading-none"
                    style={{ fontSize: "1.6rem", color: "#0A2F73" }}>+٢٦</span>
                  <span className="font-[500] mt-0.5"
                    style={{ fontSize: "10px", color: "rgba(26,44,30,0.45)", letterSpacing: "0.06em" }}>سنة خبرة</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-[700] text-[13px]" style={{ color: "#1A2C1E" }}>
                    خبرة عائلية
                  </span>
                  <span className="font-[400] text-[11px]"
                    style={{ color: "rgba(26,44,30,0.48)", maxWidth: 120, lineHeight: 1.4 }}>
                    في صناعة الألبان الطبيعية
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Dot grid decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 pointer-events-none"
              style={{
                opacity: 0.12,
                backgroundImage: "radial-gradient(circle, #0A2F73 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }} />
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(10,47,115,0.10), transparent)" }} />
    </section>
  );
}
