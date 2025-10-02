import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import mentorshipImg from '@/assets/mentorship.jpg';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - clear image background */}
      <PageHero 
        title="Get In Touch" 
        subtitle="Join us in our mission to empower vulnerable Kenyan girls" 
        imageSrc={mentorshipImg}
      />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-elegant">
              <h2 className="text-3xl font-bold text-primary mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your inquiry, how you'd like to help, or any questions you have..."
                    rows={6}
                  />
                </div>
                
                <Button variant="hope" size="lg" className="w-full">
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Contact Information</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get in touch with us for any inquiries or support.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-hope rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faPhone} className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">Phone</h3>
                    <p className="text-muted-foreground">+254702218333</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-trust rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">Email</h3>
                    <p className="text-muted-foreground">info@mialeyapambazuko.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-sunset rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-1">Address</h3>
                    <p className="text-muted-foreground">Kamulu, Nairobi east</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-warm rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-primary mb-2">Ready to Make a Difference?</h3>
                <p className="text-muted-foreground mb-4">
                  Join our community of supporters and help us empower more girls.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/donate">
                    <Button variant="hope" size="lg">
                      Donate Now
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Become a Volunteer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;