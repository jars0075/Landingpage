import { TransactionalEmailsApi, SendSmtpEmail, ContactsApi, CreateContact, TransactionalEmailsApiApiKeys, ContactsApiApiKeys } from '@getbrevo/brevo'

// Initialize Brevo API clients
const transactionalEmailsApi = new TransactionalEmailsApi()
const contactsApi = new ContactsApi()

// Set API key from environment variable
const apiKey = process.env.BREVO_API_KEY
if (apiKey) {
  transactionalEmailsApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey)
  contactsApi.setApiKey(ContactsApiApiKeys.apiKey, apiKey)
}

export interface VoucherContact {
  firstName: string
  lastName: string
  email: string
  phone: string
  painArea: string
  preferredContact: string
  voucherId: string
}

// Create contact in Brevo
export async function createBrevoContact(contactData: VoucherContact) {
  try {
    if (!apiKey) {
      console.error('BREVO_API_KEY not found in environment variables')
      return { success: false, error: 'API key not configured' }
    }

    const contact: CreateContact = {
      email: contactData.email,
      attributes: {
        FIRSTNAME: contactData.firstName,
        LASTNAME: contactData.lastName,
        SMS: contactData.phone,
        PAIN_AREA: contactData.painArea,
        PREFERRED_CONTACT: contactData.preferredContact,
        VOUCHER_ID: contactData.voucherId,
        VOUCHER_STATUS: 'pending'
      },
      listIds: [3], // Add to default list
      updateEnabled: true
    }

    await contactsApi.createContact(contact)
    console.log(`Contact created successfully: ${contactData.email}`)
    
    return { success: true }
  } catch (error: any) {
    console.error('Error creating Brevo contact:', error)
    
    // If contact already exists, that's okay
    if (error.status === 400 && error.body?.code === 'duplicate_parameter') {
      console.log(`Contact already exists: ${contactData.email}`)
      return { success: true }
    }
    
    return { success: false, error: error.message || 'Unknown error' }
  }
}

// Send voucher email
export async function sendVoucherEmail(contactData: VoucherContact) {
  try {
    if (!apiKey) {
      console.error('BREVO_API_KEY not found in environment variables')
      return { success: false, error: 'API key not configured' }
    }

    const emailData: SendSmtpEmail = {
      to: [{
        email: contactData.email,
        name: `${contactData.firstName} ${contactData.lastName}`
      }],
      subject: `Your $49 SoftWave Therapy Voucher - ${contactData.voucherId}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Interest in SoftWave Therapy!</h2>
          
          <p>Dear ${contactData.firstName},</p>
          
          <p>We're excited to help you on your journey to pain relief! Your voucher request has been successfully submitted.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Voucher Details:</h3>
            <p><strong>Voucher ID:</strong> ${contactData.voucherId}</p>
            <p><strong>Value:</strong> $49 (Regular price: $150+)</p>
            <p><strong>Pain Area:</strong> ${contactData.painArea}</p>
            <p><strong>Valid For:</strong> 30 days from today</p>
          </div>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>We'll contact you within 24 hours to schedule your appointment</li>
            <li>Bring this voucher ID to your first session</li>
            <li>Experience the revolutionary SoftWave therapy treatment</li>
          </ol>
          
          <p><strong>Contact Information:</strong></p>
          <p>Preferred Therapy Services<br>
          6962 Boulder Ave, Highland, CA 92346<br>
          Phone: (909) 123-4567</p>
          
          <p>We look forward to helping you find relief from your pain!</p>
          
          <p>Best regards,<br>
          The Preferred Therapy Services Team</p>
        </div>
      `,
      sender: {
        name: 'Preferred Therapy Services',
        email: 'info@preferredtherapyservice.com'
      }
    }

    await transactionalEmailsApi.sendTransacEmail(emailData)
    console.log(`Voucher email sent successfully to: ${contactData.email}`)
    
    return { success: true }
  } catch (error: any) {
    console.error('Error sending voucher email:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }
}

// Send admin notification email
export async function sendAdminNotificationEmail(contactData: VoucherContact) {
  try {
    if (!apiKey) {
      console.error('BREVO_API_KEY not found in environment variables')
      return { success: false, error: 'API key not configured' }
    }

    const emailData: SendSmtpEmail = {
      to: [{
        email: 'info@preferredtherapyservice.com',
        name: 'Preferred Therapy Admin'
      }],
      subject: `New Voucher Request: ${contactData.firstName} ${contactData.lastName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New SoftWave Voucher Request</h2>
          <p>A new voucher request has been submitted through the landing page.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Submitted Information:</h3>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone}</p>
            <p><strong>Pain Area:</strong> ${contactData.painArea}</p>
            <p><strong>Preferred Contact:</strong> ${contactData.preferredContact}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p><strong>Voucher ID:</strong> ${contactData.voucherId}</p>
          </div>
          
          <p>You can view this new contact in your Brevo dashboard.</p>
        </div>
      `,
      sender: {
        name: 'Softwave Landing Page',
        email: 'noreply@preferredtherapy.com'
      }
    }

    await transactionalEmailsApi.sendTransacEmail(emailData)
    console.log(`Admin notification sent successfully for: ${contactData.email}`)
    
    return { success: true }
  } catch (error: any) {
    console.error('Error sending admin notification email:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }
}

// Update voucher status
export async function updateVoucherStatus(email: string, status: string) {
  try {
    if (!apiKey) {
      console.error('BREVO_API_KEY not found in environment variables')
      return { success: false, error: 'API key not configured' }
    }

    // Update contact attributes
    const contact: CreateContact = {
      email: email,
      attributes: {
        VOUCHER_STATUS: status
      }
    }

    await contactsApi.updateContact(email, contact)
    console.log(`Voucher status updated to '${status}' for: ${email}`)
    
    return { success: true }
  } catch (error: any) {
    console.error('Error updating voucher status:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }
}
