
import { getPageData } from "@/lib/content";
import ContactForm from "@/components/forms/ContactForm"; // Assuming you have a ContactForm component

export default function ContactPage() {
  const pageData = getPageData("contact");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{pageData.title || "Contact Us"}</h1>
            {pageData.introduction && (
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-8">
                {pageData.introduction}
              </p>
            )}
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* FAQ Section */}
            {pageData.faq && pageData.faq.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {pageData.faq.map((item, index) => (
                    <details key={index} className="group rounded-lg border p-4">
                      <summary className="flex cursor-pointer items-center justify-between font-medium">
                        {item.question}
                        <svg
                          className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>
                      <div className="pt-4 text-gray-500 dark:text-gray-400">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

