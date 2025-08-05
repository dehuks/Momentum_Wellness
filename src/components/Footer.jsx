import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center mt-auto">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              className="text-textSecondary text-base font-normal leading-normal min-w-40 hover:text-white transition-colors" 
              href="#"
            >
              Privacy Policy
            </a>
            <a 
              className="text-textSecondary text-base font-normal leading-normal min-w-40 hover:text-white transition-colors" 
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-textSecondary text-base font-normal leading-normal">
            © 2025 Momentum Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;