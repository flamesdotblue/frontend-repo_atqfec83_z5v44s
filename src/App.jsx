import React, { useMemo, useState } from 'react';
import HeroSplineCover from './components/HeroSplineCover';
import SectionHeader from './components/SectionHeader';
import ClusterCarousel from './components/ClusterCarousel';
import IntegrationModal from './components/IntegrationModal';

const App = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const clusters = useMemo(() => {
    return [
      {
        title: 'Checkout & Auth',
        caption: 'Frictionless checkout experiences with 1-tap prefill and secure flows',
        items: [
          { name: 'Shopify', type: 'Plugin', tagline: 'Native checkout extensions', category: 'Checkout / Auth', brands: ['Mamaearth', 'MyGlamm'], metric: '+22% conversions', description: 'Plug-and-play checkout with phone-first login and optimized flows for Indian shoppers.' },
          { name: 'WooCommerce', type: 'Plugin', tagline: 'WP-native checkout blocks', category: 'Checkout / Auth', brands: ['Mamaearth', 'MyGlamm'], metric: '+18% AOV', description: 'Seamless WordPress commerce integration with GoKwik smart checkout.' },
          { name: 'Magento', type: 'Plugin', tagline: 'Enterprise-grade checkout', category: 'Checkout / Auth', brands: ['Mamaearth'], metric: '+15% speed', description: 'Robust enterprise checkout with custom flows and accelerated performance.' },
          { name: 'KwikPass', type: 'SDK', tagline: '1-tap login and auth', category: 'Checkout / Auth', brands: ['MyGlamm'], metric: '-30% drop-offs', description: 'Phone-first authentication to reduce friction and improve conversion.' },
        ],
      },
      {
        title: 'Payments',
        caption: 'Multi-gateway & rewards-led payments for higher success rates',
        items: [
          { name: 'Razorpay', type: 'API', tagline: 'Gateway + UPI optimization', category: 'Payments', brands: ['Boat', 'SleepyCat'], metric: '+12% payment success', description: 'Intelligent routing and UPI-first flows for best-in-class success rates.' },
          { name: 'CRED', type: 'Plugin', tagline: 'Rewards at checkout', category: 'Payments', brands: ['Boat'], metric: '+7% prepaid uptake', description: 'Delight consumers with rewards-powered checkout to lift prepaid adoption.' },
          { name: 'Visa', type: 'API', tagline: 'Card tokenization & more', category: 'Payments', brands: ['SleepyCat'], metric: 'Lower fraud rates', description: 'Secure card experiences powered by tokenization and enhanced security.' },
        ],
      },
      {
        title: 'Marketing / CRM',
        caption: 'Intelligent re-engagement to maximize LTV across channels',
        items: [
          { name: 'MoEngage', type: 'API', tagline: 'Journey orchestration', category: 'Marketing / CRM', brands: ['The Man Company', 'Noise'], metric: '+16% repeat buyers', description: 'Trigger personalized journeys based on checkout and payment signals.' },
          { name: 'Netcore', type: 'API', tagline: 'Omnichannel engagement', category: 'Marketing / CRM', brands: ['Noise'], metric: '+11% CTR', description: 'Email, SMS, and push marketing powered by conversion data.' },
        ],
      },
      {
        title: 'Recovery / Messaging',
        caption: 'WhatsApp automation to recover COD and payment drop-offs',
        items: [
          { name: 'QuickReply', type: 'API', tagline: 'WhatsApp recovery', category: 'Recovery / Messaging', brands: ['Power Gummies'], metric: '+9% recovered orders', description: 'Automated nudges on WhatsApp to recover abandonments frictionlessly.' },
          { name: 'KwikChat', type: 'SDK', tagline: 'Conversational commerce', category: 'Recovery / Messaging', brands: ['Power Gummies'], metric: '+5% conversions', description: 'Chat-led recovery and support built into your checkout experience.' },
        ],
      },
      {
        title: 'Analytics / BI',
        caption: 'Conversion event tracking and pipelines to your data stack',
        items: [
          { name: 'GTM', type: 'Plugin', tagline: 'Tag manager events', category: 'Analytics / BI', brands: ['Plum Goodness'], metric: 'Faster insights', description: 'Stream checkout events into GTM for flexible tracking and experiments.' },
          { name: 'Segment', type: 'API', tagline: 'CDP integration', category: 'Analytics / BI', brands: ['Plum Goodness'], metric: 'Unified profiles', description: 'Pipe events to your CDP for attribution, cohorts, and analytics.' },
        ],
      },
      {
        title: 'Shipping / Logistics',
        caption: 'Automated dispatch and tracking for efficient fulfillment',
        items: [
          { name: 'KwikShip', type: 'API', tagline: 'Smart allocation', category: 'Shipping / Logistics', brands: ['Wow Skin Science'], metric: '-12% RTO', description: 'Allocate carriers using conversion-informed rules to reduce RTO.' },
          { name: 'Base', type: 'API', tagline: 'Unified tracking', category: 'Shipping / Logistics', brands: ['Wow Skin Science'], metric: 'Happier CX', description: 'Transparent tracking and faster dispatch with proactive alerts.' },
        ],
      },
    ];
  }, []);

  return (
    <div className="font-inter text-[#101828]">
      <HeroSplineCover />
      <SectionHeader />

      {clusters.map((c) => (
        <ClusterCarousel key={c.title} title={c.title} caption={c.caption} items={c.items} onSelect={handleSelect} />
      ))}

      <IntegrationModal open={open} onClose={() => setOpen(false)} data={selected} />

      <footer className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 py-10 text-[13px] text-[#667085]">
        Accessibility: All controls are keyboard-friendly. Reduced motion settings will limit animations. Carousels are drag/scroll enabled and support arrow keys.
      </footer>
    </div>
  );
};

export default App;
