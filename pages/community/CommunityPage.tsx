
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { CreatePostWidget } from '../../components/community/CreatePostWidget';
import { PostCard } from '../../components/community/PostCard';
import { CommunitySidebar } from '../../components/community/CommunitySidebar';
import { COMMUNITY_POSTS } from '../../data/communityData';
import { translateText } from '../../services/geminiTranslationService';

const ORIGINAL_NAV_ITEMS = ['Feed', 'My Posts', 'Saved', 'Announcements'];

export const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Feed');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [navItems, setNavItems] = useState(ORIGINAL_NAV_ITEMS);

  useEffect(() => {
    const translateNavItems = async () => {
      const translatedNavItems = await Promise.all(
        ORIGINAL_NAV_ITEMS.map(async (item) => await translateText(item, currentLanguage))
      );
      setNavItems(translatedNavItems);
    };

    if (currentLanguage !== 'en') {
      translateNavItems();
    } else {
      setNavItems(ORIGINAL_NAV_ITEMS);
    }
  }, [currentLanguage]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24 border border-slate-100">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button 
                      key={item} 
                      onClick={() => setActiveFilter(item)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                        activeFilter === item 
                          ? 'bg-teal-50 text-teal-700 shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-6 space-y-6">
              <CreatePostWidget language={currentLanguage} />
              <div className="space-y-6">
                {COMMUNITY_POSTS.map((post) => (
                  <PostCard key={post.id} post={post} language={currentLanguage} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-3">
              <CommunitySidebar language={currentLanguage} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
