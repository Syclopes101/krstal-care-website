import { useState } from 'react';
import { MapPin, Clock, Navigation, Phone, CreditCard, Car } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../data/business';
import { SocialLinks } from './SocialLinks';

const AREA_BADGE_COLORS = [
  'bg-teal-100 text-teal-900',
  'bg-sky-100 text-sky-900',
  'bg-indigo-100 text-indigo-900',
  'bg-emerald-100 text-emerald-900',
  'bg-amber-100 text-amber-900',
  'bg-cyan-100 text-cyan-900',
];

export function ServiceAreasAndHours() {
  const [mobilePanel, setMobilePanel] = useState<'dispatch' | 'areas'>('dispatch');

  return (
    <section
      id="areas"
      className="py-10 sm:py-20 bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF]/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden mb-5">
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-800 border border-sky-200">
            Gauteng Mobile Coverage
          </span>
          <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-[#0A2240]">
            100% Mobile Service Across Gauteng
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              aria-pressed={mobilePanel === 'dispatch'}
              onClick={() => setMobilePanel('dispatch')}
              className={`rounded-lg py-2 text-xs font-bold transition-colors ${
                mobilePanel === 'dispatch'
                  ? 'bg-[#002B6B] text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Dispatch &amp; Hours
            </button>
            <button
              type="button"
              aria-pressed={mobilePanel === 'areas'}
              onClick={() => setMobilePanel('areas')}
              className={`rounded-lg py-2 text-xs font-bold transition-colors ${
                mobilePanel === 'areas'
                  ? 'bg-[#002B6B] text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              6 Gauteng Areas
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className={`min-w-0 lg:col-span-7 ${mobilePanel === 'areas' ? 'block' : 'hidden lg:block'}`}>
            <div className="hidden lg:block">
              <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-800 border border-sky-200">
                Gauteng Mobile Coverage
              </span>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0A2240] sm:text-4xl">
                100% Mobile Service Across Johannesburg &amp; Gauteng.
              </h2>
              <p className="mt-3 text-base text-slate-600">
                We are a mobile cleaning &amp; garment-care business dispatched from Lenasia Ext 11—our
                equipped teams travel directly to your home, apartment, or office across Gauteng, with
                door-to-door collection and delivery for laundry, dry cleaning, dyeing &amp; sneakers.
              </p>
            </div>

            <div className="lg:mt-8 grid gap-3 sm:grid-cols-2">
              {SERVICE_AREAS.map((area, idx) => (
                <div
                  key={area.name}
                  className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0A2240]">
                      {area.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold ${
                        AREA_BADGE_COLORS[idx % AREA_BADGE_COLORS.length]
                      }`}
                    >
                      {area.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600">{area.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`min-w-0 lg:col-span-5 ${mobilePanel === 'dispatch' ? 'block' : 'hidden lg:block'}`}
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-teal-200/80 bg-white shadow-lg shadow-teal-950/5">
              <div className="bg-gradient-to-r from-[#0A2240] to-teal-700 px-5 py-4 text-white sm:px-8 sm:py-5">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold">
                  Mobile Dispatch &amp; Booking Desk
                </h3>
                <p className="mt-0.5 text-xs font-medium text-teal-100">
                  {BUSINESS_INFO.legalName} · Mobile Service Business
                </p>
              </div>

              <div className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Mobile Dispatch Base
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-900">
                      {BUSINESS_INFO.address}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        href={BUSINESS_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                      >
                        <Navigation className="h-3 w-3 text-teal-700" />
                        Google Maps
                      </a>
                      <a
                        href={BUSINESS_INFO.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800 hover:bg-sky-100 transition-colors"
                      >
                        <Navigation className="h-3 w-3 text-sky-600" />
                        Waze
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Trading Hours
                    </p>
                    <dl className="mt-1 space-y-1 text-xs sm:text-sm">
                      {BUSINESS_INFO.hours.map((row) => (
                        <div key={row.days} className="flex items-center justify-between gap-2">
                          <dt className="font-medium text-slate-600">{row.days}</dt>
                          <dd className="font-bold text-slate-900">{row.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone, WhatsApp &amp; Email
                    </p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-0.5 block text-sm sm:text-base font-bold text-[#0A2240] hover:text-teal-700"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    <a
                      href={BUSINESS_INFO.emailHref}
                      className="mt-0.5 block text-xs sm:text-sm font-semibold text-[#00388B] hover:underline"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-2.5 py-2 text-[11px] sm:text-xs font-bold text-indigo-900">
                    <CreditCard className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    Mobile Card
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-2 text-[11px] sm:text-xs font-bold text-amber-900">
                    <Car className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    Door-to-Door
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Follow Our Work
                  </p>
                  <SocialLinks variant="light" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
