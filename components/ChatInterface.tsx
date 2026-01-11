
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message, MessageRole } from '../types';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: MessageRole.MODEL,
      text: "สวัสดีจ้ะ เราคือ Moodpal พื้นที่ปลอดภัยของเธอในวันนี้ เธอมีเรื่องอะไรที่ไม่สบายใจ อยากระบาย หรืออยากให้เราช่วยรับฟังไหม?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: MessageRole.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await geminiService.sendMessage(input);
      const botMessage: Message = {
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-sky-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
            <span className="text-xl">☁️</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Moodpal</h3>
            <p className="text-xs text-sky-100">กำลังรับฟังเธออย่างตั้งใจ...</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === MessageRole.USER
                  ? 'bg-sky-500 text-white rounded-tr-none'
                  : 'bg-white text-sky-900 rounded-tl-none border border-sky-50'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-60 ${msg.role === MessageRole.USER ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-sky-50 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-sky-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-sky-300 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-sky-300 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-sky-50/50 border-t border-sky-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ระบายความรู้สึกออกมาได้เลยนะ..."
          className="flex-1 bg-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-800 shadow-inner"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-sky-500 hover:bg-sky-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 shadow-lg"
        >
          <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};
