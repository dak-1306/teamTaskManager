import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import RunningClockCanvas from "./RunningClockCanvas";

import { motion as Motion } from "framer-motion";
import { inViewOptions, item } from "../../app/motionConfig";

import { useEffect } from "react";
import { useAuth } from "../auth/context/AuthContext";
import {
  Zap,
  Users,
  ShieldCheck,
  BarChart,
  UserPlus,
  FolderPlus,
  CheckSquare,
  Trophy,
  ArrowRight,
} from "lucide-react";
import logoWeb from "../../assets/icons/Logo-web.svg";
function Landing() {
  const url_background =
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative h-16 overflow-hidden border-b border-white/10">
          {/* Background image */}
          <div
            className={`absolute inset-0 bg-cover bg-center bg-[url('${url_background}')]`}
          />

          {/* Overlay + blur */}
          <div className="absolute inset-0 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10 h-full px-8 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoWeb} alt="Team Task Manager" className="w-10" />
              <p className="text-xl font-bold text-white">Team Task Manager</p>
            </Link>

            <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              <a href="#features">
                <li className="hover:text-white transition cursor-pointer">
                  Tính năng
                </li>
              </a>
              <a href="#how-it-works">
                <li className="hover:text-white transition cursor-pointer">
                  Cách sử dụng
                </li>
              </a>
              <a href="#cta">
                <li className="hover:text-white transition cursor-pointer">
                  Bắt đầu ngay
                </li>
              </a>
            </ul>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 flex flex-col w-full space-y-20">
        {/* Hero Section */}
        <section
          className={`relative flex w-full items-center h-[calc(100vh-3rem)] overflow-hidden bg-[url('${url_background}')] bg-cover bg-center`}
        >
          {/* Lớp Overlay để làm nổi bật text phía trên hình nền */}
          <div className="absolute inset-0 backdrop-blur-sm z-0"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-2 md:py-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cột trái: Thông tin */}
            <div className="space-y-8 text-left">
              <Motion.h1
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={inViewOptions}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400 p-2"
              >
                Quản lý công việc hiệu quả cùng Team Task Manager
              </Motion.h1>
              <Motion.p
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={inViewOptions}
                className="text-xl md:text-2xl text-muted-foreground"
              >
                Tối ưu hóa quy trình làm việc, kết nối các thành viên và nâng
                cao hiệu suất dự án của bạn một cách dễ dàng.
              </Motion.p>

              <Motion.div
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
                  className="w-full sm:w-auto text-lg px-8 h-14 rounded-full bg-background/50"
                >
                  Tìm hiểu thêm
                </Button>
              </Motion.div>
            </div>

            {/* Cột phải: RunningClockCanvas */}
            <div className="hidden lg:flex justify-center items-center h-[400px]">
              <RunningClockCanvas />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            <Motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Lý do chọn Team Task Manager
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Những công cụ mạnh mẽ giúp đội ngũ của bạn làm việc năng suất
                hơn bao giờ hết.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataFeatures.map((feature, index) => (
                <Motion.div
                  key={index}
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-card">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            <Motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Cách sử dụng vô cùng đơn giản
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chỉ với vài bước, bạn đã có thể thiết lập không gian làm việc
                chuyên nghiệp.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-muted-foreground/20 -translate-y-1/2 z-0"></div>

              {dataHowsItWorks.map((step, index) => (
                <Motion.div
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
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}

        <section
          id="cta"
          className="bg-primary text-primary-foreground px-4 py-20 text-center"
        >
          <Motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Sẵn sàng nâng cao năng suất nhóm?
            </h2>
            <p className="text-xl opacity-90">
              Tham gia cùng hàng ngàn đội ngũ đã chuyển đổi sang Team Task
              Manager.
            </p>
            <Link to="/login" className="inline-block mt-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 h-14 rounded-full text-foreground hover:bg-secondary/90"
              >
                Bắt đầu hoàn toàn miễn phí
              </Button>
            </Link>
          </Motion.div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-300">
        {/* Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-[url('${url_background}')]`}
        />

        {/* Overlay */}
        <div className="absolute inset-0  backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Team Task Manager
              </h2>

              <p className="text-slate-400 leading-relaxed">
                Nền tảng quản lý công việc hiện đại giúp đội nhóm theo dõi tiến
                độ, cộng tác hiệu quả và tối ưu năng suất làm việc.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Điều hướng
              </h3>

              <ul className="space-y-3 text-slate-400">
                <a href="">
                  <li className="hover:text-white transition cursor-pointer">
                    Trang chủ
                  </li>
                </a>

                <a href="#features">
                  <li className="hover:text-white transition cursor-pointer">
                    Tính năng
                  </li>
                </a>

                <a href="#how-it-works">
                  <li className="hover:text-white transition cursor-pointer">
                    Cách sử dụng
                  </li>
                </a>

                <a href="#cta">
                  <li className="hover:text-white transition cursor-pointer">
                    Bắt đầu ngay
                  </li>
                </a>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Thông tin
              </h3>

              <ul className="space-y-3 text-slate-400">
                <li>Email: thd13062005@gmail.com</li>
                <li>Hotline: +84 839 479 440</li>
                <li>Hoạt động 24/7</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 Team Task Manager. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <span className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </span>

              <span className="hover:text-white transition cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Landing;
