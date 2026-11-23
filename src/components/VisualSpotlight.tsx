import { ArrowUpRight } from 'lucide-react';

interface VisualSpotlightProps {
  onSelectPreset: (serviceIds: string[]) => void;
}

const SPOTLIGHTS = [
  {
    image: `${import.meta.env.BASE_URL}images/laundry-garment.jpg`,
    alt: 'Pressed suits, delicate embellished formalwear, and crisp folded linen at Krystal Care Cleaners',
    badge: 'Dry Cleaning & Laundry',
    badgeColor: 'bg-rose-600/95',
    borderAccent: 'hover:border-rose-300',
    ctaColor: 'text-rose-700 hover:text-rose-900',
    title: 'Tailored Suits, Wedding Dresses & Indian Outfits',
    description:
      'Delicate solvent cleaning, crisp steam pressing, and folded household linen with turnaround times you can count on for weddings, Eid, Diwali, and busy workweeks.',
    presetIds: ['dry-cleaning-formal', 'laundry-linen'],
    cta: 'Quote Garment Care',
  },
  {
    image: `${import.meta.env.BASE_URL}images/mattress-carpet.jpg`,
    alt: 'Freshly sanitised white quilted mattress and clean bedroom carpet',
    badge: 'Deep Bedroom Hygiene',
    badgeColor: 'bg-emerald-600/95',
    borderAccent: 'hover:border-emerald-300',
    ctaColor: 'text-emerald-700 hover:text-emerald-900',
    title: 'Mattresses, Headboards & Fitted Carpets',
    description:
      'Remove dust mites, allergens, and lingering stains from Single to King mattresses, upholstered headboards, bedroom carpets, and Persian rugs.',
    presetIds: ['mattress-headboard', 'carpet-rug'],
    cta: 'Quote Bedroom & Carpets',
  },
  {
    image: `${import.meta.env.BASE_URL}images/sneaker-curtain.jpg`,
    alt: 'Spotless white leather sneakers beside freshly cleaned linen curtains and tiled floor',
    badge: 'Specialist Restoration',
    badgeColor: 'bg-amber-600/95',
    borderAccent: 'hover:border-amber-300',
    ctaColor: 'text-amber-700 hover:text-amber-900',
    title: 'Sneaker Cleaning, Curtains & Tile Grout',
    description:
      'From scuffed leather trainers and sun-faded denim dyeing to floor-length lined curtains and kitchen tile & grout lines.',
    presetIds: ['sneaker-cleaning', 'curtain-specialist', 'tile-grout-office'],
    cta: 'Quote Specialist Care',
  },
];

export function VisualSpotlight({ onSelectPreset }: VisualSpotlightProps) {
  return (
    <section
      id="spotlight"
      className="py-16 sm:py-24 bg-gradient-to-b from-white to-[#F0FDFA]/50 border-y border-slate-200/80"
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
            pair of white leather sneakers, we match the cleaning method to the material.
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
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
