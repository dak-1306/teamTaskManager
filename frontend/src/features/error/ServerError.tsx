import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, RefreshCw, Server, Zap } from "lucide-react";

const ServerWakingUp = () => {
  const [progress, setProgress] = useState(0);
  const [isServerUp, setIsServerUp] = useState(false);

  // URL API của bạn trên Render (ví dụ: https://your-backend.onrender.com/ping)
  const API_URL = "YOUR_BACKEND_URL_HERE/ping";

  useEffect(() => {
    // 1. Chạy thanh progress giả lập
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 98 : prev + 1));
    }, 400);

    // 2. Cơ chế Polling: Cứ mỗi 3 giây kiểm tra server 1 lần
    const checkServer = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          setIsServerUp(true);
          setProgress(100);
          // Đợi 1 giây để người dùng thấy progress 100% rồi chuyển hướng
          setTimeout(() => {
            window.location.href = "/landing"; // Hoặc dùng useNavigate() nếu có React Router
          }, 1000);
        }
      } catch (error) {
        console.log("Server is still sleeping...");
      }
    };

    const pollInterval = setInterval(checkServer, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-slate-200">
      <div className="max-w-md w-full text-center">
        {/* Minh họa Animation */}
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 backdrop-blur-sm">
              <Server size={64} className="text-blue-400" />
            </div>
          </motion.div>

          {/* Các hạt năng lượng bay xung quanh */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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

        {/* Nội dung văn bản */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
          khoảng <b>30 giây</b> để chúng tôi khởi động lại mọi thứ.
        </motion.p>

        {/* Thanh Progress */}
        <div className="bg-slate-800/50 h-2 w-full rounded-full overflow-hidden mb-8 border border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        {/* Hiển thị trạng thái khác nhau trên Button */}
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

      {/* Decorative background blobs */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 -right-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default ServerWakingUp;
