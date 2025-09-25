import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  console.log('Index component rendering');
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Programs />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
