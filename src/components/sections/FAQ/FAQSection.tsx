'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { faqData } from '../../../data/faq';
import { barberProfile } from '../../../data/barber';
import FadeIn from '../../ui/FadeIn';
import Button from '../../ui/Button';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#0E0E0D] border-t border-[rgba(244,240,232,0.06)] relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#C7A66A]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A18] border border-[rgba(244,240,232,0.12)] text-[11px] font-mono font-bold uppercase tracking-widest text-[#C7A66A] mb-3.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>06 // CÂU HỎI THƯỜNG GẶP</span>
          </div>
          <h2 id="faq-heading" className="display-heading text-[#F4F0E8] mb-3.5 sm:mb-4">
            GIẢI ĐÁP & THẮC MẮC PHỔ BIẾN
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Tổng hợp những thông tin chi tiết về bảng giá, tư vấn kiểu tóc, địa chỉ và quy trình phục vụ tại Sown Barbershop.
          </p>
        </FadeIn>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <FadeIn key={item.id} delay={index * 0.06}>
                <div
                  className={`rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#141413] border-[#C7A66A]/50 shadow-xl shadow-[#C7A66A]/5'
                      : 'bg-[#121211]/80 border-[rgba(244,240,232,0.08)] hover:border-[rgba(244,240,232,0.2)]'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                    className="w-full p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <span
                        className={`text-xs font-mono font-bold shrink-0 transition-colors ${
                          isOpen ? 'text-[#C7A66A]' : 'text-[#A7A39B]/60'
                        }`}
                      >
                        Q{String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className={`text-base sm:text-lg md:text-xl font-bold tracking-tight transition-colors ${
                          isOpen ? 'text-[#F4F0E8]' : 'text-[#D6D1C8]'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#C7A66A] text-[#0B0B0A] border-[#C7A66A] rotate-180'
                          : 'bg-[#1A1A18] text-[#A7A39B] border-[rgba(244,240,232,0.12)]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-[rgba(244,240,232,0.06)] text-sm sm:text-base text-[#A7A39B] leading-relaxed font-light">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <FadeIn delay={0.4} className="mt-10 sm:mt-12 text-center">
          <div className="p-6 sm:p-8 rounded-[24px] bg-[#141413] border border-[rgba(244,240,232,0.1)] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#C7A66A]/15 border border-[#C7A66A]/30 text-[#C7A66A] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#F4F0E8]">
                  Bạn vẫn còn thắc mắc về kiểu tóc hoặc dịch vụ?
                </h4>
                <p className="text-xs sm:text-sm text-[#A7A39B]">
                  Nhắn tin trực tiếp qua Zalo để Master Barber tư vấn cụ thể cho bạn.
                </p>
              </div>
            </div>

            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="sm"
              className="shrink-0 font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Tư Vấn Miễn Phí Qua Zalo
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
