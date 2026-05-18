import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Coffee, RefreshCw, Server, Zap } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/authStore";

import { authKeys } from "@/features/auth/queries/authKey";

const API_URL = `${import.meta.env.VITE_API_URL?.replace(/\/$/, "")}/ping`;

export default function ServerWakingUp() {
  const navigate = useNavigate();

  const location = useLocation();

  const queryClient = useQueryClient();

  const setIsServerDown = useAuthStore((state) => state.setIsServerDown);

  const [progress, setProgress] = useState(0);

  const [isServerUp, setIsServerUp] = useState(false);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          return 98;
        }

        return prev + 1;
      });
    }, 400);

    const checkServer = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          return;
        }

        setIsServerUp(true);

        setProgress(100);

        setIsServerDown(false);

        // refetch current user sau khi server sống lại
        await queryClient.invalidateQueries({
          queryKey: authKeys.me(),
        });

        setTimeout(() => {
          const from = location.state?.from?.pathname || "/";

          navigate(from, {
            replace: true,
          });
        }, 1000);
      } catch {
        console.log("Server is still sleeping...");
      }
    };

    checkServer();

    const pollingInterval = setInterval(checkServer, 3000);

    return () => {
      clearInterval(progressTimer);

      clearInterval(pollingInterval);
    };
  }, [navigate, location, queryClient, setIsServerDown]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-slate-200">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 backdrop-blur-sm">
              <Server size={64} className="text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Zap
              size={20}
              className="text-yellow-400 absolute -top-4 opacity-50"
            />

            <Coffee
              size={20}
              className="text-emerald-400 absolute -bottom-4 opacity-50"
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
        >
          Hệ thống đang thức giấc...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mb-8 leading-relaxed"
        >
          Server trên Render đang tạm nghỉ để tiết kiệm năng lượng. Vui lòng đợi
          khoảng <b>30 giây</b> để hệ thống khởi động lại.
        </motion.p>

        <div className="bg-slate-800/50 h-2 w-full rounded-full overflow-hidden mb-8 border border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
            }}
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            disabled={!isServerUp}
            className={`group flex items-center justify-center gap-2 py-3 px-6 rounded-xl transition-all ${
              isServerUp
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isServerUp ? (
              <>🚀 Đang chuyển hướng...</>
            ) : (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Đang kết nối server...
              </>
            )}
          </button>
        </div>
      </div>

      <div className="fixed top-0 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="fixed bottom-0 -right-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
