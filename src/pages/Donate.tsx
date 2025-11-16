import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { z } from 'zod';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Input validation schema for security
const donationSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[+\d\s()-]*$/, { message: "Phone number contains invalid characters" })
    .optional()
    .or(z.literal('')),
  customAmount: z.number()
    .positive({ message: "Amount must be greater than 0" })
    .max(1000000, { message: "Amount exceeds maximum limit" })
    .optional(),
});

// Donation tiers with Stripe price IDs
const DONATION_TIERS = {
  'high-school-annual': {
    name: 'High School Sponsorship - Annual',
    price: 123840, // 160,000 KSH per year (~$1,238 in cents)
    priceId: 'price_1SAvUXFFAVm8UZFAH5dYfmeP',
    description: 'Complete high school sponsorship for one year - covering tuition, boarding, personal items, transport, and mentorship (160,000 KSH)',
    type: 'one-time',
    period: 'yearly'
  },
  'high-school-termly': {
    name: 'High School Sponsorship - Per Term',
    price: 41784, // 54,000 KSH per term (~$418 in cents)
    priceId: 'price_1SAvWkFFAVm8UZFAQl1IpS2x',
    description: 'High school sponsorship for one term - covering tuition, boarding, and essential needs (54,000 KSH)',
    type: 'one-time',
    period: 'termly'
  },
  'primary-school-annual': {
    name: 'Primary Boarding School - Annual',
    price: 92880, // 120,000 KSH per year (~$929 in cents)
    priceId: 'price_1SAvWxFFAVm8UZFAnXbvl4KL',
    description: 'Complete primary boarding school sponsorship for one year - covering all educational and boarding needs (120,000 KSH)',
    type: 'one-time',
    period: 'yearly'
  },
  'primary-school-termly': {
    name: 'Primary Boarding School - Per Term',
    price: 30952, // 40,000 KSH per term (~$310 in cents)
    priceId: 'price_1SAvXVFFAVm8UZFATiovX1js',
    description: 'Primary boarding school sponsorship for one term - covering educational and boarding essentials (40,000 KSH)',
    type: 'one-time',
    period: 'termly'
  },
  'house-rent': {
    name: 'Office Running - Monthly',
    price: 96750, // 125,000 KSH per month (~$967.50 in cents)
    priceId: 'price_1SAvXhFFAVm8UZFAGK2eJLRY',
    description: 'Monthly office running costs and operational expenses (125,000 KSH)',
    type: 'subscription',
    period: 'monthly'
  }
};

const Donate = () => {
  const [selectedTier, setSelectedTier] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { formatFromUsdCents, currencyCode } = useCurrency();

  // Handle currencies that do not have minor units (Stripe zero-decimal currencies)
  const ZERO_DECIMAL_CURRENCIES = new Set([
    'BIF','CLP','DJF','GNF','JPY','KMF','KRW','MGA','PYG','RWF','UGX','VND','VUV','XAF','XOF','XPF'
  ]);
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currencyCode.toUpperCase());
  const parseAmount = (val: string) => {
    const normalized = val.replace(',', '.').trim();
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : num;
  };

  const donationOptions = [
    {
      value: 'high-school-annual',
      label: `High School Sponsorship - Annual (${formatFromUsdCents(123100)})`,
      description: 'Complete high school sponsorship covering tuition, boarding, personal items, transport, and mentorship'
    },
    {
      value: 'high-school-monthly',
      label: `High School Sponsorship - Monthly (${formatFromUsdCents(10258)}/month)`,
      description: 'Monthly high school sponsorship with flexible payment schedule'
    },
    {
      value: 'primary-school-annual',
      label: `Primary School Sponsorship - Annual (${formatFromUsdCents(92400)})`,
      description: 'Complete primary boarding school package with all necessities'
    },
    {
      value: 'primary-school-monthly',
      label: `Primary School Sponsorship - Monthly (${formatFromUsdCents(7700)}/month)`,
      description: 'Monthly primary school sponsorship with flexible payment schedule'
    },
    {
      value: 'house-rent',
      label: `Office Running (${formatFromUsdCents(96750)}/month)`,
      description: 'Monthly office running costs (125,000 KSH)'
    },
    {
      value: 'custom',
      label: 'Custom Amount',
      description: 'Enter your own donation amount'
    }
  ];

  const handleDonation = async () => {
    if (!selectedTier) {
      toast({
        title: "Selection Required",
        description: "Please select a donation option",
        variant: "destructive",
      });
      return;
    }

    const isCustom = selectedTier === 'custom';
    
    // Validate inputs using zod schema for security
    try {
      const validationData: any = {
        email: donorEmail,
        phone: donorPhone || '',
      };

      if (isCustom) {
        const amountNum = parseAmount(customAmount);
        if (!amountNum || amountNum <= 0) {
          toast({
            title: "Invalid Amount",
            description: "Please enter a valid donation amount greater than 0",
            variant: "destructive",
          });
          return;
        }
        validationData.customAmount = amountNum;
      }

      // Validate all inputs
      donationSchema.parse(validationData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Input",
          description: error.errors[0]?.message || "Please check your input and try again",
          variant: "destructive",
        });
        return;
      }
    }

    const tier = DONATION_TIERS[selectedTier as keyof typeof DONATION_TIERS];
    if (!isCustom && !tier) return;

    setIsProcessing(true);

    try {
      const functionName = (!isCustom && tier.type === 'subscription') 
        ? 'create-donation-subscription' 
        : 'create-donation-payment';

      let body: any = {
        donorEmail,
        donorPhone,
        donationType: isCustom ? 'custom' : selectedTier,
      };

      if (isCustom) {
        const amountNum = parseAmount(customAmount);
        const amountMinor = isZeroDecimal ? Math.round(amountNum) : Math.round(amountNum * 100);
        if (!amountMinor || amountMinor <= 0) {
          throw new Error('Invalid custom amount');
        }
        body.customAmountCents = amountMinor;
        body.currency = currencyCode;
      } else {
        body.priceId = tier.priceId;
      }

      const { data, error } = await supabase.functions.invoke(functionName, { body });

      if (error) throw error;

      if (data?.url) {
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
        <meta name="description" content="Support education and empowerment. Learn about partnership opportunities including financial assistance, donations, and sponsorships." />
        <meta name="keywords" content="donate, sponsor education, charity, student sponsorship, educational support" />
      </Helmet>
      
      <main className="min-h-screen">
        <Header />
        
        {/* Hero Section - clear image background */}
        <PageHero 
          title="How You Can Partner With Us"
          subtitle="Transform lives through education and empowerment"
          imageSrc={donationHelpImg}
              alt="Hands giving donation to help children" 
        />

        {/* Simple Donation Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-4">Make a Donation</h2>
                <p className="text-muted-foreground">Choose how you'd like to support our mission and help children in need.</p>
              </div>
              
              <Card className="border-none shadow-warm">
                <CardHeader>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-hope rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faHeart} className="text-white text-xl" />
                    </div>
                    <CardTitle className="text-xl text-primary">Support Our Cause</CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">
                      All amounts are displayed in {currencyCode}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Option Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="donation-option" className="text-primary font-semibold">
                      What would you like to support? *
                    </Label>
                    <Select value={selectedTier} onValueChange={setSelectedTier}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a donation option" />
                      </SelectTrigger>
                      <SelectContent>
                        {donationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTier && selectedTier !== 'custom' && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {donationOptions.find(opt => opt.value === selectedTier)?.description}
                      </p>
                    )}
                  </div>

                  {/* Custom Amount Field */}
                  {selectedTier === 'custom' && (
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount" className="text-primary font-semibold">
                        Enter your donation amount *
                      </Label>
                      <div className="relative">
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="0.00"
                          min="1"
                          step={isZeroDecimal ? 1 : 0.01}
                          inputMode="decimal"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="pr-16"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                          {currencyCode}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum donation: {formatFromUsdCents(100)}
                      </p>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-primary font-semibold">
                        Email Address *
                      </Label>
                       <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          maxLength={255}
                          required
                        />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary font-semibold">
                        Phone Number (Optional)
                      </Label>
                       <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        maxLength={20}
                      />
                    </div>
                  </div>

                  {/* Donation Summary */}
                  {selectedTier && (
                    <div className="bg-hope/10 p-4 rounded-lg border border-hope/20">
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faCreditCard} className="text-hope mr-2" />
                        <span className="font-semibold text-primary text-sm">Donation Summary</span>
                      </div>
                      {selectedTier === 'custom' ? (
                        <div>
                          <p className="font-medium text-sm">Custom Donation</p>
                          {customAmount && (
                            <p className="text-xl font-bold text-hope">
                              {parseFloat(customAmount) > 0 ? `${currencyCode} ${parseFloat(customAmount).toFixed(2)}` : 'Please enter amount'}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-sm">
                            {donationOptions.find(opt => opt.value === selectedTier)?.label}
                          </p>
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
                    </div>
                  )}

                  {/* Donate Button */}
                  <Button 
                    onClick={handleDonation}
                    disabled={isProcessing || !selectedTier || !donorEmail}
                    className="w-full bg-gradient-hope hover:opacity-90 text-white py-3 h-auto"
                    size="lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faHeart} />
                        Donate Securely
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment processed by Stripe. You will be redirected to complete your donation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Information */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Your Impact Matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
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

                <Card className="border-none shadow-warm bg-card">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hope rounded-full flex items-center justify-center mb-2">
                      <FontAwesomeIcon icon={faUtensils} className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-primary">Basic Needs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Food, clothing, sanitary supplies, bedding, and other essential items for daily living.
                    </p>
                  </CardContent>
                </Card>

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
        <section className="py-16 bg-gradient-hope text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About Donating?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Questions about donations, partnerships, or other ways to support this mission? Get in touch!
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-6 py-3 bg-transparent border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Donate;