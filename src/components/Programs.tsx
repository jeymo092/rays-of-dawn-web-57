import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faHome, 
  faGift, 
  faUsers, 
  faBriefcase, 
  faHeart 
} from '@fortawesome/free-solid-svg-icons';
import educationSupportImg from '@/assets/education-support.jpg';
import rescueSupportImg from '@/assets/rescue-support.jpg';
import mentorshipImg from '@/assets/mentorship.jpg';
import feminineHealthImg from '@/assets/feminine-health.jpg';
import skillsDevImg from '@/assets/skills-development.jpg';
import psychosocialImg from '@/assets/psychosocial-support.jpg';

const Programs = () => {
  const programs = [
    {
      icon: faGraduationCap,
      title: "Education Sponsorship",
      description: "Full scholarships for primary, secondary, and college education ensure girls can achieve their academic dreams and break the cycle of poverty.",
      gradient: "bg-gradient-hope",
      image: educationSupportImg
    },
    {
      icon: faHome,
      title: "Safe House Rescue Center", 
      description: "Our rescue center provides immediate safety, counseling, and support for girls facing vulnerability, abuse, or crisis situations.",
      gradient: "bg-gradient-trust",
      image: rescueSupportImg
    },
    {
      icon: faGift,
      title: "Feminine Health & Hygiene",
      description: "Sanitary towels, hygiene products, and health education help girls maintain dignity and stay in school during menstruation.",
      gradient: "bg-gradient-sunset",
      image: feminineHealthImg
    },
    {
      icon: faUsers,
      title: "Mentorship Programs",
      description: "Connecting girls with role models and mentors who provide guidance, life skills training, and emotional support for personal growth.",
      gradient: "bg-gradient-warm",
      image: mentorshipImg
    },
    {
      icon: faBriefcase,
      title: "Skills Development",
      description: "Vocational training and entrepreneurship programs that equip girls with practical skills for economic independence and self-reliance.",
      gradient: "bg-gradient-hope",
      image: skillsDevImg
    },
    {
      icon: faHeart,
      title: "Psycho-social Support",
      description: "Professional counseling and therapy services to help girls heal from trauma and build resilience for a brighter future.",
      gradient: "bg-gradient-trust",
      image: psychosocialImg
    }
  ];

  return (
    <section id="programs" className="py-20 bg-warm-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive support transforms vulnerable girls through these initiatives that address immediate needs and long-term empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 bg-background border-0 overflow-hidden"
            >
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;