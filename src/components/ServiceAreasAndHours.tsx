import { MapPin, Clock, Navigation, Phone, CreditCard, Car } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/business';

const AREA_BADGE_COLORS = [
  'bg-teal-100 text-teal-900',
  'bg-sky-100 text-sky-900',
  'bg-indigo-100 text-indigo-900',
  'bg-emerald-100 text-emerald-900',
  'bg-amber-100 text-amber-900',
  'bg-cyan-100 text-cyan-900',
];

export function ServiceAreasAndHours() {
  return (
    <section
      id="areas"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF]/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800 border border-sky-200">
              Gauteng Mobile Coverage
            </span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0A2240] sm:text-4xl">
              Rooted in Lenasia. Travelling Across Johannesburg.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Drop off garments at our Lenasia Extension 11 branch or book a mobile deep-cleaning
              crew directly to your home, apartment, or office anywhere across these Gauteng regions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SERVICE_AREAS.map((area, idx) => (
                <div
                  key={area.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-[#0A2240]">{area.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        AREA_BADGE_COLORS[idx % AREA_BADGE_COLORS.length]
                      }`}
                    >
                      {area.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{area.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-teal-200/80 bg-white shadow-lg shadow-teal-950/5">
              <div className="bg-gradient-to-r from-[#0A2240] to-teal-700 px-6 py-5 text-white sm:px-8">
                <h3 className="font-display text-2xl font-extrabold">Visit or Contact Our Branch</h3>
                <p className="mt-0.5 text-xs font-medium text-teal-100">
                  {BUSINESS_INFO.legalName}
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Branch Address
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                      {BUSINESS_INFO.address}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <a
                        href={BUSINESS_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                      >
                        <Navigation className="h-3.5 w-3.5 text-teal-700" />
                        Google Maps
                      </a>
                      <a
                        href={BUSINESS_INFO.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 hover:bg-sky-100 transition-colors"
                      >
                        <Navigation className="h-3.5 w-3.5 text-sky-600" />
                        Navigate with Waze
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Trading Hours
                    </p>
                    <dl className="mt-1.5 space-y-1.5 text-sm">
                      {BUSINESS_INFO.hours.map((row) => (
                        <div key={row.days} className="flex items-center justify-between gap-2">
                          <dt className="font-medium text-slate-600">{row.days}</dt>
                          <dd className="font-bold text-slate-900">{row.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Phone &amp; WhatsApp
                    </p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-0.5 inline-block text-base font-bold text-[#0A2240] hover:text-teal-700"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-900">
                    <CreditCard className="h-4 w-4 text-indigo-600 shrink-0" />
                    Card Payments
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-900">
                    <Car className="h-4 w-4 text-amber-600 shrink-0" />
                    Branch Parking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
