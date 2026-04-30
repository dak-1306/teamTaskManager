import { useEffect, useRef } from "react";

export default function RunningClockCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const size = 220;
    const radius = size / 2;

    canvas.width = size;
    canvas.height = size;

    // particles orbit
    const particles = Array.from({ length: 40 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.003,
      size: Math.random() * 2 + 1,
    }));

    function drawParticles() {
      particles.forEach((p) => {
        p.angle += p.speed;

        const orbitRadius = radius - 2;

        const x = Math.cos(p.angle) * orbitRadius;
        const y = Math.sin(p.angle) * orbitRadius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#60a5fa"; // blue-400
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    function drawClock() {
      ctx.clearRect(0, 0, size, size);

      // nền tối
      const gradient = ctx.createRadialGradient(
        radius,
        radius,
        20,
        radius,
        radius,
        radius,
      );
      gradient.addColorStop(0, "#e5e7eb");
      gradient.addColorStop(1, "#040445");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      ctx.save();
      ctx.translate(radius, radius);

      drawParticles();
      drawFace();
      drawNumbers();
      drawTime();

      ctx.restore();

      requestAnimationFrame(drawClock);
    }

    function drawFace() {
      ctx.beginPath();
      ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
      ctx.fillStyle = "#e5e7eb";
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#9ca3af";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#1f2937";
      ctx.fill();
    }

    function drawNumbers() {
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#374151";

      for (let num = 1; num <= 12; num++) {
        const angle = (num * Math.PI) / 6;
        const x = Math.sin(angle) * (radius - 35);
        const y = -Math.cos(angle) * (radius - 35);

        ctx.fillText(num.toString(), x, y);
      }
    }

    function drawHand(angle, length, width, color) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;

      ctx.moveTo(0, 0);
      ctx.rotate(angle);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-angle);
    }

    function drawTime() {
      const now = new Date();

      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      const secAngle = (sec * Math.PI) / 30;
      const minAngle = (min * Math.PI) / 30;
      const hrAngle = (hr * Math.PI) / 6;

      drawHand(hrAngle, radius * 0.5, 6, "#1f2937");
      drawHand(minAngle, radius * 0.75, 4, "#374151");
      drawHand(secAngle, radius * 0.85, 2, "#ef4444");
    }

    drawClock();
  });

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(96, 165, 250, 0.7)",
        }}
      />
    </div>
  );
}
