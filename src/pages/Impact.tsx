import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import girlsStudyingImg from '@/assets/girls-studying.jpg';
import mentorshipImg from '@/assets/mentorship.jpg';

const Impact = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - clear image background */}
      <PageHero 
        title="Our Impact"
        subtitle="Transforming lives and building brighter futures"
        imageSrc={girlsStudyingImg}
      />

      {/* Reused two-card impact section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 with background image */}
            <div className="relative rounded-lg overflow-hidden">
              <img src={girlsStudyingImg} alt="Rescued and Empowered" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative m-4 md:m-6 bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-xl md:text-2xl font-bold text-hope drop-shadow-md mb-2">Rescued & Empowered</h3>
                <p className="text-white/90">
                  Many girls rescued and supported through scholarships, breaking cycles of poverty and creating new opportunities
                  for bright futures.
                </p>
              </div>
            </div>

            {/* Card 2 with background image */}
            <div className="relative rounded-lg overflow-hidden">
              <img src={mentorshipImg} alt="Dedication and Experience" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative m-4 md:m-6 bg-white/15 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-xl md:text-2xl font-bold text-hope drop-shadow-md mb-2">Dedication & Experience</h3>
                <p className="text-white/90">
                  Years of experience in service to children in need, building trust and creating lasting change in communities everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Impact;