import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';

interface AtelierPreviewProps {
  activeImage: string | null;
  activeTitle: string | null;
}

export default function AtelierPreview({ activeImage, activeTitle }: AtelierPreviewProps) {
  const isReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 w-64 h-80 z-20"
    >
      <AnimatePresence mode="wait">
        {activeImage && (
          <motion.div
            key={activeImage}
            initial={isReduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-2xl overflow-hidden border border-[#C7A66A]/30 bg-[#141413] shadow-2xl shadow-black/80 flex flex-col justify-between p-3 relative"
          >
            <div className="w-full h-56 rounded-xl overflow-hidden bg-[#0B0B0A]">
              <img
                src={activeImage}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C7A66A]">
                QUY CHUẨN DỊCH VỤ
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#A7A39B] truncate max-w-[120px]">
                {activeTitle}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
