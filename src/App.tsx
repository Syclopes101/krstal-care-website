import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesShowcase } from './components/ServicesShowcase';
import { VisualSpotlight } from './components/VisualSpotlight';
import { HowItWorks } from './components/HowItWorks';
import { ServiceAreasAndHours } from './components/ServiceAreasAndHours';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { QuoteBuilder } from './components/QuoteBuilder';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SERVICE_CATALOG, type ServiceItem, type ServicePillar } from './data/business';

export function App() {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    'couch-chair',
    'carpet-rug',
  ]);
  const [activeTab, setActiveTab] = useState<'all' | ServicePillar>('all');
  const [highlightedServiceId, setHighlightedServiceId] = useState<string | null>(null);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  const jumpToQuote = useCallback(() => {
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const toggleService = useCallback((id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const selectPresetAndJump = useCallback(
    (presetIds: string[]) => {
      setSelectedServiceIds((prev) => Array.from(new Set([...prev, ...presetIds])));
      jumpToQuote();
    },
    [jumpToQuote]
  );

  const clearServices = useCallback(() => {
    setSelectedServiceIds([]);
  }, []);

  const handleSelectServiceFromMenu = useCallback((serviceId: string) => {
    const found = SERVICE_CATALOG.find((s) => s.id === serviceId);
    if (!found) return;
    setActiveTab(found.pillar);
    setHighlightedServiceId(serviceId);
    setDetailService(found);

    setTimeout(() => {
      const el = document.getElementById(`service-${serviceId}`) ?? document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 60);

    setTimeout(() => {
      setHighlightedServiceId((curr) => (curr === serviceId ? null : curr));
    }, 3000);
  }, []);

  const handleSelectPillarFromMenu = useCallback((pillar: ServicePillar) => {
    setActiveTab(pillar);
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  }, []);

  const handleBookFromModal = useCallback(
    (serviceId: string) => {
      setSelectedServiceIds((prev) => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
      setDetailService(null);
      setTimeout(() => jumpToQuote(), 80);
    },
    [jumpToQuote]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        selectedCount={selectedServiceIds.length}
        onJumpToQuote={jumpToQuote}
        onSelectServiceFromMenu={handleSelectServiceFromMenu}
        onSelectPillarFromMenu={handleSelectPillarFromMenu}
      />
      <main className="flex-1">
        <Hero
          onJumpToQuote={jumpToQuote}
          onQuickOpenService={handleSelectServiceFromMenu}
        />
        <ServicesShowcase
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          selectedServiceIds={selectedServiceIds}
          highlightedServiceId={highlightedServiceId}
          onToggleService={toggleService}
          onOpenDetail={setDetailService}
          onJumpToQuote={jumpToQuote}
        />
        <VisualSpotlight onSelectPreset={selectPresetAndJump} />
        <HowItWorks />
        <ServiceAreasAndHours />
        <ReviewsAndFaq />
        <QuoteBuilder
          selectedServiceIds={selectedServiceIds}
          onToggleService={toggleService}
          onClearServices={clearServices}
        />
      </main>
      <Footer />
      <ServiceDetailModal
        service={detailService}
        isSelected={detailService ? selectedServiceIds.includes(detailService.id) : false}
        onClose={() => setDetailService(null)}
        onToggleService={toggleService}
        onBookService={handleBookFromModal}
      />
    </div>
  );
}

export default App;
