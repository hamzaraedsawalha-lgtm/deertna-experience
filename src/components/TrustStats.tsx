"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════
   UNIFIED BRAND TOKENS — matches Products.tsx exactly
   ═══════════════════════════════════════ */
const C = {
  blue:  "#0B3D91",
  green: "#2F8F57",
  cream: "#F6F1E8",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

/* ── Animated counter ── */
function Counter({ to, prefix = "", suffix = "" }: {
  to: number; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1800;
    const step = 16;
    const inc = to / (dur / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const STATS = [
  {
    num: 26,  prefix: "+", suffix: "",
    unit: "عاماً",
    label: "خبرة متوارثة",
    sub: "نصنع بنفس الحب منذ ٢٠٠٣",
    accent: C.blue,
  },
  {
    num: 800, prefix: "+", suffix: "",
    unit: "عائلة",
    label: "تثق بمنتجاتنا",
    sub: "وتتسع عائلتنا كل يوم",
    accent: C.green,
  },
  {
    num: 100, prefix: "",  suffix: "٪",
    unit: "طبيعي",
    label: "بلا إضافات اصطناعية",
    sub: "من المزرعة مباشرةً إلى مائدتكم",
    accent: C.green,
  },
  {
    num: 20,  prefix: "+", suffix: "",
    unit: "منتجاً",
    label: "طازجاً يومياً",
    sub: "أجبان · لبنة · حلوم",
    accent: C.blue,
  },
];

export default function TrustStats() {
  return (
    <section className="relative overflow-hidden" style={{ background: C.cream }}>

      {/* Background — matches Products.tsx layer system */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "40%", background: "linear-gradient(to bottom, rgba(11,61,145,0.04) 0%, transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(201,164,106,0.07) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,164,106,0.06) 0%, transparent 65%)" }} />

      {/* Top separator — matches Products.tsx */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />

      {/* ── Content — same container as Products.tsx ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-14 pt-14 pb-14">

        {/* Header — same pattern as Products.tsx header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease: E }}
          className="mb-6 lg:mb-8">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px rounded-full" style={{ background: C.green, opacity: 0.70 }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", color: C.green }}>
              لماذا ديرتنا · ثقتكم شرفنا
            </span>
          </div>

          <h2 className="font-[800] tracking-[-0.025em]"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", lineHeight: 1.1, color: C.blue }}>
            أرقام <span style={{ color: C.green, fontWeight: 500 }}>تحكي القصة</span>
          </h2>

          {/* Separator — matches Products.tsx */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: ES }}
            className="origin-right h-px mt-4"
            style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
        </motion.div>

        {/* ── Stat cards — same card visual language as ProductCatalog ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: i * 0.09, ease: E }}
              whileHover={{ y: -5,
                boxShadow: `0 28px 60px rgba(11,61,145,0.14), 0 8px 22px rgba(11,61,145,0.08)` }}
              className="flex flex-col rounded-[2rem] px-5 py-6"
              style={{
                background: `linear-gradient(160deg, rgba(255,255,255,0.92) 0%, ${C.cream} 100%)`,
                boxShadow: `0 8px 28px rgba(11,61,145,0.08), 0 2px 6px rgba(11,61,145,0.04)`,
                border: `1px solid rgba(11,61,145,0.07)`,
                transition: "box-shadow 0.32s ease, transform 0.32s ease",
              }}>

              {/* Accent rule — same as ProductCard */}
              <div className="h-px mb-6"
                style={{
                  width: "2rem",
                  background: s.accent === C.blue
                    ? `linear-gradient(to right, ${C.gold}70, ${C.gold}20, transparent)`
                    : `linear-gradient(to right, ${C.green}70, ${C.green}20, transparent)`,
                }} />

              {/* Number */}
              <div className="font-[900] leading-none mb-1"
                style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", color: s.accent, letterSpacing: "-0.04em" }}>
                <Counter to={s.num} prefix={s.prefix} suffix={s.suffix} />
              </div>

              {/* Unit */}
              <div className="font-[600] mb-4"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", color: s.accent, opacity: 0.75, letterSpacing: "-0.01em" }}>
                {s.unit}
              </div>

              {/* Gold divider — same as Products.tsx description divider */}
              <div className="h-px mb-4"
                style={{ width: "2.5rem", background: `linear-gradient(to right, ${C.gold}65, ${C.gold}18, transparent)` }} />

              {/* Label */}
              <div className="font-[700] mb-1.5"
                style={{ fontSize: "clamp(0.88rem, 1.1vw, 1.0rem)", color: C.dark, letterSpacing: "-0.01em" }}>
                {s.label}
              </div>

              {/* Sub */}
              <div style={{ fontSize: "11px", fontWeight: 500, color: "rgba(26,44,30,0.45)", letterSpacing: "0.04em" }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip — mirrors Products.tsx bottom strip exactly */}
        <div className="border-t pt-6" style={{ borderColor: "rgba(11,61,145,0.09)" }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
                className="w-2 h-2 rounded-full" style={{ background: C.green }} />
              <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(26,44,30,0.45)" }}>
                نحن لا نبيع منتجاً — نشارككم جزءاً من أرضنا وعائلتنا
              </span>
            </div>
            <motion.a href="#contact"
              whileHover={{ y: -1, boxShadow: `0 6px 20px rgba(47,143,87,0.25)` }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full font-[700] text-[13px] px-6 py-2.5 cursor-pointer"
              style={{ background: C.green, color: "#fff", boxShadow: `0 3px 12px rgba(47,143,87,0.18)` }}>
              تواصل معنا <span style={{ fontSize: "13px" }}>←</span>
            </motion.a>
          </div>
        </div>

      </div>

      {/* Bottom separator — matches Products.tsx */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
    </section>
  );
}
