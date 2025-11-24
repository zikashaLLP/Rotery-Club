'use client'

import React from 'react'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                  Introduction
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Rotary Club of Visnagar (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                  you visit our website and register for the Visnagar Marathon 2025. Please read this privacy 
                  policy carefully. If you do not agree with the terms of this privacy policy, please do not 
                  access or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  1. Information We Collect
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  We collect information that you provide directly to us and information that is automatically 
                  collected when you use our services:
                </p>
                
                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  1.1 Personal Information
                </h3>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  When you register for the marathon, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Date of birth</li>
                  <li>Gender</li>
                  <li>Address and location information</li>
                  <li>Emergency contact information</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Medical information relevant to participation (if provided)</li>
                  <li>Photographs or images (if uploaded during registration)</li>
                </ul>

                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  1.2 Automatically Collected Information
                </h3>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  When you visit our website, we may automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  2. How We Use Your Information
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Processing and managing your event registration</li>
                  <li>Communicating with you about the event, updates, and important information</li>
                  <li>Processing payments and managing financial transactions</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Ensuring event safety and security</li>
                  <li>Complying with legal obligations and regulations</li>
                  <li>Improving our website and services</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Sending promotional materials and event-related communications (with your consent)</li>
                  <li>Creating event materials, including participant lists and results</li>
                  <li>Sharing information with event partners and sponsors (as disclosed below)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  3. Information Sharing and Disclosure
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  3.1 Service Providers
                </h3>
                <p style={{ textAlign: 'justify' }}>
                  We may share your information with third-party service providers who perform services on our 
                  behalf, such as payment processing, email delivery, data analytics, and event management. 
                  These service providers are contractually obligated to protect your information and use it 
                  only for the purposes we specify.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  3.2 Event Partners and Sponsors
                </h3>
                <p style={{ textAlign: 'justify' }}>
                  We may share limited information (such as name and race category) with event partners and 
                  sponsors for event-related purposes. We will not share sensitive personal information or 
                  payment details without your explicit consent.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  3.3 Legal Requirements
                </h3>
                <p style={{ textAlign: 'justify' }}>
                  We may disclose your information if required by law, court order, or government regulation, 
                  or if we believe disclosure is necessary to protect our rights, property, or safety, or 
                  that of others.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-[#640D5F] mb-3 mt-4">
                  3.4 Business Transfers
                </h3>
                <p style={{ textAlign: 'justify' }}>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                  to the acquiring entity.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  4. Data Security
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no 
                  method of transmission over the internet or electronic storage is 100% secure. While we strive 
                  to use commercially acceptable means to protect your information, we cannot guarantee absolute 
                  security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve website functionality and user experience</li>
                  <li>Provide personalized content</li>
                </ul>
                <p style={{ textAlign: 'justify' }} className="mt-3">
                  You can control cookies through your browser settings. However, disabling cookies may affect 
                  the functionality of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  6. Your Rights and Choices
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal 
                    and contractual obligations)
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing of your personal information for certain 
                    purposes
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request transfer of your data to another service provider
                  </li>
                  <li>
                    <strong>Withdraw Consent:</strong> Withdraw consent for processing where consent is the 
                    legal basis
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                  </li>
                </ul>
                <p style={{ textAlign: 'justify' }} className="mt-3">
                  To exercise these rights, please contact us using the information provided in the Contact 
                  section below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  7. Data Retention
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined 
                  in this Privacy Policy, unless a longer retention period is required or permitted by law. 
                  Event registration data may be retained for record-keeping, legal compliance, and future 
                  event communications. You may request deletion of your data at any time, subject to our 
                  legal obligations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  8. Children&apos;s Privacy
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Our services are not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe your 
                  child has provided us with personal information, please contact us immediately. For participants 
                  under 18, registration must be completed by a parent or legal guardian.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  9. Third-Party Links
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Our website may contain links to third-party websites, services, or applications. We are not 
                  responsible for the privacy practices or content of these third parties. We encourage you to 
                  review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  10. International Data Transfers
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  Your information may be transferred to and processed in countries other than your country of 
                  residence. These countries may have data protection laws that differ from those in your country. 
                  By using our services, you consent to the transfer of your information to these countries.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  11. Changes to This Privacy Policy
                </h2>
                <p style={{ textAlign: 'justify' }}>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. 
                  We encourage you to review this Privacy Policy periodically to stay informed about how we are 
                  protecting your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#640D5F] mb-4">
                  12. Contact Us
                </h2>
                <p style={{ textAlign: 'justify' }} className="mb-3">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                  practices, please contact us:
                </p>
                <ul className="list-none space-y-2 ml-4">
                  <li><strong>Organization:</strong> Rotary Club of Visnagar</li>
                  <li><strong>Email:</strong> hiteshvis@gmail.com</li>
                  <li><strong>Phone:</strong> +91 9898980978</li>
                  <li><strong>Address:</strong> Rotary Bhavan, Rushikesh Market, Opp. Nootan School, NA, Visnagar, Gujarat, India. Pincode - 384315</li>
                </ul>
                <p style={{ textAlign: 'justify' }} className="mt-3">
                  We will respond to your inquiry within a reasonable timeframe and in accordance with applicable 
                  data protection laws.
                </p>
              </div>


            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

