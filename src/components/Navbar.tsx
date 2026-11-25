import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Phone,
  Mail,
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
  Tag,
  FolderOpen,
  Folder,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_INFO, COLOR_THEMES, SERVICE_CATALOG, type ServicePillar } from '../data/business';
import { SocialLinks } from './SocialLinks';

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
type MobileFolderKey = 'cleaning' | 'garment' | 'coverage' | 'guides' | null;

export function Navbar({
  selectedCount,
  onJumpToQuote,
  onSelectServiceFromMenu,
  onSelectPillarFromMenu,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<DesktopMenuKey>(null);
  const [mobileFolder, setMobileFolder] = useState<MobileFolderKey>('cleaning');
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
      if (e.key === 'Escape') {
        setActiveDesktopMenu(null);
        setMobileOpen(false);
      }
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

  const handleMobileHashJump = (hash: string) => {
    setMobileOpen(false);
    const id = hash.replace('#', '');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs"
    >
      {/* Colourful Top Status & Contact Bar */}
      <div className="bg-gradient-to-r from-[#002B6B] via-[#003D8E] to-[#1E7A34] px-3 py-1.5 text-[11px] sm:px-4 sm:text-xs text-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                status.isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
              }`}
            />
            <span className="truncate font-semibold text-white">{status.label}</span>
            <span className="hidden text-sky-200/60 sm:inline">•</span>
            <span className="hidden text-sky-100 sm:inline">100% Mobile Service</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:block">
              <SocialLinks variant="compact" />
            </div>
            <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
              ★ {BUSINESS_INFO.rating} / 5 ({BUSINESS_INFO.reviewCount} Google Reviews)
            </span>
            <a
              href={BUSINESS_INFO.emailHref}
              className="hidden md:inline-flex items-center gap-1.5 font-medium text-sky-100 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-amber-300" />
              {BUSINESS_INFO.email}
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-amber-200 transition-colors"
            >
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-300" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}images/krystal-logo.png`}
            alt="Krystal Care Cleaners logo"
            className="h-10 w-auto sm:h-12 object-contain transition-transform group-hover:scale-105"
          />
          <div className="leading-tight border-l border-slate-200 pl-2.5">
            <span className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#00388B]">
              Mobile Service
            </span>
            <span className="block text-[10px] sm:text-[11px] font-semibold text-[#2E9E36]">
              {BUSINESS_INFO.brandMotto}
            </span>
          </div>
        </a>

        {/* Desktop Interactive Dropdown Triggers */}
        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Primary navigation">
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
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'cleaning'
                  ? 'bg-sky-50 text-sky-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Home &amp; Office</span>
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
                            {item.priceFrom ?? item.turnaround.split(' ')[0]}
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
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'garment'
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Laundry &amp; Dyeing</span>
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
                            {item.priceFrom ?? item.modeTag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#pricing-results"
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#1E7A34] transition-colors"
          >
            <Tag className="h-3.5 w-3.5 text-[#2E9E36]" />
            Prices &amp; Results
          </a>

          {/* Submenu 3: Mobile Areas */}
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
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeDesktopMenu === 'coverage'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A2240]'
              }`}
            >
              <span>Mobile Areas</span>
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
                      <p className="text-sm font-bold text-[#0A2240]">Gauteng Mobile Coverage</p>
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
                      <p className="text-sm font-bold text-[#0A2240]">Mobile Dispatch &amp; Hours</p>
                      <p className="text-xs text-slate-500">
                        Lenasia Ext 11 Base · Open Mon–Fri 8–6, Sat–Sun 8–2
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
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
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
                      <p className="text-xs text-slate-500">Onsite &amp; couture craftsmanship</p>
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
        <div className="flex items-center gap-2">
          <a
            href={BUSINESS_INFO.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={onJumpToQuote}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Quote</span>
            {selectedCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-[#00388B]">
                {selectedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-[#002B6B] hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Toggle menu folders"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sticky Quick-Jump Strip */}
      <div className="border-t border-slate-100 bg-slate-50/90 px-3 py-1.5 lg:hidden">
        <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
          {[
            { label: 'Before & After', href: '#pricing-results', accent: 'text-[#00388B]' },
            { label: 'ZAR Prices', href: '#price-estimator', accent: 'text-[#1E7A34]' },
            { label: 'Services (10)', href: '#services', accent: 'text-slate-700' },
            { label: 'Gauteng Areas', href: '#areas', accent: 'text-slate-700' },
            { label: '4.9★ Reviews', href: '#reviews', accent: 'text-amber-700' },
            { label: 'Quote', href: '#quote', accent: 'text-[#00388B]' },
          ].map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className={`shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold shadow-2xs ${pill.accent}`}
            >
              {pill.label}
            </a>
          ))}
        </div>
      </div>

      {/* Clean Mobile Sub-Folders Drawer */}
      {mobileOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-slate-200 bg-[#F8FAFC] px-3 py-3 lg:hidden">
          <div className="space-y-2">
            {/* Folder 1: Home & Office Cleaning */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <button
                type="button"
                aria-expanded={mobileFolder === 'cleaning'}
                onClick={() => setMobileFolder((p) => (p === 'cleaning' ? null : 'cleaning'))}
                className="flex w-full items-center justify-between px-3.5 py-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-[#00388B]">
                    {mobileFolder === 'cleaning' ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <Folder className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#002B6B]">Home &amp; Office Cleaning</p>
                    <p className="text-[11px] text-slate-500">5 mobile onsite services</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    mobileFolder === 'cleaning' ? 'rotate-180 text-[#00388B]' : ''
                  }`}
                />
              </button>
              {mobileFolder === 'cleaning' && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-2 space-y-1">
                  {cleaningServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleMobileServiceClick(s.id)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-left text-xs font-semibold text-slate-800 border border-slate-100"
                    >
                      <span className="truncate">{s.title}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#1E7A34]">
                        {s.priceFrom ?? 'Quote'}
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Folder 2: Laundry, Dry Cleaning & Dyeing */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <button
                type="button"
                aria-expanded={mobileFolder === 'garment'}
                onClick={() => setMobileFolder((p) => (p === 'garment' ? null : 'garment'))}
                className="flex w-full items-center justify-between px-3.5 py-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-[#1E7A34]">
                    {mobileFolder === 'garment' ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <Folder className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#002B6B]">
                      Laundry, Dry Cleaning &amp; Dyeing
                    </p>
                    <p className="text-[11px] text-slate-500">5 collection &amp; garment services</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    mobileFolder === 'garment' ? 'rotate-180 text-[#1E7A34]' : ''
                  }`}
                />
              </button>
              {mobileFolder === 'garment' && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-2 space-y-1">
                  {garmentServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleMobileServiceClick(s.id)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-left text-xs font-semibold text-slate-800 border border-slate-100"
                    >
                      <span className="truncate">{s.title}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#1E7A34]">
                        {s.priceFrom ?? 'Quote'}
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Folder 3: Prices, Coverage & Reviews */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <button
                type="button"
                aria-expanded={mobileFolder === 'guides'}
                onClick={() => setMobileFolder((p) => (p === 'guides' ? null : 'guides'))}
                className="flex w-full items-center justify-between px-3.5 py-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    {mobileFolder === 'guides' ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <Folder className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#002B6B]">
                      Prices, Gauteng Areas &amp; Reviews
                    </p>
                    <p className="text-[11px] text-slate-500">Quick jumps &amp; dispatch info</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    mobileFolder === 'guides' ? 'rotate-180 text-amber-700' : ''
                  }`}
                />
              </button>
              {mobileFolder === 'guides' && (
                <div className="grid grid-cols-2 gap-1.5 border-t border-slate-100 bg-slate-50/60 p-2">
                  {[
                    { label: 'Before & After', href: '#pricing-results' },
                    { label: 'ZAR Estimator', href: '#price-estimator' },
                    { label: 'Gauteng Areas', href: '#areas' },
                    { label: '4.9★ Reviews & FAQ', href: '#reviews' },
                  ].map((item) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => handleMobileHashJump(item.href)}
                      className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-left text-xs font-bold text-[#002B6B]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-800"
              >
                <Phone className="h-3.5 w-3.5 text-[#1E7A34]" />
                Call 077 247 3275
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onJumpToQuote();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-3 py-2.5 text-xs font-bold text-white"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Instant Quote {selectedCount > 0 ? `(${selectedCount})` : ''}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5">
              <span className="text-[11px] font-bold text-slate-500">Follow Us:</span>
              <SocialLinks variant="light" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
