import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Programs from "@/components/Programs";
import PageHero from "@/components/PageHero";
import skillsDevelopmentImg from '@/assets/skills-development.jpg';

const ProgramsPage = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - clear image background */}
      <PageHero 
        title="Our Programs"
        subtitle="The Twelve Steps: Our comprehensive approach from entrance to exit"
        imageSrc={skillsDevelopmentImg}
      />

      {/* Twelve Steps Section */}
      <section className="py-20 bg-warm-gray">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              The Twelve Steps Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Pambazuko uses twelve comprehensive steps from the date of entrance to the exit, ensuring holistic support and transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { step: 1, title: "Case Identification", description: "Initial assessment and identification of girls in need of support" },
              { step: 2, title: "Case Assessment", description: "Comprehensive evaluation of individual circumstances and needs" },
              { step: 3, title: "Intervention Plan", description: "Customized support plan tailored to each girl's specific situation" },
              { step: 4, title: "Stakeholders Identification", description: "Mapping key community members and support networks" },
              { step: 5, title: "Resource Mapping", description: "Cost analysis and identification of available resources and funding" },
              { step: 6, title: "Plan Implementation", description: "Execution of the intervention plan with dedicated support" },
              { step: 7, title: "Follow-ups & Mentorships", description: "Ongoing guidance and mentorship throughout the process" },
              { step: 8, title: "Monitoring & Evaluation", description: "Regular assessment of progress and plan adjustments" },
              { step: 9, title: "Gap Period", description: "4-month transition period to ensure sustained progress" },
              { step: 10, title: "Final Assessment", description: "Comprehensive evaluation of transformation and achievements" },
              { step: 11, title: "Support Group System", description: "Introduction to ongoing peer support networks" },
              { step: 12, title: "Case Closure", description: "Successful exit with continued community support" }
            ].map((item, index) => (
              <div key={item.step} className="w-full">
                <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-hope hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Programs />
      
      <Footer />
    </main>
  );
};

export default ProgramsPage;