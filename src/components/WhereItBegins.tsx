"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const E = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { num: "+٢٦",  label: "سنة خبرة",            icon: "🏅" },
  { num: "٢٠+",  label: "منتجاً طازجاً",        icon: "🧀" },
  { num: "١٠٠٪", label: "مكونات طبيعية",         icon: "🌿" },
  { num: "٨٠٠+", label: "عائلة تثق بنا يومياً",  icon: "🏠" },
];

export default function WhereItBegins() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const imgS = useTransform(scrollYProgress, [0, 1], [1.07, 1.0]);

  return (
    <section ref={ref} id="story" className="relative overflow-hidden z-10" style={{ background: "#F4EFE6" }}>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,186,116,0.09) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(46,125,50,0.07) 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ══════════════════════════
              LEFT — Editorial Text Block
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -32, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: E }}
          >
            {/* Founding year badge */}
            <div className="flex items-center gap-5 mb-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border"
                  style={{ background: "linear-gradient(145deg, #1C3320, #0f2012)", borderColor: "rgba(74,222,128,0.15)" }}>
                  <span className="font-[800] text-white leading-none" style={{ fontSize: "1.5rem" }}>2003</span>
                  <span className="text-[#86efac]/60 text-[9px] font-[600] tracking-[0.1em] mt-0.5">تأسست</span>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: "0 0 30px rgba(74,222,128,0.12)", pointerEvents: "none" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-[2px] bg-[#2E7D32] rounded-full" />
                  <span className="text-[#2E7D32] text-[11px] font-[700] tracking-[0.08em]">قصتنا</span>
                </div>
                <p className="text-[#3a2e1a]/60 text-[13px] font-[500] leading-[1.5]">
                  أكثر من ٢٦ عاماً من الالتزام بالجودة
                </p>
              </div>
            </div>

            {/* Main headline */}
            <h2 className="font-[800] text-[#1a2e1d] leading-[1.06] tracking-[-0.025em] mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)" }}>
              منذ ٢٠٠٣ نصنع
              <br />
              <span className="font-[500] text-[#2E7D32]">بنفس الشغف</span>
            </h2>

            {/* Pull quote */}
            <div className="relative pr-5 mb-7">
              <div className="absolute right-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ background: "linear-gradient(to bottom, #2E7D32, rgba(46,125,50,0.15))" }} />
              <p className="text-[#3a2e1a]/65 font-[400] leading-[1.75]"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}>
                خبرة تمتد لأكثر من ستة وعشرين عاماً في صناعة الألبان الطبيعية.
                من مزرعتنا إلى مائدتكم — بدون وسطاء، بدون مواد حافظة،
                بنفس الجودة التي بدأنا بها.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-9">
              {STATS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: E }}
                  className="rounded-2xl px-5 py-4 border transition-all duration-400 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "rgba(255,252,247,0.8)", borderColor: "rgba(46,125,50,0.1)", backdropFilter: "blur(8px)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-[800] text-[#2E7D32] leading-none"
                      style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}>
                      {s.num}
                    </span>
                  </div>
                  <p className="text-[#1a2e1d] font-[600] text-[12px] leading-[1.4]">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: E }}
              className="flex flex-wrap gap-4"
            >
              <a href="#products"
                className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[14px] px-7 py-3.5 text-white transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #2E7D32, #1a4d1e)", boxShadow: "0 4px 20px rgba(46,125,50,0.25)" }}>
                اكتشف منتجاتنا <span className="text-[16px] leading-none">←</span>
              </a>
              <a href="#story"
                className="inline-flex items-center gap-2.5 rounded-full font-[600] text-[14px] px-7 py-3.5 border transition-all duration-400 hover:-translate-y-0.5 hover:bg-[#2E7D32]/5"
                style={{ borderColor: "rgba(46,125,50,0.25)", color: "#2E7D32" }}>
                قصتنا الكاملة
              </a>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════
              RIGHT — Layered Image Composition
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 32, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, delay: 0.15, ease: E }}
            className="relative"
          >
            {/* Main large image */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(420px, 52vh, 580px)" }}>
              <motion.div style={{ y: imgY, scale: imgS }} className="absolute inset-0">
                <Image src="/farm-story.png" alt="مزرعة ديرتنا" fill
                  className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3320]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F4EFE6]/20" />
              <div className="absolute inset-0 bg-grain opacity-[0.10] mix-blend-overlay pointer-events-none" />

              {/* Year overlay — bottom left */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="rounded-xl px-4 py-3 border"
                  style={{ backdropFilter: "blur(16px)", background: "rgba(28,51,32,0.75)", borderColor: "rgba(74,222,128,0.15)" }}>
                  <div className="text-[#86efac]/70 text-[9px] font-[600] tracking-[0.12em] mb-0.5">منذ</div>
                  <div className="text-white font-[800] text-[1.4rem] leading-none">٢٠٠٣</div>
                </div>
                <div className="rounded-xl px-4 py-3 border"
                  style={{ backdropFilter: "blur(16px)", background: "rgba(28,51,32,0.75)", borderColor: "rgba(74,222,128,0.15)" }}>
                  <div className="text-[#86efac]/70 text-[9px] font-[600] tracking-[0.12em] mb-0.5">خبرة</div>
                  <div className="text-white font-[800] text-[1.4rem] leading-none">٢٦+ سنة</div>
                </div>
              </div>
            </div>

            {/* Floating breakfast mini card — overlapping bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.55, ease: E }}
              className="absolute -bottom-8 -right-4 md:-right-8 w-48 md:w-56 rounded-2xl overflow-hidden border shadow-2xl"
              style={{ borderColor: "rgba(255,255,255,0.7)", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
            >
              <div className="relative h-32">
                <Image src="/bg-breakfast.png" alt="فطور ديرتنا" fill className="object-cover" sizes="220px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/70 via-transparent to-transparent" />
              </div>
              <div className="px-4 py-3" style={{ background: "rgba(250,247,240,0.97)" }}>
                <p className="text-[#1a2e1d] font-[700] text-[12px]">فطور طبيعي يومياً</p>
                <p className="text-gray-500 font-[400] text-[10px] mt-0.5">جودة تثق بها كل يوم</p>
              </div>
            </motion.div>

            {/* Decorative dot grid — top left */}
            <div className="absolute -top-6 -left-6 w-24 h-24 pointer-events-none opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #2E7D32 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }} />
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#2E7D32]/15 to-transparent" />
    </section>
  );
}
