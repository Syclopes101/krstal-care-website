import { ArrowUpRight } from 'lucide-react';

interface VisualSpotlightProps {
  onSelectPreset: (serviceIds: string[]) => void;
}

const SPOTLIGHTS = [
  {
    image: `${import.meta.env.BASE_URL}images/laundry-garment.jpg`,
    alt: 'Pressed suits, delicate embellished formalwear, and crisp folded linen at Krystal Care Cleaners',
    badge: 'Dry Cleaning & Laundry · From R45',
    badgeColor: 'bg-rose-600/95',
    borderAccent: 'hover:border-rose-300',
    ctaColor: 'text-rose-700 hover:text-rose-900',
    title: 'Tailored Suits, Wedding Dresses & Indian Outfits',
    description:
      'Delicate solvent cleaning (2-Piece Suits R230, 3-Piece R310), crisp Wash & Iron (R50), Wash & Fold (R45), and specialist care for sarees, lehengas & bridalwear.',
    presetIds: ['dry-cleaning-formal', 'laundry-linen'],
    cta: 'Quote Garment Care',
  },
  {
    image: `${import.meta.env.BASE_URL}images/real-persian-onsite.jpg`,
    alt: 'Krystal Care Cleaners technician deep-cleaning a Persian rug onsite',
    badge: 'Onsite Rugs & Carpets · From R400',
    badgeColor: 'bg-[#00388B]/95',
    borderAccent: 'hover:border-sky-300',
    ctaColor: 'text-[#00388B] hover:text-sky-900',
    title: 'Persian Rugs, Fitted Carpets & Couches',
    description:
      'Mobile hot-water extraction for Persian rugs, fitted bedrooms (R400/room), fabric couches (3-Seater R750 · 1-Seater R150), and leather suites (3-Seater R1,550).',
    presetIds: ['carpet-rug', 'couch-chair', 'mattress-headboard'],
    cta: 'Quote Mobile Extraction',
  },
  {
    image: `${import.meta.env.BASE_URL}images/real-office-chair.jpg`,
    alt: 'Krystal Care Cleaners specialist extracting an ergonomic mesh office chair',
    badge: 'Office & Commercial · R80 / Chair',
    badgeColor: 'bg-[#1E7A34]/95',
    borderAccent: 'hover:border-emerald-300',
    ctaColor: 'text-[#1E7A34] hover:text-emerald-900',
    title: 'Office Chairs, Commercial Carpets & Dyeing',
    description:
      'Keep offices spotless with task & dining chair extraction (R80/chair), tile & grout scrubbing, plus clothing dyeing (Jeans R300, T-Shirts R280, Golf Shirts R230, Caps R140).',
    presetIds: ['tile-grout-office', 'clothing-dyeing', 'sneaker-cleaning'],
    cta: 'Quote Commercial & Dyeing',
  },
];

export function VisualSpotlight({ onSelectPreset }: VisualSpotlightProps) {
  return (
    <section
      id="spotlight"
      className="py-16 sm:py-24 bg-gradient-to-b from-white to-[#F0FDFA]/50 border-b border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800 border border-indigo-200">
            Specialist Standards
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0A2240] sm:text-4xl">
            Care Tailored to Every Fibre, Fabric &amp; Finish
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Whether it is an heirloom Persian rug, a beaded lehenga, a family sectional sofa, or a
            commercial office floor, we match the cleaning method to the material.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {SPOTLIGHTS.map((item) => (
            <div
              key={item.title}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-slate-900/5 ${item.borderAccent}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0A2240]">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPreset(item.presetIds)}
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer ${item.ctaColor}`}
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
