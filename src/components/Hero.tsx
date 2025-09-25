import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hero Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          <span className="text-hope drop-shadow-lg">Glorifying</span> God by Shouldering Our <span className="text-hope drop-shadow-lg">Sisters</span> burdens
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto drop-shadow-md font-medium">
          Empowering vulnerable girls through education, mentorship, and comprehensive support services
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="/contact">
            <Button variant="hope" size="lg" className="px-8 py-4 text-lg">
              Donate Now
            </Button>
          </a>
          <a href="/programs">
            <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
              What we do
            </Button>
          </a>
        </div>

        {/* Impact Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-bold text-hope drop-shadow-md mb-2">Rescued & Empowered</h3>
            <p className="text-sm text-white/90">Many girls rescued and supported through scholarships, breaking cycles of poverty and creating new opportunities for bright futures.</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-bold text-hope drop-shadow-md mb-2">Dedication & Experience</h3>
            <p className="text-sm text-white/90">Years of experience in service to children in need, building trust and creating lasting change in communities across Kenya.</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;