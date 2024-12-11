
import faq from "@/data/faq.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const FaqAccordian = () => {
  return (
    <Accordion type="multiple" className="w-full  px-2 xl:px-0">
    {faq.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index + 1}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
  )
}

export default FaqAccordian
