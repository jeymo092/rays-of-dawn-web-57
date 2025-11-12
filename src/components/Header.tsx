import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${isScrolled ? 'bg-background border-border shadow-warm' : 'bg-transparent border-transparent'}`}>
      <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/03541fd2-f202-4a05-a4f4-c99e32a3be5a.png" 
              alt="Pambazuko For Chances Logo" 
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-12' : 'h-20'}`}
            />
            <div className={`transition-all duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
              <h1 className={`font-bold leading-tight transition-all duration-300 ${isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} ${!isScrolled && 'drop-shadow-lg'}`}>Miale Ya Pambazuko</h1>
              <p className={`italic transition-all duration-300 ${isScrolled ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'} ${!isScrolled && 'drop-shadow-lg'}`}>Rays of Dawn</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-smooth font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}>
              Home
            </Link>
            <Link to="/about" className={`transition-smooth font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}>
              About Us
            </Link>
            <Link to="/programs" className={`transition-smooth font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}>
              Our Programs
            </Link>
            <Link to="/impact" className={`transition-smooth font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}>
              Impact
            </Link>
            <Link to="/contact" className={`transition-smooth font-medium ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}>
              Contact
            </Link>
          </nav>

          {/* Desktop Donate Button */}
          <Link to="/donate">
            <Button variant="hope" className="hidden md:inline-flex">
              Donate Now
            </Button>
          </Link>

          {/* Mobile menu button */}
          <button 
            className={`md:hidden p-2 transition-colors flex items-center justify-center ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80 drop-shadow-lg'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="w-6 h-6" 
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-6">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/programs" 
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Programs
              </Link>
              <Link 
                to="/impact" 
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Impact
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link to="/donate">
                <Button 
                  variant="hope" 
                  className="mt-4 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;