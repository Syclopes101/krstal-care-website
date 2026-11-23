import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Star,
  ShieldCheck,
  CreditCard,
  Truck,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

interface HeroProps {
  onJumpToQuote: () => void;
  onQuickOpenService: (serviceId: string) => void;
}

const QUICK_SERVICES = [
  { id: 'carpet-rug', label: 'Carpets & Persian Rugs', dot: 'bg-sky-500' },
  { id: 'couch-chair', label: 'Couches & Chairs', dot: 'bg-teal-500' },
  { id: 'mattress-headboard', label: 'Mattresses', dot: 'bg-emerald-500' },
  { id: 'dry-cleaning-formal', label: 'Indian Outfits & Suits', dot: 'bg-rose-500' },
  { id: 'clothing-dyeing', label: 'Clothing Dyeing', dot: 'bg-indigo-500' },
  { id: 'sneaker-cleaning', label: 'Sneaker Care', dot: 'bg-amber-500' },
];

export function Hero({ onJumpToQuote, onQuickOpenService }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF] pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div
        className="pointer-events-none absolute -top-28 right-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-teal-400/20 to-sky-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-cyan-400/15 to-indigo-400/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-teal-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-teal-900 shadow-xs">
              <span className="inline-flex items-center gap-1 text-amber-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#0A2240]">{BUSINESS_INFO.rating} / 5</span>
              </span>
              <span className="text-slate-300">|</span>
              <span>{BUSINESS_INFO.reviewCount} Verified Google Reviews</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="hidden sm:inline font-bold text-teal-700">Lenasia &amp; Gauteng</span>
            </div>

            <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight text-[#0A2240] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Spotless Upholstery, Deep-Cleaned Homes &amp;{' '}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Crisp Garment Care.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Based at 14 Dharwar St in Lenasia Ext 11,{' '}
              <strong className="font-semibold text-[#0A2240]">{BUSINESS_INFO.legalName}</strong>{' '}
              brings mobile extraction to your carpets, couches, mattresses, curtains, tiles, and
              offices across Johannesburg — plus laundry, dry cleaning, Indian outfits, clothing
              dyeing &amp; sneaker restoration.
            </p>

            {/* Quick interactive service explorer pills */}
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Explore popular services &amp; details:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUICK_SERVICES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onQuickOpenService(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-teal-500 hover:bg-teal-50 hover:text-teal-900 transition-all cursor-pointer"
                  >
                    <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onJumpToQuote}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A2240] to-teal-800 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/15 hover:from-teal-800 hover:to-cyan-700 transition-all cursor-pointer"
              >
                Build Instant Quote
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={`${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                  'Hi Krystal Care Cleaners, I would like to enquire about a cleaning or laundry quote.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-6 py-3.5 text-base font-semibold text-emerald-800 shadow-sm hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600" />
                WhatsApp {BUSINESS_INFO.phoneLocal}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border-2 border-white bg-white p-1.5 shadow-2xl shadow-teal-950/10 ring-1 ring-slate-200/80">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero-upholstery.jpg`}
                  alt="Krystal Care Cleaners specialist deep-cleaning a modern cream sofa with hot-water extraction"
                  className="aspect-[16/10] w-full rounded-2xl object-cover sm:aspect-[16/11]"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-0 sm:grid-cols-2 sm:gap-4 lg:absolute lg:-bottom-7 lg:left-6 lg:right-6">
                <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xs">
                    <Star className="h-5 w-5 fill-white text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A2240]">4.9 / 5 Google Rating</p>
                    <p className="text-xs text-slate-600">Fast turnaround &amp; fair pricing</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-teal-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xs">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A2240]">Lenasia to Sandton</p>
                    <p className="text-xs text-slate-600">Mobile teams across Gauteng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-teal-100 bg-white/95 p-5 shadow-md shadow-slate-900/5 sm:mt-20 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Mobile Onsite Service</p>
              <p className="text-xs text-slate-500">We come to your home or office</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Fabric-Safe Care</p>
              <p className="text-xs text-slate-500">Persian rugs, leather &amp; silk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Card Payments Welcome</p>
              <p className="text-xs text-slate-500">Easy card, EFT &amp; cash options</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Open 7 Days a Week</p>
              <p className="text-xs text-slate-500">Mon–Fri 8–6, Sat–Sun 8–2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
