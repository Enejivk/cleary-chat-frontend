import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

const EmbedCode: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [embedType, setEmbedType] = useState<'floating' | 'inline'>('floating');
  const { chatbots, activeChatbotId } = useAppSelector((state) => state.chatbot);
  
  const activeChatbot = chatbots.find(bot => bot.id === activeChatbotId);

  const baseUrl = 'https://yourapp.com';
  const botId = activeChatbot?.id || 'bot1234';

  const embedCodes = {
    floating: `<!-- Floating Chat Widget -->
<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "${baseUrl}/widget.js";
    js.setAttribute('data-bot-id', '${botId}');
    js.setAttribute('data-style', 'floating');
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'chatbot-widget'));
</script>`,
    inline: `<!-- Inline Chat Widget -->
<div id="chatbot-container" style="width: 100%; height: 500px;"></div>
<script>
  window.ChatbotConfig = {
    botId: '${botId}',
    container: 'chatbot-container',
    style: 'inline'
  };
</script>
<script src="${baseUrl}/widget.js"></script>`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCodes[embedType]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Code className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Embed Code</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Widget Type
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setEmbedType('floating')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                embedType === 'floating'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Floating Widget
            </button>
            <button
              onClick={() => setEmbedType('inline')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                embedType === 'inline'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inline Widget
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              HTML Code
            </label>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{embedCodes[embedType]}</code>
            </pre>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Installation Instructions</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Copy the code above</li>
            <li>2. Paste it into your website's HTML, just before the closing &lt;/body&gt; tag</li>
            <li>3. The chatbot will automatically appear on your website</li>
            <li>4. Customize the appearance using the options below</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EmbedCode;