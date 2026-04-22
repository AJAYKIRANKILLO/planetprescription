
import React, { useState, useEffect } from 'react';
import { Image, BarChart2, MapPin, Smile, PenLine, Send } from 'lucide-react';
import { translateText } from '../../services/geminiTranslationService';

interface CreatePostWidgetProps {
  language: string;
}

const POST = 'Post';
const PHOTO = 'Photo';
const POLL = 'Poll';
const POST_PLACEHOLDER = 'Share your eco-journey or tips...';
const POLL_PLACEHOLDER = 'Ask the community a question...';
const POST_BUTTON = 'Post';

export const CreatePostWidget: React.FC<CreatePostWidgetProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'post' | 'photo' | 'poll'>('post');
  const [translatedPost, setTranslatedPost] = useState(POST);
  const [translatedPhoto, setTranslatedPhoto] = useState(PHOTO);
  const [translatedPoll, setTranslatedPoll] = useState(POLL);
  const [translatedPlaceholder, setTranslatedPlaceholder] = useState(POST_PLACEHOLDER);
  const [translatedPostButton, setTranslatedPostButton] = useState(POST_BUTTON);

  useEffect(() => {
    const translateContent = async () => {
      if (language !== 'en') {
        setTranslatedPost(await translateText(POST, language));
        setTranslatedPhoto(await translateText(PHOTO, language));
        setTranslatedPoll(await translateText(POLL, language));
        setTranslatedPlaceholder(
          activeTab === 'poll'
            ? await translateText(POLL_PLACEHOLDER, language)
            : await translateText(POST_PLACEHOLDER, language)
        );
        setTranslatedPostButton(await translateText(POST_BUTTON, language));
      } else {
        setTranslatedPost(POST);
        setTranslatedPhoto(PHOTO);
        setTranslatedPoll(POLL);
        setTranslatedPlaceholder(
          activeTab === 'poll' ? POLL_PLACEHOLDER : POST_PLACEHOLDER
        );
        setTranslatedPostButton(POST_BUTTON);
      }
    };

    translateContent();
  }, [language, activeTab]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 transition-shadow hover:shadow-md">
      <div className="flex border-b border-slate-50">
        <button 
          onClick={() => setActiveTab('post')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'post' ? 'bg-slate-50 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <PenLine className="w-4 h-4" /> {translatedPost}
        </button>
        <button 
          onClick={() => setActiveTab('photo')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'photo' ? 'bg-slate-50 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Image className="w-4 h-4" /> {translatedPhoto}
        </button>
        <button 
          onClick={() => setActiveTab('poll')}
          className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'poll' ? 'bg-slate-50 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BarChart2 className="w-4 h-4" /> {translatedPoll}
        </button>
      </div>

      <div className="p-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="You" />
          </div>
          <div className="flex-1">
            <textarea 
              rows={3}
              placeholder={translatedPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2">
          <div className="flex gap-2">
             <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Add Location">
               <MapPin className="w-5 h-5" />
             </button>
             <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Add Emoji">
               <Smile className="w-5 h-5" />
             </button>
          </div>
          <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-teal-600/20 transition-all flex items-center gap-2 active:scale-95">
            {translatedPostButton} <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
