import React from 'react';
import EmbedCode from '../components/Embed/EmbedCode';
import EmbedCustomization from '../components/Embed/EmbedCustomization';
import EmbedPreview from '../components/Embed/EmbedPreview';

const EmbedPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Embed</h1>
        <p className="text-gray-600">Embed your chatbot on any website</p>
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