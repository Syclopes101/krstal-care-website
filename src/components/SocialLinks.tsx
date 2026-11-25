import { Instagram, Facebook } from 'lucide-react';
import { BUSINESS_INFO, SOCIAL_LINKS, type SocialLinkItem } from '../data/business';

function TikTokIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

interface SocialLinksProps {
  variant?: 'dark' | 'light' | 'compact';
}

const PLATFORM_STYLES: Record<
  SocialLinkItem['id'],
  {
    bgDark: string;
    bgLight: string;
  }
> = {
  instagram: {
    bgDark: 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white hover:opacity-90',
    bgLight:
      'border border-pink-200 bg-gradient-to-r from-pink-50 to-amber-50 text-pink-800 hover:border-pink-300',
  },
  facebook: {
    bgDark: 'bg-[#1877F2] text-white hover:bg-[#166FE5]',
    bgLight: 'border border-sky-200 bg-sky-50 text-[#1877F2] hover:border-sky-300',
  },
  tiktok: {
    bgDark: 'bg-slate-900 text-white border border-white/20 hover:bg-slate-800',
    bgLight: 'border border-slate-300 bg-slate-900 text-white hover:bg-slate-800',
  },
};

export function SocialLinks({ variant = 'dark' }: SocialLinksProps) {
  const renderIcon = (id: SocialLinkItem['id'], cls: string) => {
    if (id === 'instagram') return <Instagram className={cls} />;
    if (id === 'facebook') return <Facebook className={cls} />;
    return <TikTokIcon className={cls} />;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5">
        {SOCIAL_LINKS.map((item) => {
          const href =
            item.url ??
            `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
              `Hi Krystal Care Cleaners, please share your ${item.name} page link so I can follow your work!`
            )}`;
          return (
            <a
              key={item.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${item.name} · ${item.handle}`}
              aria-label={`Krystal Care Cleaners on ${item.name}`}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
              {renderIcon(item.id, 'h-3.5 w-3.5')}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIAL_LINKS.map((item) => {
        const href =
          item.url ??
          `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
            `Hi Krystal Care Cleaners, please share your ${item.name} page link so I can follow your work!`
          )}`;
        const styleClass =
          variant === 'dark' ? PLATFORM_STYLES[item.id].bgDark : PLATFORM_STYLES[item.id].bgLight;

        return (
          <a
            key={item.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Krystal Care Cleaners on ${item.name}`}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs transition-all ${styleClass}`}
          >
            {renderIcon(item.id, 'h-3.5 w-3.5')}
            <span>{item.name}</span>
          </a>
        );
      })}
    </div>
  );
}
