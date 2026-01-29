import React from 'react';
import { CloseIcon } from './Icons';

interface InfoPagesProps {
  page: string;
  onClose: () => void;
}

const PageContent: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="prose prose-slate max-w-none text-brand-subtext">
        <h2 className="text-3xl font-bold text-brand-text border-b border-brand-light pb-3 mb-6">{title}</h2>
        {children}
    </div>
);

const AboutContent = () => (
    <PageContent title="About Us">
        <p>
            Welcome to the Football Tactical Board, your digital canvas for crafting winning strategies. We believe that the ability to visualize and communicate complex football tactics shouldn't be limited to professional clubs with expensive software. Our mission is to empower coaches, analysts, and passionate fans at every level with an intuitive, powerful, and accessible tool.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Our Story</h3>
        <p>
            This project was born from a simple idea: to create the tactical board we always wanted to use. As lifelong football fans and software developers, we were frustrated with the clunky, outdated, or overly complicated tools available. We set out to build a modern, web-based solution that is fast, easy to use, and beautiful to look at.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Our Philosophy</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-brand-text">Accessibility:</strong> Great tactical tools should be available to everyone, which is why our board is free to use directly in your browser with no downloads required.</li>
            <li><strong className="text-brand-text">Intuitive Design:</strong> We focus on a clean, uncluttered interface that lets your ideas take center stage. You should be spending your time strategizing, not fighting with the software.</li>
            <li><strong className="text-brand-text">Powerful Features:</strong> From custom formations and player movements to drawing tools and animations, we provide the features you need to bring your tactical vision to life.</li>
        </ul>
        <p className="mt-4">
            We are constantly working to improve the board and add new features based on user feedback. Thank you for being a part of our community.
        </p>
    </PageContent>
);

const PrivacyContent = () => (
    <PageContent title="Privacy Policy">
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        <p>
            Your privacy is important to us. This Privacy Policy explains how we handle your information when you use the Football Tactical Board.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Information We Collect</h3>
        <p>
            We designed our application with your privacy as a priority. As such, <strong className="text-brand-text">we do not collect any personally identifiable information.</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>No Personal Data:</strong> We do not require you to sign up, and we do not collect your name, email address, IP address, or any other personal details.</li>
            <li><strong>Local Storage Only:</strong> The "Save Tactic" feature uses your browser's `localStorage`. This means any tactics you create and save are stored directly on your own computer. This data is <strong className="text-brand-text">never</strong> transmitted to our servers or any third party. You have full control over this data and can clear it at any time through your browser's settings.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">How We Use Information</h3>
        <p>
            Since we do not collect personal information, we do not use it for any purpose. The locally stored data is used solely for the functionality of the application, allowing you to save and load your work between sessions.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Changes to This Policy</h3>
        <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this Privacy Policy periodically.
        </p>
    </PageContent>
);

const TermsContent = () => (
    <PageContent title="Terms of Service">
        <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        <p>
            By accessing and using the Football Tactical Board ("Service"), you agree to be bound by these Terms of Service ("Terms").
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">1. Use of the Service</h3>
        <p>
            The Service is provided for your personal, non-commercial use. You agree not to use the Service for any illegal or unauthorized purpose. You are responsible for your conduct and any content you create while using the Service.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">2. User-Generated Content</h3>
        <p>
            You retain full ownership of the tactical setups, drawings, and any other content you create using the Service ("User Content"). By saving content locally, you acknowledge that it is stored on your own device, and we have no access to or responsibility for it.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">3. Intellectual Property</h3>
        <p>
            All rights, title, and interest in and to the Service itself, including its design, source code, logos, and features, are and will remain the exclusive property of the Football Tactical Board creators.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">4. Disclaimer of Warranties</h3>
        <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranty and disclaim all responsibility and liability for the completeness, accuracy, availability, timeliness, security, or reliability of the Service.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">5. Limitation of Liability</h3>
        <p>
            To the maximum extent permitted by applicable law, the creators of the Football Tactical Board shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your access to or use of the Service.
        </p>
    </PageContent>
);

const ContactContent = () => (
    <PageContent title="Contact Us">
        <p>
            We'd love to hear from you! Whether you have feedback, a feature request, a bug report, or just want to say hello, please don't hesitate to get in touch.
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Email</h3>
        <p>
            For general inquiries and support, you can reach us at:
            <br />
            <a href="mailto:contact@footballtacticalboard.dev" className="text-blue-500 hover:underline">contact@footballtacticalboard.dev</a>
        </p>
        <h3 className="text-xl font-semibold mt-6 text-brand-text">Follow Our Development</h3>
        <p>
            While we don't have active social media pages yet, you can follow our progress and contribute on GitHub (repository coming soon!).
        </p>
    </PageContent>
);


export const InfoPages: React.FC<InfoPagesProps> = ({ page, onClose }) => {
    let content;
    switch (page) {
        case 'about':
            content = <AboutContent />;
            break;
        case 'privacy':
            content = <PrivacyContent />;
            break;
        case 'terms':
            content = <TermsContent />;
            break;
        case 'contact':
            content = <ContactContent />;
            break;
        default:
            content = null;
    }

    if (!content) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-brand-darker rounded-lg shadow-xl w-full max-w-3xl h-full max-h-[85vh] flex flex-col relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-brand-subtext hover:text-brand-text transition-colors z-10"
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>
                <div className="flex-1 p-8 sm:p-12 overflow-y-auto">
                    {content}
                </div>
            </div>
        </div>
    );
};
