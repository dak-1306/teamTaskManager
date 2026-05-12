import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RunningClockCanvas from "./RunningClockCanvas";
import { inViewOptions, item } from "@/app/motionConfig";
export default function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className={`relative flex w-full items-center h-[calc(100vh-3rem)] overflow-hidden`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-2 md:py-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Cột trái: Thông tin */}
        <div className="space-y-8 text-left">
          <motion.h1
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400 p-2"
          >
            Quản lý công việc hiệu quả cùng Team Task Manager
          </motion.h1>
          <motion.p
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="text-xl md:text-2xl text-secondary max-w-2xl"
          >
            Tối ưu hóa quy trình làm việc, kết nối các thành viên và nâng cao
            hiệu suất dự án của bạn một cách dễ dàng.
          </motion.p>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="flex flex-col sm:flex-row items-start gap-4 pt-4"
          >
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 h-14 rounded-full gap-2"
              >
                Bắt đầu ngay <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToFeatures}
              className="w-full sm:w-auto text-lg px-8 h-14 rounded-full"
            >
              Tìm hiểu thêm
            </Button>
          </motion.div>
        </div>

        {/* Cột phải: RunningClockCanvas */}
        <div className="hidden lg:flex justify-center items-center h-[400px]">
          <RunningClockCanvas />
        </div>
      </div>
    </section>
  );
}
