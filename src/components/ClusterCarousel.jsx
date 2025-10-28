import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const CENTER_BADGE_SIZE = 56;

const IntegrationTag = ({ label }) => (
  <span className="ml-auto inline-flex items-center px-2 py-1 rounded-md border border-[#E5E7EB] text-[12px] text-[#667085] bg-white">
    {label}
  </span>
);

function useAutoScroll(ref, enabled) {
  useEffect(() => {
    if (!ref.current || !enabled) return;
    let id;
    const el = ref.current;
    const onEnter = () => {
      id = window.setInterval(() => {
        el.scrollLeft += 1;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
          el.scrollLeft = 0;
        }
      }, 16);
    };
    const onLeave = () => {
      if (id) window.clearInterval(id);
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (id) window.clearInterval(id);
    };
  }, [ref, enabled]);
}

const IntegrationCard = ({ item, onSelect, showLineFrom, centerRef }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // SVG line calculation from center badge to card center
  const [line, setLine] = useState(null);
  useEffect(() => {
    if (!hovered || !centerRef.current || !cardRef.current) {
      setLine(null);
      return;
    }
    const centerRect = centerRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    const x1 = centerRect.left + centerRect.width / 2;
    const y1 = centerRect.top + centerRect.height / 2;
    const x2 = cardRect.left + cardRect.width / 2;
    const y2 = cardRect.top + cardRect.height / 2;
    setLine({ x1, y1, x2, y2 });
  }, [hovered, centerRef]);

  return (
    <div className="relative">
      {hovered && line && showLineFrom && (
        <svg className="pointer-events-none fixed inset-0 z-40" width="100vw" height="100vh">
          <defs>
            <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(0,78,235,0.4)" />
              <stop offset="100%" stopColor="rgba(2,122,72,0.4)" />
            </linearGradient>
          </defs>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="url(#glow)" strokeWidth="2" strokeOpacity="0.6" />
        </svg>
      )}

      <motion.button
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => onSelect(item)}
        className="group relative w-[260px] h-[160px] rounded-2xl border border-[#E6E9EE] bg-white shadow-sm hover:shadow-md text-left p-4 flex flex-col gap-2 focus:outline-none focus:ring-2 focus:ring-[#004EEB]"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
            {item.logo ? (
              <img src={item.logo} alt="" className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-[14px] font-semibold text-[#004EEB]">{item.name[0]}</span>
            )}
          </div>
          <div>
            <div className="text-[15px] leading-[22px] font-semibold text-[#101828]">{item.name}</div>
            <div className="text-[13px] leading-[20px] text-[#667085]">{item.tagline}</div>
          </div>
          <IntegrationTag label={item.type} />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[12px] text-[#667085]">Click for details</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#004EEB] group-hover:scale-125 transition" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          initial={false}
          animate={{ borderColor: hovered ? '#004EEB' : 'transparent', boxShadow: hovered ? '0 6px 16px rgba(0,0,0,0.10)' : '0 2px 6px rgba(0,0,0,0.04)' }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'none' }}
        />
      </motion.button>
    </div>
  );
};

const ClusterCarousel = ({ title, caption, items, onSelect }) => {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useAutoScroll(containerRef, !prefersReducedMotion);

  const scrollByAmount = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8) * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const onKeyScroll = (e) => {
    if (e.key === 'ArrowRight') scrollByAmount('right');
    if (e.key === 'ArrowLeft') scrollByAmount('left');
  };

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 py-10">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[20px] leading-[30px] font-semibold text-[#1D2939]">{title}</h3>
          <p className="text-[14px] md:text-[13px] leading-[20px] text-[#667085] max-w-2xl">{caption}</p>
        </div>
        <a href="#" className="text-[14px] font-medium text-[#004EEB] hover:underline whitespace-nowrap">Explore All Partners →</a>
      </div>

      <div className="relative group">
        {/* Center badge representing GoKwik within cluster */}
        <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20">
          <div ref={centerRef} className="w-14 h-14 md:w-[56px] md:h-[56px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#004EEB] relative">
              <span className="absolute inset-[-8px] rounded-full bg-[#004EEB]/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          role="list"
          tabIndex={0}
          onKeyDown={onKeyScroll}
          className="pl-[72px] md:pl-[96px] overflow-x-auto scrollbar-thin scrollbar-thumb-[#E5E7EB] scrollbar-track-transparent snap-x snap-mandatory flex gap-4 md:gap-6 py-4"
          aria-label={`${title} integrations`}
        >
          {items.map((item) => (
            <article key={item.name} role="listitem" className="snap-start">
              <IntegrationCard item={item} onSelect={onSelect} showLineFrom centerRef={centerRef} />
            </article>
          ))}
        </div>

        {/* Arrows (appear on hover) */}
        <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex gap-2">
            <button
              className="pointer-events-auto p-2 rounded-lg bg-white border border-[#E5E7EB] shadow-sm hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#004EEB]"
              aria-label="Scroll left"
              onClick={() => scrollByAmount('left')}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="pointer-events-auto p-2 rounded-lg bg-white border border-[#E5E7EB] shadow-sm hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#004EEB]"
              aria-label="Scroll right"
              onClick={() => scrollByAmount('right')}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic gradient glow for active cluster */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(0,78,235,0.04)] via-transparent to-[rgba(2,122,72,0.04)]" />
      </div>
    </section>
  );
};

export default ClusterCarousel;
