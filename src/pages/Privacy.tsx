import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Last Updated: January 8, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
              <p>
                Welcome to Shemmy Mae's Privacy Policy. Your privacy is critically important to us. This policy explains how we collect, use, protect, and share your personal information when you use our website and services.
              </p>
              <p className="mt-4">
                Shemmy Mae is committed to protecting your privacy and ensuring transparency in our data practices. This policy applies to all services we provide, including website development, digital marketing, graphics design, and business consulting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
              <p className="mb-4">We collect information you voluntarily provide when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fill out contact forms or request quotes</li>
                <li>Subscribe to our newsletter</li>
                <li>Create an account or client portal access</li>
                <li>Engage our services and provide project requirements</li>
                <li>Communicate with us via email, phone, or other channels</li>
              </ul>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Business information (company name, website, industry)</li>
                <li>Project details and requirements</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials for services we manage on your behalf</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="mb-4">When you visit our website, we automatically collect certain information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website or source</li>
                <li>Operating system and device type</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Service Delivery</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill service requests</li>
                <li>Develop and deliver websites, applications, and digital solutions</li>
                <li>Manage digital marketing campaigns and social media accounts</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Manage project timelines and deliverables</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Communication</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send project updates and service-related communications</li>
                <li>Respond to your questions and requests</li>
                <li>Send newsletters and marketing communications (with your consent)</li>
                <li>Notify you of service updates or changes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.3 Business Operations</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process payments and maintain financial records</li>
                <li>Improve our services and website functionality</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.4 Marketing and Analytics</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understand visitor behavior and preferences</li>
                <li>Create case studies and portfolio examples (with permission)</li>
                <li>Improve marketing strategies and service offerings</li>
                <li>Send promotional materials (with opt-out options)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 We Do Not Sell Your Data</h3>
              <p>
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Service Providers</h3>
              <p className="mb-4">We may share information with trusted third-party service providers who assist us in:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website hosting and maintenance</li>
                <li>Payment processing</li>
                <li>Email marketing platforms</li>
                <li>Analytics and performance monitoring</li>
                <li>Cloud storage and data management</li>
              </ul>
              <p className="mt-4">
                These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Legal Requirements</h3>
              <p className="mb-4">We may disclose your information when required by law or to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Comply with legal processes or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or security issues</li>
                <li>Enforce our terms and conditions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change in ownership.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Security</h2>
              <p>
                We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Secure SSL/TLS encryption for data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure password policies</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your information, no method of transmission over the internet is completely secure. We cannot guarantee absolute security but maintain industry-standard practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
              <p className="mt-4">
                Project-related data is typically retained for the duration of our engagement plus a reasonable period for legal and business purposes. You may request deletion of your data at any time, subject to legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Privacy Rights</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Access and Correction</h3>
              <p>
                You have the right to access, update, or correct your personal information. Contact us to review or modify your data.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.2 Data Portability</h3>
              <p>
                You can request a copy of your personal information in a structured, commonly used format.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.3 Deletion</h3>
              <p>
                You may request deletion of your personal information, subject to legal and contractual obligations. Some information may need to be retained for legal compliance or legitimate business purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.4 Marketing Opt-Out</h3>
              <p>
                You can unsubscribe from marketing communications at any time using the unsubscribe link in our emails or by contacting us directly.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.5 Cookie Management</h3>
              <p>
                You can control cookie preferences through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites, services, or resources. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Newsletter and Email Communications</h2>
              <p>
                When you subscribe to our newsletter, we collect your email address and name to send you updates, insights, and promotional content. You can unsubscribe at any time using the link provided in every email.
              </p>
              <p className="mt-4">
                We use your email information to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Send newsletters and industry insights</li>
                <li>Share service updates and special offers</li>
                <li>Provide valuable content related to digital solutions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Analytics and Performance</h2>
              <p>
                We use analytics tools to understand how visitors interact with our website. This helps us improve user experience and optimize our services. Analytics data is typically anonymized and aggregated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date.
              </p>
              <p className="mt-4">
                We encourage you to review this policy periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Contact Information</h2>
              <p className="mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <p><strong>Shemmy Mae</strong></p>
                <p><strong>Email:</strong> info@shemmymae.space</p>
                <p><strong>Phone:</strong> +254745259845</p>
                <p><strong>Website:</strong> www.shemmymae.space</p>
              </div>
              <p className="mt-4">
                We are committed to addressing your privacy concerns and will respond to your inquiries within a reasonable timeframe.
              </p>
            </section>

            <section className="bg-orange-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Your Consent</h3>
              <p>
                By using our website and services, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/terms"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              View Terms and Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
