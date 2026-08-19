import { MessageSquare, Phone } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function BookingSection() {
  return (
    <section id="contact" className="py-28 sm:py-36 md:py-48 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A] text-center min-h-[70vh] flex flex-col justify-center items-center border-t border-[rgba(244,240,232,0.12)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn>
          <p className="eyebrow mb-4">07 / BOOK YOUR NEXT CUT</p>
          <h2 className="display-heading text-[12vw] sm:text-[9vw] md:text-[7.5vw] mb-6">
            READY FOR A BETTER CUT?
          </h2>
          <p className="body-editorial max-w-lg mb-12">
            Choose your style, pick your time, and let the barber handle the rest.
          </p>
        </FadeIn>

        {/* Primary Booking CTA with Magnet */}
        <FadeIn delay={0.2} className="mb-10">
          <Magnet strength={14}>
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="lg"
              className="shadow-2xl shadow-[#C7A66A]/20"
            >
              {barberProfile.booking.primaryLabel}
            </Button>
          </Magnet>
        </FadeIn>

        {/* Secondary Direct Channels */}
        <FadeIn delay={0.35} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {barberProfile.booking.secondaryChannels.map((sec) => (
            <a
              key={sec.channel}
              href={sec.url}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141413] border border-[rgba(244,240,232,0.15)] text-xs font-semibold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] hover:border-[#C7A66A] transition-colors"
            >
              {sec.channel === 'phone' ? <Phone className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              {sec.label}
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
