import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import educationSupportImg from '@/assets/education-support.jpg';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - Miale Ya Pambazuko</title>
        <meta name="description" content="Privacy Policy for Miale Ya Pambazuko - Learn how personal information is protected and handled." />
      </Helmet>
      
      <Header />
      
      <PageHero 
        title="Privacy Policy"
        subtitle="How personal information is protected and handled"
        imageSrc={educationSupportImg}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Collection</h2>
              <p>
                Information provided directly through donations, volunteer applications, 
                newsletter subscriptions, or contact forms is collected. This may include names, email addresses, 
                phone numbers, and donation information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Usage</h2>
              <p>
                Collected information serves to provide services, process donations, 
                communicate about programs, and improve organizational effectiveness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p>
                Personal information is not sold, traded, or transferred to third parties 
                without consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                Appropriate security measures protect personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                info@mialeyapambazuko.org or +254702218333.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;