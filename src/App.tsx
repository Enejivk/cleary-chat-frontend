import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import DocumentsPage from './pages/DocumentsPage';
import ChatbotList from './pages/ChatbotList';
import EmbedPage from './pages/EmbedPage';
import ChatBot from './pages/chatBot';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="font-inter">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/chatbot-list" replace />} />
              <Route path="/chatbot-list" element={<ChatbotList />} />
              <Route path="/chatbot/:id" element={<ChatBot />} />

              {/* <Route path="/documents" element={<DocumentsPage />} /> */}
              {/* <Route path="/documents" element={<DocumentsPage />} /> */}
              {/* <Route path="/chatbot" element={<ChatbotPage />} /> */}
              {/* <Route path="/embed" element={<EmbedPage />} /> */}
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;