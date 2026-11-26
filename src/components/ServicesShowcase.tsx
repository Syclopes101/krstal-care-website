import { useState, useMemo } from 'react';
import {
  Sofa,
  Sparkles,
  BedDouble,
  Blinds,
  Grid2x2,
  Shirt,
  Crown,
  Layers,
  Palette,
  Footprints,
  Plus,
  Check,
  Search,
  Clock,
  Info,
  ChevronDown,
} from 'lucide-react';
import {
  COLOR_THEMES,
  SERVICE_CATALOG,
  type ServiceItem,
  type ServicePillar,
} from '../data/business';

interface ServicesShowcaseProps {
  activeTab: 'all' | ServicePillar;
  onChangeTab: (tab: 'all' | ServicePillar) => void;
  selectedServiceIds: string[];
  highlightedServiceId: string | null;
  onToggleService: (id: string) => void;
  onOpenDetail: (service: ServiceItem) => void;
  onJumpToQuote: () => void;
}

const SERVICE_ICONS: Record<string, typeof Sofa> = {
  'carpet-rug': Sparkles,
  'couch-chair': Sofa,
  'mattress-headboard': BedDouble,
  'curtain-specialist': Blinds,
  'tile-grout-office': Grid2x2,
  'laundry-linen': Layers,
  'dry-cleaning-formal': Crown,
  'winterwear-outerwear': Shirt,
  'clothing-dyeing': Palette,
  'sneaker-cleaning': Footprints,
};

export function ServicesShowcase({
  activeTab,
  onChangeTab,
  selectedServiceIds,
  highlightedServiceId,
  onToggleService,
  onOpenDetail,
  onJumpToQuote,
}: ServicesShowcaseProps) {
  const [query, setQuery] = useState('');
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>('carpet-rug');

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICE_CATALOG.filter((service) => {
      const matchesTab = activeTab === 'all' || service.pillar === activeTab;
      if (!matchesTab) return false;
      if (!q) return true;
      return (
        service.title.toLowerCase().includes(q) ||
        service.subtitle.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.method.toLowerCase().includes(q) ||
        service.items.some((item) => item.toLowerCase().includes(q)) ||
        service.itemGroups.some((g) =>
          g.entries.some((entry) => entry.toLowerCase().includes(q))
        )
      );
    });
  }, [activeTab, query]);

  return (
    <section id="services" className="py-10 sm:py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-gradient-to-r from-teal-50 to-sky-50 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-teal-800 border border-teal-200">
              Complete Service Menu &amp; Specs
            </span>
            <h2 className="font-display mt-2.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0A2240]">
              Everything Your Home, Office &amp; Wardrobe Needs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Tap any folder below on mobile to inspect items and drying times, or open{' '}
              <strong className="font-semibold text-slate-800">Details</strong> for full specs.
            </p>
          </div>

          {selectedServiceIds.length > 0 && (
            <button
              type="button"
              onClick={onJumpToQuote}
              className="hidden sm:inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 px-5 py-3 text-sm font-semibold text-white shadow-md hover:from-teal-800 hover:to-cyan-800 transition-all cursor-pointer lg:self-auto"
            >
              Continue with {selectedServiceIds.length}{' '}
              {selectedServiceIds.length === 1 ? 'Service' : 'Services'} →
            </button>
          )}
        </div>

        <div className="mt-5 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="no-scrollbar flex w-full max-w-full gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:inline-flex sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-1.5 sm:shadow-xs"
            role="tablist"
            aria-label="Service categories"
          >
            {[
              { id: 'all', label: 'All 10 Services' },
              { id: 'cleaning', label: 'Mobile Cleaning (5)' },
              { id: 'garment', label: 'Laundry & Dyeing (5)' },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChangeTab(tab.id as 'all' | ServicePillar)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-[#00388B] to-[#1E7A34] text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-600 sm:border-0 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mattress, saree, sneakers..."
              aria-label="Search services"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/15"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm sm:text-base font-semibold text-slate-800">
              No matching service found for &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Try searching for carpet, couch, Indian outfit, duvet, dye, or sneakers.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onChangeTab('all');
              }}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Show All Services
            </button>
          </div>
        ) : (
          <>
            {/* MOBILE COMPACT ACCORDION FOLDERS (< md) */}
            <div className="mt-5 space-y-2.5 md:hidden">
              {filteredServices.map((service: ServiceItem) => {
                const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
                const isSelected = selectedServiceIds.includes(service.id);
                const isExpanded =
                  expandedMobileId === service.id || highlightedServiceId === service.id;
                const theme = COLOR_THEMES[service.color];

                return (
                  <div
                    id={`service-mobile-${service.id}`}
                    key={service.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                      isSelected
                        ? 'border-teal-600 ring-1 ring-teal-500/25 shadow-sm'
                        : 'border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 p-3">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedMobileId((curr) => (curr === service.id ? null : service.id))
                        }
                        className="flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-sm font-bold leading-snug text-[#0A2240]">
                            {service.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                            {service.priceFrom && (
                              <span className="text-[11px] font-extrabold text-[#1E7A34]">
                                {service.priceFrom}
                              </span>
                            )}
                            <span className="hidden sm:inline text-[10px] text-slate-600">
                              · {service.modeTag}
                            </span>
                          </div>
                        </div>
                      </button>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => onToggleService(service.id)}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                            isSelected
                              ? `${theme.pillBg} text-white`
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                          <span>{isSelected ? 'Added' : 'Quote'}</span>
                        </button>
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedMobileId((curr) =>
                              curr === service.id ? null : service.id
                            )
                          }
                          aria-label={`Toggle ${service.title} details`}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-600 cursor-pointer"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? 'rotate-180 text-[#00388B]' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/70 px-3.5 py-3 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-600 mb-2">
                          <Clock className={`h-3.5 w-3.5 ${theme.iconText}`} />
                          <span>{service.turnaround}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{service.description}</p>
                        <ul className="mt-2.5 space-y-1">
                          {service.items.map((item) => (
                            <li key={item} className="flex items-start gap-1.5 text-slate-700">
                              <span
                                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${theme.pillBg}`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={() => onOpenDetail(service)}
                          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-[#00388B]"
                        >
                          <Info className="h-3.5 w-3.5" />
                          Open Full Care Process &amp; Prices
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DESKTOP 3-COLUMN GRID (md+) */}
            <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service: ServiceItem) => {
                const Icon = SERVICE_ICONS[service.id] ?? Sparkles;
                const isSelected = selectedServiceIds.includes(service.id);
                const isHighlighted = highlightedServiceId === service.id;
                const theme = COLOR_THEMES[service.color];

                return (
                  <article
                    id={`service-${service.id}`}
                    key={service.id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all ${
                      isHighlighted
                        ? `${theme.ring} ring-4 shadow-xl`
                        : isSelected
                        ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-lg shadow-teal-900/5'
                        : 'border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-lg'
                    }`}
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${theme.topBar}`} />

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${theme.iconBg} ${theme.iconText} ${theme.iconHoverBg}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                              {service.modeTag}
                            </span>
                            {service.highlight && (
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                              >
                                {service.highlight}
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-display mt-5 text-xl font-bold text-[#0A2240]">
                          {service.title}
                        </h3>
                        <p className={`mt-0.5 text-xs font-semibold uppercase tracking-wide ${theme.pillText}`}>
                          {service.subtitle}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-100">
                            <Clock className={`h-3.5 w-3.5 ${theme.iconText}`} />
                            <span>{service.turnaround}</span>
                          </div>
                          {service.priceFrom && (
                            <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-[#1E7A34] border border-emerald-200">
                              {service.priceFrom}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          {service.description}
                        </p>

                        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                          {service.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-slate-700"
                            >
                              <span
                                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${theme.pillBg}`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 grid grid-cols-5 gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenDetail(service)}
                          className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Info className="h-4 w-4 text-slate-500" />
                          Details
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleService(service.id)}
                          className={`col-span-3 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? `${theme.pillBg} text-white shadow-sm`
                              : 'bg-slate-900 text-white hover:bg-teal-700'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-4 w-4" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" />
                              Add to Quote
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
