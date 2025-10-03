import Link from "next/link"
import Image from "next/image"
import { Playfair_Display, Inter } from 'next/font/google'
import { ScrollAnimationProvider } from "@/components/scroll-animation-provider"
import { ScrollToFormButton } from "@/components/scroll-to-form-button"
import { VoucherForm } from "@/components/voucher-form"
import { GoogleMap } from "@/components/google-map"
import { FAQAccordion } from "@/components/faq-accordion"
import { Navigation } from "@/components/navigation"

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500']
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  return (
    <ScrollAnimationProvider>
      <div className={`flex flex-col min-h-screen bg-white text-gray-900 ${inter.className}`}>
        {/* Navigation */}
        <Navigation />

      <main className="flex-grow pt-16 lg:pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 relative min-h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/PreferredTherapy_future.jpeg"
              alt="Preferred Therapy Services Future"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="max-w-[1200px] mx-auto text-center relative z-10 w-full">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-blue-600 mb-6 sm:mb-8 glimmer-pill fade-in bg-white/90 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-sm">
              <span className={playfair.className}>Limited Time Offer</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-6xl font-medium mb-4 sm:mb-6 tracking-tight fade-in delay-1 text-white drop-shadow-lg leading-tight ${playfair.className}`}>
              Revolutionary <span className="text-blue-300">SoftWave</span><br />Therapy Treatment
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 fade-in delay-2 max-w-3xl mx-auto drop-shadow-md px-2">
              For Anyone With Knee Pain, Shoulder Pain, Back Pain, Elbow Pain, Arthritis, Carpal Tunnel, Joint Pain & More!
            </p>
            <div className="space-y-4 sm:space-y-6 fade-in delay-3">
              <div className="flex items-center justify-center">
                <p className="text-xs sm:text-sm text-white font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span className="font-bold">1,000+</span> patients found relief
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <ScrollToFormButton 
                  size="lg" 
                  className="rounded-full text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-green-500 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 text-center">
                    <span className="block sm:hidden">Get $49 Voucher Today!</span>
                    <span className="hidden sm:block">Get Your $49 Voucher Today!</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </ScrollToFormButton>

                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-center">Only 7 spots remaining at this price</span>
                </div>
              </div>
            </div>
          </div>
        </section>
                  {/* Features Section - Our new modern version */}
        <section id="why-softwave" className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5fbe37 0%, #52a52e 50%, #458c25 100%)' }}>
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          {/* Floating orbs */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 -top-48 -left-48 bg-emerald-300/30"></div>
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-white/20 -bottom-48 -right-48"></div>
          
          <div className="max-w-[1200px] mx-auto relative">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-4xl md:text-5xl font-medium mb-4 text-white ${playfair.className}`}>
                Why Choose SoftWave Therapy?
              </h2>
              <p className="text-white/90 text-xl max-w-2xl mx-auto">
                FDA approved, advanced technology for faster pain relief and recovery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Card 1 */}
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl hover:border-white/40 transition-all duration-300 scroll-animation scroll-delay-1 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className={`text-2xl font-medium mb-4 text-yellow-300 ${playfair.className}`}>
                  Non-Invasive Treatment
                </h3>
                <p className="text-blue-50/90 leading-relaxed">
                  SoftWave therapy uses advanced acoustic wave technology to stimulate healing without surgery or injections.
                </p>
              </div>

              {/* Card 2 */}
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl hover:border-white/40 transition-all duration-300 scroll-animation scroll-delay-2 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3 className={`text-2xl font-medium mb-4 text-yellow-300 ${playfair.className}`}>
                  Fast Pain Relief
                </h3>
                <p className="text-blue-50/90 leading-relaxed">
                  Experience significant pain reduction in just a few sessions. Most patients feel improvement after the first treatment.
                </p>
              </div>

              {/* Card 3 */}
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl hover:border-white/40 transition-all duration-300 scroll-animation scroll-delay-3 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className={`text-2xl font-medium mb-4 text-yellow-300 ${playfair.className}`}>
                  Proven Results
                </h3>
                <p className="text-blue-50/90 leading-relaxed">
                  Clinically proven to treat chronic pain conditions and promote tissue regeneration for long-term healing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-6 border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - 4 Key Benefits */}
              <div className="scroll-animation">
                <h2 className={`text-3xl md:text-4xl font-medium mb-8 ${playfair.className}`}>
                  4 Key Benefits of SoftWave™ Therapy
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      number: "1",
                      title: "Proven Effective",
                      description: "Independent studies proved SoftWave™ Therapy to be highly effective with up to 91% of patients experiencing successful healing."
                    },
                    {
                      number: "2", 
                      title: "Breaks Up Calcification",
                      description: "Using acoustic wave pulses, calcification is cleared from damaged areas, reducing pain and restoring function."
                    },
                    {
                      number: "3",
                      title: "Boost Collagen Production", 
                      description: "Triggers your body into activating resident stem cells, creating new blood vessels and regenerating healthy tissue."
                    },
                    {
                      number: "4",
                      title: "Non-Invasive",
                      description: "A strong option for patients who want to avoid surgery, prescription medication or injections. Activate your own stem cells without invasive procedures."
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 scroll-animation-left" style={{ animationDelay: `${index * 0.15}s` }}>
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {benefit.number}
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold text-gray-900 mb-2 ${playfair.className}`}>
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - SoftWave Benefits */}
              <div className="scroll-animation-right">
                <h2 className={`text-3xl md:text-4xl font-medium mb-8 ${playfair.className}`}>
                  SoftWave™ gets your body unstuck and healing:
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    "Joint Pain Relief: Knee, Shoulder, Elbow, Ankle, TMJ",
                    "Soft Tissue Pain Relief: Muscles, Ligaments, Tendons", 
                    "Chronic Pain Relief: Back, Nerves, Discs, Joints",
                    "Surgery Alternative: Back, Knee, Hand, Foot, Shoulder",
                    "Injection Alternative: Stem Cells, PRP, Cortisone, etc",
                    "Medication Alternative: Erectile Dysfunction, Plantar Fasciitis, Neuropathy"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 scroll-animation-right" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* FDA Clearance Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 scroll-animation-right">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">
                    FDA 510(k) Cleared For:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-blue-800">Activation of connective tissue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-blue-800">Pain Reduction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-blue-800">Improved blood supply</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Areas Section */}
        <section id="conditions" className="py-20 px-6 border-t border-gray-200 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          {/* Floating orbs */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-blue-300/30 -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-white/20 -bottom-48 -right-48"></div>
          
          <div className="max-w-[1200px] mx-auto relative">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-4xl md:text-5xl font-medium mb-4 text-yellow-300 ${playfair.className}`}>Conditions We Treat</h2>
              <p className={`text-white text-3xl max-w-2xl mx-auto drop-shadow-lg ${playfair.className}`} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SoftWave therapy is effective for a wide range of pain conditions.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  image: "/images/knee_pain_relief.png", 
                  title: "Knee Pain", 
                  desc: "Arthritis, tendonitis, ligament injuries",
                  alt: "SoftWave therapy treatment for knee pain"
                },
                { 
                  image: "/images/Back_pain_relief.png", 
                  title: "Back Pain", 
                  desc: "Sciatica, herniated discs, muscle strain",
                  alt: "SoftWave therapy treatment for back pain"
                },
                { 
                  image: "/images/elbow_pain_relief.png", 
                  title: "Elbow Pain", 
                  desc: "Tennis elbow, golfer's elbow",
                  alt: "SoftWave therapy treatment for elbow pain"
                },
                { 
                  image: "/images/foot_pain_relief.png", 
                  title: "Foot Pain", 
                  desc: "Plantar fasciitis, heel pain",
                  alt: "SoftWave therapy treatment for foot pain"
                },
                { 
                  image: "/images/shoulder_pain_relief.png", 
                  title: "Shoulder Pain", 
                  desc: "Rotator cuff, frozen shoulder, bursitis",
                  alt: "SoftWave therapy treatment for shoulder pain"
                },
                { 
                  image: "/images/ankle_pain_relief.png", 
                  title: "Ankle Pain", 
                  desc: "Sprains, arthritis, tendonitis",
                  alt: "SoftWave therapy treatment for ankle pain"
                },
                { 
                  image: "/images/carpal_tunnel_relief.png", 
                  title: "Carpal Tunnel", 
                  desc: "Wrist and hand pain, numbness",
                  alt: "SoftWave therapy treatment for carpal tunnel"
                },
                { 
                  image: "/images/neck_pain_relief.png", 
                  title: "Joint Pain", 
                  desc: "Arthritis, inflammation, stiffness",
                  alt: "SoftWave therapy treatment for joint pain"
                }
              ].map((condition, index) => (
                <div key={index} className="p-6 rounded-xl border border-blue-300 hover:border-blue-100 transition-colors scroll-animation group shadow-2xl" style={{ backgroundColor: '#3498db', animationDelay: `${index * 0.1}s` }}>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={condition.image} 
                      alt={condition.alt}
                      width={300}
                      height={128}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300 border-4 border-yellow-300 rounded-lg"
                    />
                  </div>
                  <h3 className={`text-lg font-medium mb-2 text-white ${playfair.className}`}>{condition.title}</h3>
                  <p className="text-white text-sm font-bold">{condition.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 border-t border-gray-200 bg-blue-50">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-3 ${playfair.className}`}>What Our Patients Say</h2>
              <p className="text-gray-600 text-lg">Real results from real patients.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah M.",
                  condition: "Chronic Knee Pain",
                  rating: 5,
                  text: "After years of knee pain, SoftWave therapy gave me my life back. I can now walk without pain and even started jogging again!"
                },
                {
                  name: "Michael R.",
                  condition: "Shoulder Injury",
                  rating: 5,
                  text: "Amazing results! My shoulder pain was gone after just 3 sessions. The staff at Preferred Therapy Services is incredible."
                },
                {
                  name: "Jennifer L.",
                  condition: "Back Pain",
                  rating: 5,
                  text: "I was skeptical at first, but SoftWave therapy completely eliminated my chronic back pain. Highly recommend!"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 scroll-animation" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

           {/* Contact Form Section */}
           <section id="contact-form" className="py-20 px-6 border-t border-gray-200 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5fbe37 0%, #52a52e 50%, #458c25 100%)' }}>
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          {/* Floating orbs */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 -top-48 -left-48 bg-emerald-300/30"></div>
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-white/20 -bottom-48 -right-48"></div>
          
          <div className="max-w-[1200px] mx-auto relative">
            <div className="text-center mb-12 scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-4 text-white ${playfair.className}`}>Claim Your $49 Softwave Introductory Special</h2>
              <p className="text-white/90 text-xl font-bold drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                <span style={{ color: '#e67e22' }}>LIMITED TIME OFFER</span> - Don&apos;t miss out on this revolutionary pain relief treatment!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Form Section - First on mobile, left on desktop */}
              <div className="scroll-animation order-2 lg:order-1">
                <VoucherForm />
              </div>
              
              {/* Map Section - Second on mobile, right on desktop */}
              <div className="scroll-animation order-1 lg:order-2">
                <GoogleMap 
                  businessName="Preferred Therapy Service"
                  address="6962 Boulder Ave, Highland, CA 92346"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6 border-t border-gray-200 relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600" style={{ backgroundColor: '#f59038' }}>
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          {/* Floating orbs */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-orange-300/30 -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 bg-white/20 -bottom-48 -right-48"></div>
          
          <div className="max-w-[800px] mx-auto relative">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-white ${playfair.className}`}>Frequently Asked Questions</h2>
              <p className="text-white text-xl font-bold">Everything you need to know about SoftWave therapy.</p>
            </div>

            <FAQAccordion faqs={[
              {
                q: "What is SoftWave therapy?",
                a: "SoftWave therapy is a non-invasive treatment that uses acoustic wave technology to stimulate healing in damaged tissues, reduce inflammation, and relieve pain."
              },
              {
                q: "How long does a treatment session take?",
                a: "Each SoftWave therapy session typically takes 5-10 minutes, depending on the area being treated."
              },
              {
                q: "How many sessions will I need?",
                a: "Most patients see significant improvement in 3-6 sessions, though the exact number depends on your specific condition and severity."
              },
              {
                q: "Is SoftWave therapy painful?",
                a: "No, SoftWave therapy is generally well-tolerated. You may feel a mild pulsing sensation, but it should not be painful."
              },
              {
                q: "Are there any side effects?",
                a: "SoftWave therapy has minimal side effects. Some patients may experience mild redness or tenderness in the treated area, which typically resolves within 24 hours."
              },
              {
                q: "How do I claim my $49 voucher?",
                a: "Simply fill out the form above and we'll contact you to schedule your consultation and first treatment session."
              },
              {
                q: "Does insurance pay for Softwave Sessions?",
                a: "Insurance does not typically pay for softwave at this time. However some insurances may cover it if it is medical necessity."
              }
            ]} />
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-gray-200 scroll-animation">
        <div className="max-w-[1200px] mx-auto">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image 
                src="/Preferred_Therapy_Services_logo.png" 
                alt="Preferred Therapy Services Logo" 
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <div className="text-sm text-green-600">© 2024 Preferred Therapy Services. All rights reserved.</div>

              {/* Inline Social Proof (compact) */}
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-600 font-medium whitespace-nowrap">
                  <span className="font-bold">Join the 1,000+</span> patients who&apos;ve found relief
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ScrollAnimationProvider>
  )
}