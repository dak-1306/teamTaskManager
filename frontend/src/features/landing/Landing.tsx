import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import HowItWorkSection from "./HowItWorkSection";
import CTASection from "./CTASection";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";

import logoWeb from "../../assets/icons/Logo-web.svg";
import LandingBackground from "./LandingBackground";
function Landing() {
  const { accessToken, isServerDown } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    // Chỉ chuyển hướng nếu server đã dậy và đã login thành công
    if (accessToken && !isServerDown) {
      navigate("/dashboard");
    }
  }, [accessToken, isServerDown, navigate]);

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-x-hidden">
      <LandingBackground />
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative h-16 overflow-hidden border-b border-white/10 backdrop-blur-sm">
          {/* Content */}
          <div className="relative z-10 h-full px-8 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoWeb} alt="Team Task Manager" className="w-10" />
              <p className="text-xl font-bold text-white">Team Task Manager</p>
            </Link>

            <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              <a href="#features">
                <li className="hover:text-primary transition cursor-pointer">
                  Tính năng
                </li>
              </a>
              <a href="#how-it-works">
                <li className="hover:text-primary transition cursor-pointer">
                  Cách sử dụng
                </li>
              </a>
              <a href="#cta">
                <li className="hover:text-primary transition cursor-pointer">
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
        <HeroSection />

        {/* Feature Section */}
        <FeatureSection />

        {/* How it works Section */}
        <HowItWorkSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 text-slate-300">
        {/* Background */}

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
                  <li className="hover:text-primary transition cursor-pointer">
                    Trang chủ
                  </li>
                </a>

                <a href="#features">
                  <li className="hover:text-primary transition cursor-pointer">
                    Tính năng
                  </li>
                </a>

                <a href="#how-it-works">
                  <li className="hover:text-primary transition cursor-pointer">
                    Cách sử dụng
                  </li>
                </a>

                <a href="#cta">
                  <li className="hover:text-primary transition cursor-pointer">
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
              <span className="hover:text-primary transition cursor-pointer">
                Privacy Policy
              </span>

              <span className="hover:text-primary transition cursor-pointer">
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
