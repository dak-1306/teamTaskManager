"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FinalRealisticDesert() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* 1. GIỮ NGUYÊN BẦU TRỜI ĐẸP */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,#0f172a_45%,#020617_100%)]" />
      <Stars />

      {/* Nguồn sáng trăng tạo khối */}
      <div className="absolute right-[10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[150px]" />

      {/* 2. CÁC CỒN CÁT TẢ THỰC */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Texture hạt cát mịn */}
          <filter id="sandGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
            />
          </filter>

          {/* Gradient cho cồn cát lớp 1 (Xa) */}
          <linearGradient id="gradDune1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Gradient tạo khối cho cồn cát lớp 2 (Giữa) */}
          <linearGradient id="gradDune2" x1="40%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#2d3a4f" /> {/* Mặt đón sáng */}
            <stop offset="50%" stopColor="#0f172a" /> {/* Đỉnh cồn */}
            <stop offset="100%" stopColor="#020617" /> {/* Mặt khuất */}
          </linearGradient>

          {/* Gradient đặc tả lớp trước (Gần nhất) */}
          <linearGradient id="gradDune3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="30%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Cồn cát lớp xa - Mờ ảo, uốn lượn nhẹ */}
        <motion.path
          d="M0,550 C400,450 600,650 1000,500 C1200,420 1440,550 1440,550 L1440,1080 L0,1080 Z"
          fill="url(#gradDune1)"
          opacity="0.6"
          animate={{
            d: [
              "M0,550 C400,450 600,650 1000,500 C1200,420 1440,550 1440,550 L1440,1080 L0,1080 Z",
              "M0,560 C420,460 620,640 1020,510 C1220,430 1440,560 1440,560 L1440,1080 L0,1080 Z",
              "M0,550 C400,450 600,650 1000,500 C1200,420 1440,550 1440,550 L1440,1080 L0,1080 Z",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cồn cát lớp giữa - Hiện rõ sống lưng cồn cát */}
        <motion.path
          d="M0,750 C300,600 800,900 1100,650 C1300,500 1440,700 1440,700 L1440,1080 L0,1080 Z"
          fill="url(#gradDune2)"
          style={{ filter: "drop-shadow(0px -5px 15px rgba(0,0,0,0.5))" }}
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cồn cát lớp gần - Tả thực cấu trúc và bề mặt */}
        <motion.path
          d="M0,900 C350,750 700,1100 1200,850 C1400,750 1440,900 1440,900 L1440,1080 L0,1080 Z"
          fill="url(#gradDune3)"
          style={{ filter: "drop-shadow(0px -10px 30px rgba(0,0,0,0.8))" }}
          animate={{
            d: [
              "M0,900 C350,750 700,1100 1200,850 C1400,750 1440,900 1440,900 L1440,1080 L0,1080 Z",
              "M0,910 C380,770 720,1080 1220,870 C1420,770 1440,910 1440,910 L1440,1080 L0,1080 Z",
              "M0,900 C350,750 700,1100 1200,850 C1400,750 1440,900 1440,900 L1440,1080 L0,1080 Z",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lớp phủ nhiễu hạt cát cho toàn bộ cồn cát */}
        <rect
          width="100%"
          height="100%"
          filter="url(#sandGrain)"
          opacity="0.4"
          pointerEvents="none"
        />
      </svg>

      {/* 3. HIỆU ỨNG THỜI GIAN & KHÔNG KHÍ */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
      <DustWind />

      {/* Vignette tập trung ánh nhìn */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
    </div>
  );
}

// Gió thổi cát - Thể hiện sự trôi chảy của thời gian
function DustWind() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        w: 1 + Math.random() * 2,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-blue-200/10 blur-[1px]"
          style={{
            width: p.w,
            height: p.w,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, 200],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// Những vì sao lấp lánh (Giữ nguyên từ bản bầu trời đẹp)
function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        size: Math.random() * 1.2,
        duration: 2 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
