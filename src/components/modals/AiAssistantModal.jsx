import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send, Bot, User, CornerDownLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiAssistantModal = ({ onClose }) => {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user.name.split(' ')[0]}! I'm SmartPay AI, your personal financial advisor. I analyze your spending, optimize budgets, and alert you of opportunities to save. How can I help you today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'How much did I spend on food this month?',
    'Can I afford to save ₹5,000 this month?',
    'Show my highest expense this week',
    'Tips to reduce utility electricity bills',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate intelligent AI response based on mock fintech data
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('food') || lower.includes('zomato') || lower.includes('swiggy')) {
        reply = `You have spent ₹2,704 on food & dining this October (32% of your monthly expenditure). Your top food merchants are Zomato (₹2,450) and Swiggy (₹750). Switching to local meal plans could save you roughly ₹850/month!`;
      } else if (lower.includes('save') || lower.includes('5000') || lower.includes('budget')) {
        reply = `Yes, absolutely! Based on your projected end-of-month cash inflow (₹15,000 upcoming payout) and current balance (₹1,450 wallet + ₹42,850 in HDFC Bank), you can comfortably allocate ₹5,000 into a high-yield liquid fund or SmartPay Auto-Save Vault.`;
      } else if (lower.includes('highest') || lower.includes('large')) {
        reply = `Your single highest expense this week was ₹1,420 for your BESCOM electricity bill on 25 Oct, followed by ₹1,200 at Dmart for weekly groceries. Both were processed securely with zero failure rate.`;
      } else {
        reply = `I've analyzed your cashflow across all linked accounts. Your financial health score is 88/100 (Excellent). Your spending is 12% lower than last month, and you have accumulated 1,840 SmartCoins redeemable for up to ₹250 in merchant coupons!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-full sm:h-[620px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1E1B4B]">
        {/* Purple Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#6222BD] to-[#752DE0] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  SmartPay AI Assistant
                </h3>
                <p className="text-[11px] text-emerald-100">Financial Insights & Advisory</p>
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Powered by Deep AI
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#7C3AED] text-white rounded-br-none'
                    : 'bg-white text-[#1E1B4B] border border-[#EDE9FE] rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <img
                  src={user.avatar}
                  alt="user"
                  className="w-7 h-7 rounded-full object-cover border border-[#7C3AED] flex-shrink-0 mt-0.5"
                />
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-[#EDE9FE] overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#EDE9FE] hover:text-[#6222BD] text-[#1E1B4B] whitespace-nowrap transition-colors flex-shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-[#EDE9FE] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about spending, budgets, savings..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-full bg-slate-50 border border-[#EDE9FE] focus:outline-none focus:border-[#7C3AED]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6222BD] disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
