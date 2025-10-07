import React from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  alt?: string;
};

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, imageSrc, alt }) => {
  return (
    <section className="relative pt-20 pb-8 md:pt-28 md:pb-12 text-white overflow-hidden">
      <img src={imageSrc} alt={alt || title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-md">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-xl max-w-3xl mx-auto drop-shadow-md">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;


