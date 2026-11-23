import { useState, useMemo } from 'react';
import {
  Plus,
  Minus,
  Check,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  Columns2,
  ZoomIn,
  X,
  MessageCircle,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  COLOR_THEMES,
  RATE_CARD_SECTIONS,
  type RateCardCategory,
} from '../data/business';

interface RateCardAndResultsProps {
  quantities: Record<string, number>;
  onChangeQuantity: (itemId: string, delta: number) => void;
  onApplyEstimateToQuote: (serviceIdToSelect?: string) => void;
}

export function RateCardAndResults({
  quantities,
  onChangeQuantity,
  onApplyEstimateToQuote,
}: RateCardAndResultsProps) {
  const [activeRateTab, setActiveRateTab] =
    useState<RateCardCategory['id']>('upholstery-carpet');
  const [comparisonView, setComparisonView] = useState<'slider' | 'side-by-side'>('slider');
  const [sliderPos, setSliderPos] = useState<number>(52);
  const [zoomedPoster, setZoomedPoster] = useState<{ src: string; title: string } | null>(null);

  const activeCategory = useMemo(
    () => RATE_CARD_SECTIONS.find((c) => c.id === activeRateTab) ?? RATE_CARD_SECTIONS[0],
    [activeRateTab]
  );

  const { itemCount, estimatedTotal, hasQuoteOnlyItems, selectedSummary } = useMemo(() => {
    let count = 0;
    let total = 0;
    let quoteOnly = false;
    const summary: { id: string; name: string; qty: number; subtotal: number | null; priceLabel: string }[] = [];

    for (const cat of RATE_CARD_SECTIONS) {
      for (const item of cat.items) {
        const qty = quantities[item.id] ?? 0;
        if (qty > 0) {
          count += qty;
          const subtotal = item.priceValue !== null ? item.priceValue * qty : null;
          if (subtotal !== null) {
            total += subtotal;
          } else {
            quoteOnly = true;
          }
          summary.push({
            id: item.id,
            name: item.name,
            qty,
            subtotal,
            priceLabel: item.priceLabel,
          });
        }
      }
    }
    return {
      itemCount: count,
      estimatedTotal: total,
      hasQuoteOnlyItems: quoteOnly,
      selectedSummary: summary,
    };
  }, [quantities]);

  const directWhatsappUrl = useMemo(() => {
    if (selectedSummary.length === 0) {
      return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
        'Hi Krystal Care Cleaners, I would like a quote/booking.'
      )}`;
    }
    const itemsText = selectedSummary
      .map((s) =>
        s.subtotal !== null
          ? `• ${s.qty}× ${s.name}: R${s.subtotal.toLocaleString('en-ZA')}`
          : `• ${s.name} (${s.priceLabel})`
      )
      .join('\n');
    const totalLine =
      estimatedTotal > 0
        ? `\nEstimated Total: R${estimatedTotal.toLocaleString('en-ZA')}${
            hasQuoteOnlyItems ? ' + quoted items' : ''
          }`
        : '';
    return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
      `Hi Krystal Care Cleaners, I would like to book this estimate:\n${itemsText}${totalLine}`
    )}`;
  }, [selectedSummary, estimatedTotal, hasQuoteOnlyItems]);

  const theme = COLOR_THEMES[activeCategory.color];

  return (
    <section
      id="pricing-results"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#F8FAFC] to-[#EFF6FF]/60 border-y border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1E7A34] border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Real Work Results &amp; Transparent ZAR Pricing
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#002B6B] sm:text-4xl">
            Proven Before &amp; After Transformations + Official Price Menu
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Slide across our real Persian rug stain-removal work, inspect genuine carpet and curtain
            results, and tap <strong className="font-semibold text-slate-800">+ / −</strong> on our
            official ZAR rates below to send an instant WhatsApp estimate.
          </p>
        </div>

        {/* PART 1: REAL BEFORE & AFTER GALLERY */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Interactive Persian Rug Before & After Slider / Side-by-Side */}
          <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
              <div>
                <span className="inline-block rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-bold text-[#00388B] border border-sky-200">
                  Interactive Real Job Comparison
                </span>
                <h3 className="font-display mt-1 text-lg font-bold text-[#002B6B]">
                  Persian Medallion Rug Stain Removal
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setComparisonView((v) => (v === 'slider' ? 'side-by-side' : 'slider'))
                  }
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {comparisonView === 'slider' ? (
                    <>
                      <Columns2 className="h-3.5 w-3.5 text-[#00388B]" />
                      Side-by-Side
                    </>
                  ) : (
                    <>
                      <SlidersHorizontal className="h-3.5 w-3.5 text-[#00388B]" />
                      Slider View
                    </>
                  )}
                </button>

                {comparisonView === 'slider' && (
                  <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSliderPos(92)}
                      className={`rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                        sliderPos > 75 ? 'bg-white text-[#002B6B] shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPos(50)}
                      className={`rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                        sliderPos >= 25 && sliderPos <= 75
                          ? 'bg-white text-[#002B6B] shadow-2xs'
                          : 'text-slate-600'
                      }`}
                    >
                      50/50
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPos(8)}
                      className={`rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                        sliderPos < 25 ? 'bg-[#1E7A34] text-white shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      After
                    </button>
                  </div>
                )}
              </div>
            </div>

            {comparisonView === 'slider' ? (
              <div className="relative aspect-[4/3] w-full select-none overflow-hidden bg-slate-100">
                {/* AFTER (full base layer) */}
                <img
                  src={`${import.meta.env.BASE_URL}images/real-persian-after.jpg`}
                  alt="Persian medallion rug after deep extraction cleaning by Krystal Care Cleaners"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-[#1E7A34]/95 px-3 py-1 text-xs font-bold text-white shadow">
                  AFTER · Spotless
                </span>

                {/* BEFORE (clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-persian-before.jpg`}
                    alt="Persian medallion rug before cleaning showing heavy dark corner stains"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold text-white shadow">
                    BEFORE · Heavily Soiled
                  </span>
                </div>

                {/* Divider handle */}
                <div
                  className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#00388B] text-white shadow-lg">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Drag to compare Persian rug before and after cleaning"
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-persian-before.jpg`}
                    alt="Persian medallion rug before cleaning"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-slate-900/85 px-2.5 py-0.5 text-[11px] font-bold text-white">
                    BEFORE
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-persian-after.jpg`}
                    alt="Persian medallion rug after cleaning"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-[#1E7A34]/95 px-2.5 py-0.5 text-[11px] font-bold text-white">
                    AFTER · Spotless
                  </span>
                </div>
              </div>
            )}

            <p className="px-5 py-3 text-xs font-medium text-slate-500 bg-slate-50/70">
              {comparisonView === 'slider'
                ? 'Drag left or right across the rug to compare before & after hot-water extraction.'
                : 'Side-by-side comparison of the same Persian medallion rug before and after extraction.'}
            </p>
          </div>

          {/* Original Carpet, Curtain & Shaggy Rug Results */}
          <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="text-xs font-bold text-[#002B6B]">
                    Living Room Carpet Extraction
                  </span>
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-800 border border-sky-200">
                    From R400 / room
                  </span>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}images/original-carpet-ba.png`}
                  alt="Before and after living room carpet deep extraction"
                  className="aspect-[4/3] w-full rounded-xl object-contain bg-white"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                High-traffic dirt &amp; pet stains extracted back to uniform ivory pile.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="text-xs font-bold text-[#002B6B]">
                    Drapery &amp; Curtain Refresh
                  </span>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-800 border border-indigo-200">
                    Onsite / Workshop
                  </span>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}images/original-curtain-ba.png`}
                  alt="Before and after curtain deep cleaning"
                  className="aspect-[4/3] w-full rounded-xl object-contain bg-white"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Lifts years of sunlight grime &amp; dust without shrinking lined drapes.
              </p>
            </div>

            <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="grid items-center gap-4 sm:grid-cols-12">
                <img
                  src={`${import.meta.env.BASE_URL}images/original-rug.jpg`}
                  alt="Freshly deep-cleaned charcoal shaggy living room rug"
                  className="sm:col-span-5 aspect-[16/10] w-full rounded-xl object-cover"
                />
                <div className="sm:col-span-7 px-1">
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-[#1E7A34] border border-emerald-200">
                    Plush &amp; Shaggy Rugs
                  </span>
                  <h4 className="font-display mt-2 text-base font-bold text-[#002B6B]">
                    Deep-Pile Grooming &amp; Odour Removal
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    We flush deep grit out of thick shaggy rugs, wool carpets, and lounge runners so
                    they feel soft underfoot and dry within hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: OFFICIAL ZAR RATE CARD + FLYERS */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Interactive Rate Menu & Estimator */}
          <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className={`h-2 w-full bg-gradient-to-r ${theme.topBar}`} />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-[#002B6B]">
                    Official Price Menu &amp; Quick Estimator
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Tap <strong className="text-[#002B6B]">+</strong> next to any item to calculate
                    your ZAR estimate or send straight to WhatsApp.
                  </p>
                </div>
                {itemCount > 0 && (
                  <div className="rounded-2xl bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-4 py-2.5 text-white shadow-sm">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-sky-100">
                      Estimated Total ({itemCount} {itemCount === 1 ? 'selected' : 'selected'})
                    </span>
                    <span className="font-display text-xl font-extrabold">
                      {estimatedTotal > 0
                        ? `R${estimatedTotal.toLocaleString('en-ZA')}${
                            hasQuoteOnlyItems ? ' + quoted' : ''
                          }`
                        : 'Quote on Request'}
                    </span>
                  </div>
                )}
              </div>

              {/* 4 Category Tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {RATE_CARD_SECTIONS.map((cat) => {
                  const isActive = cat.id === activeRateTab;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveRateTab(cat.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#002B6B] text-white shadow-sm'
                          : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-[#0095DA] hover:bg-sky-50'
                      }`}
                    >
                      {cat.id === 'upholstery-carpet'
                        ? 'Couches, Carpets & Curtains'
                        : cat.id === 'dry-cleaning'
                        ? 'Dry Cleaning'
                        : cat.id === 'dye-services'
                        ? 'Dye Services'
                        : 'Laundry'}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Header */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <div>
                  <h4 className="font-display text-base font-bold text-[#002B6B]">
                    {activeCategory.title}
                  </h4>
                  <p className="text-xs text-slate-500">{activeCategory.subtitle}</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                >
                  {activeCategory.badge}
                </span>
              </div>

              {/* Price Items Grid */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {activeCategory.items.map((item) => {
                  const qty = quantities[item.id] ?? 0;
                  const isQuoteOnly = item.priceValue === null;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${
                        qty > 0
                          ? 'border-[#1E7A34] bg-emerald-50/40 ring-1 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-[#002B6B]">{item.name}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-sm font-extrabold text-[#1E7A34]">
                            {item.priceLabel}
                          </span>
                          {item.unitNote && (
                            <span className="text-[11px] text-slate-400">· {item.unitNote}</span>
                          )}
                        </div>
                      </div>

                      {isQuoteOnly ? (
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(item.id, qty > 0 ? -1 : 1)}
                          className={`inline-flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                            qty > 0
                              ? 'bg-[#1E7A34] text-white'
                              : 'border border-slate-200 bg-slate-50 text-[#00388B] hover:border-[#0095DA] hover:bg-sky-50'
                          }`}
                        >
                          {qty > 0 ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              Add Quote
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onChangeQuantity(item.id, -1)}
                            disabled={qty === 0}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-35 cursor-pointer disabled:cursor-default"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[#002B6B]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onChangeQuantity(item.id, 1)}
                            aria-label={`Add ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00388B] text-white hover:bg-[#1E7A34] transition-colors cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Estimator Action Bar */}
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
                <div className="text-xs sm:text-sm text-slate-700">
                  {selectedSummary.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#1E7A34] shrink-0" />
                      <span className="font-semibold text-[#002B6B]">
                        {selectedSummary
                          .map((s) =>
                            s.subtotal !== null ? `${s.qty}× ${s.name}` : `${s.name} (Quoted)`
                          )
                          .join(', ')}
                      </span>
                    </div>
                  ) : (
                    <span>
                      Select items above to calculate an instant estimate, or request a custom site
                      quote.
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E7A34] to-teal-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:opacity-95 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {estimatedTotal > 0
                        ? `Send R${estimatedTotal.toLocaleString('en-ZA')} Estimate to WhatsApp`
                        : 'Send Estimate to WhatsApp'}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onApplyEstimateToQuote(activeCategory.serviceId)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00388B]/25 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#002B6B] hover:bg-sky-50 transition-all cursor-pointer"
                  >
                    <span>Add Date &amp; Suburb in Form</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Official Brand Flyers Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0095DA]">
                    Official Service Posters
                  </p>
                  <h4 className="font-display text-lg font-bold text-[#002B6B]">
                    Tap Flyers to Enlarge
                  </h4>
                </div>
                <a
                  href={BUSINESS_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-[#1E7A34] border border-emerald-200"
                >
                  <MessageCircle className="h-3 w-3" />
                  077 247 3275
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setZoomedPoster({
                      src: `${import.meta.env.BASE_URL}images/real-poster-cleaning.jpg`,
                      title: 'Krystal Care Cleaners — Home & Office Cleaning Services',
                    })
                  }
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left cursor-pointer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/real-poster-cleaning.jpg`}
                    alt="Krystal Care Cleaners official cleaning services poster"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#002B6B]/85 text-white shadow">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setZoomedPoster({
                      src: `${import.meta.env.BASE_URL}images/original-dye-flyer.png`,
                      title: 'Krystal Care Cleaners — Bring Colour Back to Life! Dye Services',
                    })
                  }
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left cursor-pointer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/original-dye-flyer.png`}
                    alt="Krystal Care Cleaners official Dye Services ZAR price flyer"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1E7A34]/90 text-white shadow">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Email enquiries:{' '}
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="font-semibold text-[#00388B] hover:underline"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Flyer Lightbox Modal */}
      {zoomedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomedPoster(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-2 pb-2">
              <p className="text-xs font-bold text-[#002B6B]">{zoomedPoster.title}</p>
              <button
                type="button"
                onClick={() => setZoomedPoster(null)}
                aria-label="Close flyer preview"
                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={zoomedPoster.src}
              alt={zoomedPoster.title}
              className="max-h-[78vh] w-full rounded-2xl object-contain bg-slate-50"
            />
          </div>
        </div>
      )}
    </section>
  );
}
