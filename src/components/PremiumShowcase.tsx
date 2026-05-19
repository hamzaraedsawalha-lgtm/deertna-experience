"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const E = [0.16, 1, 0.3, 1] as const;

interface Product {
  id: number;
  img: string;
  name: string;
  category: string;
  desc: string;
  accent: string;
  bg: string;
  sizes?: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    img: "/p-labneh-soft.png",
    name: "لبنة طرية",
    category: "لبنة",
    desc: "كريمية الملمس، يومية الطزاجة — تُقدَّم مع زيت الزيتون البكر",
    accent: "#C8A96E",
    bg: "linear-gradient(145deg, #1C1408 0%, #2C1E0A 100%)",
  },
  {
    id: 2,
    img: "/p-cheese-akkawi.png",
    name: "جبنة عكاوي",
    category: "جبنة",
    desc: "طراوة أصيلة بنكهة حليب طازج من مزارعنا مباشرةً",
    accent: "#A8C4A0",
    bg: "linear-gradient(145deg, #0A1810 0%, #112214 100%)",
  },
  {
    id: 3,
    img: "/p-halloum-plain.png",
    name: "حلوم طازج",
    category: "حلوم",
    desc: "تقليدي بامتياز — يُشوى ويُقدَّم على الفطور الأصيل",
    accent: "#D4A06A",
    bg: "linear-gradient(145deg, #1A1008 0%, #261808 100%)",
  },
  {
    id: 4,
    img: "/p-labneh-zaatar.png",
    name: "لبنة بالزعتر",
    category: "لبنة",
    desc: "مزيج عريق من اللبنة الطرية والزعتر البلدي الأخضر",
    accent: "#7DAE7D",
    bg: "linear-gradient(145deg, #0C1A0C 0%, #142214 100%)",
  },
  {
    id: 5,
    img: "/p-cheese-shanklish.png",
    name: "شنكليش",
    category: "جبنة",
    desc: "موروث لبلاد الشام — مُعتَّق بالزعتر وحبة البركة",
    accent: "#B8956A",
    bg: "linear-gradient(145deg, #1A1208 0%, #221808 100%)",
  },
  {
    id: 6,
    img: "/p-labneh-jarshiya.png",
    name: "لبنة جرشية",
    category: "لبنة",
    desc: "لبنة مجففة بطريقة جرش التقليدية — أرق وأعمق نكهةً",
    accent: "#C4A870",
    bg: "linear-gradient(145deg, #1C1608 0%, #261E0A 100%)",
  },
  {
    id: 7,
    img: "/p-laban-rayeb.png",
    name: "لبن رايب ديرتنا",
    category: "مشروبات الألبان",
    desc: "قوام غني وطعم طبيعي منعش — مثالي مع الوجبات اليومية",
    accent: "#7EB8D4",
    bg: "linear-gradient(145deg, #081422 0%, #0C1C2E 100%)",
    sizes: ["3 كغم", "4 كغم"]
  },
];

export default function PremiumShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const prod = PRODUCTS[active];

  return (
    <section ref={ref} id="products" className="relative overflow-hidden z-10"
      style={{ background: "#0C1008", minHeight: "100vh" }}>

      {/* ── Dynamic ambient light per product ── */}
      <AnimatePresence mode="wait">
        <motion.div key={prod.id}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 65% 65% at 75% 50%, ${prod.accent}18 0%, transparent 70%)` }} />
      </AnimatePresence>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 pt-20 pb-24">

        {/* ── HEADER ── */}
        <motion.div style={{ y: titleY }}
          className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: E }}
              className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px" style={{ background: `rgba(200,169,110,0.7)` }} />
              <span className="text-[11px] font-[700] tracking-[0.1em]"
                style={{ color: "rgba(200,169,110,0.65)" }}>تشكيلتنا المميزة</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease: E }}
              className="font-[800] text-white tracking-[-0.025em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", lineHeight: 1.08 }}>
              منتجات طبيعية<br />
              <span className="font-[400]" style={{ color: "rgba(200,169,110,0.80)" }}>تُصنع بشغف</span>
            </motion.h2>
          </div>

          {/* Nav dots */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: E }}
            className="flex items-center gap-2 pb-3">
            {PRODUCTS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-400 cursor-pointer"
                style={{
                  width: i === active ? 24 : 6, height: 6,
                  background: i === active ? prod.accent : "rgba(255,255,255,0.18)",
                }} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── MAIN PRODUCT STAGE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-0 items-stretch mb-10">

          {/* LEFT — Large active product card */}
          <AnimatePresence mode="wait">
            <motion.div key={prod.id}
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: E }}
              className="relative rounded-3xl overflow-hidden flex items-end"
              style={{ background: prod.bg, minHeight: "clamp(460px, 55vh, 620px)", border: "1px solid rgba(255,255,255,0.06)" }}>

              {/* Product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-8, 8, -8], scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                  <Image src={prod.img} alt={prod.name} width={360} height={360}
                    className="object-contain"
                    style={{ filter: `drop-shadow(0 24px 60px rgba(0,0,0,0.75)) drop-shadow(0 0 30px ${prod.accent}30)` }} />
                </motion.div>
              </div>

              {/* Ground glow */}
              <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${prod.accent}22, transparent)` }} />

              {/* Content overlay */}
              <div className="relative z-10 w-full p-8"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)" }}>
                {/* Organic badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 border"
                  style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: prod.accent }} />
                  <span className="text-[10px] font-[700] tracking-[0.1em] text-white/60">{prod.category} · طبيعي</span>
                </div>
                <h3 className="font-[800] text-white mb-2"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", lineHeight: 1.1 }}>
                  {prod.name}
                </h3>
                <p className={`text-white/55 font-[400] leading-[1.65] ${prod.sizes ? 'mb-4' : ''}`}
                  style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", maxWidth: 340 }}>
                  {prod.desc}
                </p>

                {/* Sizes */}
                {prod.sizes && (
                  <div className="flex flex-wrap gap-2">
                    {prod.sizes.map((sz: string) => (
                      <span key={sz} className="inline-flex items-center justify-center rounded-md px-2.5 py-1 font-[600]"
                        style={{ fontSize: "11px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        {sz}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — Vertical product list */}
          <div className="flex flex-col gap-3 lg:pr-0 lg:pl-6">
            {PRODUCTS.map((p, i) => (
              <motion.button key={p.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: E }}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-5 rounded-2xl p-4 text-right transition-all duration-400 cursor-pointer overflow-hidden group"
                style={{
                  background: i === active
                    ? `linear-gradient(135deg, ${p.bg.split(",")[1]?.split(")")[0] ?? "rgba(30,20,8"}) 0%, rgba(255,255,255,0.03) 100%)`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${i === active ? `${p.accent}35` : "rgba(255,255,255,0.05)"}`,
                }}>

                {/* Active left bar */}
                {i === active && (
                  <motion.div layoutId="activeBar"
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                    style={{ background: p.accent }} />
                )}

                {/* Thumb */}
                <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  <Image src={p.img} alt={p.name} width={56} height={56} className="object-contain w-12 h-12" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-[700] text-white text-[0.9rem] leading-none">{p.name}</span>
                    <span className="text-[9px] font-[600] px-2 py-0.5 rounded-full"
                      style={{ background: `${p.accent}18`, color: p.accent }}>{p.category}</span>
                  </div>
                  <p className="text-white/38 text-[11px] font-[400] leading-[1.5] truncate">{p.desc}</p>
                </div>

                {/* Arrow */}
                <span className="text-white/20 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-[-2px] flex-shrink-0 text-[14px]">←</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: E }}
          className="flex items-center justify-between border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-white/30 text-[12px] font-[500]">
            +٢٠ منتجاً طازجاً يومياً — مباشرةً من مزارعنا
          </p>
          <a href="#all-products"
            className="inline-flex items-center gap-2.5 rounded-full font-[700] text-[13px] px-6 py-3 transition-all duration-400 hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.10)" }}>
            استعرض كل المنتجات <span className="text-[15px]">←</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.03), transparent)" }} />
    </section>
  );
}
