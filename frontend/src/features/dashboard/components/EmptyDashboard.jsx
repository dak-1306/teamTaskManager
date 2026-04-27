import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import Header from "../../../components/layout/Header";

export default function EmptyDashboard() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let bubbles = [];
    let animationId;
    let resizeTimeout;

    for (let i = 0; i < 35; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 40 + 15,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -(Math.random() * 0.6 + 0.3),
        opacity: Math.random() * 0.4 + 0.3,
      });
    }

    function drawBubble(b) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(173,216,230,${b.opacity})`;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(255,255,255,${b.opacity + 0.2})`;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(b.x - b.r / 3, b.y - b.r / 3, b.r / 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        drawBubble(b);

        b.x += b.dx + Math.sin(b.y * 0.01) * 0.3;
        b.y += b.dy;

        if (b.y + b.r < 0) {
          b.y = height + b.r;
          b.x = Math.random() * width;
        }

        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 pt-16 w-full h-[calc(100vh-16rem)] mx-auto text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          {/* Canvas bubbles */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full opacity-60"
          />

          {/* Content */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-white/80 dark:bg-gray-800 dark:backdrop-blur-md shadow-xl rounded-2xl p-10 text-center max-w-md"
          >
            <h2 className="text-2xl font-bold mb-3">No projects yet 🚀</h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by creating your first project and manage tasks with your
              team.
            </p>

            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-700 text-white font-semibold shadow-md"
              onClick={() => navigate("/projects")}
            >
              Create Project
            </Motion.button>
          </Motion.div>

          <Motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-10 text-gray-400 dark:text-gray-500 text-sm"
          >
            Your workspace is empty
          </Motion.div>
        </div>
      </main>
    </div>
  );
}
