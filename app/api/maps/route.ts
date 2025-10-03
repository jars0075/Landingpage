import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')
    const businessName = searchParams.get('businessName')
    
    if (!address || !businessName) {
      return NextResponse.json(
        { error: 'Address and business name are required' },
        { status: 400 }
      )
    }
    
    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      console.error('GOOGLE_MAPS_API_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'Maps service not configured' },
        { status: 500 }
      )
    }
    
    // Encode the address for the Google Maps embed URL
    const encodedAddress = encodeURIComponent(`${businessName}, ${address}`)
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=15`
    
    return NextResponse.json({ mapSrc })
    
  } catch (error) {
    console.error('Error generating map URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate map URL' },
      { status: 500 }
    )
  }
}
