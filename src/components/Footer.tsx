import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/03541fd2-f202-4a05-a4f4-c99e32a3be5a.png" 
                alt="Pambazuko For Chances Logo" 
                className="h-12 w-auto"
              />
              <div className="font-bold text-xl">Miale Ya Pambazuko</div>
            </div>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              Empowering vulnerable Kenyan girls through education, mentorship, and comprehensive support services. 
              Building a brighter future, one girl at a time.
            </p>
            <div className="space-y-2">
              <p className="text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-hope flex-shrink-0" />
                <span className="font-medium">Email:</span> info@mialeyapambazuko.org
              </p>
              <p className="text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-hope flex-shrink-0" />
                <span className="font-medium">Phone:</span> +254 XXX XXX XXX
              </p>
              <p className="text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-hope flex-shrink-0" />
                <span className="font-medium">Address:</span> Nairobi, Kenya
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-hope">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Our Programs
                </a>
              </li>
              <li>
                <a href="/impact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Donate
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-hope">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Miale Ya Pambazuko. All rights reserved.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <span className="sr-only">Facebook</span>
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            </a>
            <a href="https://x.com/MPambazuko" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <span className="sr-only">X (formerly Twitter)</span>
              <X className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <span className="sr-only">Instagram</span>
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/miale-ya-pambazuko" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <span className="sr-only">LinkedIn</span>
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;