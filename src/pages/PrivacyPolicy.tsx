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
        <meta name="description" content="Privacy Policy for Miale Ya Pambazuko - Learn how we protect and handle your personal information." />
      </Helmet>
      
      <Header />
      
      <PageHero 
        title="Privacy Policy"
        subtitle="How we protect and handle your personal information"
        imageSrc={educationSupportImg}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you donate, volunteer, 
                subscribe to our newsletter, or contact us. This may include your name, email address, 
                phone number, and donation information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide our services, process donations, 
                communicate with you about our programs, and improve our organization's effectiveness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                info@mialeyapambazuko.org or +254 XXX XXX XXX.
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