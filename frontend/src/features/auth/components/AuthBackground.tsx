import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

function TimeSandCanvas() {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Hạt cát tinh thể (thay cho sao)
    const grains = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random(),
      speedY: Math.random() * 0.4 + 0.1, // Rơi chậm
      speedX: (Math.random() - 0.5) * 0.2,
      pulse: Math.random() * 0.02,
    }));

    // Dòng chảy thời gian (thay cho thiên thạch)
    const streams = Array.from({ length: 5 }).map(() => createStream());

    function createStream() {
      return {
        x: Math.random() * width,
        y: -100,
        len: Math.random() * 150 + 50,
        speed: Math.random() * 2 + 1,
        thickness: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      };
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Vẽ hạt cát tinh thể
      grains.forEach((g) => {
        g.opacity += g.pulse;
        if (g.opacity <= 0.2 || g.opacity >= 0.8) g.pulse *= -1;

        g.y += g.speedY;
        g.x += g.speedX;

        // Reset khi rơi hết màn hình
        if (g.y > height) g.y = -5;
        if (g.x > width) g.x = 0;
        if (g.x < 0) g.x = width;

        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        // Màu xanh nhạt/trắng tinh thể
        ctx.fillStyle = `rgba(186, 230, 253, ${g.opacity})`;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        ctx.fill();
      });

      // 2. Vẽ dòng chảy thời gian (di chuyển chéo chậm)
      streams.forEach((s) => {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.len,
          s.y + s.len,
        );
        gradient.addColorStop(0, `rgba(56, 189, 248, ${s.opacity})`);
        gradient.addColorStop(1, "transparent");

        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len / 2, s.y + s.len / 2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        s.x += s.speed * 0.5;
        s.y += s.speed;

        if (s.y > height || s.x > width) {
          Object.assign(s, createStream());
          s.x = Math.random() * width;
          s.y = -s.len;
        }
      });

      requestAnimationFrame(draw);
    }

    const animateId = requestAnimationFrame(draw);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animateId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-80" />;
}

export default function AuthBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center">
      {/* Background Gradient Layer cho đúng chất Xanh Đen / Slate */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#0f172a_0%,_#020617_100%)]" />

      {/* Hiệu ứng cát chảy tinh thể */}
      <TimeSandCanvas />

      {/* Lớp mờ vignette để tập trung vào Form ở giữa */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.6)_100%)] pointer-events-none" />

      <div className="relative z-10 w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
