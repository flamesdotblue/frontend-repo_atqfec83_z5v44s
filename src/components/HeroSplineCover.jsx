import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSplineCover = () => {
  return (
    <section className="relative w-full min-h-[520px] md:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12 py-20 md:py-28 flex items-end h-full">
        <div className="max-w-2xl">
          <h1 className="font-inter text-[36px] leading-[44px] md:text-5xl md:leading-tight font-bold text-[#101828]">
            Integrations
          </h1>
          <p className="mt-4 text-[18px] leading-[28px] font-medium text-[#344054]">
            A sleek 3D fintech canvas introducing a modern ecosystem of partners that connect seamlessly with GoKwik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSplineCover;
