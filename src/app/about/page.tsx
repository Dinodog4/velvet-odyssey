import { getPageData } from "@/lib/content";
import Image from "next/image";

export default function AboutPage() {
  const pageData = getPageData("about");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="prose prose-lg max-w-3xl mx-auto dark:prose-invert">
            {/* Render the markdown content as HTML */}
            <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
          </div>
        </div>
      </section>
    </main>
  );
}

