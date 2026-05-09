"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const E = [0.16, 1, 0.3, 1] as const;

const C = {
  blue:  "#0A2F73",
  green: "#2E8B57",
  cream: "#F7F4EC",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

const PRODUCTS = [
  {
    img: "/p-labneh-soft.png",
    name: "لبنة طرية",
    cat: "لبنة",
    desc: "كريمية ناعمة مع رشّة زيت زيتون بكر — وجبة الصباح الأصيلة",
    badge: "#2E8B57",
  },
  {
    img: "/p-cheese-akkawi.png",
    name: "جبنة عكاوي",
    cat: "جبنة",
    desc: "ناعمة الملمس، طازجة يومياً من حليب مزارعنا",
    badge: "#0A2F73",
  },
  {
    img: "/p-labneh-zaatar.png",
    name: "لبنة بالزعتر",
    cat: "لبنة",
    desc: "مزيج عريق من اللبنة الطرية والزعتر البلدي الأخضر",
    badge: "#2E8B57",
  },
  {
    img: "/p-halloum-plain.png",
    name: "حلوم طازج",
    cat: "حلوم",
    desc: "تقليدي بامتياز — يُشوى أو يُقلى، لا يذوب",
    badge: "#C9A46A",
  },
  {
    img: "/p-cheese-shanklish.png",
    name: "شنكليش",
    cat: "جبنة",
    desc: "موروث لبلاد الشام — مُعتَّق بالزعتر وحبة البركة",
    badge: "#0A2F73",
  },
  {
    img: "/p-labneh-jarshiya.png",
    name: "لبنة جرشية",
    cat: "لبنة",
    desc: "مُجففة بطريقة جرش التقليدية — أرق وأعمق نكهةً",
    badge: "#2E8B57",
  },
];

export default function DairyShowcase() {
  return (
    <section id="products"
      className="relative overflow-hidden"
      style={{ background: C.cream }}>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${C.blue}18, transparent)` }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-14 pt-24 pb-28">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: E }}
            className="inline-flex items-center gap-3 mb-5">
            <div className="w-4 h-px rounded-full" style={{ background: C.green }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.green }}>
              تشكيلتنا الطازجة
            </span>
            <div className="w-4 h-px rounded-full" style={{ background: C.green }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.08, ease: E }}
            className="font-[800] tracking-[-0.025em] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.1, color: C.blue }}>
            منتجات طازجة يومياً
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.16, ease: E }}
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: "rgba(26,44,30,0.55)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            من مزارع ديرتنا إلى مائدتكم بنفس الجودة منذ ٢٠٠٣
          </motion.p>
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {PRODUCTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.07, ease: E }}
              whileHover={{ y: -6, boxShadow: `0 24px 60px rgba(10,47,115,0.10), 0 6px 20px rgba(10,47,115,0.06)` }}
              className="group relative rounded-[1.75rem] overflow-hidden cursor-pointer"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 4px 24px rgba(10,47,115,0.06), 0 1px 4px rgba(10,47,115,0.04)",
                border: `1px solid rgba(10,47,115,0.06)`,
                transition: "box-shadow 0.35s ease",
              }}>

              {/* Product image area */}
              <div className="relative flex items-center justify-center pt-10 pb-4 px-8"
                style={{ background: `linear-gradient(160deg, ${C.cream} 0%, rgba(255,255,255,0.60) 100%)` }}>
                {/* Subtle dot pattern bg */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ backgroundImage: `radial-gradient(circle, ${C.blue} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4 + i * 0.3, ease: "easeInOut" }}>
                  <Image
                    src={p.img} alt={p.name}
                    width={200} height={200}
                    className="object-contain relative z-10"
                    style={{ filter: "drop-shadow(0 12px 28px rgba(10,47,115,0.12))" }}
                  />
                </motion.div>
              </div>

              {/* Card content */}
              <div className="px-7 pt-5 pb-7">
                {/* Category badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4"
                  style={{ background: `${p.badge}12`, border: `1px solid ${p.badge}22` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.badge }} />
                  <span className="text-[10px] font-[700] tracking-[0.08em]"
                    style={{ color: p.badge }}>{p.cat}</span>
                </div>

                <h3 className="font-[800] mb-2"
                  style={{ fontSize: "1.2rem", color: C.dark, letterSpacing: "-0.018em" }}>
                  {p.name}
                </h3>
                <p className="font-[400] leading-[1.65] mb-5"
                  style={{ fontSize: "0.875rem", color: "rgba(26,44,30,0.50)" }}>
                  {p.desc}
                </p>

                {/* CTA link */}
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  style={{ color: C.green }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>اكتشف المنتج</span>
                  <span style={{ fontSize: "14px", lineHeight: 1 }}>←</span>
                </div>
              </div>

              {/* Hover top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right"
                style={{ background: `linear-gradient(to left, ${p.badge}, ${p.badge}40)` }} />
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: E }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-10"
          style={{ borderColor: `rgba(10,47,115,0.09)` }}>
          <p style={{ fontSize: "0.9rem", color: "rgba(26,44,30,0.45)", fontWeight: 400 }}>
            +٢٠ منتجاً ألبانياً طازجاً — تُحضَّر يومياً من مزارعنا
          </p>
          <motion.a href="#all-products"
            whileHover={{ y: -2, boxShadow: `0 8px 28px ${C.blue}35` }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[14px] px-8 py-4 cursor-pointer"
            style={{ background: C.blue, color: C.cream, boxShadow: `0 4px 18px ${C.blue}28` }}>
            استعرض كل المنتجات <span style={{ fontSize: "15px", lineHeight: 1 }}>←</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${C.blue}14, transparent)` }} />
    </section>
  );
}
