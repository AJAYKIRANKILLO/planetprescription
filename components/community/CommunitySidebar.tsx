
import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';
import { TRENDING_TOPICS, TOP_CONTRIBUTORS } from '../../data/communityData';
import { translateText } from '../../services/geminiTranslationService';

interface CommunitySidebarProps {
  language: string;
}

interface Contributor {
  id: string;
  name: string;
  role: string;
  points: number;
  avatar: string;
}

const TRENDING_NOW = 'Trending Now';
const COMMUNITY_CHAMPIONS = 'Community Champions';
const VIEW_FULL_LEADERBOARD = 'View Full Leaderboard';
const GUIDELINES = 'Guidelines';
const SAFETY = 'Safety';
const PRIVACY = 'Privacy';

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({ language }) => {
  const [translatedTrending, setTranslatedTrending] = useState(TRENDING_NOW);
  const [translatedChampions, setTranslatedChampions] = useState(COMMUNITY_CHAMPIONS);
  const [translatedLeaderboard, setTranslatedLeaderboard] = useState(VIEW_FULL_LEADERBOARD);
  const [translatedGuidelines, setTranslatedGuidelines] = useState(GUIDELINES);
  const [translatedSafety, setTranslatedSafety] = useState(SAFETY);
  const [translatedPrivacy, setTranslatedPrivacy] = useState(PRIVACY);
  const [translatedTopics, setTranslatedTopics] = useState(TRENDING_TOPICS);
  const [translatedContributors, setTranslatedContributors] = useState<Contributor[]>(TOP_CONTRIBUTORS);

  useEffect(() => {
    const translateContent = async () => {
      if (language !== 'en') {
        setTranslatedTrending(await translateText(TRENDING_NOW, language));
        setTranslatedChampions(await translateText(COMMUNITY_CHAMPIONS, language));
        setTranslatedLeaderboard(await translateText(VIEW_FULL_LEADERBOARD, language));
        setTranslatedGuidelines(await translateText(GUIDELINES, language));
        setTranslatedSafety(await translateText(SAFETY, language));
        setTranslatedPrivacy(await translateText(PRIVACY, language));
        setTranslatedTopics(
          await Promise.all(
            TRENDING_TOPICS.map(async (topic) => await translateText(topic, language))
          )
        );
        const translatedUsers = await Promise.all(
            TOP_CONTRIBUTORS.map(async (user) => {
                const translatedRole = await translateText(user.role, language);
                return { ...user, role: translatedRole };
            })
        );
        setTranslatedContributors(translatedUsers);
      } else {
        setTranslatedTrending(TRENDING_NOW);
        setTranslatedChampions(COMMUNITY_CHAMPIONS);
        setTranslatedLeaderboard(VIEW_FULL_LEADERBOARD);
        setTranslatedGuidelines(GUIDELINES);
        setTranslatedSafety(SAFETY);
        setTranslatedPrivacy(PRIVACY);
        setTranslatedTopics(TRENDING_TOPICS);
        setTranslatedContributors(TOP_CONTRIBUTORS);
      }
    };

    translateContent();
  }, [language]);

  return (
    <div className="sticky top-24 space-y-6">
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <TrendingUp className="w-4 h-4 text-teal-600" /> {translatedTrending}
        </h3>
        <div className="space-y-3">
          {translatedTopics.map((tag, idx) => (
            <div key={idx} className="flex justify-between items-center group cursor-pointer">
              <span className="text-sm font-medium text-slate-600 group-hover:text-teal-600 transition-colors">
                {tag}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Award className="w-4 h-4 text-orange-500" /> {translatedChampions}
        </h3>
        <div className="space-y-4">
          {translatedContributors.map((user, idx) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-100" />
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm bg-white border border-slate-100">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <div className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                {user.points} pts
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border-t border-slate-50 transition-colors">
          {translatedLeaderboard}
        </button>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400 px-2">
        <a href="#" className="hover:underline">{translatedGuidelines}</a>
        <a href="#" className="hover:underline">{translatedSafety}</a>
        <a href="#" className="hover:underline">{translatedPrivacy}</a>
        <span>© 2024 Planet Prescription</span>
      </div>

    </div>
  );
};
