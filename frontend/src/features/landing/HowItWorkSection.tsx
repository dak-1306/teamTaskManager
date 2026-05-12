import { CheckSquare, FolderPlus, Trophy, UserPlus } from "lucide-react";
import { inViewOptions, item } from "@/app/motionConfig";
import { motion } from "framer-motion";
export default function HowItWorkSection() {
  const dataHowsItWorks = [
    {
      icon: UserPlus,
      title: "1. Tạo tài khoản",
      desc: "Đăng ký nhanh chóng với email của bạn.",
    },
    {
      icon: FolderPlus,
      title: "2. Tạo dự án",
      desc: "Thiết lập không gian làm việc cho nhóm.",
    },
    {
      icon: CheckSquare,
      title: "3. Phân công",
      desc: "Giao việc và đặt thời hạn cho thành viên.",
    },
    {
      icon: Trophy,
      title: "4. Hoàn thành",
      desc: "Theo dõi và ăn mừng khi hoàn thành mục tiêu.",
    },
  ];
  return (
    <section id="how-it-works" className="px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Cách sử dụng vô cùng đơn giản
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Chỉ với vài bước, bạn đã có thể thiết lập không gian làm việc chuyên
            nghiệp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-secondary/20 -translate-y-1/2 z-0"></div>

          {dataHowsItWorks.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-card border-4 border-primary/20 flex items-center justify-center shadow-lg">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {step.title}
                </h3>
                <p className="text-secondary">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
