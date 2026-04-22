
import React, { useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ className = '', onChange, ...props }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN'; // Default to Indian English
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
        
        // Create synthetic event to trigger parent onChange
        if (onChange) {
            const syntheticEvent = {
                target: { value: formattedText, name: props.name },
                currentTarget: { value: formattedText, name: props.name }
            } as any;
            onChange(syntheticEvent);
        }
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e: any) => {
          console.error("Voice input error", e);
          setIsListening(false);
      };
      recognition.start();
    } else {
      alert("Voice input is not supported in this browser. Please type manually.");
    }
  };

  return (
    <div className="relative w-full">
      <input 
        {...props}
        onChange={onChange}
        className={`${className} pr-10`} // Ensure padding for the icon
      />
      <button
        type="button"
        onClick={startListening}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all z-10 ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse shadow-md' 
            : 'text-slate-400 hover:text-teal-600 hover:bg-slate-100'
        }`}
        title="Tap to Speak"
      >
        <Mic className={`w-4 h-4 ${isListening ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};
