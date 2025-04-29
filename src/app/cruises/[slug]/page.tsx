import { getCruiseData, getAllCruiseSlugs } from "@/lib/content";
import CruiseDetail from "@/components/cruises/CruiseDetail";

// Generate static params for all cruise slugs
export async function generateStaticParams() {
  const paths = getAllCruiseSlugs();
  return paths;
}

export default function CruisePage({ params }) {
  const { slug } = params;
  const cruiseData = getCruiseData(slug);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <CruiseDetail cruise={cruiseData} />
    </main>
  );
}
