import { useEffect } from "react";
import ContactForm from "../components/Home/ContactForm";
import FeaturesSection from "../components/Home/FeacturesSection";
import HeroSection from "../components/Home/HeroSection";
import { HowItWorks } from "../components/Home/HowItWorks";
import CourseCategorySection from "./../components/Home/CourseCategorySection";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CourseCategorySection />
      <HowItWorks />
      <ContactForm />
    </div>
  );
};

export default Home;
