import { useState, useMemo, type FormEvent } from 'react';
import {
  Check,
  MessageCircle,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  Copy,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  COLOR_THEMES,
  RATE_CARD_SECTIONS,
  SERVICE_CATALOG,
} from '../data/business';

interface QuoteBuilderProps {
  selectedServiceIds: string[];
  itemizedQuantities: Record<string, number>;
  onToggleService: (id: string) => void;
  onClearServices: () => void;
  onClearQuantities: () => void;
}

type ServiceMode = 'Mobile Onsite Cleaning' | 'Collection & Delivery' | 'Drop-off at Lenasia Branch';
type FrequencyType = 'Once-off Service' | 'Weekly / Bi-weekly Regular' | 'Monthly Commercial Contract';

const SUBURBS = [
  'Lenasia / Lenasia South',
  'Joburg South',
  'Sandton',
  'Rosebank',
  'Randburg',
  'East Rand',
  'Midrand / Other Gauteng',
];

export function QuoteBuilder({
  selectedServiceIds,
  itemizedQuantities,
  onToggleService,
  onClearServices,
  onClearQuantities,
}: QuoteBuilderProps) {
  const [mode, setMode] = useState<ServiceMode>('Mobile Onsite Cleaning');
  const [frequency, setFrequency] = useState<FrequencyType>('Once-off Service');
  const [suburb, setSuburb] = useState(SUBURBS[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedNames = SERVICE_CATALOG.filter((s) => selectedServiceIds.includes(s.id)).map(
    (s) => s.title
  );

  const { pricedItemsList, estimatedTotal } = useMemo(() => {
    const list: { label: string; subtotalText: string }[] = [];
    let total = 0;

    for (const cat of RATE_CARD_SECTIONS) {
      for (const item of cat.items) {
        const qty = itemizedQuantities[item.id] ?? 0;
        if (qty > 0) {
          if (item.priceValue !== null) {
            const sub = item.priceValue * qty;
            total += sub;
            list.push({
              label: `${qty}× ${item.name} (${item.priceLabel})`,
              subtotalText: `R${sub.toLocaleString('en-ZA')}`,
            });
          } else {
            list.push({
              label: `${qty}× ${item.name}`,
              subtotalText: item.priceLabel,
            });
          }
        }
      }
    }

    return { pricedItemsList: list, estimatedTotal: total };
  }, [itemizedQuantities]);

  const buildSummaryText = () => {
    const servicesText =
      selectedNames.length > 0 ? selectedNames.join(', ') : 'General Cleaning / Laundry Enquiry';
    const itemsLine =
      pricedItemsList.length > 0
        ? `• Priced Items: ${pricedItemsList
            .map((p) => `${p.label} = ${p.subtotalText}`)
            .join('; ')}${
            estimatedTotal > 0 ? ` (Est. Total: R${estimatedTotal.toLocaleString('en-ZA')})` : ''
          }`
        : null;

    const lines = [
      `Hi Krystal Care Cleaners, I would like a quote/booking:`,
      `• Services: ${servicesText}`,
      itemsLine,
      `• Service Type: ${mode}`,
      `• Frequency: ${frequency}`,
      `• Area: ${suburb}`,
      preferredDate ? `• Preferred Date: ${preferredDate}` : null,
      name ? `• Name: ${name}` : null,
      phone ? `• Phone: ${phone}` : null,
      notes ? `• Details: ${notes}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const whatsappUrl = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
    buildSummaryText()
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ref = `KCC-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  return (
    <section
      id="quote"
      className="py-16 sm:py-24 bg-gradient-to-br from-[#ECFEFF] via-[#F1F5F9] to-[#EEF2FF] border-t border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00388B] to-[#1E7A34] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Fast Booking &amp; Quote
            </span>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0A2240] sm:text-4xl">
              Request Your Instant Quote or Mobile Booking
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Choose the services you need and send your request directly via WhatsApp or email for
              the fastest response, or generate a booking summary for our team.
            </p>

            <div className="mt-8 rounded-2xl border border-teal-200/80 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                What helps us quote accurately
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <span>Number of rooms, couch seats, or mattress size (3/4, Single–King)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>Garment type (e.g. suit, Indian outfit, wedding dress, dye item)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                  <span>Your Johannesburg suburb &amp; whether you need mobile or collection</span>
                </li>
              </ul>

              <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col gap-2.5">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-[#0A2240] hover:border-teal-600 hover:bg-teal-50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-teal-700" />
                  Call Us: {BUSINESS_INFO.phoneDisplay}
                </a>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#00388B] hover:border-[#0095DA] hover:bg-sky-50 transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#0095DA]" />
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
            >
              <div className="h-2 w-full bg-gradient-to-r from-[#00388B] via-[#0095DA] to-[#2E9E36]" />
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-[#0A2240]">
                    1. Select Services ({selectedServiceIds.length} selected)
                  </h3>
                  {selectedServiceIds.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearServices}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {SERVICE_CATALOG.map((service) => {
                    const selected = selectedServiceIds.includes(service.id);
                    const theme = COLOR_THEMES[service.color];
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => onToggleService(service.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          selected
                            ? `${theme.pillBg} text-white shadow-xs`
                            : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-500 hover:bg-teal-50'
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                        {service.title}
                      </button>
                    );
                  })}
                </div>

                {/* Live Estimator Items Carried Over */}
                {pricedItemsList.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1E7A34]">
                        Priced Items from Rate Card
                      </span>
                      <button
                        type="button"
                        onClick={onClearQuantities}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        Reset items
                      </button>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-800">
                      {pricedItemsList.map((entry) => (
                        <li key={entry.label} className="flex items-center justify-between gap-2">
                          <span>{entry.label}</span>
                          <span className="font-bold text-[#002B6B]">{entry.subtotalText}</span>
                        </li>
                      ))}
                    </ul>
                    {estimatedTotal > 0 && (
                      <div className="mt-2.5 flex items-center justify-between border-t border-emerald-200/80 pt-2 text-sm font-extrabold text-[#1E7A34]">
                        <span>Estimated ZAR Total</span>
                        <span>R{estimatedTotal.toLocaleString('en-ZA')}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      2. Service Mode
                    </label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as ServiceMode)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    >
                      <option value="Mobile Onsite Cleaning">Mobile Onsite Cleaning</option>
                      <option value="Collection & Delivery">Collection &amp; Delivery</option>
                      <option value="Drop-off at Lenasia Branch">
                        Drop-off at Lenasia Branch (14 Dharwar St)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      3. Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    >
                      <option value="Once-off Service">Once-off Service</option>
                      <option value="Weekly / Bi-weekly Regular">Weekly / Bi-weekly Regular</option>
                      <option value="Monthly Commercial Contract">
                        Monthly Commercial / Office Contract
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      4. Johannesburg / Gauteng Area
                    </label>
                    <select
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    >
                      {SUBURBS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-date"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Preferred Day / Turnaround
                    </label>
                    <input
                      id="quote-date"
                      type="text"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      placeholder="e.g. Saturday morning or ASAP"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Your Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Patel"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="quote-notes"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      Item Details &amp; Notes (Optional)
                    </label>
                    <textarea
                      id="quote-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. 1x L-shaped fabric couch, 1x Queen mattress, 2x Indian outfits, 2 pairs of sneakers..."
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/15"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E7A34] to-teal-700 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send Quote via WhatsApp
                  </a>
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#002B6B] px-5 py-3.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    Prepare Booking Summary
                  </button>
                </div>

                {submittedRef && (
                  <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50/90 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#0A2240]">
                          Booking Summary Ready ({submittedRef})
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Send this pre-filled request straight to our team on WhatsApp or copy it to
                          share by email/SMS.
                        </p>
                        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-teal-200/80 bg-white p-3 text-xs text-slate-700 font-sans">
                          {buildSummaryText()}
                        </pre>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E7A34] px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Open in WhatsApp
                          </a>
                          <button
                            type="button"
                            onClick={handleCopySummary}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {copied ? 'Copied!' : 'Copy Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
