import { useState } from 'react';
import { Star, ChevronDown, Quote, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, FAQS, REVIEW_HIGHLIGHTS } from '../data/business';

export function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>
                {BUSINESS_INFO.rating} / 5 from {BUSINESS_INFO.reviewCount} Google Reviews
              </span>
            </div>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-4xl">
              Praised for Turnaround, Pricing &amp; Deep Results
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="max-w-md text-sm text-slate-600 md:text-right">
              Customers across Lenasia and Johannesburg consistently highlight our fast turnaround
              times, fair pricing, and visible restoration on mattresses, sofas, and office spaces.
            </p>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#00388B] hover:border-[#0095DA] hover:bg-sky-50 transition-colors"
            >
              <span>View Google Maps Profile (4.9★)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEW_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-teal-600/40" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              </div>
              <div className="mt-5 border-t border-slate-200/80 pt-3">
                <p className="text-xs font-bold text-[#0B1F3A]">{item.author}</p>
                <p className="text-xs text-teal-700 font-medium">{item.service}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="faq" className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
              Frequently Asked Questions
            </span>
            <h3 className="font-display mt-3 text-2xl font-extrabold text-[#0B1F3A] sm:text-3xl">
              Quick Answers Before You Book
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Have a specific stain, fabric label, or commercial office quote? Message us directly on
              WhatsApp at{' '}
              <a
                href={BUSINESS_INFO.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 underline underline-offset-2"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#0B1F3A] hover:bg-slate-100/70 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal-700 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200/80 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
