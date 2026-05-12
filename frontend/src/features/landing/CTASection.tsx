import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { inViewOptions, item } from "@/app/motionConfig";
export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-primary text-primary-foreground px-4 py-20 text-center relative"
    >
      <motion.div
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
          Tham gia cùng hàng ngàn đội ngũ đã chuyển đổi sang Team Task Manager.
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
      </motion.div>
    </section>
  );
}
