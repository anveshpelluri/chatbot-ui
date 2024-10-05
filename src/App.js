import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-lg py-2 px-4 max-w-[70%]`}>
      {message}
    </div>
  </div>
);

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Here you would typically send the message to your chatbot backend
      // and get a response. For now, we'll just echo the message back.
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${input}`, isUser: false }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isUser={message.isUser} />
        ))}
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border rounded-l-lg py-2 px-4"
            placeholder="Ask anything about VCT"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white rounded-r-lg py-2 px-4">
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
