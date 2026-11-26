import { ArrowUpRight } from 'lucide-react';

interface VisualSpotlightProps {
  onSelectPreset: (serviceIds: string[]) => void;
}

const SPOTLIGHTS = [
  {
    image: `${import.meta.env.BASE_URL}images/laundry-garment.jpg`,
    alt: 'Pressed suits, delicate embellished formalwear, and crisp folded linen at Krystal Care Cleaners',
    badge: 'Dry Cleaning & Laundry · From R60',
    badgeColor: 'bg-rose-600/95',
    borderAccent: 'hover:border-rose-300',
    ctaColor: 'text-rose-700 hover:text-rose-900',
    title: 'Tailored Suits, Wedding Dresses & Indian Outfits',
    description:
      'Delicate solvent cleaning (2-Piece Suits R280, 3-Piece R360), crisp Wash & Iron (R70), Wash & Fold (R60), and specialist care for sarees, lehengas & bridalwear.',
    presetIds: ['dry-cleaning-formal', 'laundry-linen'],
    cta: 'Quote Garment Care',
  },
  {
    image: `${import.meta.env.BASE_URL}images/persian-rug-onsite.jpg`,
    alt: 'Krystal Care Cleaners technician deep-cleaning a Persian rug onsite',
    badge: 'Onsite Rugs & Carpets · From R450',
    badgeColor: 'bg-[#00388B]/95',
    borderAccent: 'hover:border-sky-300',
    ctaColor: 'text-[#00388B] hover:text-sky-900',
    title: 'Persian Rugs, Fitted Carpets & Couches',
    description:
      'Mobile hot-water extraction for Persian rugs, fitted bedrooms (R450/room), fabric couches (3-Seater R850 · 1-Seater R200), and leather suites (3-Seater R1,750).',
    presetIds: ['carpet-rug', 'couch-chair', 'mattress-headboard'],
    cta: 'Quote Mobile Extraction',
  },
  {
    image: `${import.meta.env.BASE_URL}images/real-office-chair.jpg`,
    alt: 'Krystal Care Cleaners specialist extracting an ergonomic mesh office chair',
    badge: 'Office & Commercial · R100 / Chair',
    badgeColor: 'bg-[#1E7A34]/95',
    borderAccent: 'hover:border-emerald-300',
    ctaColor: 'text-[#1E7A34] hover:text-emerald-900',
    title: 'Office Chairs, Commercial Carpets & Dyeing',
    description:
      'Keep offices spotless with task & dining chair extraction (R100/chair), tile & grout scrubbing, plus clothing dyeing (Jeans R300, T-Shirts R280, Golf Shirts R230, Caps R140).',
    presetIds: ['tile-grout-office', 'clothing-dyeing', 'sneaker-cleaning'],
    cta: 'Quote Commercial & Dyeing',
  },
];

export function VisualSpotlight({ onSelectPreset }: VisualSpotlightProps) {
  return (
    <section
      id="spotlight"
      className="py-10 sm:py-20 bg-gradient-to-b from-white to-[#F0FDFA]/50 border-b border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-indigo-800 border border-indigo-200">
              Specialist Standards
            </span>
            <h2 className="font-display mt-2.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0A2240]">
              Care Tailored to Every Fibre &amp; Fabric
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 lg:hidden">
            Swipe cards sideways →
          </p>
        </div>

        {/* Swipeable horizontal cards on mobile, 3-col grid on lg */}
        <div className="no-scrollbar mt-6 flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
          {SPOTLIGHTS.map((item) => (
            <div
              key={item.title}
              className={`group flex w-[82%] max-w-xs shrink-0 snap-start flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-slate-900/5 lg:w-auto lg:max-w-none ${item.borderAccent}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                <div>
                  <h3 className="font-display text-base sm:text-xl font-bold text-[#0A2240]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPreset(item.presetIds)}
                  className={`mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${item.ctaColor}`}
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
