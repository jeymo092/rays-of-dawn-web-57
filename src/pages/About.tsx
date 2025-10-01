import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faGraduationCap, faHandshake } from '@fortawesome/free-solid-svg-icons';
import aboutUsImg from '@/assets/about-us.jpg';

const About = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-4 bg-gradient-warm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-3">
              About Miale Ya Pambazuko
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Rays of Dawn - Empowering vulnerable Kenyan girls since 2016
            </p>
          </div>
        </div>
      </section>

      {/* About Us Content */}
      <section className="pt-6 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img 
                src={aboutUsImg} 
                alt="Children learning in a safe environment" 
                className="w-full h-auto rounded-lg shadow-elegant"
              />
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Just as the name suggests, the aim of Pambazuko project is to give hope and a better tomorrow to Kenyan girls who at one point or the other face barriers and hurdles which prevent them from forging ahead with their inspirations. Some of these barriers are due to poverty, teenage pregnancies, forced early marriages, dysfunctional families and other cultural norms and practices.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are a non-profit making organization which seeks to empower teenagers and poor girls in Kenya. We do this through education, trainings and other mapped out activities geared towards their betterment. Our conviction is that a better future is built and maintained through education and other well executed empowerment options.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our intention is to give them a safe space and another chance to pick their pieces. We encourage them to continue dreaming again. We empower them through secondary education and tertiary institutions among other uplifting options and eventually reintegration back to their families.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Pambazuko works with the most needy girls especially those in crises. We endeavor to help them live their lives in full enjoying what God intended for them. Our model is fully participatory whereby together we plan on the intended interventions.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We walk together as they try to change their family and generational stories and in shaping their future destiny by embracing the chances and life lessons presented to them. Together we try to dissolve the issues that have been hindering their progress and holding them hostage.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 bg-warm-gray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-hope rounded-lg p-8 text-white">
              <div className="text-center">
                <FontAwesomeIcon icon={faHeart} className="text-6xl mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed">
                  As an organization that seeks to give a lasting and positive impact to the communities, we envisage well empowered members (girls) in our society who through our accompaniment, mentorship and empowerment chances, have achieved freedom from oppressive patterns of life to living better lives full of dignity and cherishing the values of a good community.
                </p>
              </div>
            </div>
            <div className="bg-gradient-trust rounded-lg p-8 text-white">
              <div className="text-center">
                <FontAwesomeIcon icon={faUsers} className="text-6xl mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  Our mission is to reduce the poverty level by enhancing the abilities of our beneficiaries and solidifying their quest for better lives. Also, to bring positive change in their lives by giving them chances to "try again".
                </p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hope rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faHeart} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Compassion</h3>
              <p className="text-muted-foreground">Leading with empathy and understanding in every interaction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Community</h3>
              <p className="text-muted-foreground">Building strong networks of support and belonging</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Education</h3>
              <p className="text-muted-foreground">Believing in the transformative power of learning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faHandshake} className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Integrity</h3>
              <p className="text-muted-foreground">Operating with transparency and accountability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives, Goals & Activities */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Objectives Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                Our Objectives
              </h2>
              <div className="bg-gradient-hope rounded-lg p-8 text-white mb-6">
                <p className="text-xl font-semibold text-center mb-4">
                  Our major objective is to: Rescue, Heal, Reunification, Reintegration, Mentor and Empower
                </p>
                <p className="text-lg text-center opacity-90">
                  Through the implementation of new care reform, we ensure every intervention follows best practices in child protection and empowerment
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Rights Protection</h4>
                  <p className="text-muted-foreground text-sm">Protect, defend and advocate for children's rights</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Holistic Approach</h4>
                  <p className="text-muted-foreground text-sm">Comprehensive care for all beneficiaries</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Emergency Support</h4>
                  <p className="text-muted-foreground text-sm">Emergency hotline for girls in crisis</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Skills Development</h4>
                  <p className="text-muted-foreground text-sm">Build confidence and nurture talents</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Abuse Prevention</h4>
                  <p className="text-muted-foreground text-sm">Fight against sexual abuse, early marriages, FGM</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Parenting Support</h4>
                  <p className="text-muted-foreground text-sm">Conduct parenting workshops for guardians</p>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                Our Goals
              </h2>
              <div className="bg-gradient-trust rounded-lg p-6 text-white mb-6">
                <p className="text-lg text-center">
                  Intervene and empower needy girls, especially teenagers and those in crisis
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Education Access</h4>
                  <p className="text-muted-foreground text-sm">Provide education and college opportunities</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Psychosocial Support</h4>
                  <p className="text-muted-foreground text-sm">Mentorship and emotional guidance</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Hygiene Products</h4>
                  <p className="text-muted-foreground text-sm">Sanitary towels and basic feminine care</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Life Skills Training</h4>
                  <p className="text-muted-foreground text-sm">Workshops and practical life skills</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Family Healing</h4>
                  <p className="text-muted-foreground text-sm">Restore disconnected family relationships</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-bold text-primary mb-2">Safe Housing</h4>
                  <p className="text-muted-foreground text-sm">Temporary rescue center for crisis cases</p>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
                Our Activities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-hope">
                  <h4 className="font-bold text-primary mb-2">Identification & Welcome</h4>
                  <p className="text-muted-foreground text-sm">Identify vulnerable girls and provide welcome support</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-trust">
                  <h4 className="font-bold text-primary mb-2">Psychosocial Services</h4>
                  <p className="text-muted-foreground text-sm">Professional counseling and emotional support</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-sunset">
                  <h4 className="font-bold text-primary mb-2">Individualized Care Planning</h4>
                  <p className="text-muted-foreground text-sm">Customized intervention plans for each case</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-warm">
                  <h4 className="font-bold text-primary mb-2">Networking</h4>
                  <p className="text-muted-foreground text-sm">Partner with schools, institutions, and organizations</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-hope">
                  <h4 className="font-bold text-primary mb-2">Authority Consultation</h4>
                  <p className="text-muted-foreground text-sm">Work with guardians and local authorities</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-trust">
                  <h4 className="font-bold text-primary mb-2">Child-Centered Action</h4>
                  <p className="text-muted-foreground text-sm">Actions guided by the child's best interest</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-sunset">
                  <h4 className="font-bold text-primary mb-2">Follow-up & Mentorship</h4>
                  <p className="text-muted-foreground text-sm">Persistent follow-up, mentoring, and motivation</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-warm">
                  <h4 className="font-bold text-primary mb-2">Safe Space Provision</h4>
                  <p className="text-muted-foreground text-sm">Rescue services for those needing safe spaces</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-hope">
                  <h4 className="font-bold text-primary mb-2">Government Partnership</h4>
                  <p className="text-muted-foreground text-sm">Collaboration with government agencies</p>
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

export default About;