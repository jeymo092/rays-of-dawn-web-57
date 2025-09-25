import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Font Awesome Configuration
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faGraduationCap, 
  faHome, 
  faHeart, 
  faUsers, 
  faBriefcase, 
  faBook, 
  faGift,
  faBars,
  faTimes,
  faPhone,
  faEnvelope,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faGraduationCap, 
  faHome, 
  faHeart, 
  faUsers, 
  faBriefcase, 
  faBook, 
  faGift,
  faBars,
  faTimes,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
)

console.log('Main script loading');
console.log('Creating root element');

createRoot(document.getElementById("root")!).render(<App />);
