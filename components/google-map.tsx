"use client"

import { useState, useEffect } from "react"

interface GoogleMapProps {
  address?: string
  businessName?: string
  className?: string
}

export function GoogleMap({ 
  address = "123 Main Street, Anytown, ST 12345", 
  businessName = "Preferred Therapy Services",
  className = ""
}: GoogleMapProps) {
  const [mapSrc, setMapSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Encode the address for the Google Maps search URL (for directions link)
  const encodedAddress = encodeURIComponent(`${businessName}, ${address}`)
  
  useEffect(() => {
    const fetchMapUrl = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/maps?address=${encodeURIComponent(address)}&businessName=${encodeURIComponent(businessName)}`)
        
        if (!response.ok) {
          throw new Error('Failed to load map')
        }
        
        const data = await response.json()
        setMapSrc(data.mapSrc)
      } catch (err) {
        console.error('Error loading map:', err)
        setError('Failed to load map')
        // Fallback to a basic Google Maps search embed (no API key required)
        setMapSrc(`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchMapUrl()
  }, [address, businessName])

  return (
    <div className={`bg-blue-50 rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Location Info Header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Our Location</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-medium text-gray-900">{businessName}</p>
              <p>{address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">
              (909) 907-5211
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
              <p>Sat: 9:00 AM - 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center text-gray-600">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Unable to load map</p>
              <p className="text-sm">Please try refreshing the page</p>
            </div>
          </div>
        ) : (
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing location of ${businessName}`}
          />
        )}
      </div>
      
      {/* Directions Link */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  )
}
