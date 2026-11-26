import { CalendarCheck, Truck, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CalendarCheck,
    gradient: 'from-sky-500 to-cyan-400',
    title: 'Pick Services & Suburb',
    description:
      'Choose upholstery, carpets, mattresses, office areas, or garment care and share your suburb.',
  },
  {
    step: '02',
    icon: Truck,
    gradient: 'from-teal-500 to-emerald-400',
    title: 'Mobile Onsite or Collect',
    description:
      'Our mobile team comes straight to your home/office or collects & delivers garments.',
  },
  {
    step: '03',
    icon: Sparkles,
    gradient: 'from-amber-400 to-orange-400',
    title: 'Fresh Finish & Easy Pay',
    description:
      'Inspect fast-drying results with transparent ZAR rates. Pay via card, EFT, or cash.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 bg-gradient-to-br from-[#0A2240] via-[#0E2E52] to-[#0B4F54] text-white">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-400/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-200 border border-teal-400/30">
              How It Works
            </span>
            <h2 className="font-display mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              3 Simple Steps to a Fresh Space
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-teal-100/80">
            Zero hidden surprises and fast turnaround across Johannesburg.
          </p>
        </div>

        <div className="no-scrollbar mt-6 flex w-full max-w-full snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 md:mt-8 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative w-[78%] max-w-xs shrink-0 snap-start rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-6 backdrop-blur-md md:w-auto md:max-w-none hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-extrabold text-white/25">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display mt-3.5 sm:mt-5 text-base sm:text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-200">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
