import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faUtensils, faHome, faDollarSign, faHeart, faCalendarAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import donationHelpImg from '@/assets/donation-help.jpg';
import PageHero from '@/components/PageHero';
import girlsStudyingImg from '@/assets/girls-studying.jpg';
import educationSupportImg from '@/assets/education-support.jpg';
import mentorshipImg from '@/assets/mentorship.jpg';
import skillsDevelopmentImg from '@/assets/skills-development.jpg';
import { useCurrency } from '@/hooks/use-currency';

// Donation tiers with Stripe price IDs
const DONATION_TIERS = {
  'high-school-annual': {
    name: 'High School Sponsorship - Annual',
    price: 123100, // $1,231 in cents
    priceId: 'price_1SAvUXFFAVm8UZFAH5dYfmeP',
    description: 'Complete high school sponsorship covering tuition, boarding, personal items, transport, and mentorship',
    type: 'one-time',
    period: 'yearly'
  },
  'high-school-monthly': {
    name: 'High School Sponsorship - Monthly',
    price: 10258, // $102.58 in cents
    priceId: 'price_1SAvWkFFAVm8UZFAQl1IpS2x',
    description: 'Monthly high school sponsorship',
    type: 'subscription',
    period: 'monthly'
  },
  'primary-school-annual': {
    name: 'Primary School Sponsorship - Annual',
    price: 92400, // $924 in cents
    priceId: 'price_1SAvWxFFAVm8UZFAnXbvl4KL',
    description: 'Complete primary boarding school package with all necessities',
    type: 'one-time',
    period: 'yearly'
  },
  'primary-school-monthly': {
    name: 'Primary School Sponsorship - Monthly',
    price: 7700, // $77 in cents
    priceId: 'price_1SAvXVFFAVm8UZFATiovX1js',
    description: 'Monthly primary school sponsorship',
    type: 'subscription',
    period: 'monthly'
  },
  'house-rent': {
    name: 'House Rent & Bills',
    price: 46200, // $462 in cents
    priceId: 'price_1SAvXhFFAVm8UZFAGK2eJLRY',
    description: 'Monthly house rent and utility bills for facilities',
    type: 'subscription',
    period: 'monthly'
  }
};

const Donate = () => {
  const [selectedTier, setSelectedTier] = useState('high-school-annual');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { formatFromUsdCents, currencyCode } = useCurrency();

  const handleDonation = async () => {
    if (!donorEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const isCustom = selectedTier.startsWith('custom-amount');
    const tier = DONATION_TIERS[selectedTier as keyof typeof DONATION_TIERS];
    if (!isCustom && !tier) return;

    setIsProcessing(true);

    try {
      const functionName = (!isCustom && tier.type === 'subscription') 
        ? 'create-donation-subscription' 
        : 'create-donation-payment';

      // Determine payload: preset price or custom amount
      let body: any = {
          donorEmail,
          donorPhone,
        donationType: isCustom ? 'custom' : selectedTier,
      };
      if (isCustom) {
        let amountCents = (window as any)._customAmountCents as number | undefined;
        // Parse from id e.g. custom-amount-2500 when quick button used
        if (!amountCents && selectedTier.startsWith('custom-amount-')) {
          const parsed = Number(selectedTier.split('custom-amount-')[1]);
          if (Number.isFinite(parsed)) amountCents = parsed;
        }
        if (!amountCents || amountCents <= 0) {
          toast({ title: 'Amount Required', description: 'Enter a valid custom amount', variant: 'destructive' });
          setIsProcessing(false);
          return;
        }
        body.customAmountCents = Math.round(amountCents);
        body.currency = currencyCode;
      } else {
        body.priceId = tier.priceId;
      }

      const { data, error } = await supabase.functions.invoke(functionName, { body });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Donation Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Donate - Partner With Pambazuko For Chances</title>
        <meta name="description" content="Support education and empowerment in Kenya. Learn about our partnership opportunities including financial assistance, donations, and sponsorships." />
        <meta name="keywords" content="donate, sponsor education, Kenya charity, student sponsorship, educational support" />
      </Helmet>
      
      <main className="min-h-screen">
        <Header />
        
        {/* Hero Section - clear image background */}
        <PageHero 
          title="How You Can Partner With Us"
          subtitle="Together, we can transform lives through education and empowerment"
          imageSrc={donationHelpImg}
              alt="Hands giving donation to help children" 
        />

        {/* Donation Options and Custom Donation */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Donation Options */}
                <div className="lg:col-span-2">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary mb-4">Choose Your Support Level</h2>
                    <p className="text-muted-foreground">Select from our structured donation options to make a specific impact</p>
                  </div>
                  
                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* High School Annual Card */}
                  <Card className={`overflow-hidden border-2 cursor-pointer transition-all ${selectedTier === 'high-school-annual' ? 'border-hope bg-hope/5' : 'border-border hover:border-hope/50'}`}
                        onClick={() => setSelectedTier('high-school-annual')}>
                    <div className="relative h-40 md:h-44 lg:h-48">
                      <img src={girlsStudyingImg} alt="High School Sponsorship" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">High School Sponsorship - Annual</CardTitle>
                            <p className="text-sm text-muted-foreground">One-time payment covering full year</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-hope">{formatFromUsdCents(123100)}</p>
                          <p className="text-sm text-muted-foreground">per year</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Complete high school sponsorship covering tuition, boarding, personal items, transport, and mentorship</p>
                    </CardContent>
                  </Card>

                  {/* High School Monthly Card */}
                  <Card className={`overflow-hidden border-2 cursor-pointer transition-all ${selectedTier === 'high-school-monthly' ? 'border-hope bg-hope/5' : 'border-border hover:border-hope/50'}`}
                        onClick={() => setSelectedTier('high-school-monthly')}>
                    <div className="relative h-40 md:h-44 lg:h-48">
                      <img src={educationSupportImg} alt="High School Monthly" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Education
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-trust rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">High School Sponsorship - Monthly</CardTitle>
                            <p className="text-sm text-muted-foreground">Recurring monthly payments</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-hope">{formatFromUsdCents(10258)}</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Monthly high school sponsorship with flexible payment schedule</p>
                    </CardContent>
                  </Card>

                  {/* Primary School Annual Card */}
                  <Card className={`overflow-hidden border-2 cursor-pointer transition-all ${selectedTier === 'primary-school-annual' ? 'border-hope bg-hope/5' : 'border-border hover:border-hope/50'}`}
                        onClick={() => setSelectedTier('primary-school-annual')}>
                    <div className="relative h-40 md:h-44 lg:h-48">
                      <img src={mentorshipImg} alt="Primary School Sponsorship" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Primary
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">Primary School Sponsorship - Annual</CardTitle>
                            <p className="text-sm text-muted-foreground">One-time payment covering full year</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-hope">{formatFromUsdCents(92400)}</p>
                          <p className="text-sm text-muted-foreground">per year</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Complete primary boarding school package with all necessities</p>
                    </CardContent>
                  </Card>

                  {/* Primary School Monthly Card */}
                  <Card className={`overflow-hidden border-2 cursor-pointer transition-all ${selectedTier === 'primary-school-monthly' ? 'border-hope bg-hope/5' : 'border-border hover:border-hope/50'}`}
                        onClick={() => setSelectedTier('primary-school-monthly')}>
                    <div className="relative h-40 md:h-44 lg:h-48">
                      <img src={skillsDevelopmentImg} alt="Primary Monthly" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Primary
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">Primary School Sponsorship - Monthly</CardTitle>
                            <p className="text-sm text-muted-foreground">Recurring monthly payments</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-hope">{formatFromUsdCents(7700)}</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Monthly primary school sponsorship with flexible payment schedule</p>
                    </CardContent>
                  </Card>

                  {/* House Rent Card */}
                  <Card className={`overflow-hidden border-2 cursor-pointer transition-all ${selectedTier === 'house-rent' ? 'border-hope bg-hope/5' : 'border-border hover:border-hope/50'}`}
                        onClick={() => setSelectedTier('house-rent')}>
                    <div className="relative h-40 md:h-44 lg:h-48">
                      <img src={donationHelpImg} alt="House Rent & Bills" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Housing
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faHome} className="text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">House Rent & Bills</CardTitle>
                            <p className="text-sm text-muted-foreground">Monthly facility costs</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-hope">{formatFromUsdCents(46200)}</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Monthly house rent and utility bills for facilities</p>
                    </CardContent>
                  </Card>
                  </div>
                </div>

                {/* Right Column - Custom Donation and Form */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    
                    {/* Custom Donation Card */}
                    <Card className="border-none shadow-warm bg-gradient-hope text-white">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faHeart} className="text-white" />
                          </div>
                          <CardTitle className="text-xl text-white">Custom Donation</CardTitle>
                        </div>
                        <p className="text-white/90 text-sm">
                          Enter any amount and donate securely. You will be redirected to Stripe checkout.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={() => setSelectedTier('custom-amount-2500')}>$25</Button>
                            <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={() => setSelectedTier('custom-amount-5000')}>$50</Button>
                            <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={() => setSelectedTier('custom-amount-10000')}>$100</Button>
                          </div>
                          <div>
                            <Label htmlFor="customAmount" className="text-white font-semibold text-sm">Custom Amount</Label>
                            <Input id="customAmount" type="number" min="1" placeholder="Enter amount" className="mt-2 bg-white text-primary" onChange={(e) => {
                              const v = Math.max(0, Number(e.target.value || 0));
                              // store custom amount in cents using selectedTier as marker
                              (window as any)._customAmountCents = Math.round(v * 100);
                              setSelectedTier('custom-amount');
                            }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Donation Form Card */}
                    <Card className="border-none shadow-warm">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Complete Your Donation</CardTitle>
                        <p className="text-muted-foreground text-sm">
                          Enter your information to proceed with the selected donation.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Selected Donation Display */}
                          {selectedTier && (
                            <div className="bg-hope/10 p-4 rounded-lg border border-hope/20">
                              <div className="flex items-center mb-2">
                                <FontAwesomeIcon icon={faHeart} className="text-hope mr-2" />
                                <span className="font-semibold text-primary text-sm">Selected Option</span>
                              </div>
                              <p className="font-medium text-sm">{DONATION_TIERS[selectedTier as keyof typeof DONATION_TIERS]?.name}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xl font-bold text-hope">
                                  {formatFromUsdCents(DONATION_TIERS[selectedTier as keyof typeof DONATION_TIERS]?.price ?? 0)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {DONATION_TIERS[selectedTier as keyof typeof DONATION_TIERS]?.type === 'subscription' ? 'Monthly' : 'One-time'}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Form Fields */}
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="email" className="text-primary font-semibold text-sm">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={donorEmail}
                                onChange={(e) => setDonorEmail(e.target.value)}
                                className="mt-2"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone" className="text-primary font-semibold text-sm">
                                Phone Number (Optional)
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+254 xxx xxx xxx"
                                value={donorPhone}
                                onChange={(e) => setDonorPhone(e.target.value)}
                                className="mt-2"
                              />
                            </div>
                          </div>

                          {/* Donate Button */}
                          <Button
                            onClick={handleDonation}
                            disabled={isProcessing || !donorEmail}
                            className="w-full bg-gradient-hope hover:bg-gradient-hope/90 text-white border-none"
                          >
                            {isProcessing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                                Donate Now
                              </>
                            )}
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center">
                            Prices shown in {currencyCode}. Secure payment powered by Stripe.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Partnership Impact Info */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">Your Impact in Action</h2>
                <p className="text-muted-foreground">See how your donations transform lives through our comprehensive support programs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Education Support */}
                <Card className="border-none shadow-warm bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center mb-2">
                      <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-primary">Education Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete educational sponsorship including tuition, boarding, materials, and mentorship programs.
                    </p>
                  </CardContent>
                </Card>

                {/* Material Support */}
                <Card className="border-none shadow-warm bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center mb-2">
                      <FontAwesomeIcon icon={faUtensils} className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-primary">Material Needs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Food, clothing, sanitary supplies, bedding, and other essential items for daily living.
                    </p>
                  </CardContent>
                </Card>

                {/* Facility Costs */}
                <Card className="border-none shadow-warm bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center mb-2">
                      <FontAwesomeIcon icon={faHome} className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-primary">Safe Housing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Rent and utilities for facilities that provide safe housing and support for vulnerable children.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-hope text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Every contribution, no matter the size, helps us transform lives and build brighter futures for vulnerable children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="default" 
                size="lg" 
                className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 border-none"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Partnership
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No forms required - contact us directly to discuss how you can help
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Donate;