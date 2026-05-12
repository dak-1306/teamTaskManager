"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

// --- 1. Canvas xử lý hàng ngàn hạt cát thời gian ---
function TimeSandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Khởi tạo hạt cát (Sand Grains)
    const grains = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speedY: Math.random() * 0.5 + 0.2, // Rơi chậm như đồng hồ cát
      speedX: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * 0.02,
    }));

    // Dòng chảy thời gian (Time Streams)
    const streams = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: Math.random() * 200 + 100,
      speed: Math.random() * 1 + 0.5,
      thickness: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.2 + 0.1,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Vẽ hạt cát tinh thể vàng hổ phách
      grains.forEach((g) => {
        g.opacity += g.pulse;
        if (g.opacity <= 0.2 || g.opacity >= 0.9) g.pulse *= -1;

        g.y += g.speedY;
        g.x += g.speedX;

        if (g.y > height) g.y = -10;
        if (g.x > width) g.x = 0;
        if (g.x < 0) g.x = width;

        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        // Màu vàng hổ phách đặc trưng của cát dưới trăng
        ctx.fillStyle = `rgba(251, 191, 36, ${g.opacity})`;
        ctx.fill();
      });

      // Vẽ dòng chảy thời gian uốn lượn
      streams.forEach((s) => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.len,
          s.y + s.len,
        );
        grad.addColorStop(0, `rgba(56, 189, 248, ${s.opacity})`); // Xanh cyan
        grad.addColorStop(1, "transparent");

        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y + s.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        s.x += s.speed * 0.3;
        s.y += s.speed;

        if (s.y > height) {
          s.y = -s.len;
          s.x = Math.random() * width;
        }
      });

      requestAnimationFrame(draw);
    }

    const animateId = requestAnimationFrame(draw);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animateId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
    />
  );
}

// --- 2. Các cồn cát tả thực (Dune Layers) ---
function RealisticDunes() {
  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="sandNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
          />
        </filter>

        <linearGradient id="duneGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Cồn cát xa */}
      <motion.path
        d="M0,600 C300,500 600,700 1440,550 L1440,1080 L0,1080 Z"
        fill="#0f172a"
        opacity="0.5"
        animate={{
          d: [
            "M0,600 C300,500 600,700 1440,550 L1440,1080 L0,1080 Z",
            "M0,610 C350,520 650,680 1440,560 L1440,1080 L0,1080 Z",
            "M0,600 C300,500 600,700 1440,550 L1440,1080 L0,1080 Z",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cồn cát trung tâm - khối rõ nét */}
      <motion.path
        d="M0,800 C400,650 900,950 1440,750 L1440,1080 L0,1080 Z"
        fill="url(#duneGrad)"
        style={{ filter: "drop-shadow(0px -5px 15px rgba(0,0,0,0.5))" }}
      />

      {/* Lớp texture cát nhám */}
      <rect width="100%" height="100%" filter="url(#sandNoise)" opacity="0.2" />
    </svg>
  );
}

// --- 3. Main Component ---
export default function AuthBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center">
      {/* Lớp nền trời cực đêm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,#020617_60%,#000000_100%)]" />

      {/* Vầng sáng huyền ảo (Moon Glow) */}
      <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-amber-200/5 blur-[120px] z-0" />
      <div className="absolute top-[10%] right-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px] z-0" />

      {/* Các lớp cồn cát */}
      <RealisticDunes />

      {/* Canvas hạt cát thời gian rơi chậm */}
      <TimeSandCanvas />

      {/* Lớp phủ Vignette để làm bật AuthCard ở giữa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.8)_100%)] z-[2] pointer-events-none" />

      {/* Nội dung chính (Login/Register Form) */}
      <main className="relative z-10 w-full max-w-[1440px] px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Hiệu ứng sương mù mặt đất */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-[3] pointer-events-none" />
    </div>
  );
}
