import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { Hourglass, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
  icon?: LucideIcon;
  variant?: "screen" | "box";
  className?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onAction,
  icon: Icon = Hourglass,
  variant = "screen",
  className,
}: EmptyStateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();

    let particles: any[] = [];
    // Bảng màu cát đa dạng hơn: Vàng sáng, Cam cháy, Nâu đất, Hổ phách
    const colors = ["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#fef3c7"];

    function createParticle() {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * -canvas!.height, // Khởi tạo cả ở trên cao để rơi xuống liên tục
        speed: Math.random() * 2 + 1, // Tốc độ rơi đa dạng
        radius: Math.random() * 1.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        amplitude: Math.random() * 1, // Độ lắc lư ngang
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.7 + 0.3,
      };
    }

    // Khởi tạo lượng hạt lớn ban đầu
    particles = Array.from({ length: 150 }, createParticle);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Cập nhật vị trí
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01 + p.phase) * p.amplitude; // Tạo hiệu ứng gió thổi nhẹ

        // Vẽ hạt cát
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Hiệu ứng Bloom/Glow cho hạt cát
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Reset hạt khi rơi xuống đáy
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
          p.speed = Math.random() * 2 + 1;
        }
      });

      requestAnimationFrame(draw);
    }

    const animId = requestAnimationFrame(draw);
    window.addEventListener("resize", updateSize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex flex-col items-center justify-center text-center",
        variant === "screen"
          ? "w-full h-full min-h-[500px] bg-stone-50 dark:bg-[#0c0a09]"
          : "w-full max-w-[450px] p-10 border border-stone-200 dark:border-stone-800 rounded-[2rem] bg-white/40 dark:bg-stone-950/40 backdrop-blur-md shadow-2xl",
        className,
      )}
    >
      {/* Canvas Layer - Tăng opacity để hạt rõ hơn */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
      />

      {/* Lớp phủ màu nắng phía dưới (Ambient Light) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <Motion.div
          animate={{
            rotate: [0, 180, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-stone-900/40 border border-amber-200/50 dark:border-amber-700/30 text-amber-600 dark:text-amber-500 shadow-xl"
        >
          <Icon size={variant === "screen" ? 56 : 40} strokeWidth={1.5} />
        </Motion.div>

        <h3
          className={cn(
            "font-serif font-bold text-stone-800 dark:text-stone-100 tracking-tight",
            variant === "screen" ? "text-4xl mb-4" : "text-2xl mb-3",
          )}
        >
          {title}
        </h3>

        <p className="max-w-xs sm:max-w-sm text-stone-500 dark:text-stone-400 text-base leading-relaxed mb-10">
          {description}
        </p>

        <Motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onAction}
            className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-amber-600/30 border-t border-white/20 transition-all"
          >
            {buttonText}
          </Button>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-stone-400 dark:text-stone-600"
        >
          <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
          The Sands of Time
          <span className="h-px w-8 bg-stone-200 dark:bg-stone-800" />
        </Motion.div>
      </div>
    </div>
  );
}
