"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const E = [0.16, 1, 0.3, 1] as const;

export default function Breakfast() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FEFAF4] z-10">
      <div className="flex flex-col lg:flex-row min-h-[85vh]">

        {/* Right — image */}
        <motion.div style={{ y: imgY }}
          className="relative w-full lg:w-[55%] min-h-[55vh] lg:min-h-full order-1 lg:order-2 overflow-hidden">
          <Image src="/bg-breakfast.png" alt="فطور عربي أصيل" fill className="object-cover saturate-[1.05] contrast-[1.02]" sizes="(max-width:1024px) 100vw, 55vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FEFAF4] via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FEFAF4]/60 via-transparent to-transparent" />
          {/* Floating caption */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.9, delay:0.6, ease:E }}
            className="absolute bottom-7 left-7 max-w-[200px] bg-white/80 backdrop-blur-sm border border-[#EBDCC2]/80 rounded-2xl px-5 py-4">
            <p className="text-[#0D2B45] text-[13px] font-[600] leading-[1.6]">فطور عائلي أصيل</p>
            <p className="text-gray-500 text-[11px] font-[400] mt-0.5">كل يوم على مائدتكم</p>
          </motion.div>
        </motion.div>

        {/* Left — text */}
        <motion.div initial={{ opacity:0, filter:"blur(8px)" }} whileInView={{ opacity:1, filter:"blur(0px)" }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:1.4, ease:E }}
          className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-20 lg:py-0 order-2 lg:order-1 bg-[#FEFAF4]">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-[2px] bg-[#2E7D32] rounded-full" />
              <span className="text-[#2E7D32] text-[11px] font-[700] tracking-[0.08em]">من مائدتنا · إلى مائدتكم</span>
            </div>
            <h2 className="font-[800] text-[#0D2B45] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontSize:"clamp(2rem, 3.8vw, 3.4rem)" }}>
              فطور حقيقي<br />
              <span className="font-[500] text-[#2E7D32]">لعائلة حقيقية</span>
            </h2>
            <p className="text-[#0D2B45]/70 font-[400] leading-[1.65] mb-6 text-[1rem]">
              لبنة بالزيت، جبنة عكاوي، خبز طازج —
              وعلى الطاولة يجتمع الكل.
              هذا ما نصنعه كل يوم لأجلكم.
            </p>
            <p className="text-[#0D2B45]/55 font-[600] text-[13px] italic mb-10">
              &ldquo;طعمٌ يذكّرك بطفولتك — لأن الطريقة لم تتغير.&rdquo;
            </p>
            <a href="#products"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0D2B45] text-white px-7 py-3 font-[700] text-[14px] hover:bg-[#2E7D32] transition-all duration-400 hover:-translate-y-0.5 shadow-md">
              اطّلع على منتجاتنا <span className="text-[16px] leading-none">←</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
