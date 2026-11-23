import { useEffect } from 'react';
import { X, CheckCircle2, Clock, Sparkles, MessageCircle, Plus, Check, Shield } from 'lucide-react';
import { BUSINESS_INFO, COLOR_THEMES, type ServiceItem } from '../data/business';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleService: (id: string) => void;
  onBookService: (id: string) => void;
}

export function ServiceDetailModal({
  service,
  isSelected,
  onClose,
  onToggleService,
  onBookService,
}: ServiceDetailModalProps) {
  useEffect(() => {
    if (!service) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [service, onClose]);

  if (!service) return null;

  const theme = COLOR_THEMES[service.color];
  const whatsappServiceUrl = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
    `Hi Krystal Care Cleaners, I would like a quote/details for: ${service.title}.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-2.5 w-full bg-gradient-to-r ${theme.topBar}`} />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-bold ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                >
                  {service.pillar === 'cleaning'
                    ? 'Mobile Home & Office Cleaning'
                    : 'Laundry & Garment Care'}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">
                  {service.modeTag}
                </span>
              </div>
              <h3
                id="service-modal-title"
                className="font-display mt-3 text-2xl font-extrabold text-[#0B1F3A] sm:text-3xl"
              >
                {service.title}
              </h3>
              <p className={`mt-1 text-sm font-semibold ${theme.pillText}`}>{service.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {service.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Cleaning Method
                </p>
                <p className="text-xs font-semibold text-slate-800">{service.method}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText}`}
              >
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Turnaround / Dry Time
                </p>
                <p className="text-xs font-semibold text-slate-800">{service.turnaround}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500">
              Complete Item Breakdown
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.itemGroups.map((group) => (
                <div
                  key={group.groupName}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4"
                >
                  <p className="text-xs font-bold text-[#0B1F3A]">{group.groupName}</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {group.entries.map((entry) => (
                      <li key={entry} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${theme.iconText}`} />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500">
              Our 4-Step Care Process
            </h4>
            <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {service.processSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3 text-xs sm:text-sm text-slate-700"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${theme.pillBg}`}
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-teal-200 bg-teal-50/70 p-4 text-xs sm:text-sm text-teal-950">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            <p>
              <strong className="font-semibold">Care Note:</strong> {service.careNote}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-100 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={() => onToggleService(service.id)}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Quote
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add to Quote
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onBookService(service.id)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-4 py-3 text-sm font-bold text-white hover:bg-teal-800 transition-colors cursor-pointer"
            >
              Book This Service
            </button>

            <a
              href={whatsappServiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
