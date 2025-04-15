import { HeroSection } from "@/components/home/hero-section"
import { ToolCategories } from "@/components/home/tool-categories"
import { PopularTools } from "@/components/home/popular-tools"
import { SubcategoriesPreview } from "@/components/home/subcategories-preview"
import { ContentRecommendations } from "@/components/home/content-recommendations"
import { EnhancedScrollSection } from "@/components/home/enhanced-scroll-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-12 space-y-24">
        <EnhancedScrollSection index={0} effect="zoom" delay={0}>
          <ToolCategories />
        </EnhancedScrollSection>

        <EnhancedScrollSection index={1} effect="slide" delay={1}>
          <PopularTools />
        </EnhancedScrollSection>

        <EnhancedScrollSection index={2} effect="rotate" delay={2}>
          <SubcategoriesPreview />
        </EnhancedScrollSection>

        <EnhancedScrollSection index={3} effect="parallax" delay={3}>
          <ContentRecommendations />
        </EnhancedScrollSection>
      </div>
    </>
  )
}
