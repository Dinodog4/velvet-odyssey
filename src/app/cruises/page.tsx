import { getAllCruises } from "@/lib/content";
import CruiseGrid from "@/components/cruises/CruiseGrid";

export default function CruisesPage() {
  const allCruises = getAllCruises();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 md:mb-12">Explore Our Cruises</h1>
          {/* Add filtering/sorting options here if needed */}
          {allCruises.length > 0 ? (
            <CruiseGrid cruises={allCruises} />
          ) : (
            <p className="text-center text-gray-500">No cruises available at the moment. Check back soon!</p>
          )}
        </div>
      </section>
    </main>
  );
}

