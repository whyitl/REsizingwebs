import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: "Most websites are completed in 2 to 6 weeks, depending on complexity, revisions, and how quickly we receive your content and feedback.",
  },
  {
    q: 'Do you offer mobile-friendly designs?',
    a: 'Yes. All websites we build are designed with a mobile-first approach and tested across devices to ensure a seamless experience.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. We offer full redesign services, and we’ll work with you to improve structure, content flow, speed, SEO, and visual appeal.',
  },
  {
    q: 'Will my website be optimized for SEO?',
    a: 'Yes. We follow on-page SEO best practices, including metadata, heading structure, keyword positioning, and fast load speeds.',
  },
  {
    q: 'What happens after the site is launched?',
    a: 'We provide ongoing support and maintenance options. We can also help with future updates, hosting, and performance monitoring.',
  },
]

const FAQ = () => {
  return (
    <section id="faq" className="section-light section-padding animate-on-scroll">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="heading-lg text-brand-black mb-3">Frequently Asked Questions</h2>
          <p className="body-lg text-brand-gray">Answers to common questions about our process and services.</p>
        </div>

        <Accordion type="single" collapsible className="w-full divide-y rounded-xl border border-brand-gray-light bg-white/80 backdrop-blur">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="px-4 sm:px-6">
              <AccordionTrigger className="text-left text-base sm:text-lg text-brand-black">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-brand-gray text-sm sm:text-base">
                {item.a}
                {idx === faqs.length - 1 && (
                  <div className="mt-4">
                    <a href="#contact" className="underline text-brand-black hover:opacity-80">
                      Still have questions? Contact us
                    </a>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ

