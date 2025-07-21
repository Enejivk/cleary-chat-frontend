import React from 'react';
import EmbedCode from '../components/Embed/EmbedCode';
import EmbedCustomization from '../components/Embed/EmbedCustomization';
import EmbedPreview from '../components/Embed/EmbedPreview';
import { useAppSelector } from '../hooks/redux';

const EmbedPage: React.FC = () => {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Embed</h1>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Embed your chatbot on any website
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <EmbedCode />
          <EmbedCustomization />
        </div>
        <EmbedPreview />
      </div>
    </div>
  );
};

export default EmbedPage;