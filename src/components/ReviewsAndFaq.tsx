import { useState } from 'react';
import { Star, ChevronDown, Quote, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, FAQS, REVIEW_HIGHLIGHTS } from '../data/business';

export function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileTab, setMobileTab] = useState<'reviews' | 'faq'>('reviews');

  return (
    <section id="reviews" className="py-10 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-900">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>
                {BUSINESS_INFO.rating} / 5 ({BUSINESS_INFO.reviewCount} Google Reviews)
              </span>
            </div>
            <h2 className="font-display mt-2.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A]">
              Praised for Turnaround &amp; Results
            </h2>
          </div>

          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex self-start md:self-auto items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#00388B] hover:border-[#0095DA] hover:bg-sky-50 transition-colors"
          >
            <span>View Google Maps Profile (4.9★)</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Segmented Switcher: Reviews | FAQs */}
        <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 lg:hidden">
          <button
            type="button"
            aria-pressed={mobileTab === 'reviews'}
            onClick={() => setMobileTab('reviews')}
            className={`rounded-lg py-2 text-xs font-bold transition-colors ${
              mobileTab === 'reviews' ? 'bg-[#002B6B] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Customer Reviews
          </button>
          <button
            type="button"
            aria-pressed={mobileTab === 'faq'}
            onClick={() => setMobileTab('faq')}
            className={`rounded-lg py-2 text-xs font-bold transition-colors ${
              mobileTab === 'faq' ? 'bg-[#002B6B] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Quick FAQs ({FAQS.length})
          </button>
        </div>

        {/* Reviews Grid (Horizontal swipe on mobile, 3-col on desktop) */}
        <div
          className={`${
            mobileTab === 'reviews' ? 'block' : 'hidden lg:block'
          } mt-5 sm:mt-8`}
        >
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {REVIEW_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="flex w-[80vw] max-w-sm shrink-0 snap-start flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 md:w-auto md:max-w-none md:p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-4 w-4 text-teal-600/40" />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-4 border-t border-slate-200/80 pt-3">
                  <p className="text-xs font-bold text-[#0B1F3A]">{item.author}</p>
                  <p className="text-[11px] text-teal-700 font-medium">{item.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div
          id="faq"
          className={`${
            mobileTab === 'faq' ? 'block' : 'hidden lg:grid'
          } mt-6 lg:mt-16 grid gap-8 lg:grid-cols-12`}
        >
          <div className="hidden lg:block lg:col-span-4">
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

          <div className="lg:col-span-8 space-y-2.5">
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
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 text-left font-semibold text-[#0B1F3A] hover:bg-slate-100/70 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-teal-700 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200/80 bg-white px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm leading-relaxed text-slate-600">
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
