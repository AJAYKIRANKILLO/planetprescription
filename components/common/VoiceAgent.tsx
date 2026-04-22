
import React, { useEffect } from 'react';

const VoiceAgent = () => {
  const agentId: string = 'agent_6001kgfx1a78e999c21rac960d94'; 

  useEffect(() => {
    const scriptUrl = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed bottom-24 right-4 z-50"> 
      {/* @ts-ignore */}
      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
    </div>
  );
};

export default VoiceAgent;
