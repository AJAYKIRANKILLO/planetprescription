
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Droplets, Wallet, TrendingUp, ShieldCheck, Truck, 
  Building2, Star, ChevronDown, ChevronUp, Sprout, Recycle
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { Footer } from '../../components/common/Footer';
import { RoleSelectionModal } from '../../components/auth/RoleSelectionModal';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <RoleSelectionModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      
      {/* --- CENTERED HERO SECTION --- */}
      <div id="impact" className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden bg-slate-50">
        
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ccfbf1,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          
          {/* 1. Centered Logo Badge */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-teal-200 blur-xl opacity-30 rounded-full animate-pulse"></div>
            <div className="relative bg-white p-4 rounded-full shadow-xl border border-teal-50">
              <div className="bg-teal-100 p-3 rounded-full">
                <Sprout className="w-10 h-10 text-teal-600" />
              </div>
            </div>
          </div>

          {/* 2. Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-8 shadow-sm">
            <span className="text-sm font-bold text-teal-700 tracking-wide uppercase">
              THE FUTURE OF PHARMA DISPOSAL
            </span>
          </div>

          {/* 3. RESTORED QUOTE & COLORS */}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            When Medicine Stops <br className="hidden sm:block" />
            Healing, We Make Sure It <br className="hidden sm:block" />
            Doesn't Harm. <br />
            <span className="text-emerald-700">Heal the Planet.</span>
          </h1>

          {/* 4. Sub-headline */}
          <p className="max-w-2xl text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            AI-powered safe disposal of unused medicines—protecting families, communities, and the planet.
          </p>

          {/* 5. Centered Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <button 
              onClick={() => navigate('/user-login')}
              className="px-8 py-4 bg-emerald-700 text-white rounded-xl shadow-lg hover:bg-emerald-800 transition-all flex items-center font-bold text-lg"
            >
              <ShieldCheck className="w-5 h-5 mr-2" />
              Dispose Medicine Householder User
            </button>
            <button 
              onClick={() => navigate('/agent-login')}
              className="px-8 py-4 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center font-bold text-lg"
            >
              <Truck className="w-5 h-5 mr-2" />
              Partner/Agent Login 
            </button>
            
            <button 
              onClick={() => navigate('/hospital-login')}
              className="px-8 py-4 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-all flex items-center font-bold text-lg"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Hospital Portal 
            </button>
          </div>
        </div>
      </div>

      {/* --- WHY CHOOSE US SECTION --- */}
      <WhyChooseUs />

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-2 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Join the movement in three easy steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
                   <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Scan Medicine</h3>
                <p className="text-slate-500">Use AI to identify if the medicine is high-risk or standard.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                   <Truck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Schedule Pickup</h3>
                <p className="text-slate-500">A certified collection agent picks it up from your doorstep.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-6">
                   <Wallet className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Earn Rewards</h3>
                <p className="text-slate-500">Get Green Credits redeemable for discounts and insurance.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by the Community</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Join thousands of users and partners making a difference every single day.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard 
              type="user"
              name="Sarah Jenkins"
              role="Mother of two"
              content="Saved my kids from accidental poisoning! The AI identification feature is a lifesaver for checking old meds."
              rating={5}
            />
            <ReviewCard 
              type="agent"
              name="Vikram Singh"
              role="Fleet Owner"
              content="Best logistics platform for medical waste. The route optimization helps me save fuel and time every day."
              rating={5}
            />
            <ReviewCard 
              type="user"
              name="David Chen"
              role="Environmentalist"
              content="Finally, a way to dispose of medicines without polluting our water systems. The credit system is a great bonus!"
              rating={4}
            />
            <ReviewCard 
              type="agent"
              name="Rahul Sharma"
              role="Planet Prescription Agent"
              content="Verified pickups mean safer work conditions for us. The dedicated app makes the job professional and easy."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about safe disposal.</p>
          </div>
          
          <div className="space-y-4">
             <FAQItem 
               question="Is the disposal service free for households?"
               answer="Yes! We provide free pickup for household quantities of medicines. You even earn Green Credits for responsible disposal."
             />
             <FAQItem 
               question="What types of medicines are accepted?"
               answer="We accept tablets, capsules, syrups, ointments, and patches. We do not currently accept needles or sharps in the standard pickup."
             />
             <FAQItem 
               question="How do I become a collection partner?"
               answer="Click the 'Partner Login' button at the top, select 'New Registration', and complete the verification process including vehicle details."
             />
             <FAQItem 
               question="What happens to the collected medicine?"
               answer="Medicines are segregated at our certified facilities. Low-risk items are recycled for chemical components, while high-risk items are incinerated safely."
             />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
};

// --- Sub-components ---

const ReviewCard = ({ type, name, role, content, rating }: { type: 'user' | 'agent', name: string, role: string, content: string, rating: number }) => {
  const isUser = type === 'user';
  return (
    <div className={`p-6 rounded-2xl border ${isUser ? 'bg-green-50/50 border-green-100' : 'bg-slate-800 border-slate-700 text-white'} transition-all hover:-translate-y-1 duration-300 shadow-sm`}>
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${isUser ? 'text-amber-400' : 'text-orange-500'} fill-current`} />
        ))}
      </div>
      <p className={`text-sm mb-4 leading-relaxed ${isUser ? 'text-slate-700' : 'text-slate-300'}`}>"{content}"</p>
      <div className="flex items-center gap-3">
         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isUser ? 'bg-teal-100 text-teal-700' : 'bg-orange-500/20 text-orange-500 border border-orange-500/30'}`}>
            {name.charAt(0)}
         </div>
         <div>
           <p className={`font-bold text-sm ${isUser ? 'text-slate-900' : 'text-white'}`}>{name}</p>
           <p className={`text-xs ${isUser ? 'text-slate-500' : 'text-slate-400'}`}>{role}</p>
         </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        {question}
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
           {answer}
        </div>
      )}
    </div>
  );
};
