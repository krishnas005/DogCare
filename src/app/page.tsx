import BuySell from '@/components/BuySell';
import FeatureSlider from '@/components/FeatureSlider';
import ArticleSection from '@/components/ArticleSection';
import PetCare from '@/components/PetCare';
import NGOFinder from '@/components/NGOFinder';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <BuySell/>
      <FeatureSlider />
      <NGOFinder />
      {/* <Testimonials /> */}
      <PetCare />
      <ArticleSection />
      <Footer />
    </div>
  );
}
