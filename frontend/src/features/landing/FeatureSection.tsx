import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { inViewOptions, item } from "@/app/motionConfig";
import { BarChart, ShieldCheck, Users, Zap } from "lucide-react";
const dataFeatures = [
  {
    icon: Zap,
    title: "Tối ưu hiệu suất",
    desc: "Theo dõi và quản lý tiến độ dự án một cách nhanh chóng và dễ dàng.",
  },
  {
    icon: Users,
    title: "Cộng tác mượt mà",
    desc: "Kết nối nhóm làm việc mọi lúc mọi nơi, trao đổi thông tin liên tục.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo mật dữ liệu",
    desc: "Đảm bảo an toàn tuyệt đối cho các thông tin và tài liệu dự án của bạn.",
  },
  {
    icon: BarChart,
    title: "Báo cáo trực quan",
    desc: "Thống kê hiệu quả công việc chi tiết thông qua các biểu đồ sinh động.",
  },
];
export default function FeatureSection() {
  return (
    <section id="features" className="px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Lý do chọn Team Task Manager
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Những công cụ mạnh mẽ giúp đội ngũ của bạn làm việc năng suất hơn
            bao giờ hết.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-lg hover:scale-105 hover:transition-transform duration-300 bg-transparent backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-secondary">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
