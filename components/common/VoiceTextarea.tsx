
import React, { useState } from 'react';
import { Mic } from 'lucide-react';

interface VoiceTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const VoiceTextarea: React.FC<VoiceTextareaProps> = ({ className = '', onChange, ...props }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
        
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
      recognition.onerror = () => setIsListening(false);
      recognition.start();
    } else {
      alert("Voice input is not supported in this browser.");
    }
  };

  return (
    <div className="relative w-full">
      <textarea 
        {...props}
        onChange={onChange}
        className={`${className} pr-10`}
      />
      <button
        type="button"
        onClick={startListening}
        className={`absolute right-3 top-3 p-2 rounded-full transition-all z-10 ${
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
