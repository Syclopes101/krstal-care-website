import { CalendarCheck, Truck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CalendarCheck,
    gradient: 'from-sky-500 to-cyan-400',
    title: 'Select Your Services & Suburb',
    description:
      'Pick the upholstery, carpets, mattresses, office areas, or garment care items you need and tell us your Johannesburg suburb and preferred day.',
  },
  {
    step: '02',
    icon: Truck,
    gradient: 'from-teal-500 to-emerald-400',
    title: 'Mobile Onsite or Collection',
    description:
      'Our equipped team arrives at your home or office for deep extraction — or collects & delivers laundry, dry cleaning, dyeing, and sneakers from Lenasia Ext 11.',
  },
  {
    step: '03',
    icon: Sparkles,
    gradient: 'from-amber-400 to-orange-400',
    title: 'Spotless Finish & Easy Payment',
    description:
      'Inspect the crisp, refreshed result with fast drying times and transparent pricing. Pay easily by card, EFT, or cash.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-[#0A2240] via-[#0E2E52] to-[#0B4F54] text-white">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-400/30">
              How It Works
            </span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Seamless From First Message to Fresh Finish
            </h2>
          </div>
          <p className="max-w-md text-sm text-teal-100/80">
            Designed around busy households and commercial offices — zero hidden call-out surprises
            and fast turnaround times.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-2xl font-extrabold text-white/25">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
