import { getAllCruises } from "@/lib/content";
import Hero from "@/components/ui/Hero";
import CruiseGrid from "@/components/cruises/CruiseGrid";

export default function HomePage() {
  const allCruises = getAllCruises();
  const featuredCruises = allCruises.filter(cruise => cruise.isFeatured);

  // Define slides for the Hero component (using featured cruise images or dedicated hero images)
  const heroSlides = featuredCruises.slice(0, 3).map(cruise => ({
    imageUrl: cruise.imageUrl || "/images/backgrounds/default-hero.jpg", // Fallback image
    title: cruise.title,
    subtitle: cruise.subtitle || cruise.shortDescription,
    link: `/cruises/${cruise.slug}`
  }));

  // If no featured cruises, use default slides
  if (heroSlides.length === 0) {
    heroSlides.push(
      { imageUrl: "/images/backgrounds/hero-1.jpg", title: "Luxury Adult Cruises", subtitle: "Explore the world in style", link: "/cruises" },
      { imageUrl: "/images/backgrounds/hero-2.jpg", title: "Unforgettable Destinations", subtitle: "Discover hidden gems", link: "/cruises" },
      { imageUrl: "/images/backgrounds/hero-3.jpg", title: "Exclusive Experiences", subtitle: "Book your dream vacation", link: "/cruises" }
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero slides={heroSlides} />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 md:mb-12">Featured Cruises</h2>
          {featuredCruises.length > 0 ? (
            <CruiseGrid cruises={featuredCruises} />
          ) : (
            <p className="text-center text-gray-500">No featured cruises available at the moment. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Add other sections like About snippet, Testimonials etc. as needed */}
      {/* Example About Snippet */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">About Velvet Odyssey</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-6">
              Velvet Odyssey specializes in creating unforgettable cruise experiences for adults seeking luxury, adventure, and relaxation. Our carefully curated itineraries take you to the most beautiful destinations around the world.
            </p>
            <a href="/about" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Learn More
            </a>
          </div>
          <div>
            {/* Optional: Add an image here */}
            <img src="/images/backgrounds/about-promo.jpg" alt="About Velvet Odyssey" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

    </main>
  );
}

