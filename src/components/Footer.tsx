import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export function Footer() {
  return (
    <>
      <footer className="bg-[#071528] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="inline-block rounded-2xl bg-white px-3 py-2 shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}images/krystal-logo.png`}
                  alt="Krystal Care Cleaners logo"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
                {BUSINESS_INFO.brandMotto}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
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
                  <a href="#pricing-results" className="hover:text-teal-300 transition-colors">
                    Official ZAR Price Menu &amp; Results
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
                  <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                  <a href={BUSINESS_INFO.emailHref} className="hover:text-white">
                    {BUSINESS_INFO.email}
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
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-4 py-3 text-sm font-bold text-white shadow-xl shadow-sky-950/30 hover:scale-105 transition-all"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </>
  );
}
