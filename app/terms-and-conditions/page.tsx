'use client'

import React from 'react'

export default function TermsAndConditionsPage() {
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
            Terms and Conditions
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
                  1. Acceptance of Terms
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  By registering for the Visnagar Marathon 2025, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please 
                  do not register for the event.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  2. Event Registration
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  Registration for the Visnagar Marathon 2025 is subject to the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All participants must provide accurate and complete information during registration.</li>
                  <li>Registration is non-transferable and non-refundable unless otherwise stated.</li>
                  <li>The organizers reserve the right to refuse or cancel any registration at their discretion.</li>
                  <li>Participants must meet the age requirements for their chosen race category.</li>
                  <li>Registration fees are non-refundable in case of cancellation by the participant.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  3. Health and Safety
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  Participation in the marathon involves physical activity and potential risks. By registering, 
                  you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are in good physical condition and have consulted with a medical professional if necessary.</li>
                  <li>You participate at your own risk and assume all responsibility for any injuries or health issues.</li>
                  <li>The organizers are not liable for any injuries, accidents, or health complications during the event.</li>
                  <li>You will follow all safety instructions and guidelines provided by the organizers.</li>
                  <li>Medical assistance will be available, but participants are responsible for their own health and safety.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  4. Event Cancellation or Modification
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  The organizers reserve the right to cancel, postpone, or modify the event due to circumstances 
                  beyond their control, including but not limited to natural disasters, extreme weather conditions, 
                  government regulations, or other unforeseen events. In such cases, the organizers will make 
                  reasonable efforts to notify participants, but registration fees may not be refundable.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  5. Participant Conduct
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  All participants are expected to conduct themselves in a respectful and sportsmanlike manner. 
                  The following behaviors are strictly prohibited:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cheating or using unauthorized assistance during the race.</li>
                  <li>Disruptive or abusive behavior towards other participants, volunteers, or staff.</li>
                  <li>Violation of any local laws or regulations.</li>
                  <li>Use of prohibited substances or equipment.</li>
                </ul>
                <p style={{ textAlign: 'justify' }} className="mt-3">
                  Violation of these rules may result in immediate disqualification and removal from the event 
                  without refund.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  6. Photography and Media
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  By participating in the event, you consent to being photographed, filmed, or recorded. The 
                  organizers may use these images, videos, or recordings for promotional, marketing, or 
                  documentation purposes without compensation or further consent. If you do not wish to be 
                  photographed, please inform the event organizers in advance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  7. Liability Waiver
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  To the maximum extent permitted by law, participants release and hold harmless the Rotary Club 
                  of Visnagar, event organizers, sponsors, volunteers, and all associated parties from any and 
                  all claims, damages, losses, or liabilities arising from participation in the Visnagar Marathon 
                  2025, including but not limited to personal injury, property damage, or death.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  8. Refund Policy
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Registration fees are generally non-refundable. However, refunds may be considered on a 
                  case-by-case basis for exceptional circumstances, subject to the organizers&apos; discretion. 
                  Any approved refunds may be subject to processing fees. Requests for refunds must be submitted 
                  in writing to the event organizers at least 30 days before the event date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  9. Personal Belongings
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Participants are responsible for their personal belongings during the event. The organizers 
                  are not liable for any loss, theft, or damage to personal property. It is recommended that 
                  participants do not bring valuable items to the event.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  10. Changes to Terms
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  The organizers reserve the right to modify these Terms and Conditions at any time. Participants 
                  will be notified of any significant changes, and continued participation in the event constitutes 
                  acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  11. Contact Information
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  For any questions or concerns regarding these Terms and Conditions, please contact the event 
                  organizers at:
                </p>
                <ul className="list-none space-y-2 ml-4 mt-3">
                  <li><strong>Email:</strong> hiteshvis@gmail.com</li>
                  <li><strong>Phone:</strong> +91 9898980978</li>
                  <li><strong>Address:</strong> Rotary Bhavan, Rushikesh Market, Opp. Nootan School, NA, Visnagar, Gujarat, India. Pincode - 384315</li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

