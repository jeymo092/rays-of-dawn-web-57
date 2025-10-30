import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faGift } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-sunset text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join Us in Making a Difference
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Your support transforms lives and breaks the cycle of poverty. 
          Every contribution creates lasting change and empowers girls to reach their full potential.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/donate">
            <Button variant="default" size="lg" className="px-8 py-4 text-lg bg-white text-primary hover:bg-white/90 border-none">
              Donate Today
            </Button>
          </Link>
          <Link to="/donate">
            <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
              Sponsor a Girl
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="px-8 py-4 text-lg">
              Volunteer With Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;