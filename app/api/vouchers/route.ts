import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
// import { createBrevoContact, sendVoucherEmail, updateVoucherStatus, type VoucherContact } from '@/lib/brevo'

// Validation schema for voucher form data
const voucherSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  painArea: z.string().min(1, 'Please tell us about your pain area'),
  preferredContact: z.enum(['email', 'phone', 'text'])
})

interface VoucherData {
  firstName: string
  lastName: string
  email: string
  phone: string
  painArea: string
  preferredContact: string
}

interface VoucherResponse {
  success: boolean
  voucherId?: string
  message: string
  error?: string
}

// Generate a unique voucher ID
function generateVoucherId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `SW-${timestamp}-${random}`
}

// Format phone number for consistency
function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Store voucher data in Brevo
/* async function storeVoucher(data: VoucherData, voucherId: string) {
  // Prepare contact data for Brevo
  const contactData: VoucherContact = {
    ...data,
    voucherId
  }
  
  // Create contact in Brevo
  const brevoResult = await createBrevoContact(contactData)
  return brevoResult.success
} */

// Send voucher notification
/* async function sendVoucherNotification(data: VoucherData, voucherId: string) {
  const { preferredContact, email } = data
  
  try {
    if (preferredContact === 'email') {
      const contactData: VoucherContact = {
        ...data,
        voucherId
      }
      const emailResult = await sendVoucherEmail(contactData)
      
      if (emailResult.success) {
        // Update status to 'sent'
        await updateVoucherStatus(email, 'sent')
        return true
      }
      return false
    } else {
      // For phone/text preferences, we'll handle manually for now
      console.log(`Manual follow-up needed for ${preferredContact}: ${email}`)
      return true
    }
  } catch (error) {
    console.error('Failed to send voucher notification:', error)
    return false
  }
} */


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const validationResult = voucherSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data',
          error: validationResult.error.issues[0].message
        } as VoucherResponse,
        { status: 400 }
      )
    }

    const data = validationResult.data
    
    // Format phone number
    data.phone = formatPhoneNumber(data.phone)
    
    // Generate voucher ID
    const voucherId = generateVoucherId()
    
    // Store voucher data in Brevo
    // const stored = await storeVoucher(data, voucherId)
    const stored = true
    
    if (!stored) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to process voucher request'
        } as VoucherResponse,
        { status: 500 }
      )
    }
    
    // Send notification
    // const notificationSent = await sendVoucherNotification(data, voucherId)
    const notificationSent = true
    
    if (data.preferredContact === 'email' && !notificationSent) {
      // Email failed but contact was created
      return NextResponse.json(
        {
          success: true,
          voucherId,
          message: 'Voucher created successfully. We will contact you within 24 hours to provide your voucher details.'
        } as VoucherResponse,
        { status: 200 }
      )
    }
    
    // Success response
    if (data.preferredContact === 'email') {
      return NextResponse.json(
        {
          success: true,
          voucherId,
          message: 'Voucher request submitted successfully! Check your email for voucher details.'
        } as VoucherResponse,
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          success: true,
          voucherId,
          message: `Voucher request submitted successfully! We will contact you via ${data.preferredContact} within 24 hours.`
        } as VoucherResponse,
        { status: 200 }
      )
    }
    
  } catch (error) {
    console.error('Voucher API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      } as VoucherResponse,
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve voucher status (optional)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const voucherId = searchParams.get('id')
  
  if (!voucherId) {
    return NextResponse.json(
      { success: false, message: 'Voucher ID is required' },
      { status: 400 }
    )
  }
  
  // TODO: Implement voucher lookup from database
  return NextResponse.json(
    {
      success: true,
      voucher: {
        id: voucherId,
        status: 'pending',
        value: '$49',
        createdAt: new Date().toISOString()
      }
    },
    { status: 200 }
  )
}
