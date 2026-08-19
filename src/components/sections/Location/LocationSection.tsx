import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import FadeIn from '../../ui/FadeIn.tsx';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">06 / FIND THE SHOP</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            COME SIT IN THE CHAIR.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Schedule & Info */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn delay={0.1} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Address
                </span>
                <p className="text-lg sm:text-xl font-medium text-[#F4F0E8]">
                  {barberProfile.address}, {barberProfile.city}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Opening Hours
                </span>
                <div className="space-y-1">
                  {barberProfile.openingHours.map((hour, idx) => (
                    <p key={idx} className="text-base sm:text-lg text-[#F4F0E8]">
                      <span className="font-semibold text-[#C7A66A]">{hour.label}:</span> {hour.value}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Direct Line
                </span>
                <a
                  href={`tel:${barberProfile.phone}`}
                  className="text-lg sm:text-xl font-medium text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
                >
                  {barberProfile.phone}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: High-Contrast Dark Map Preview Card */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.2} className="rounded-3xl p-8 sm:p-12 bg-[#141413] border border-[rgba(244,240,232,0.15)] flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] block mb-2">
                  STUDIO LOCATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F4F0E8] mb-4">
                  {barberProfile.shopName}
                </h3>
                <p className="text-sm font-light text-[#A7A39B] mb-8">
                  Located in the heart of {barberProfile.city}. Private studio appointments for individual focus.
                </p>
              </div>

              {barberProfile.socials?.googleMaps && (
                <a
                  href={barberProfile.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0B0B0A] bg-[#C7A66A] hover:bg-[#D8B87A] px-8 py-3.5 rounded-full self-start transition-colors"
                >
                  Get Directions <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
