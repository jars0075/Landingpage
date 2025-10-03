# SoftWave Voucher Form Implementation Plan

## Project Overview

Transform the current simulation-only voucher form into a fully functional system that processes real voucher requests, integrates with Brevo for contact management, and includes email/SMS delivery capabilities.

## Current State Analysis

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Shadcn UI
- **Form**: Collects firstName, lastName, email, phone, painArea, preferredContact
- **Current Issue**: Line 74 in `components/voucher-form.tsx` contains simulation code
- **Infrastructure**: No backend API, no database, no email/SMS services

## Architecture Decisions

### Data Storage Strategy

**Primary: Brevo Integration** ✅ Recommended

- Store all contact data in Brevo via API
- Leverage Brevo's marketing automation features
- Automatic contact segmentation and list management
- Built-in email delivery system

**Secondary: Hostinger MySQL** (Optional backup/additional storage)

- Store voucher-specific data (voucher IDs, status, redemption tracking)
- Complement Brevo with business-specific data

### Deployment Strategy

**Option A: Vercel** ✅ Recommended for MVP

- Serverless functions for API routes
- Automatic scaling and CDN
- Easy integration with Next.js
- Environment variables for API keys

**Option B: Hostinger**

- Full control over server environment
- Traditional hosting with MySQL database
- Better for complex backend requirements

## Implementation Tasks

### Phase 1: Backend Infrastructure Setup

#### Task 1.1: Environment Configuration

- [ ] Create `.env.local` file for development
- [ ] Set up environment variables:
  ```
  BREVO_API_KEY=your_brevo_api_key
  BREVO_LIST_ID=your_contact_list_id
  NEXT_PUBLIC_SITE_URL=your_site_url
  VOUCHER_EXPIRY_DAYS=90
  ```
- [ ] Configure Vercel environment variables for production

#### Task 1.2: Dependencies Installation

- [ ] Install required packages:
  ```bash
  npm install @getbrevo/brevo zod
  npm install -D @types/node
  ```

#### Task 1.3: Brevo API Integration Setup

- [ ] Create Brevo account and obtain API key
- [ ] Set up contact list for voucher requests
- [ ] Configure custom contact attributes:
  - Phone number
  - Pain area
  - Preferred contact method
  - Voucher ID
  - Voucher status

### Phase 2: API Development

#### Task 2.1: Create Voucher API Route

- [ ] Create `app/api/vouchers/route.ts`
- [ ] Implement POST endpoint for voucher creation
- [ ] Add form validation using Zod schema
- [ ] Generate unique voucher IDs (format: SW-TIMESTAMP-RANDOM)

#### Task 2.2: Brevo Integration Functions

- [ ] Create `lib/brevo.ts` utility file
- [ ] Implement contact creation function
- [ ] Add contact to voucher list
- [ ] Set custom attributes for tracking

#### Task 2.3: Voucher Management

- [ ] Create voucher data structure
- [ ] Implement voucher status tracking
- [ ] Add voucher expiration logic (90 days default)
- [ ] Create voucher lookup endpoint (optional)

### Phase 3: Email/SMS Delivery System

#### Task 3.1: Email Delivery via Brevo

- [ ] Create email templates in Brevo
- [ ] Design voucher email template with:
  - Voucher ID and value ($49)
  - Business contact information
  - Expiration date
  - Redemption instructions
- [ ] Implement automated email sending

#### Task 3.2: SMS Integration (Optional)

- [ ] Set up Brevo SMS service or Twilio integration
- [ ] Create SMS template for voucher delivery
- [ ] Implement SMS sending for preferred contact method

#### Task 3.3: Phone Call Scheduling

- [ ] Create internal notification system for phone preferences
- [ ] Log phone call requests for manual follow-up
- [ ] Optional: Integrate with scheduling system

### Phase 4: Frontend Updates

#### Task 4.1: Update Voucher Form Component

- [ ] Replace simulation code (line 74) with real API call
- [ ] Update error handling for API responses
- [ ] Add loading states and success messages
- [ ] Include voucher ID in success confirmation

#### Task 4.2: Enhanced User Experience

- [ ] Add form submission analytics
- [ ] Implement client-side validation improvements
- [ ] Add progress indicators
- [ ] Create voucher status lookup page (optional)

#### Task 4.3: Error Handling & Fallbacks

- [ ] Implement comprehensive error handling
- [ ] Add retry mechanisms for failed submissions
- [ ] Create fallback contact methods
- [ ] Add offline form submission queue

### Phase 5: Database Integration (Optional - Hostinger)

#### Task 5.1: Database Schema Design

- [ ] Design voucher tracking table:
  ```sql
  CREATE TABLE vouchers (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    pain_area TEXT,
    preferred_contact ENUM('email', 'phone', 'text'),
    status ENUM('pending', 'sent', 'redeemed', 'expired'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    redeemed_at TIMESTAMP NULL
  );
  ```

#### Task 5.2: Database Connection

- [ ] Set up MySQL connection for Hostinger
- [ ] Create database utility functions
- [ ] Implement voucher CRUD operations
- [ ] Add data synchronization with Brevo

### Phase 6: Security & Compliance

#### Task 6.1: Data Protection

- [ ] Implement input sanitization
- [ ] Add rate limiting to prevent spam
- [ ] Secure API endpoints
- [ ] Add CSRF protection

#### Task 6.2: Privacy Compliance

- [ ] Add privacy policy acceptance
- [ ] Implement data retention policies
- [ ] Add unsubscribe mechanisms
- [ ] GDPR compliance considerations

### Phase 7: Testing & Quality Assurance

#### Task 7.1: Unit Testing

- [ ] Test API endpoints
- [ ] Test form validation
- [ ] Test Brevo integration
- [ ] Test email delivery

#### Task 7.2: Integration Testing

- [ ] End-to-end form submission testing
- [ ] Email delivery verification
- [ ] Error scenario testing
- [ ] Performance testing

#### Task 7.3: User Acceptance Testing

- [ ] Test complete user journey
- [ ] Verify voucher redemption process
- [ ] Test on multiple devices/browsers
- [ ] Validate business workflow

### Phase 8: Deployment & Monitoring

#### Task 8.1: Vercel Deployment

- [ ] Configure build settings
- [ ] Set up environment variables
- [ ] Deploy to staging environment
- [ ] Production deployment

#### Task 8.2: Alternative Hostinger Deployment

- [ ] Set up Node.js hosting
- [ ] Configure database connections
- [ ] Upload and configure application
- [ ] Set up SSL certificates

#### Task 8.3: Monitoring & Analytics

- [ ] Set up error monitoring (Sentry)
- [ ] Implement form submission analytics
- [ ] Monitor API performance
- [ ] Set up uptime monitoring

## Technical Specifications

### API Endpoints

```
POST /api/vouchers
- Create new voucher request
- Integrate with Brevo
- Send confirmation email/SMS

GET /api/vouchers?id={voucherId}
- Retrieve voucher status
- Check expiration
- Redemption tracking
```

### Brevo Integration Points

1. **Contact Creation**: Add user to Brevo contacts
2. **List Management**: Add to "SoftWave Vouchers" list
3. **Custom Attributes**: Store voucher-specific data
4. **Email Automation**: Trigger voucher delivery email
5. **SMS Service**: Optional SMS delivery

### Data Flow

1. User submits form → Form validation
2. Generate voucher ID → Store in Brevo
3. Send confirmation email → Update voucher status
4. Business receives notification → Manual follow-up if needed

## Success Metrics

- [ ] Form submission success rate > 95%
- [ ] Email delivery rate > 98%
- [ ] Average response time < 2 seconds
- [ ] Zero data loss incidents
- [ ] Successful Brevo integration

## Timeline Estimate

- **Phase 1-2**: 2-3 days (Backend setup)
- **Phase 3**: 2-3 days (Email/SMS integration)
- **Phase 4**: 1-2 days (Frontend updates)
- **Phase 5**: 2-3 days (Optional database)
- **Phase 6-8**: 2-3 days (Security, testing, deployment)

**Total Estimated Time**: 7-12 days

## Risk Mitigation

- **Brevo API Limits**: Implement rate limiting and error handling
- **Email Deliverability**: Use Brevo's reputation and SPF/DKIM setup
- **Data Loss**: Implement backup storage and retry mechanisms
- **Spam Prevention**: Add CAPTCHA and rate limiting
- **Scalability**: Use Vercel's auto-scaling capabilities

## Next Steps

1. Obtain Brevo API credentials
2. Set up development environment
3. Begin Phase 1 implementation
4. Test Brevo integration in development
5. Deploy to staging for testing

---

_This plan provides a comprehensive roadmap to transform your voucher form from simulation to a fully functional, production-ready system integrated with Brevo for contact management and deployed on your preferred platform._
