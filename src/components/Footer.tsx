"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const C = { blue:"#0B3D91", green:"#2F8F57", cream:"#F6F1E8", gold:"#C9A46A" } as const;
const BG = "#1F3528";
const E  = [0.16,1,0.3,1] as const;

const dim  = "rgba(246,241,232,0.80)";
const mute = "rgba(246,241,232,0.50)";

function SocialLink({ href, label, children }: { href:string; label:string; children:React.ReactNode }) {
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      whileHover={{ y:-3, scale:1.08 }} transition={{ duration:0.2 }}
      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
      style={{ background:"rgba(246,241,232,0.08)", border:"1px solid rgba(246,241,232,0.12)", color:dim }}>
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background:BG }}>

      {/* Subtle warm glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 55% 45% at 90% 5%, rgba(201,164,106,0.09) 0%, transparent 60%)" }}/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 60% 50% at 50% 40%, rgba(91,138,82,0.07) 0%, transparent 65%)" }}/>
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay pointer-events-none"/>

      {/* Cream top fade — connects from cream sections above */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background:`linear-gradient(to bottom, ${C.cream}15, transparent)` }}/>
      <div className="absolute top-16 left-0 right-0 h-px"
        style={{ background:`linear-gradient(to right, transparent, rgba(201,164,106,0.20), transparent)` }}/>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-14 pt-14 pb-8">

        {/* ── 3-column main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 mb-8 items-start">

          {/* LEFT — Brand */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:E }}>
            <Link href="/" className="inline-block mb-5">
              <div className="relative w-36 h-16 rounded-xl overflow-hidden"
                style={{ background:"rgba(246,241,232,0.02)", border:"1px solid rgba(246,241,232,0.06)" }}>
                <Image src="/logo11.png" alt="ديرتنا" fill className="object-contain p-1.5"/>
              </div>
            </Link>
            <p className="leading-[1.75] mb-6 font-[400]"
              style={{ fontSize:"14px", color:dim, maxWidth:260 }}>
              منتجات ألبان وأجبان طازجة تُصنع يومياً بجودة محلية وطعم تقليدي.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["طبيعي ١٠٠٪","طازج يومياً","صناعة محلية"].map(b => (
                <span key={b} className="text-[10px] font-[600] px-3 py-1 rounded-full"
                  style={{ border:`1px solid rgba(201,164,106,0.20)`, color:`rgba(201,164,106,0.65)`, letterSpacing:"0.06em" }}>
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CENTER — Contact */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, delay:0.10, ease:E }}
            className="flex flex-col">
            <h4 className="mt-0 mb-6" style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.11em", color:mute, lineHeight: 1 }}>
              تواصل معنا
            </h4>
            <div className="flex flex-col gap-4">
            {[
              { icon:<PhoneIcon/>, text:"0796875461", href:"tel:+962796875461" },
              { icon:<WAIcon/>, text:"واتساب مباشر", href:"https://wa.me/962796875461" },
              { icon:<EmailIcon/>, text:"dertna2019@outlook.com", href:"mailto:dertna2019@outlook.com" },
              { icon:<PinIcon/>, text:"عمّان، الأردن", href:undefined },
            ].map((c,i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(201,164,106,0.12)", color:"rgba(201,164,106,0.70)" }}>
                  {c.icon}
                </div>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="transition-colors duration-250"
                    style={{ fontSize:"14px", fontWeight:500, color:dim }}
                    onMouseEnter={e=>(e.currentTarget.style.color=C.cream)}
                    onMouseLeave={e=>(e.currentTarget.style.color=dim)}>
                    {c.text}
                  </a>
                ) : (
                  <span style={{ fontSize:"14px", fontWeight:500, color:dim }}>{c.text}</span>
                )}
              </div>
            ))}
            </div>
          </motion.div>

          {/* RIGHT — Social */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, delay:0.18, ease:E }}
            className="flex flex-col">
            <h4 className="mt-0 mb-6" style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.11em", color:mute, lineHeight: 1 }}>
              تابعنا
            </h4>
            <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <SocialLink href="https://instagram.com/deertna.jo" label="Instagram"><IGIcon/></SocialLink>
              <SocialLink href="https://facebook.com/deertna.jo" label="Facebook"><FBIcon/></SocialLink>
              <SocialLink href="https://wa.me/962796875461" label="WhatsApp"><WAIconSocial/></SocialLink>
            </div>
            {/* WhatsApp CTA */}
            <motion.a href="https://wa.me/962796875461" target="_blank" rel="noopener noreferrer"
              whileHover={{ y:-2, boxShadow:"0 10px 28px rgba(61,122,85,0.38)" }}
              transition={{ duration:0.2 }}
              className="inline-flex items-center gap-2.5 self-start rounded-full font-[700] text-[13px] px-5 py-2.5 cursor-pointer"
              style={{ background:"#3D7A55", color:C.cream, boxShadow:"0 4px 16px rgba(61,122,85,0.25)" }}>
              <WAIconSocial/> اطلب الآن عبر واتساب
            </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Separator ── */}
        <div className="h-px mb-6"
          style={{ background:"linear-gradient(to right, transparent, rgba(246,241,232,0.10), transparent)" }}/>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize:"13px", color:"rgba(246,241,232,0.45)", fontWeight:500 }}>
            © {new Date().getFullYear()} ديرتنا. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-5">
            {["الشروط والأحكام","سياسة الخصوصية"].map(t=>(
              <a key={t} href="#"
                style={{ fontSize:"13px", color:"rgba(246,241,232,0.45)", fontWeight:500 }}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(246,241,232,0.80)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(246,241,232,0.45)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Inline SVG icons ── */
function PhoneIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
}
function WAIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function WAIconSocial() { return <WAIcon/>; }
function EmailIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function PinIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IGIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}
function FBIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
}

