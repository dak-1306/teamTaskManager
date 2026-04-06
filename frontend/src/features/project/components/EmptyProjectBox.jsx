import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { FolderPlus } from "lucide-react";

export default function EmptyProjectBox({ onCreate }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let particles = [];

    const colors = [
      "#6366F1", // indigo
      "#EC4899", // pink
      "#22C55E", // green
      "#3B82F6", // blue
      "#F59E0B", // yellow
      "#EF4444", // red
    ];

    function createFirework(x, y, direction = "up") {
      for (let i = 0; i < 40; i++) {
        const angle =
          direction === "up"
            ? Math.random() * Math.PI - Math.PI // bay lên
            : Math.random() * Math.PI; // bay xuống

        particles.push({
          x,
          y,
          angle,
          speed: Math.random() * 2 + 1.5,
          radius: Math.random() * 3 + 1,
          life: 80,
          color: colors[Math.floor(Math.random() * colors.length)],
          gravity: direction === "up" ? 0.02 : -0.02,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + p.gravity * (80 - p.life);

        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(draw);
    }

    let isBottom = true;

    let interval = setInterval(() => {
      if (isBottom) {
        // 🔼 dưới bắn lên
        createFirework(width * 0.2, height, "up");
        createFirework(width * 0.8, height, "up");
      } else {
        // 🔽 trên bắn xuống
        createFirework(width * 0.3, 0, "down");
        createFirework(width * 0.7, 0, "down");
      }

      isBottom = !isBottom; // đổi lượt
    }, 1200); // nhịp nhanh → không bị trống

    draw();

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-8 w-[420px] shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        {/* Firework canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Animation icon */}
          <div className="flex justify-center mb-4">
            <Motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900"
            >
              <FolderPlus className="w-10 h-10 text-indigo-600" />
            </Motion.div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">No projects found</p>
            <p className="text-gray-500 text-sm">
              Create your first project to start managing tasks and teams.
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-5">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreate}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow"
            >
              Create Project
            </Motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
