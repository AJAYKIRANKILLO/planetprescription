
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle, ShieldCheck, Pin } from 'lucide-react';
import { translateText } from '../../services/geminiTranslationService';

interface PostProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
      isVerified?: boolean;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    isPinned?: boolean;
  };
  language: string;
}

const LIKE = 'Like';
const COMMENT = 'Comment';
const SHARE = 'Share';

export const PostCard: React.FC<PostProps> = ({ post, language }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [translatedContent, setTranslatedContent] = useState(post.content);
  const [translatedRole, setTranslatedRole] = useState(post.author.role);
  const [translatedLike, setTranslatedLike] = useState(LIKE);
  const [translatedComment, setTranslatedComment] = useState(COMMENT);
  const [translatedShare, setTranslatedShare] = useState(SHARE);

  useEffect(() => {
    const translatePost = async () => {
      if (language !== 'en') {
        setTranslatedContent(await translateText(post.content, language));
        setTranslatedRole(await translateText(post.author.role, language));
        setTranslatedLike(await translateText(LIKE, language));
        setTranslatedComment(await translateText(COMMENT, language));
        setTranslatedShare(await translateText(SHARE, language));
      } else {
        setTranslatedContent(post.content);
        setTranslatedRole(post.author.role);
        setTranslatedLike(LIKE);
        setTranslatedComment(COMMENT);
        setTranslatedShare(SHARE);
      }
    };

    translatePost();
  }, [post, language]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {post.isPinned && (
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-1.5 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Pin className="w-3 h-3 fill-slate-400 text-slate-400" /> Pinned Announcement
        </div>
      )}

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-11 h-11 rounded-full border-2 border-slate-50 object-cover shadow-sm" 
            />
            {post.author.role === 'Admin' && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white">
                <ShieldCheck className="w-3 h-3" />
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">{post.author.name}</h3>
              {post.author.isVerified && (
                <CheckCircle className={`w-4 h-4 ${post.author.role === 'Agent' ? 'text-orange-500' : 'text-blue-500'} fill-current text-white`} />
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{translatedRole} • {post.timestamp}</p>
          </div>
        </div>
        
        <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pb-2">
        <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap">
          {translatedContent}
        </p>
      </div>

      {post.image && (
        <div className="mt-3 px-4 pb-2">
          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img src={post.image} alt="Post Attachment" className="w-full h-auto object-cover max-h-[400px]" />
          </div>
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between text-xs text-slate-500 font-medium border-b border-slate-50">
        <span>{likeCount} Likes</span>
        <span>{post.comments} Comments</span>
      </div>

      <div className="px-2 py-1 flex items-center">
        <button 
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all active:scale-95 ${isLiked ? 'text-red-500' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          {translatedLike}
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95">
          <MessageCircle className="w-5 h-5" />
          {translatedComment}
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95">
          <Share2 className="w-5 h-5" />
          {translatedShare}
        </button>
      </div>
    </div>
  );
};
