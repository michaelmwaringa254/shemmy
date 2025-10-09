import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const Terms = () => {
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
            <FileText className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">Terms and Conditions</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Last Updated: January 8, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
              <p>
                Welcome to Shemmy Mae's digital solutions platform. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our services.
              </p>
              <p className="mt-4">
                Shemmy Mae provides professional digital solutions including website development, digital marketing, graphics design, e-commerce solutions, mobile app development, and business consulting services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Services</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Service Offering</h3>
              <p className="mb-4">We provide the following professional services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website Development (Custom, WordPress, E-commerce)</li>
                <li>Mobile App Development</li>
                <li>Digital Marketing and SEO Optimization</li>
                <li>Graphics Design and Branding</li>
                <li>Google Ads Management</li>
                <li>Social Media Management</li>
                <li>Email Marketing</li>
                <li>Content Creation and Data Entry</li>
                <li>Business Consulting and System Integration</li>
                <li>Custom Software Development</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Service Agreements</h3>
              <p>
                All services are provided under individual project agreements that specify scope, deliverables, timelines, and pricing. Services commence only after mutual agreement on project specifications and receipt of required deposits or payments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Client Responsibilities</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Information Provision</h3>
              <p>
                Clients must provide accurate, complete, and timely information necessary for project completion. This includes but is not limited to content, images, login credentials, brand assets, and project requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Timely Feedback</h3>
              <p>
                Clients agree to provide timely feedback and approvals to ensure project timelines are met. Delays caused by lack of client response may result in project timeline extensions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.3 Payment Obligations</h3>
              <p>
                Clients agree to pay all fees according to the agreed payment schedule. Late payments may result in service suspension or project delays.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Pricing</h3>
              <p>
                Service pricing is provided on a project-by-project basis or through agreed service packages. All prices are in the currency specified in the project agreement unless otherwise stated.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Payment Schedule</h3>
              <p>
                Unless otherwise agreed, projects typically require:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>50% deposit before project commencement</li>
                <li>50% balance upon project completion and before final delivery</li>
              </ul>
              <p className="mt-4">
                For ongoing services, monthly or agreed-upon billing cycles apply.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Refund Policy</h3>
              <p>
                Deposits are non-refundable once work has commenced. Refunds for completed work or services already rendered are not provided. In cases of service cancellation before work begins, deposits may be refunded at our discretion minus any administrative fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Ownership Transfer</h3>
              <p>
                Upon full payment, clients receive full ownership rights to custom-developed content, designs, and code created specifically for their project. This excludes pre-existing templates, plugins, frameworks, or third-party components.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Portfolio Rights</h3>
              <p>
                Shemmy Mae retains the right to display completed projects in portfolios, case studies, and promotional materials unless a non-disclosure agreement specifies otherwise.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.3 Third-Party Resources</h3>
              <p>
                Projects may incorporate third-party resources, frameworks, plugins, or stock assets. These remain subject to their respective licenses and terms of use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Warranties and Disclaimers</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Service Warranty</h3>
              <p>
                We guarantee that services will be performed professionally and in accordance with industry standards. Bug fixes and minor adjustments are provided for 30 days after project completion for website development projects.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.2 Disclaimer</h3>
              <p>
                While we strive for excellence, we do not guarantee specific business results, traffic levels, conversion rates, or revenue outcomes from our services. Digital marketing and SEO results may vary based on numerous factors beyond our control.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.3 Third-Party Services</h3>
              <p>
                We are not responsible for third-party service disruptions, including but not limited to hosting providers, domain registrars, payment processors, or social media platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Shemmy Mae shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or goodwill arising from your use of our services.
              </p>
              <p className="mt-4">
                Our total liability for any claims arising from our services shall not exceed the amount paid by the client for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Project Timelines</h2>
              <p>
                Project timelines are estimates provided in good faith. While we make every effort to meet agreed deadlines, timelines may be affected by factors including client feedback delays, scope changes, or unforeseen technical challenges.
              </p>
              <p className="mt-4">
                We will communicate any potential delays promptly and work to minimize impact on project delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Confidentiality</h2>
              <p>
                We maintain strict confidentiality regarding all client information, project details, and business data shared during the course of our engagement. We will not disclose confidential information to third parties without client consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Termination</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">10.1 Client Termination</h3>
              <p>
                Clients may terminate services with written notice. Payment for work completed up to the termination date is required. Deposits are non-refundable.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">10.2 Our Termination Rights</h3>
              <p>
                We reserve the right to terminate services if:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Payment terms are not met</li>
                <li>Client provides false or misleading information</li>
                <li>Client requests illegal or unethical work</li>
                <li>Client engages in abusive or unprofessional behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Revisions and Changes</h2>
              <p>
                Project agreements typically include a specified number of revision rounds. Additional revisions beyond the agreed scope may incur additional fees. Significant scope changes will require a new project agreement and pricing adjustment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Communication</h2>
              <p>
                Primary communication channels include email (info@shemmymae.space) and phone (+254745259845). We aim to respond to inquiries within 24-48 business hours. For ongoing projects, regular updates will be provided according to the agreed schedule.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or our services shall be resolved through good faith negotiation or, if necessary, through appropriate legal channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
              <p className="mt-4">
                For existing projects, the terms in effect at the time of project agreement will apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">15. Contact Information</h2>
              <p>
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> info@shemmymae.space</p>
                <p><strong>Phone:</strong> +254745259845</p>
                <p><strong>Website:</strong> www.shemmymae.space</p>
              </div>
            </section>

            <section className="bg-orange-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Agreement Acknowledgment</h3>
              <p>
                By engaging our services or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/privacy"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
