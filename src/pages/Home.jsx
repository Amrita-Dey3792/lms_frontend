import ContactForm from "../components/Home/ContactForm";
import FeaturesSection from "../components/Home/FeacturesSection";
import HeroSection from "../components/Home/HeroSection";
import { HowItWorks } from "../components/Home/HowItWorks";
import CourseCategorySection from "./../components/Home/CourseCategorySection";

const Home = () => {
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
