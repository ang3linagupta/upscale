import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-white">

            {/* Navbar */}
            <div className="w-full bg-yellow-500 py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/pictures/logo.png" alt="Logo" className="h-8" />
                    <span>UpScale</span>
                </div>
                <div className="flex space-x-6 mr-4">
                    {/* <span className="cursor-pointer" >Apply now </span>
                    <span className="cursor-pointer">Admin Dash</span> */}
                    <span className="cursor-pointer" onClick={() => navigate('/apply')}>
                        Apply now
                    </span>
                    <span className="cursor-pointer" onClick={() => navigate('/adminlogin')}>
                        Admin
                    </span>
                    <span className="cursor-pointer" onClick={() => navigate('/login')}>
                        Login
                    </span>
                </div>
            </div>

            {/* Main Section */}

            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 pt-24 text-justify gap-10">
                {/* Text Section */}
                <div className="max-w-xl md:w-1/2">
                    <h1 className="text-5xl font-bold text-black mb-4">
                        Your business savvy. <br /> Our global brand. Make your mark.
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Unlock your potential with the world’s leading brand and discover how
                        you can apply your business acumen—and our framework—to become a
                        Franchise Owner and help create a positive impact for
                        yourself, your family, and your community.
                    </p>
                    <button className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded" onClick={() => navigate('/apply')}>
                        Apply now
                    </button>
                </div>

                {/* Image Section */}
                <div className="relative md:w-1/2 flex justify-center">
                    <img src="/pictures/franchise.jpg" alt="Franchise" className="w-full max-w object-contain" />
                </div>
            </div>

            {/* How It Works Section */}
            <div className="px-10 md:px-20 py-10 text-black flex flex-col md:flex-row items-center text-justify">
                <div className="md:w-1/2 flex justify-center">
                    <img src="/pictures/how it works.png" alt="How it works" className="w-[500px]" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-6">How it works</h2>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold">1. Get started</h3>
                        <p>Ready to expand our franchise network? Fill out a simple application form to kick-start your journey.
                            No technical expertise is required—just your ambition to grow.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold">2. Complete the application process</h3>
                        <p>Prospective franchisees can submit their applications through our customized portal.
                            The application form captures all the necessary details to give us a clear understanding of your goals and capabilities, ensuring a smooth evaluation process.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold">3. Application Review & Approval</h3>
                        <p>Our admin team can review, approve, or decline applications directly from the intuitive dashboard. If approved, you'll receive automated email notifications with a unique password to access your personalized franchise dashboard.

                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-bold">4. Onboarding</h3>
                        <p>Log in to your franchise dashboard to track your progress, record daily sales, and view key metrics through intuitive charts and insights. The dashboard provides a comprehensive view of your business performance, helping you make informed decisions. </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">5. Manage & Grow</h3>
                        <p>Monitor your performance, stay connected with our team, and scale your business using data-driven insights—all from one central platform. Our support doesn’t stop at approval; we are here to help you succeed every step of the way. 
                        </p>
                    </div>
                </div>
            </div>

            {/* What You Have */}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 text-justify">
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-6">What You Have</h2>
                    <ul className="text-gray-700 list-disc pl-5">
                        <li>Adaptability, Resilience, Leadership and People Skills</li>
                        <li>Attention to detail and organizational skills</li>
                        <li>Commitment to ethical business practices</li>
                        <li>Dedication to your crew, your community, and your business</li>
                        <li>A proven record of business success</li>
                        <li>Willingness to follow a proven system</li>
                    </ul>
                </div>
                <div className="md:w-1/2 flex justify-end">
                    <img src="/pictures/5752311.jpg" alt="Team" className="w-[500px]" />
                </div>
            </div>

            {/* Why We Want You */}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 text-justify">
                <div className="md:w-1/2 flex justify-start">
                    <img src="/pictures/what you have.jpg" alt="Team" className="w-[500px]" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-6">Why We Want You</h2>
                    <ul className="text-gray-700 list-disc pl-5">
                        <li>You have passion for the brand, and building great teams</li>
                        <li>You take a hands-on approach to your business</li>
                        <li>You believe in proven systems</li>
                        <li>You have a desire to be part of something bigger</li>
                        <li>You believe a diverse and inclusive workforce is critical to success</li>
                        <li>You have a desire to learn</li>
                    </ul>
                </div>
            </div>


            {/* Our Values Section */}

            <div className="px-10 md:px-20 py-20 text-black text-center">
                <h2 className="text-3xl font-bold mb-6">Our Values</h2>
                <p className="text-gray-600 mb-10">Our values are our foundation and our core. Explore how they set us apart.</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div>
                        <img src="/pictures/serve.jpg" alt="Serve" className="w-24 h-24 object-cover mx-auto mb-2" />
                        <h3 className="font-bold">Serve</h3>
                        <p className="text-gray-600">We put our customers, our crew, and community first.</p>
                    </div>
                    <div>
                        <img src="/pictures/inclusion.jpg" alt="Inclusion" className="w-26 h-24 object-cover mx-auto mb-2" />
                        <h3 className="font-bold">Inclusion</h3>
                        <p className="text-gray-600">We open our doors to everyone.</p>
                    </div>
                    <div>
                        <img src="/pictures/integrity.jpg" alt="Integrity" className="w-26 h-24 object-cover mx-auto mb-2" />
                        <h3 className="font-bold">Integrity</h3>
                        <p className="text-gray-600">We do the right thing.</p>
                    </div>
                    <div>
                        <img src="/pictures/community.jpg" alt="Community" className="w-26 h-24 object-cover mx-auto mb-2" />
                        <h3 className="font-bold">Community</h3>
                        <p className="text-gray-600">We build stronger connections.</p>
                    </div>
                    <div>
                        <img src="/pictures/family.jpg" alt="Family" className="w-26 h-24 object-cover mx-auto mb-2" />
                        <h3 className="font-bold">Family</h3>
                        <p className="text-gray-600">We get better together.</p>
                    </div>
                </div>
            </div>


            {/* Back to Top Link */}
            <div className="px-10 md:px-20 py-6 text-black text-right">
                <a href="#" className="text-blue-700 font-bold flex items-center justify-end">
                    <span>Back to top</span>
                    <span className="ml-2 text-yellow-500">&gt;</span>
                </a>
            </div>

            {/* Footer */}
            <div className="w-full bg-gray-100 py-10 px-10 text-sm text-gray-600 text-center mt-auto">
                <h2 className="text-xl font-bold text-black mb-2">Contact Us</h2>
                <p>To learn more about franchising opportunities, email <a href="mailto:angelina12gupta@gmail.com" className="text-blue-700">angelina12gupta@gmail.com</a></p>
                <p className="mt-4">© 2025 Angelina. All Rights Reserved</p>
                <div className="flex justify-center space-x-4 mt-2 flex-wrap">
                    <a href="#" className="text-blue-700">Terms & Conditions</a>
                    <a href="#" className="text-blue-700">Do Not Sell or Share My Personal Information</a>
                </div>
            </div>
        </div>
    );
};

export default Landing;
