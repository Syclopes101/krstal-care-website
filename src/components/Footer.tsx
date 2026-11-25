import { useMemo } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, RATE_CARD_SECTIONS } from '../data/business';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  selectedCount: number;
  itemizedQuantities: Record<string, number>;
  onJumpToQuote: () => void;
}

export function Footer({ selectedCount, itemizedQuantities, onJumpToQuote }: FooterProps) {
  const { itemCount, estimatedTotal, quickWaUrl } = useMemo(() => {
    let count = 0;
    let total = 0;
    const lines: string[] = [];

    for (const cat of RATE_CARD_SECTIONS) {
      for (const item of cat.items) {
        const qty = itemizedQuantities[item.id] ?? 0;
        if (qty > 0) {
          count += qty;
          if (item.priceValue !== null) {
            const sub = item.priceValue * qty;
            total += sub;
            lines.push(`• ${qty}× ${item.name}: R${sub.toLocaleString('en-ZA')}`);
          } else {
            lines.push(`• ${item.name} (${item.priceLabel})`);
          }
        }
      }
    }

    const msg =
      lines.length > 0
        ? `Hi Krystal Care Cleaners, I would like to book:\n${lines.join('\n')}${
            total > 0 ? `\nEstimated Total: R${total.toLocaleString('en-ZA')}` : ''
          }`
        : 'Hi Krystal Care Cleaners, I would like to book a cleaning or laundry service.';

    return {
      itemCount: count,
      estimatedTotal: total,
      quickWaUrl: `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(msg)}`,
    };
  }, [itemizedQuantities]);

  return (
    <>
      <footer className="bg-[#071528] text-slate-300 pb-20 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="inline-block rounded-2xl bg-white px-3 py-2 shadow-sm">
                <img
                  src={`${import.meta.env.BASE_URL}images/krystal-logo.png`}
                  alt="Krystal Care Cleaners logo"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
                {BUSINESS_INFO.brandMotto}
              </p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                100% mobile cleaning, upholstery restoration, laundry, dry cleaning, clothing
                dyeing, and sneaker care across Lenasia, Johannesburg &amp; Gauteng.
              </p>
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Follow Us
                </p>
                <SocialLinks variant="dark" />
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Services
              </h4>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-400">
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
                  <a href="#price-estimator" className="hover:text-teal-300 transition-colors">
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
              <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Mobile Dispatch &amp; Contact
              </h4>
              <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  <span>{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-teal-400" />
                  <a href={BUSINESS_INFO.phoneHref} className="hover:text-white">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                  <a href={BUSINESS_INFO.emailHref} className="hover:text-white">
                    {BUSINESS_INFO.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
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
              <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Trading Hours
              </h4>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-400">
                {BUSINESS_INFO.hours.map((row) => (
                  <li key={row.days} className="flex items-start gap-2">
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

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
            </p>
            <p>Serving Lenasia, Joburg South, Sandton, Rosebank, Randburg &amp; East Rand.</p>
          </div>
        </div>
      </footer>

      {/* Desktop Floating WhatsApp Button */}
      <a
        href={quickWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Krystal Care Cleaners on WhatsApp"
        className="hidden md:inline-flex fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-4 py-3 text-sm font-bold text-white shadow-xl shadow-sky-950/30 hover:scale-105 transition-all"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp Us</span>
      </a>

      {/* Sleek Sticky Mobile Action Dock (< md) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {itemCount > 0 ? `${itemCount} priced item${itemCount > 1 ? 's' : ''}` : 'Mobile Quote'}
            </p>
            <p className="truncate text-xs font-extrabold text-[#002B6B]">
              {estimatedTotal > 0
                ? `Est. R${estimatedTotal.toLocaleString('en-ZA')}`
                : `${selectedCount} service${selectedCount === 1 ? '' : 's'} selected`}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={quickWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E7A34] px-3 py-2 text-xs font-bold text-white shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={onJumpToQuote}
              className="inline-flex items-center gap-1 rounded-xl bg-[#00388B] px-3 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
