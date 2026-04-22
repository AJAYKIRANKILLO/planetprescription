
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Logo } from '../Logo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold flex items-center gap-2">
            <Logo className="h-6 w-auto" />
            Planet Prescription
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering communities to manage pharmaceutical waste safely, securely, and sustainably.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-500" />
              <a href="mailto:support@planetprescription.com" className="hover:text-white transition-colors">
                support@planetprescription.com
              </a>
            </li>
            <li>1-800-PHARMA-SAFE</li>
            <li>University of Delhi, New Delhi, 110007</li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-4">Social Media</h4>
           <div className="flex gap-4">
              <SocialIcon href="https://www.linkedin.com/company/planet-prescription/about/?viewAsMember=true" icon={Linkedin} />
              <SocialIcon href="https://www.youtube.com/@PLANET_PRESCRIPTION" icon={Youtube} />
              <SocialIcon href="https://www.instagram.com/planet_prescriptors_07/" icon={Instagram} />
           </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Legal & Access</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Compliance</li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
         © 2024 Planet Prescription. All rights reserved.
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700 transition-all">
    <Icon className="w-5 h-5" />
  </a>
);
