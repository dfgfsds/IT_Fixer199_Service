import React from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Props { }

function Page(props: Props) {
    const { } = props

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                    {/* Header */}
                    <div className="mb-8 border-b-2 border-gray-200 pb-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            Terms and Conditions
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Last Updated: May 26, 2025
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                            Welcome to the website of FTDS INDIA PRIVATE LIMITED ("Company", "we", "our", or "us"). By accessing or using our website (itfixer.in) and/or purchasing our products or services, you agree to comply with and be bound by the following Terms and Conditions.
                        </p>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-semibold">
                            If you do not agree with these terms, please do not use our website or services.
                        </p>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. Use of Website</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>The content of this website is for general information and use only.</li>
                                <li>It is subject to change without notice.</li>
                                <li>You agree to use the website only for lawful purposes.</li>
                                <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. Products and Services</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>All products and services are subject to availability.</li>
                                <li>We reserve the right to modify, suspend, or discontinue any service without prior notice.</li>
                                <li>Prices for our products/services are subject to change without notice.</li>
                                <li>We make every effort to ensure accurate descriptions and pricing; however, errors may occur, and we reserve the right to correct them.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. User Information</h2>
                            <p className="text-gray-700 text-sm sm:text-base mb-2">By using our website, you agree that:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>The information you provide is accurate and complete.</li>
                                <li>You are responsible for maintaining the confidentiality of your account details (if applicable).</li>
                                <li>You will notify us immediately of any unauthorized use of your account.</li>
                                <li>Your use of personal information is governed by our Privacy Policy.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. Payments and Billing</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>All payments must be made through approved payment methods listed on our website.</li>
                                <li>You agree to provide current, complete, and accurate purchase information.</li>
                                <li>Failure of payment may result in cancellation or suspension of services.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Cancellation and Refund Policy</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>Cancellation and refund eligibility (if applicable) will be governed by the specific service or product terms.</li>
                                <li>Refunds, if approved, will be processed within a reasonable timeframe.</li>
                                <li>The company reserves the right to refuse refund requests if terms are violated.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>All content on this website including text, graphics, logos, images, and software is the property of FTDS INDIA PRIVATE LIMITED.</li>
                                <li>You may not reproduce, distribute, or exploit any material without written permission.</li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                                <li>We do not guarantee that the website will be uninterrupted or error-free.</li>
                                <li>We are not liable for any direct, indirect, incidental, or consequential damages arising from use of our website or services.</li>
                                <li>Your use of any information or materials on this website is entirely at your own risk.</li>
                            </ul>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Third-Party Links</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Our website may contain links to other websites. These links are provided for your convenience. We do not endorse and are not responsible for the content of linked websites.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">9. Security</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                We implement reasonable security measures to protect your information. However, we cannot guarantee absolute security of data transmitted over the internet.
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts in India.
                            </p>
                        </section>

                        {/* Section 11 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                FTDS INDIA PRIVATE LIMITED may revise these Terms and Conditions at any time by updating this page. Continued use of the website means you accept those changes.
                            </p>
                        </section>

                        {/* Section 12 */}
                        <section>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">12. Contact Information</h2>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                                If you have any questions regarding these Terms and Conditions, you may contact us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 text-sm sm:text-base">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">📧</span>
                                    <a href="mailto:ftdigitalsolutionspvtltd@gmail.com" className="text-blue-600 hover:underline break-all">
                                        ftdigitalsolutionspvtltd@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">📞</span>
                                    <a href="tel:8754844270" className="text-blue-600 hover:underline">
                                        8754844270
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🌐</span>
                                    <a href="https://itfixer.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        https://itfixer.in
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page
