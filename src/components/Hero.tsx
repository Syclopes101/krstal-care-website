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
  { id: 'carpet-rug', label: 'Carpets & Persian Rugs · From R400', dot: 'bg-sky-500' },
  { id: 'couch-chair', label: 'Couches & Chairs · From R80', dot: 'bg-teal-500' },
  { id: 'mattress-headboard', label: 'Mattresses', dot: 'bg-emerald-500' },
  { id: 'dry-cleaning-formal', label: 'Suits & Indian Outfits · From R80', dot: 'bg-rose-500' },
  { id: 'clothing-dyeing', label: 'Clothing Dyeing · From R140', dot: 'bg-indigo-500' },
  { id: 'laundry-linen', label: 'Laundry · From R45', dot: 'bg-amber-500' },
];

export function Hero({ onJumpToQuote, onQuickOpenService }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF] pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div
        className="pointer-events-none absolute -top-28 right-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-[#0095DA]/20 to-[#2E9E36]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#FDB913]/15 to-[#00388B]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-teal-200 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-teal-900 shadow-xs">
              <span className="inline-flex items-center gap-1 text-amber-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#00388B]">{BUSINESS_INFO.rating} / 5</span>
              </span>
              <span className="text-slate-300">|</span>
              <span>{BUSINESS_INFO.reviewCount} Verified Google Reviews</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="hidden sm:inline font-bold text-[#2E9E36]">
                {BUSINESS_INFO.brandMotto}
              </span>
            </div>

            <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight text-[#002B6B] sm:text-5xl lg:text-[3.2rem] lg:leading-[1.08]">
              A Cleaner Space, A Better Feeling —{' '}
              <span className="bg-gradient-to-r from-[#00388B] via-[#0095DA] to-[#2E9E36] bg-clip-text text-transparent">
                Bring Colour Back to Life.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Based at 14 Dharwar St in Lenasia Ext 11,{' '}
              <strong className="font-semibold text-[#002B6B]">{BUSINESS_INFO.legalName}</strong>{' '}
              delivers onsite mobile extraction for carpets, Persian rugs, couches, chairs,
              mattresses, curtains &amp; offices across Johannesburg — plus laundry, dry cleaning,
              Indian outfits, garment dyeing &amp; sneaker care.
            </p>

            {/* Quick interactive service explorer pills */}
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Explore services &amp; official ZAR prices:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUICK_SERVICES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onQuickOpenService(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#0095DA] hover:bg-sky-50 hover:text-[#002B6B] transition-all cursor-pointer"
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-900/15 hover:opacity-95 transition-all cursor-pointer"
              >
                Build Instant Quote
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#pricing-results"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00388B]/20 bg-white px-5 py-3.5 text-base font-semibold text-[#00388B] shadow-sm hover:bg-sky-50 transition-all"
              >
                View Real Results &amp; Prices
              </a>

              <a
                href={`${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                  'Hi Krystal Care Cleaners, I would like to enquire about a cleaning or laundry quote.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/70 px-5 py-3.5 text-base font-semibold text-emerald-800 shadow-sm hover:bg-emerald-100 transition-all"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600" />
                {BUSINESS_INFO.phoneLocal}
              </a>
            </div>
          </div>

          {/* Authentic Work Photo Collage */}
          <div className="lg:col-span-6">
            <div className="relative grid grid-cols-12 gap-3 rounded-3xl border-2 border-white bg-white/90 p-3 shadow-2xl shadow-sky-950/10 ring-1 ring-slate-200/80">
              <div className="col-span-7 relative overflow-hidden rounded-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/real-persian-onsite.jpg`}
                  alt="Krystal Care Cleaners technician deep-cleaning a large Persian rug onsite"
                  className="h-full min-h-[260px] sm:min-h-[340px] w-full object-cover object-top"
                />
                <span className="absolute left-3 bottom-3 rounded-full bg-[#002B6B]/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                  Onsite Persian Rug Extraction
                </span>
              </div>

              <div className="col-span-5 flex flex-col gap-3">
                <div className="relative flex-1 overflow-hidden rounded-2xl">
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-pooltable-extraction.jpg`}
                    alt="Precision felt and carpet deep extraction close-up"
                    className="h-full min-h-[124px] w-full object-cover"
                  />
                  <span className="absolute left-2.5 bottom-2.5 rounded-full bg-[#1E7A34]/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    Precision Extraction
                  </span>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-2xl">
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-office-chair.jpg`}
                    alt="Krystal Care Cleaners technician extracting an ergonomic mesh office chair"
                    className="h-full min-h-[124px] w-full object-cover object-top"
                  />
                  <span className="absolute left-2.5 bottom-2.5 rounded-full bg-[#0095DA]/90 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    Office Chair Revival
                  </span>
                </div>
              </div>

              <div className="mt-3 col-span-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-0 lg:absolute lg:-bottom-8 lg:left-6 lg:right-6">
                <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xs">
                    <Star className="h-5 w-5 fill-white text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#002B6B]">4.9 / 5 Google Rating</p>
                    <p className="text-xs text-slate-600">Professional • Reliable • Affordable</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00388B] to-[#2E9E36] text-white shadow-xs">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#002B6B]">Lenasia to Sandton</p>
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
