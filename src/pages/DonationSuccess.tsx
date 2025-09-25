import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('tracking_id');

  return (
    <>
      <Helmet>
        <title>Thank You - Donation Successful - Pambazuko For Chances</title>
        <meta name="description" content="Thank you for your generous donation to Pambazuko For Chances. Your contribution will help transform lives through education and empowerment." />
      </Helmet>
      
      <main className="min-h-screen">
        <Header />
        
        {/* Success Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-hope text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hope/90"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="text-6xl md:text-8xl text-white mb-4" 
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Thank You!
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Your generous donation has been successfully processed
              </p>
              {trackingId && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
                  <p className="text-sm opacity-90 mb-1">Tracking ID:</p>
                  <p className="font-mono text-lg font-semibold">{trackingId}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Thank You Details */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              
              {/* What Your Donation Does */}
              <Card className="border-none shadow-warm bg-card">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-hope rounded-full flex items-center justify-center mr-4">
                      <FontAwesomeIcon icon={faHeart} className="text-2xl text-white" />
                    </div>
                    <CardTitle className="text-2xl text-primary">Your Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Your donation will directly contribute to:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2"></div>
                        <span className="text-sm">Educational opportunities for vulnerable children</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2"></div>
                        <span className="text-sm">Safe housing and accommodation</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2"></div>
                        <span className="text-sm">Mentorship and psychosocial support</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-hope rounded-full mr-3 mt-2"></div>
                        <span className="text-sm">Skills development and life training</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-none shadow-warm bg-card">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-hope rounded-full flex items-center justify-center mr-4">
                      <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-white" />
                    </div>
                    <CardTitle className="text-2xl text-primary">What Happens Next</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-warm-gray/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Email Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive a confirmation email with your donation receipt and tracking details.
                      </p>
                    </div>
                    
                    <div className="bg-warm-gray/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Impact Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll keep you updated on how your donation is making a difference in the lives of children.
                      </p>
                    </div>

                    <div className="bg-warm-gray/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Stay Connected</h4>
                      <p className="text-sm text-muted-foreground">
                        Follow our journey and see the impact of your generosity through our regular updates.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-hope text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Continue Supporting Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Your donation is just the beginning. There are many ways to stay involved and continue making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="default" 
                size="lg" 
                className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 border-none"
                onClick={() => window.location.href = '/'}
              >
                Return Home
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default DonationSuccess;