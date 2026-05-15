"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/* ── Unified brand tokens ── */
const C = {
  blue:  "#0B3D91",
  green: "#2F8F57",
  cream: "#F6F1E8",
  gold:  "#C9A46A",
  dark:  "#1A2C1E",
} as const;

const E  = [0.16, 1, 0.3, 1] as const;
const ES = [0.4,  0, 0.2, 1] as const;

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
type Product = {
  name: string;
  desc: string;
  img?: string;
  comingSoon?: boolean;
  ingredients?: string[];
  sizes?: string[];
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: 'fresh-cheese', title: 'الأجبان الطازجة', subtitle: 'مصنوعة يومياً من الحليب الطازج', accent: C.blue,
    products: [
      { name: 'جبنة مغلية حلوة', desc: 'طرية وناعمة، تُصنع يومياً من حليب ديرتنا الطازج.', img: '/p-cheese-mughliya.png', ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة عكاوي', desc: 'بنكهة أصيلة وملمس طري لا يُنسى، يدوية الصنع.', img: '/p-cheese-akkawi.png', ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة مبسترة', desc: 'مبسترة بعناية للحفاظ على نكهتها الطبيعية الكاملة.', img: '/p-cheese-mubastara.png', ingredients: ['حليب بقر مبستر', 'ملح', 'أنفحة طبيعية'] },
      { name: 'جبنة سنابل', desc: 'ذات ملمس كريمي وعطر حليب طازج بهوية شامية.', img: '/p-cheese-sanabel.png', ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة اريش', desc: 'خفيفة وغنية بالبروتين الطبيعي، مثالية لفطور صحي.', img: '/p-cheese-qareesh.png', ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة شنكليش حل', desc: 'كرات مُعتَّقة بالزعتر والتوابل الطبيعية، وصفة الشام.', img: '/p-cheese-shanklish.png', ingredients: ['جبنة', 'لبنة', 'شطة', 'بهارات', 'زيت'] },
      { name: 'مستكة', desc: 'نكهة ذهبية لا تُنسى، تُقدَّم طازجة كل يوم.', img: '/p-cheese-masnaka.png', ingredients: ['حليب بقر طازج', 'ملح', 'أنفحة طبيعية'] },
      { name: 'فيتا', desc: 'كريمية بنكهة متوسطية، مثالية مع الطماطم والزيتون.', img: '/p-cheese-feta.png', ingredients: ['حليب بقري مجفف خالي الدسم', 'دسم الحليب', 'ماء', 'ملح', 'جيلاتين', 'منفحة', 'سوربات البوتاسيوم E235', 'مثبت 731'] },
    ],
  },
  {
    id: 'vacuum', title: 'منتجات الفاكيوم', subtitle: 'محفوظة بتقنية الفاكيوم للجودة الدائمة', accent: C.green,
    products: [
      { name: 'جبنة مغلية حلوة فاكيوم', desc: 'محفوظة بتقنية الفاكيوم للحفاظ على طراوتها ونكهتها.', img: '/p-cheese-vac-mughliya.png', comingSoon: true, ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة عكاوي فاكيوم', desc: 'أصالة العكاوي محفوظة بنظام فاكيوم متطور.', img: '/p-cheese-vac-akkawi.png', comingSoon: true, ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'جبنة نابلسية فاكيوم', desc: 'نكهة نابلسية أصيلة بتغليف عصري وآمن.', img: '/p-cheese-vac-nabulsi.png', ingredients: ['حليب غنم طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'مستكة فاكيوم', desc: 'ذهبية الطعم محفوظة بالفاكيوم مع عطرها الفريد.', img: '/p-cheese-vac-masnaka.png', comingSoon: true },
    ],
  },
  {
    id: 'labneh', title: 'منتجات اللبنة', subtitle: 'بطابع بلدي وقوام كريمي طازج', accent: C.blue,
    products: [
      { name: 'لبنة طرية', desc: 'كريمية ناعمة، تُصنع يومياً من أجود الحليب الطازج.', img: '/p-labneh-soft.png', ingredients: ['حليب بقري طازج ١٠٠٪ كامل الدسم'] },
      { name: 'لبنة جامدة فاكيوم', desc: 'لبنة جامدة محفوظة بالفاكيوم للجودة الدائمة.', img: '/p-labneh-hard-vac.png', comingSoon: true, ingredients: ['حليب بقري طازج مبستر', 'بادئ', 'ملح طعام', 'ماء نقي'] },
      { name: 'لبنة جامدة حل', desc: 'تقليدية وأصيلة بوصفة الأجداد دون أي تغيير.', img: '/p-labneh-hard.png', ingredients: ['حليب بقري طازج مبستر', 'بادئ', 'ملح طعام', 'ماء نقي'] },
      { name: 'لبنة جرشية', desc: 'بملمس خفيف ونكهة طبيعية مميزة ومتوازنة.', img: '/p-labneh-jarshiya.png', ingredients: ['حليب بقري طازج ١٠٠٪ كامل الدسم'] },
      { name: 'لبنة بالزيت كرات - زعتر', desc: 'منقوعة بزيت الزيتون والزعتر البلدي.', img: '/p-labneh-zaatar.png', ingredients: ['لبنة طازجة', 'زيت زيتون', 'زعتر', 'ملح'] },
      { name: 'لبنة بالزيت كرات - نعنع', desc: 'منعشة بزيت الزيتون ونعنع طازج.', img: '/p-labneh-mint.png', ingredients: ['لبنة طازجة', 'زيت زيتون', 'نعناع', 'ملح'] },
      { name: 'لبنة بالزيت كرات - شطة', desc: 'جريئة وحارة لمن يُحب النكهة القوية الأصيلة.', img: '/p-labneh-shatta.png', ingredients: ['لبنة طازجة', 'زيت زيتون', 'شطة', 'ملح'] },
      { name: 'لبنة بالزيت كرات - سادة', desc: 'نقية بأجود زيت الزيتون، بساطة تحمل أصالة.', img: '/p-labneh-plain.png', ingredients: ['لبنة طازجة', 'زيت زيتون', 'ملح'] },
    ],
  },
  {
    id: 'halloum', title: 'منتجات الحلوم', subtitle: 'مناسبة للشوي والقلي بطعم غني أصيل', accent: C.green,
    products: [
      { name: 'حلوم سادة', desc: 'الحلوم التقليدي الأصيل الذي لا يذوب على النار.', img: '/p-halloum-plain.png', ingredients: ['حليب بقري طازج مبستر', 'منفحة', 'ملح طعام', 'ماء نقي'] },
      { name: 'حلوم براغي', desc: 'من أبقار مراعٍ مفتوحة، طعم أغنى وأعمق.', img: '/p-halloum-shepherd.png', ingredients: ['حليب بقر طازج', 'ملح', 'أنفحة طبيعية'] },
      { name: 'حلوم رول', desc: 'عملي الشكل، طازج يومياً ويلائم كل مائدة.', img: '/p-halloum-roll.png', comingSoon: true },
    ],
  },
  {
    id: 'drinks', title: 'مشروبات الألبان', subtitle: 'انتعاش طبيعي من مزارعنا', accent: C.green,
    products: [
      { name: 'لبن مخيض ديرتنا (1 لتر)', desc: 'لبن مخيض طازج بطعم منعش وقوام خفيف مناسب للوجبات اليومية.', img: '/p-shneneh.png', ingredients: ['حليب بقري طازج مبستر', 'ملح طعام'], comingSoon: true },
      { name: 'لبن رايب ديرتنا', desc: 'لبن رايب طازج بقوام غني وطعم طبيعي منعش مناسب للوجبات اليومية.', img: '/p-laban-rayeb.png', ingredients: ['حليب بقري طازج مبستر ١٠٠٪ كامل الدسم', 'روبة', '(نسبة الدسم لا تقل عن ٣٪)'], sizes: ['3 كغم', '4 كغم'] },
    ],
  },
];

/* ════════════════════════════════════════════
   MODAL
════════════════════════════════════════════ */
function Modal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(26,44,30,0.55)", backdropFilter: "blur(6px)" }}
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.38, ease: E }}
          className="relative w-full max-w-md rounded-[2rem] p-6 sm:p-8 overflow-y-auto"
          style={{
            background: `linear-gradient(160deg, rgba(255,255,255,0.98) 0%, ${C.cream} 100%)`,
            boxShadow: "0 32px 80px rgba(26,44,30,0.20), 0 8px 24px rgba(26,44,30,0.10)",
            border: `1px solid rgba(11,61,145,0.08)`,
            maxHeight: "88vh",
          }}
          onClick={e => e.stopPropagation()}>

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 left-4 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 touch-manipulation"
            style={{ background: "rgba(11,61,145,0.06)", color: C.blue }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(11,61,145,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(11,61,145,0.06)")}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>×</span>
          </button>

          {/* Product name */}
          <h3 className="font-[800] tracking-[-0.02em] mb-1"
            style={{ fontSize: "1.35rem", color: C.blue }}>
            {product.name}
          </h3>
          <div className="h-px mb-5"
            style={{ width: "2.5rem", background: `linear-gradient(to right, ${C.gold}80, transparent)` }} />

          {/* Ingredients */}
          <p className="font-[700] mb-3" style={{ fontSize: "11px", letterSpacing: "0.10em", color: C.green }}>
            المكونات
          </p>
          <ul className="space-y-2 mb-6">
            {product.ingredients?.map((ing, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.gold }} />
                <span style={{ fontSize: "14px", color: "rgba(26,44,30,0.70)", fontWeight: 500 }}>{ing}</span>
              </li>
            ))}
          </ul>

          {/* Note */}
          <div className="rounded-xl px-4 py-3"
            style={{ background: `rgba(47,143,87,0.07)`, border: `1px solid rgba(47,143,87,0.12)` }}>
            <p style={{ fontSize: "11.5px", color: "rgba(26,44,30,0.55)", lineHeight: 1.65, fontWeight: 500 }}>
              منتجاتنا طازجة يومياً وخالية من المواد الحافظة
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════
   PRODUCT CARD — compact, equal height
════════════════════════════════════════════ */
function ProductCard({ product, accent }: { product: Product; accent: string }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col rounded-[1.75rem] overflow-hidden h-full"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, ${C.cream} 100%)`,
          boxShadow: hovered
            ? `0 20px 48px rgba(11,61,145,0.13), 0 6px 16px rgba(11,61,145,0.08)`
            : `0 4px 18px rgba(11,61,145,0.07), 0 1px 4px rgba(11,61,145,0.04)`,
          border: `1px solid rgba(11,61,145,0.07)`,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "box-shadow 0.28s ease, transform 0.28s ease",
        }}>

        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0"
          style={{ height: 190, background: `#fdf9f3` }}>

          {product.img ? (
            <Image
              src={product.img}
              alt={product.name}
              fill
              sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
              className="object-contain p-1"
              style={{
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.45s ease",
                filter: `contrast(1.07) saturate(1.18) brightness(0.97) drop-shadow(0 12px 22px rgba(100,70,20,0.22))`,
              }}
            />
          ) : (
            /* Branded placeholder for products with no photo yet */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `rgba(11,61,145,0.07)`, border: `1px solid rgba(11,61,145,0.10)` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={`rgba(11,61,145,0.35)`} strokeWidth="1.4">
                  <path d="M12 2C8 2 5 5 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4-3-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <span className="text-center font-[600]" style={{ fontSize: "10px", color: `rgba(11,61,145,0.30)`, letterSpacing: "0.06em" }}>
                {product.name}
              </span>
            </div>
          )}

          {/* Bottom fade — blends image into card body */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${C.cream}70 0%, transparent 45%)` }} />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
          {/* Accent rule */}
          <div className="h-px mb-2.5"
            style={{
              width: hovered ? "2rem" : "1.4rem",
              background: accent === C.blue
                ? `linear-gradient(to right, ${C.gold}75, transparent)`
                : `linear-gradient(to right, ${C.green}75, transparent)`,
              transition: "width 0.3s ease",
            }} />

          {/* Name */}
          <h3 className="font-[700] leading-snug mb-1.5"
            style={{ fontSize: "0.93rem", color: C.blue, letterSpacing: "-0.01em" }}>
            {product.name}
          </h3>

          {/* Description — 2 line clamp */}
          <p className={`font-[400] leading-[1.65] ${product.sizes ? 'mb-2.5' : (product.name.includes('مخيض') ? 'mb-2.5' : 'flex-1 mb-3')}`}
            style={{
              fontSize: "0.78rem",
              color: "rgba(26,44,30,0.52)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              flex: product.sizes ? '1' : undefined
            }}>
            {product.desc}
          </p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.sizes.map(sz => (
                <span key={sz} className="inline-flex items-center justify-center rounded-md px-2 py-0.5 font-[600]"
                  style={{ fontSize: "10px", background: `rgba(11,61,145,0.06)`, color: C.blue, border: `1px solid rgba(11,61,145,0.1)` }}>
                  {sz}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          {product.comingSoon ? (
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "rgba(26,44,30,0.05)", border: "1px solid rgba(26,44,30,0.08)" }}>
              <span style={{ fontSize: "10.5px", fontWeight: 600, color: "rgba(26,44,30,0.30)", letterSpacing: "0.04em" }}>
                تفاصيل المنتج قريباً
              </span>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-250 cursor-pointer self-start"
              style={{ background: `rgba(11,61,145,0.07)`, border: `1px solid rgba(11,61,145,0.12)`, color: C.blue }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(11,61,145,0.13)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `rgba(11,61,145,0.07)`; }}>
              <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.04em" }}>تفاصيل المنتج</span>
              <span style={{ fontSize: 11 }}>←</span>
            </button>
          )}
        </div>
      </div>

      {open && <Modal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}

/* ════════════════════════════════════════════
   CATEGORY BLOCK
════════════════════════════════════════════ */
function CategoryBlock({ cat, catIndex }: { cat: Category; catIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay: catIndex * 0.08, ease: E }}
      className="mb-10 lg:mb-12">

      {/* Category header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-px rounded-full" style={{ background: C.green, opacity: 0.70 }} />
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: C.green }}>
            {cat.subtitle}
          </span>
        </div>
        <h3 className="font-[800] tracking-[-0.022em]"
          style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.9rem)", color: C.blue, lineHeight: 1.1 }}>
          {cat.title}
        </h3>
        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: ES }}
          className="origin-right h-px mt-4"
          style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
      </div>

      {/* Grid — auto rows prevent unequal heights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-fr">
        {cat.products.map((p, i) => (
          <motion.div key={p.name} className="h-full"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.65, delay: Math.min(i * 0.07, 0.35), ease: E }}>
            <ProductCard product={p} accent={cat.accent} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function ProductCatalog() {
  return (
    <section id="catalog" className="relative overflow-hidden" style={{ background: C.cream }}>

      {/* Background */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to bottom, rgba(11,61,145,0.03) 0%, transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(201,164,106,0.05) 0%, transparent 55%)" }} />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-14 pt-16 pb-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease: E }}
          className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px rounded-full" style={{ background: C.green, opacity: 0.70 }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", color: C.green }}>
              تشكيلتنا الكاملة · صناعة يومية طازجة
            </span>
          </div>
          <h2 className="font-[800] tracking-[-0.025em]"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", lineHeight: 1.1, color: C.blue }}>
            منتجاتنا <span style={{ color: C.green, fontWeight: 500 }}>الطبيعية</span>
          </h2>
          <p className="mt-3 font-[400]"
            style={{ fontSize: "clamp(0.88rem, 1.0vw, 0.96rem)", color: "rgba(26,44,30,0.52)", maxWidth: 420, lineHeight: 1.80 }}>
            من مزارعنا إلى مائدتكم يومياً — كل منتج يُصنع بنفس الحب والجودة منذ ٢٠٠٣.
          </p>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.12, ease: ES }}
            className="origin-right h-px mt-7"
            style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
        </motion.div>

        {/* Categories */}
        {CATEGORIES.map((cat, i) => (
          <CategoryBlock key={cat.id} cat={cat} catIndex={i} />
        ))}

        {/* Bottom strip */}
        <div className="border-t pt-6" style={{ borderColor: "rgba(11,61,145,0.09)" }}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
                className="w-2 h-2 rounded-full" style={{ background: C.green }} />
              <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(26,44,30,0.42)" }}>
                جميع منتجاتنا طازجة يومياً · بدون مواد حافظة
              </span>
            </div>
            <motion.a href="https://wa.me/962796875461" target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -1, boxShadow: `0 6px 20px rgba(11,61,145,0.22)` }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full font-[700] text-[13px] px-6 py-2.5 cursor-pointer"
              style={{ background: C.blue, color: C.cream, boxShadow: `0 3px 12px rgba(11,61,145,0.16)` }}>
              تواصل معنا <span style={{ fontSize: "13px" }}>←</span>
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(11,61,145,0.10), transparent)" }} />
    </section>
  );
}
