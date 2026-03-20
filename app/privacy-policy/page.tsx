import React from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Props { }

function Page(props: Props) {
    const { } = props

    return (
        <>
            <Header />
            <div className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-6 sm:p-8 lg:p-10">

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Privacy Policy
                    </h1>

                    <p className="text-sm text-gray-500 mb-6">
                        <strong>Last updated on May 26, 2025</strong>
                    </p>

                    <p className="text-gray-700 leading-7 mb-4">
                        This privacy policy sets out how <strong>FTDS INDIA PRIVATE LIMITED</strong> uses and protects any
                        information that you give <strong>FTDS INDIA PRIVATE LIMITED</strong> when you visit their website
                        and/or agree to purchase from them.
                    </p>

                    <p className="text-gray-700 leading-7 mb-4">
                        <strong>FTDS INDIA PRIVATE LIMITED</strong> is committed to ensuring that your privacy is protected.
                        Should we ask you to provide certain information by which you can be
                        identified when using this website, you can be assured that it will
                        only be used in accordance with this privacy statement.
                    </p>

                    <p className="text-gray-700 leading-7 mb-8">
                        <strong>FTDS INDIA PRIVATE LIMITED</strong> may change this policy from time to time by updating this
                        page. You should check this page from time to time to ensure that you
                        adhere to these changes.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        We may collect the following information
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-7 mb-8">
                        <li>Name</li>
                        <li>Contact information including email address</li>
                        <li>
                            Demographic information such as postcode, preferences and interests
                            (if required)
                        </li>
                        <li>Other information relevant to customer surveys and/or offers</li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        What we do with the information we gather
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-7 mb-8">
                        <li>Internal record keeping.</li>
                        <li>We may use the information to improve our products and services.</li>
                        <li>
                            We may periodically send promotional emails about new products,
                            special offers or other information which we think you may find
                            interesting using the email address which you have provided.
                        </li>
                        <li>
                            From time to time, we may also use your information to contact you
                            for market research purposes. We may contact you by email, phone,
                            fax or mail.
                        </li>
                        <li>
                            We may use the information to customise the website according to your interests.
                        </li>
                        <li>
                            We are committed to ensuring that your information is secure. In order
                            to prevent unauthorised access or disclosure, we have put suitable measures.
                        </li>
                    </ul>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        How we use cookies
                    </h2>

                    <p className="text-gray-700 leading-7 mb-4">
                        A cookie is a small file which asks permission to be placed on your
                        computer&apos;s hard drive. Once you agree, the file is added and the
                        cookie helps analyze web traffic or lets you know when you visit a
                        particular site.
                    </p>

                    <p className="text-gray-700 leading-7 mb-4">
                        We use traffic log cookies to identify which pages are being used.
                        This helps us analyze data about webpage traffic and improve our
                        website in order to tailor it to customer needs.
                    </p>

                    <p className="text-gray-700 leading-7 mb-4">
                        Overall, cookies help us provide you with a better website by enabling
                        us to monitor which pages you find useful and which you do not.
                    </p>

                    <p className="text-gray-700 leading-7 mb-8">
                        You can choose to accept or decline cookies. Most web browsers
                        automatically accept cookies, but you can usually modify your browser
                        setting to decline cookies if you prefer.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Controlling your personal information
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-7 mb-6">
                        <li>
                            Whenever you are asked to fill in a form on the website, look for
                            the box that you can click to indicate that you do not want the
                            information to be used for direct marketing purposes.
                        </li>
                        <li>
                            If you have previously agreed to us using your personal information
                            for direct marketing purposes, you may change your mind at any time
                            by writing to or emailing us at{" "}
                            <strong>ftdigitalsolutionspvtltd@gmail.com</strong>.
                        </li>
                        <li>
                            We will not sell, distribute or lease your personal information to
                            third parties unless required by law.
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-7">
                        If you believe that any information we are holding on you is incorrect
                        or incomplete, please write to us at <strong>ITFixer@199</strong>,
                        visit <strong> itfixer.in</strong>, or contact us at{" "}
                        <strong>8754844270</strong> or{" "}
                        <strong>ftdigitalsolutionspvtltd@gmail.com</strong>. We will promptly
                        correct any information found to be incorrect.
                    </p>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page