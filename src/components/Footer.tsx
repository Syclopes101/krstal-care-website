import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export function Footer() {
  return (
    <>
      <footer className="bg-[#071528] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/20 ring-1 ring-teal-500/40">
                  <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
                    <path
                      d="M18 4L27.5 17.5C29.5 20.5 28.5 28 18 31C7.5 28 6.5 20.5 8.5 17.5L18 4Z"
                      fill="#0D9488"
                    />
                    <path
                      d="M18 10L23 17.5C24 19.5 23.2 24.2 18 26C12.8 24.2 12 19.5 13 17.5L18 10Z"
                      fill="#5EEAD4"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-display block text-lg font-extrabold text-white">
                    Krystal Care
                  </span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-400">
                    Cleaners (Pty) Ltd
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Mobile cleaning, upholstery restoration, laundry, dry cleaning, clothing dyeing, and
                sneaker care across Lenasia, Johannesburg, and Gauteng.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
                <li>
                  <a href="#services" className="hover:text-teal-300 transition-colors">
                    Carpet &amp; Persian Rug Cleaning
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-300 transition-colors">
                    Couch, Mattress &amp; Curtain Care
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-300 transition-colors">
                    Tile, Grout &amp; Office Deep Cleaning
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-300 transition-colors">
                    Laundry, Dry Cleaning &amp; Indian Outfits
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-300 transition-colors">
                    Clothing Dyeing &amp; Sneaker Cleaning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Contact &amp; Location
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  <span>{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-teal-400" />
                  <a href={BUSINESS_INFO.phoneHref} className="hover:text-white">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 shrink-0 text-teal-400" />
                  <a
                    href={BUSINESS_INFO.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Trading Hours
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
                {BUSINESS_INFO.hours.map((row) => (
                  <li key={row.days} className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    <div>
                      <span className="block font-medium text-slate-200">{row.days}</span>
                      <span>{row.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
            </p>
            <p>Serving Lenasia, Joburg South, Sandton, Rosebank, Randburg &amp; East Rand.</p>
          </div>
        </div>
      </footer>

      <a
        href={`${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
          'Hi Krystal Care Cleaners, I would like to book a cleaning or laundry service.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Krystal Care Cleaners on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-teal-900/30 hover:bg-teal-700 hover:scale-105 transition-all"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </>
  );
}
