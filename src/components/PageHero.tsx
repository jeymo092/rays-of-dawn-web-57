import React from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  alt?: string;
};

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, imageSrc, alt }) => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-white overflow-hidden">
      <img src={imageSrc} alt={alt || title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;


