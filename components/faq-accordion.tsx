"use client"

import { useState } from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500']
})

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleFAQ(index)
    }
  }

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 scroll-animation overflow-hidden" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className={`text-lg font-medium text-green-600 pr-4 ${playfair.className}`}>
              {faq.q}
            </h3>
            <svg
              className={`w-6 h-6 text-gray-500 transition-all duration-300 flex-shrink-0 ${
                openIndex === index ? 'rotate-180 text-green-600' : 'hover:text-gray-700'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="px-6 pb-6">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-green-600 leading-relaxed mt-3">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
