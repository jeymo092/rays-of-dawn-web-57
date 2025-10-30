import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import psychosocialImg from '@/assets/psychosocial-support.jpg';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - Miale Ya Pambazuko</title>
        <meta name="description" content="Terms of Service for Miale Ya Pambazuko - Understanding our terms and conditions." />
      </Helmet>
      
      <Header />
      
      <PageHero 
        title="Terms of Service"
        subtitle="Understanding our terms and conditions"
        imageSrc={psychosocialImg}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using our website, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Use of Website</h2>
              <p>
                This website is provided for informational purposes about the organization and 
                its mission to empower vulnerable girls through education and support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Donations</h2>
              <p>
                All donations made through our website are final and non-refundable unless 
                required by law. Donations support programs and operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p>
                The content on this website, including text, images, and logos, is the property 
                of Miale Ya Pambazuko and is protected by applicable copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                Miale Ya Pambazuko shall not be liable for any direct, indirect, incidental, 
                or consequential damages arising from the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at 
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

export default TermsOfService;