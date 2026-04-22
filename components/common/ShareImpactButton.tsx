
import React from 'react';
import html2canvas from 'html2canvas';
import { Share2 } from 'lucide-react';

interface ShareImpactButtonProps {
  targetId: string;
}

export const ShareImpactButton: React.FC<ShareImpactButtonProps> = ({ targetId }) => {
  const handleShare = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      console.warn(`ShareImpactButton: Element with id "${targetId}" not found.`);
      return;
    }

    try {
      const canvas = await html2canvas(element, { 
        backgroundColor: '#ffffff',
        scale: 2 // Higher resolution for better quality
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'my-eco-impact.png', { type: 'image/png' });
        
        // Cast navigator to any to access sharing capabilities not always present in TS types
        const nav = navigator as any;
        
        if (nav.canShare && nav.canShare({ files: [file] })) {
          try {
            await nav.share({
              title: 'My Planet Prescription Impact',
              text: 'I just saved the planet with Planet Prescription! Check my stats.',
              files: [file],
            });
          } catch (err) {
             // Share cancelled or failed silently
             console.log("Share skipped or failed", err);
          }
        } else {
          // Desktop/Fallback: Trigger download
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'my-eco-impact.png';
          link.click();
        }
      });
    } catch (err) {
      console.error("Failed to generate share image", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold shadow-md hover:opacity-90 transition-all text-sm"
    >
      <Share2 className="w-4 h-4" /> Share Impact
    </button>
  );
};
