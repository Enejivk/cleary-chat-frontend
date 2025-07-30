import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import DocumentsPage from './pages/DocumentsPage';
import ChatbotPage from './pages/ChatbotPage';
import EmbedPage from './pages/EmbedPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="font-inter">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/chatbot" replace />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/embed" element={<EmbedPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;