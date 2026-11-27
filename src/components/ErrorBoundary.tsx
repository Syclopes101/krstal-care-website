import { Component, type ReactNode } from 'react';
import { BUSINESS_INFO } from '../data/business';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12 text-center text-[#0F172A]">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <h1 className="font-display text-xl font-extrabold text-[#002B6B]">
              Krystal Care Cleaners (Pty) Ltd
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Something went wrong displaying this page. Tap below to reload or message us
              directly on WhatsApp for an instant quote.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full rounded-xl bg-[#00388B] px-4 py-2.5 text-sm font-bold text-white cursor-pointer"
              >
                Reload Page
              </button>
              <a
                href={BUSINESS_INFO.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#1E7A34] px-4 py-2.5 text-sm font-bold text-white"
              >
                WhatsApp: {BUSINESS_INFO.phoneLocal}
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
