"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

const C = {
  blue:  "#0B3D91",
  green: "#2F8F57",
  cream: "#F6F1E8",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

const PRODUCTS = [
  { name: "جبنة مغلية حلوة",        accent: "طرية وطازجة يومياً",    cat: "جبنة",    badge: "طازج يومياً",    img: "/p-cheese-mughliya.png",       desc: "جبنة طرية بملمس ناعم ونكهة حلوة خفيفة — تُصنع بالطريقة التقليدية كل يوم من حليب ديرتنا الطازج." },
  { name: "جبنة عكاوي",             accent: "نعومة لا تُقاوم",       cat: "جبنة",    badge: "صناعة تقليدية", img: "/p-cheese-akkawi.png",         desc: "بنكهة أصيلة وملمس طري لا يُنسى — تُصنع يدوياً يومياً من حليب طازج بدون أي إضافات." },
  { name: "جبنة مبسترة",            accent: "جودة وسلامة غذائية",    cat: "جبنة",    badge: "طبيعي ١٠٠٪",    img: "/p-cheese-mubastara.png",      desc: "مبسترة بعناية للحفاظ على نكهتها الطبيعية الكاملة مع أعلى معايير الجودة والسلامة الغذائية." },
  { name: "جبنة سنابل",             accent: "برائحة الحليب الطازج",  cat: "جبنة",    badge: "صناعة محلية",   img: "/p-cheese-sanabel.png",        desc: "ذات ملمس كريمي متميز وعطر حليب طازج — جبنة ديرتنا المحلية بهوية شامية خاصة." },
  { name: "جبنة اريش",              accent: "خفيفة وصحية",           cat: "جبنة",    badge: "طبيعي ١٠٠٪",    img: "/p-cheese-qareesh.png",        desc: "جبنة قريش خفيفة غنية بالبروتين الطبيعي — مثالية لفطور صحي ومتوازن في كل يوم." },
  { name: "شنكليش حل",              accent: "موروث الشام الأصيل",    cat: "جبنة",    badge: "صناعة تقليدية", img: "/p-cheese-shanklish.png",      desc: "كرات جبنة مُعتَّقة بالزعتر وحبة البركة والتوابل الطبيعية — وصفة موروثة من جبال الشام." },
  { name: "مغلية حلوة فاكيوم",      accent: "طازجة في كل وقت",      cat: "فاكيوم",  badge: "فاكيوم",         img: "/p-cheese-vac-mughliya.png",   desc: "جبنة مغلية حلوة محفوظة بتقنية الفاكيوم المتطورة — للحفاظ على طراوتها ونكهتها لأطول فترة." },
  { name: "عكاوي فاكيوم",           accent: "الأصالة تدوم",          cat: "فاكيوم",  badge: "فاكيوم",         img: "/p-cheese-vac-akkawi.png",     desc: "عكاوي طازجة معبأة بنظام فاكيوم متطور يُبقي نكهتها الأصيلة محفوظة في كل لحظة." },
  { name: "نابلسية فاكيوم",         accent: "أصالة بتغليف عصري",    cat: "فاكيوم",  badge: "فاكيوم",         img: "/p-cheese-vac-nabulsi.png",    desc: "نكهة نابلسية أصيلة محفوظة بتقنية فاكيوم حديثة — لمن يبحث عن الأصالة بكل مكان." },
  { name: "مستكة فاكيوم",           accent: "عطر لا يُنسى",          cat: "فاكيوم",  badge: "فاكيوم",         img: "/p-cheese-vac-masnaka.png",    desc: "مستكة ذهبية الطعم محفوظة بالفاكيوم — تحافظ على نضارتها وعطرها الفريد في كل لقمة." },
  { name: "مستكة",                  accent: "ذهبية الطعم والنكهة",   cat: "جبنة",    badge: "طازج يومياً",    img: "/p-cheese-masnaka.png",        desc: "مستكة طبيعية بطعم ونكهة لا تُنسى — تُقدَّم طازجة يومياً لتمنحك أصدق تجربة دسمة." },
  { name: "لبنة طرية",              accent: "كريمية من مزارعنا",     cat: "لبنة",    badge: "طازج يومياً",    img: "/p-labneh-soft.png",           desc: "مصنوعة يومياً من أجود الحليب الطازج — ناعمة كالحرير تُقدَّم مع زيت الزيتون البكر." },
  { name: "لبنة جامدة فاكيوم",      accent: "جودة محفوظة دائماً",   cat: "لبنة",    badge: "فاكيوم",         img: "/p-labneh-hard-vac.png",       desc: "لبنة جامدة محفوظة بتقنية الفاكيوم — للحفاظ على جودتها الطبيعية في كل وجبة." },
  { name: "لبنة جامدة حل",          accent: "تقليدية وأصيلة",        cat: "لبنة",    badge: "صناعة تقليدية", img: "/p-labneh-hard.png",           desc: "لبنة جامدة بنكهة تقليدية أصيلة — صُنعت بنفس وصفة الأجداد دون أي تغيير." },
  { name: "لبنة جرشية",             accent: "خفيفة ومميزة",          cat: "لبنة",    badge: "طبيعي ١٠٠٪",    img: "/p-labneh-jarshiya.png",       desc: "لبنة جرشية بملمس خفيف ونكهة طبيعية مميزة — خيار راقٍ لمن يبحث عن التميز." },
  { name: "لبنة بالزيت · زعتر",     accent: "نكهة الصباح الأصيل",   cat: "لبنة",    badge: "صناعة محلية",   img: "/p-labneh-zaatar.png",         desc: "كرات لبنة منقوعة في زيت الزيتون البكر مع الزعتر البلدي — وصفة موروثة من بلاد الشام." },
  { name: "لبنة بالزيت · نعنع",     accent: "منعشة في كل لقمة",     cat: "لبنة",    badge: "صناعة محلية",   img: "/p-labneh-mint.png",           desc: "كرات لبنة بزيت الزيتون ونعنع طازج — منعشة وأنيقة تُزيّن كل مائدة بنكهة مميزة." },
  { name: "لبنة بالزيت · شطة",      accent: "نكهة قوية وجريئة",     cat: "لبنة",    badge: "صناعة محلية",   img: "/p-labneh-shatta.png",         desc: "كرات لبنة حارة بزيت الزيتون والشطة الطبيعية — لمن يُحب النكهة القوية والطعم الجريء." },
  { name: "فيتا ديرتنا",            accent: "من البحر المتوسط",      cat: "جبنة",    badge: "منتج مميز",      img: "/p-cheese-feta.png",           desc: "جبنة فيتا كريمية بنكهة متوسطية أصيلة — غنية ودسمة، مثالية مع الطماطم والزيتون." },
  { name: "حلوم سادة",              accent: "يُشوى ولا يذوب",        cat: "حلوم",    badge: "طبيعي ١٠٠٪",    img: "/p-halloum-plain.png",         desc: "الحلوم التقليدي الأصيل الذي يحتفظ بشكله على النار — مثالي لفطور العائلة الأصيل." },
  { name: "حلوم براعي",             accent: "من المراعي المفتوحة",   cat: "حلوم",    badge: "صناعة تقليدية", img: "/p-halloum-shepherd.png",      desc: "حلوم من أبقار ترعى في مراعٍ مفتوحة — طعم أغنى وأعمق يُحاكي أصالة الطبيعة." },
  { name: "حلوم رول",               accent: "عملي وشهي",             cat: "حلوم",    badge: "طازج يومياً",    img: "/p-halloum-roll.png",          desc: "حلوم رول عملي الشكل ومثالي للتقطيع — يُقدَّم طازجاً يومياً ويُلائم كل مائدة." },
  { name: "لبنة بالزيت · سادة",     accent: "بساطة فاخرة",          cat: "لبنة",    badge: "صناعة محلية",   img: "/p-labneh-plain.png",          desc: "كرات لبنة نقية بأجود أنواع زيت الزيتون البكر — بساطة تحمل نكهة الأصالة الحقيقية." },
];

const IMG_V = {
  enter:  { opacity: 0, scale: 1.04, filter: "blur(6px)"  },
  center: { opacity: 1, scale: 1,    filter: "blur(0px)"  },
  exit:   { opacity: 0, scale: 0.97, filter: "blur(4px)"  },
};
const TXT_V = {
  enter:  { opacity: 0, y: 20, filter: "blur(6px)"  },
  center: { opacity: 1, y: 0,  filter: "blur(0px)"  },
  exit:   { opacity: 0, y: -14, filter: "blur(4px)" },
};

export default function Products() {
  const [idx, setIdx] = useState(0);
  const total = PRODUCTS.length;
  const p = PRODUCTS[idx];

  const go = useCallback((n: number) => setIdx((n + total) % total), [total]);

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 5500);
    return () => clearInterval(t);
  }, [go, idx]);

  return (
    <section id="products" className="relative overflow-hidden"
      style={{ background: C.cream }}>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply pointer-events-none" />

      {/* Edge lighting — same system as rest of site */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "35%", background: "linear-gradient(to bottom, rgba(11,61,145,0.04) 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "25%", background: "linear-gradient(to top, rgba(11,61,145,0.03) 0%, transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(201,164,106,0.07) 0%, transparent 55%)" }} />
      <div className="absolute top-0 pointer-events-none"
        style={{ right: "28%", width: 160, height: "65%", background: "linear-gradient(to bottom, rgba(201,164,106,0.05), transparent)", filter: "blur(70px)" }} />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.12), transparent)" }} />

      {/* ── Header ── */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-14 pt-20 pb-4 relative z-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px rounded-full" style={{ background: C.green, opacity: 0.7 }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.green }}>تشكيلة ديرتنا الكاملة</span>
            </div>
            <h2 className="font-[800] tracking-[-0.025em]"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", lineHeight: 1.1, color: C.blue }}>
              منتجاتنا <span style={{ color: C.green, fontWeight: 500 }}>الطبيعية</span>
            </h2>
          </div>
          {/* Counter */}
          <div className="hidden md:flex items-center gap-2 pb-1">
            <span className="font-[900] text-[1.1rem]" style={{ color: C.blue }}>{String(idx + 1).padStart(2, "0")}</span>
            <div className="w-8 h-px" style={{ background: "rgba(11,61,145,0.18)" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "rgba(26,44,30,0.35)" }}>{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-14 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[520px]">

          {/* LEFT — Text */}
          <div className="relative flex flex-col justify-center py-10 lg:py-0 lg:pr-14">
            {/* Vertical gold progress line */}
            <div className="absolute right-0 top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "rgba(201,164,106,0.12)" }}>
              <motion.div className="absolute top-0 left-0 right-0 rounded-full"
                style={{ background: C.gold }}
                animate={{ height: `${((idx + 1) / total) * 100}%` }}
                transition={{ duration: 0.6, ease: ES }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={idx} variants={TXT_V}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.60, ease: E }}>

                {/* Category badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
                  style={{ background: `${C.blue}0D`, borderColor: `${C.blue}1A` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.blue }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: C.blue }}>
                    {p.cat} · طبيعي ١٠٠٪
                  </span>
                </div>

                {/* Product name */}
                <h2 className="font-[800] tracking-[-0.028em] mb-2"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.4rem)", lineHeight: 1.08, color: C.blue }}>
                  {p.name}
                </h2>
                <p className="font-[500] mb-5"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", color: C.green, lineHeight: 1.2 }}>
                  {p.accent}
                </p>

                {/* Gold divider */}
                <div className="h-px mb-6"
                  style={{ width: 200, background: `linear-gradient(to right, ${C.gold}65, ${C.gold}18, transparent)` }} />

                {/* Description */}
                <p className="leading-[1.82] mb-4"
                  style={{ fontSize: "clamp(0.9rem, 1.05vw, 0.98rem)", color: "rgba(26,44,30,0.60)", fontWeight: 400, maxWidth: 400 }}>
                  {p.desc}
                </p>

                {/* Freshness badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-9"
                  style={{ background: `${C.green}12`, border: `1px solid ${C.green}22` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: C.green }}>{p.badge}</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <motion.a href="https://wa.me/962796875461?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D8%AF%D9%8A%D8%B1%D8%AA%D9%86%D8%A7"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, boxShadow: `0 10px 28px rgba(11,61,145,0.28)` }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-full font-[700] text-[14px] px-7 py-3.5 cursor-pointer"
                    style={{ background: C.blue, color: C.cream, boxShadow: `0 4px 18px rgba(11,61,145,0.20)` }}>
                    تواصل معنا <span style={{ fontSize: "14px" }}>←</span>
                  </motion.a>
                  <motion.a href="#products"
                    whileHover={{ y: -2, background: `rgba(11,61,145,0.06)` }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-full font-[600] text-[14px] px-7 py-3.5 cursor-pointer border"
                    style={{ borderColor: `rgba(11,61,145,0.18)`, color: C.blue }}>
                    استعراض المنتجات
                  </motion.a>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <button onClick={() => go(idx - 1)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ borderColor: "rgba(11,61,145,0.18)", color: "rgba(11,61,145,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = `${C.blue}0D`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,61,145,0.18)"; e.currentTarget.style.background = "transparent"; }}>
                    <span className="text-[14px]">→</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    {PRODUCTS.map((_, i) => (
                      <button key={i} onClick={() => go(i)}
                        className="rounded-full transition-all duration-400 cursor-pointer"
                        style={{ width: i === idx ? 22 : 5, height: 5, background: i === idx ? C.blue : "rgba(11,61,145,0.20)" }} />
                    ))}
                  </div>
                  <button onClick={() => go(idx + 1)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{ borderColor: "rgba(11,61,145,0.18)", color: "rgba(11,61,145,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = `${C.blue}0D`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,61,145,0.18)"; e.currentTarget.style.background = "transparent"; }}>
                    <span className="text-[14px]">←</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 75% 70% at 55% 50%, rgba(201,164,106,0.10) 0%, transparent 70%)" }} />

            <AnimatePresence mode="wait">
              <motion.div key={idx} variants={IMG_V}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.65, ease: E }}
                className="relative w-full" style={{ aspectRatio: "4/5", maxHeight: "70vh" }}>

                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden"
                  style={{
                    boxShadow: `0 28px 70px rgba(11,61,145,0.12), 0 8px 22px rgba(11,61,145,0.07)`,
                    border: `1px solid rgba(11,61,145,0.07)`,
                    background: `linear-gradient(160deg, rgba(255,255,255,0.92) 0%, ${C.cream} 100%)`,
                  }}>
                  <div className="absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: `radial-gradient(circle, ${C.blue} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
                  <Image src={p.img} alt={p.name} fill
                    sizes="(max-width:1024px) 80vw, 44vw"
                    className="object-contain p-10"
                    style={{ filter: "drop-shadow(0 18px 44px rgba(11,61,145,0.14))" }} />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${C.cream}40 0%, transparent 40%)` }} />
                </div>

                {/* Number watermark */}
                <div className="absolute -bottom-2 -right-2 select-none pointer-events-none"
                  style={{ fontSize: "6rem", fontWeight: 900, lineHeight: 1, color: "rgba(11,61,145,0.05)", letterSpacing: "-0.05em" }}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t" style={{ borderColor: "rgba(11,61,145,0.09)" }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
              className="w-2 h-2 rounded-full" style={{ background: C.green }} />
            <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(26,44,30,0.45)" }}>
              جميع منتجاتنا طازجة يومياً · بدون مواد حافظة
            </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
    </section>
  );
}
