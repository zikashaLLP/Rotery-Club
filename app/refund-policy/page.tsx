'use client'

import React from 'react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading with Theme Background */}
      <div className="relative overflow-hidden pt-20 md:pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7EB] via-[#FFF1F5] to-[#FFF7EB] opacity-90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D91656] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB200] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#EB5B00] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#640D5F] text-center">
            Refund Policy
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-[#D91656] rounded-full"></div>
            <div className="w-3 h-3 bg-[#FFB200] rounded-full"></div>
            <div className="w-3 h-3 bg-[#EB5B00] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-base md:text-lg text-[#2B1341]/90 leading-relaxed">
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  Overview
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  This Refund Policy outlines the terms and conditions under which refunds may be issued for 
                  registrations to the Visnagar Marathon 2025. Please read this policy carefully before 
                  registering for the event. By completing your registration, you acknowledge that you have 
                  read, understood, and agree to this Refund Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  1. General Refund Policy
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  Registration fees for the Visnagar Marathon 2025 are generally <strong>non-refundable</strong>. 
                  However, refunds may be considered under specific circumstances as outlined below. All refund 
                  requests are subject to review and approval by the event organizers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  2. Eligible Refund Scenarios
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  Refunds may be considered in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Event Cancellation:</strong> If the event is cancelled by the organizers due to 
                    circumstances beyond their control (natural disasters, extreme weather, government regulations, 
                    etc.), participants will be eligible for a full refund of the registration fee.
                  </li>
                  <li>
                    <strong>Event Postponement:</strong> If the event is postponed and you are unable to attend 
                    the new date, you may request a refund within 14 days of the postponement announcement.
                  </li>
                  <li>
                    <strong>Medical Emergency:</strong> Refunds may be considered for documented medical emergencies 
                    that prevent participation. A medical certificate from a licensed physician must be provided.
                  </li>
                  <li>
                    <strong>Bereavement:</strong> Refunds may be considered in cases of death in the immediate 
                    family. Appropriate documentation may be required.
                  </li>
                  <li>
                    <strong>Registration Error:</strong> If a registration error occurs due to a technical issue 
                    on our part (duplicate charges, incorrect amount charged, etc.), a full refund will be issued 
                    upon verification.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  3. Non-Refundable Scenarios
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  The following circumstances do <strong>not</strong> qualify for refunds:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Change of mind or personal preference</li>
                  <li>Inability to attend due to personal commitments or scheduling conflicts</li>
                  <li>Travel restrictions or transportation issues</li>
                  <li>Weather-related concerns (unless the event is officially cancelled)</li>
                  <li>Injury or illness that is not a documented medical emergency</li>
                  <li>Failure to meet race requirements or disqualification</li>
                  <li>No-show on the event day</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  4. Refund Request Process
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>
                    Submit a written refund request via email to <strong>hiteshvis@gmail.com</strong> 
                    with the subject line &quot;Refund Request - [Your Registration ID]&quot;
                  </li>
                  <li>
                    Include the following information in your request:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>Full name and registration ID</li>
                      <li>Email address used for registration</li>
                      <li>Reason for refund request</li>
                      <li>Supporting documentation (if applicable)</li>
                    </ul>
                  </li>
                  <li>
                    Refund requests must be submitted at least <strong>30 days before the event date</strong> 
                    to be considered (except for event cancellation/postponement scenarios).
                  </li>
                  <li>
                    Allow 7-14 business days for review and processing of your request.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  5. Processing Fees
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Approved refunds may be subject to processing fees to cover administrative and payment 
                  processing costs. The processing fee is typically 5-10% of the registration amount or a 
                  minimum of ₹50, whichever is higher. Processing fees will be deducted from the refund amount. 
                  In cases of event cancellation or registration errors on our part, processing fees will be waived.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  6. Refund Processing Time
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  Once a refund is approved:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Refunds will be processed within <strong>14-21 business days</strong> from the date of approval.
                  </li>
                  <li>
                    Refunds will be issued to the original payment method used during registration.
                  </li>
                  <li>
                    The time it takes for the refund to appear in your account depends on your bank or payment 
                    provider, typically 3-7 business days after processing.
                  </li>
                  <li>
                    You will receive an email confirmation once the refund has been processed.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  7. Transfer of Registration
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Instead of requesting a refund, you may be able to transfer your registration to another 
                  person. Transfer requests must be submitted at least 14 days before the event date and are 
                  subject to approval. A transfer fee may apply. Please contact us for more information about 
                  registration transfers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  8. Partial Refunds
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  In certain circumstances, partial refunds may be offered instead of full refunds. This will 
                  be determined on a case-by-case basis and communicated to you during the refund review process.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  9. Disputes and Appeals
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  If your refund request is denied and you believe it should be approved, you may appeal the 
                  decision by providing additional documentation or clarification. Appeals must be submitted 
                  within 7 days of receiving the denial notification. The organizers&apos; decision on appeals 
                  is final.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  10. Contact Information
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  For refund requests or questions about this policy, please contact:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>Email:</strong> hiteshvis@gmail.com</li>
                  <li><strong>Phone:</strong> +91 9898980978</li>
                  <li><strong>Address:</strong> Rotary Bhavan, Rushikesh Market, Opp. Nootan School, NA, Visnagar, Gujarat, India. Pincode - 384315</li>
                  <li><strong>Response Time:</strong> We aim to respond to all refund requests within 3-5 business days</li>
                </ul>
              </div>

              <div className="mt-8 p-4 bg-[#FFF7EB] rounded-lg border border-[#FFB200]/20">
                <p className="text-sm text-[#640D5F] font-semibold mb-2">
                  Important Notes:
                </p>
                <ul className="text-sm text-[#2B1341]/80 space-y-1 list-disc list-inside">
                  <li>All refund requests are subject to review and approval by the event organizers.</li>
                  <li>Refund policies may vary for different registration categories or early bird registrations.</li>
                  <li>This policy is subject to change, and any changes will be communicated to registered participants.</li>
                  <li>By registering, you agree to abide by this Refund Policy.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

