import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Phone,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  MapPin,
  Clock,
  Star,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO, COLOR_THEMES, SERVICE_CATALOG, type ServicePillar } from '../data/business';

interface NavbarProps {
  selectedCount: number;
  onJumpToQuote: () => void;
  onSelectServiceFromMenu: (serviceId: string) => void;
  onSelectPillarFromMenu: (pillar: ServicePillar) => void;
}

function getJohannesburgStatus(): { isOpen: boolean; label: string } {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '12');
    const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
    const minutes = hour * 60 + minute;

    const isWeekend = weekday === 'Sat' || weekday === 'Sun';
    const openMins = 8 * 60;
    const closeMins = isWeekend ? 14 * 60 : 18 * 60;

    if (minutes >= openMins && minutes < closeMins) {
      return {
        isOpen: true,
        label: isWeekend ? 'Open Today · Until 2:00 PM' : 'Open Today · Until 6:00 PM',
      };
    }
    return {
      isOpen: false,
      label: isWeekend ? 'Opens 8:00 AM · Sat–Sun 08–14' : 'Opens 8:00 AM · Mon–Fri 08–18',
    };
  } catch {
    return { isOpen: true, label: 'Mon–Fri 8–6 · Sat–Sun 8–2' };
  }
}

type DesktopMenuKey = 'cleaning' | 'garment' | 'coverage' | 'about' | null;

export function Navbar({
  selectedCount,
  onJumpToQuote,
  onSelectServiceFromMenu,
  onSelectPillarFromMenu,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<DesktopMenuKey>(null);
  const [mobileAccordion, setMobileAccordion] = useState<DesktopMenuKey>('cleaning');
  const navRef = useRef<HTMLDivElement>(null);
  const status = useMemo(() => getJohannesburgStatus(), []);

  const cleaningServices = useMemo(
    () => SERVICE_CATALOG.filter((s) => s.pillar === 'cleaning'),
    []
  );
  const garmentServices = useMemo(
    () => SERVICE_CATALOG.filter((s) => s.pillar === 'garment'),
    []
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDesktopMenu(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDesktopMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleDesktopServiceClick = (id: string) => {
    setActiveDesktopMenu(null);
    onSelectServiceFromMenu(id);
  };

  const handleMobileServiceClick = (id: string) => {
    setMobileOpen(false);
    onSelectServiceFromMenu(id);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs"
    >
      {/* Colourful Top Status & Contact Bar */}
      <div className="bg-gradient-to-r from-[#0A2240] via-[#0F3157] to-[#0D5C63] px-4 py-1.5 text-xs text-slate-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
              }`}
            />
            <span className="font-semibold text-white">{status.label}</span>
            <span className="hidden text-teal-300/60 sm:inline">•</span>
            <span className="hidden text-teal-100 sm:inline">{BUSINESS_INFO.shortAddress}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
              ★ {BUSINESS_INFO.rating} / 5 ({BUSINESS_INFO.reviewCount} Google Reviews)
            </span>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-teal-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-teal-300" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A2240] to-teal-700 shadow-sm ring-1 ring-teal-500/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
              <path
                d="M18 4L27.5 17.5C29.5 20.5 28.5 28 18 31C7.5 28 6.5 20.5 8.5 17.5L18 4Z"
                fill="#14B8A6"
              />
              <path
                d="M18 10L23 17.5C24 19.5 23.2 24.2 18 26C12.8 24.2 12 19.5 13 17.5L18 10Z"
                fill="#99F6E4"
              />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-display block text-lg font-extrabold tracking-tight text-[#0A2240]">
              Krystal Care
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-teal-700">
              Cleaners (Pty) Ltd
            </span>
          </div>
        </a>

        {/* Desktop Interactive Dropdown Triggers */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {/* Submenu 1: Home & Office Cleaning */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDesktopMenu('cleaning')}
            onMouseLeave={() => setActiveDesktopMenu(null)}
          >
            <button
              type="button"
              aria-expanded={activeDesktopMenu === 'cleaning'}
              onClick={() =>
                setActiveDesktopMenu((prev) => (prev === 'cleaning' ? null : 'cleaning'))
              }
              className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'cleaning'
                  ? 'bg-sky-50 text-sky-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Home &amp; Office Cleaning</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeDesktopMenu === 'cleaning' ? 'rotate-180 text-sky-700' : 'text-slate-400'
                }`}
              />
            </button>

            {activeDesktopMenu === 'cleaning' && (
              <div className="absolute left-0 top-full w-[460px] pt-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15">
                  <div className="mb-2 flex items-center justify-between px-2.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                      Mobile Onsite Deep Cleaning
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDesktopMenu(null);
                        onSelectPillarFromMenu('cleaning');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-sky-700 cursor-pointer"
                    >
                      View all <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {cleaningServices.map((item) => {
                      const theme = COLOR_THEMES[item.color];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleDesktopServiceClick(item.id)}
                          className="flex w-full items-start justify-between gap-3 rounded-xl p-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div>
                            <p className="text-sm font-bold text-[#0A2240]">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.subtitle}</p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                          >
                            {item.turnaround.split(' ')[0]} {item.turnaround.split(' ')[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submenu 2: Laundry & Garment Care */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDesktopMenu('garment')}
            onMouseLeave={() => setActiveDesktopMenu(null)}
          >
            <button
              type="button"
              aria-expanded={activeDesktopMenu === 'garment'}
              onClick={() =>
                setActiveDesktopMenu((prev) => (prev === 'garment' ? null : 'garment'))
              }
              className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'garment'
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Laundry &amp; Garments</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeDesktopMenu === 'garment' ? 'rotate-180 text-teal-700' : 'text-slate-400'
                }`}
              />
            </button>

            {activeDesktopMenu === 'garment' && (
              <div className="absolute left-0 top-full w-[460px] pt-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15">
                  <div className="mb-2 flex items-center justify-between px-2.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                      Laundry, Dry Cleaning, Dyeing &amp; Sneakers
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDesktopMenu(null);
                        onSelectPillarFromMenu('garment');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-teal-700 cursor-pointer"
                    >
                      View all <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {garmentServices.map((item) => {
                      const theme = COLOR_THEMES[item.color];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleDesktopServiceClick(item.id)}
                          className="flex w-full items-start justify-between gap-3 rounded-xl p-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div>
                            <p className="text-sm font-bold text-[#0A2240]">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.subtitle}</p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                          >
                            {item.modeTag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submenu 3: Areas & Branch */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDesktopMenu('coverage')}
            onMouseLeave={() => setActiveDesktopMenu(null)}
          >
            <button
              type="button"
              aria-expanded={activeDesktopMenu === 'coverage'}
              onClick={() =>
                setActiveDesktopMenu((prev) => (prev === 'coverage' ? null : 'coverage'))
              }
              className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'coverage'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Areas &amp; Branch</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeDesktopMenu === 'coverage'
                    ? 'rotate-180 text-emerald-700'
                    : 'text-slate-400'
                }`}
              />
            </button>

            {activeDesktopMenu === 'coverage' && (
              <div className="absolute left-0 top-full w-80 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15">
                  <a
                    href="#areas"
                    onClick={() => setActiveDesktopMenu(null)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2240]">Gauteng Service Areas</p>
                      <p className="text-xs text-slate-500">
                        Lenasia, Joburg South, Sandton, Rosebank, Randburg &amp; East Rand
                      </p>
                    </div>
                  </a>
                  <a
                    href="#areas"
                    onClick={() => setActiveDesktopMenu(null)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2240]">Lenasia Ext 11 Branch &amp; Hours</p>
                      <p className="text-xs text-slate-500">
                        14 Dharwar St · Open Mon–Fri 8–6, Sat–Sun 8–2
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Submenu 4: Reviews & FAQ */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDesktopMenu('about')}
            onMouseLeave={() => setActiveDesktopMenu(null)}
          >
            <button
              type="button"
              aria-expanded={activeDesktopMenu === 'about'}
              onClick={() => setActiveDesktopMenu((prev) => (prev === 'about' ? null : 'about'))}
              className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'about'
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Reviews &amp; Guide</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeDesktopMenu === 'about' ? 'rotate-180 text-amber-700' : 'text-slate-400'
                }`}
              />
            </button>

            {activeDesktopMenu === 'about' && (
              <div className="absolute right-0 top-full w-72 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/15">
                  <a
                    href="#spotlight"
                    onClick={() => setActiveDesktopMenu(null)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2240]">Specialist Care Spotlight</p>
                      <p className="text-xs text-slate-500">Couture, bedrooms &amp; sneakers</p>
                    </div>
                  </a>
                  <a
                    href="#reviews"
                    onClick={() => setActiveDesktopMenu(null)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2240]">4.9★ Google Reviews</p>
                      <p className="text-xs text-slate-500">Customer feedback &amp; turnaround</p>
                    </div>
                  </a>
                  <a
                    href="#faq"
                    onClick={() => setActiveDesktopMenu(null)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div>
                      <p className="text-sm font-bold text-[#0A2240]">Care &amp; Booking FAQs</p>
                      <p className="text-xs text-slate-500">Drying times, dyeing &amp; payments</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <a
            href={BUSINESS_INFO.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={onJumpToQuote}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-teal-800 hover:to-cyan-800 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book / Instant Quote</span>
            {selectedCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-teal-800">
                {selectedCount}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer with Expandable Submenus */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-2">
            {/* Mobile Submenu: Home & Office Cleaning */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'cleaning' ? null : 'cleaning'))
                }
                className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm font-bold text-[#0A2240]"
              >
                <span>Home &amp; Office Cleaning</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileAccordion === 'cleaning' ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'cleaning' && (
                <div className="border-t border-slate-200 bg-white p-2 space-y-1">
                  {cleaningServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleMobileServiceClick(s.id)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Submenu: Laundry & Garments */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion((prev) => (prev === 'garment' ? null : 'garment'))
                }
                className="flex w-full items-center justify-between px-3.5 py-2.5 text-sm font-bold text-[#0A2240]"
              >
                <span>Laundry, Dry Cleaning &amp; Garments</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileAccordion === 'garment' ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'garment' && (
                <div className="border-t border-slate-200 bg-white p-2 space-y-1">
                  {garmentServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleMobileServiceClick(s.id)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="#areas"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-xs font-bold text-slate-700"
              >
                Gauteng Areas &amp; Hours
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-center text-xs font-bold text-slate-700"
              >
                4.9★ Reviews &amp; FAQ
              </a>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800"
              >
                <Phone className="h-4 w-4 text-teal-700" />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onJumpToQuote();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-3 py-2.5 text-sm font-semibold text-white"
              >
                Get Quote {selectedCount > 0 ? `(${selectedCount})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
