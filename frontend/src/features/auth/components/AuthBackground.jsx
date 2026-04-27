import { useEffect, useRef } from "react";
import {Outlet} from "react-router-dom";

function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
    }));

    const meteors = Array.from({ length: 3 }).map(() => createMeteor());

    function createMeteor() {
      return {
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        len: Math.random() * 80 + 10,
        speed: Math.random() * 8 + 6,
        size: Math.random() * 1.5 + 0.5,
        life: 0,
      };
    }

    function drawStars() {
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });
    }

    function drawMeteors() {
      meteors.forEach((m) => {
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len, m.y + m.len);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = m.size;
        ctx.stroke();

        m.x += m.speed;
        m.y -= m.speed;
        m.life++;

        if (m.x > width || m.y < 0 || m.life > 120) {
          if (Math.random() < 0.01) {
            Object.assign(m, createMeteor());
          }
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      drawStars();
      drawMeteors();

      requestAnimationFrame(animate);
    }

    animate();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

export default function AuthBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
      <StarCanvas />
      <div className="relative z-10 w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
