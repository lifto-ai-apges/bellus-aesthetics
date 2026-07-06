"use client";

import { useState, useEffect, useRef } from "react";
import { generateBotResponse, formatBotHtml } from "./chatbot-data";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        sender: "bot",
        text: generateBotResponse("hello"),
        time
      }
    ]);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = {
      sender: "user",
      text: inputValue,
      time
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botReplyText = generateBotResponse(userMessage.text);
      const botMessage: Message = {
        sender: "bot",
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <button
        className="chatbot-bubble pulse-glow"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="chat-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
          />
        </svg>
      </button>

      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? "active" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="bot-avatar">B</div>
            <div>
              <h4 className="bot-name">Bellus Assistant</h4>
              <span className="bot-status">Active · Online</span>
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        {/* Message Log */}
        <div className="chat-messages no-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                <p className="message-text" dangerouslySetInnerHTML={{ __html: formatBotHtml(msg.text) }} />
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-bubble typing-bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about treatments, pricing, locations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn" aria-label="Send message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="send-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        .chat-icon {
          width: 28px;
          height: 28px;
        }

        .chat-header {
          background-color: var(--clr-primary);
          color: var(--clr-white);
          padding: var(--space-sm) var(--space-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: var(--border-gold);
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--clr-accent);
          color: var(--clr-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-family: var(--font-serif);
          font-size: 1.1rem;
        }

        .bot-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--clr-white);
          margin: 0;
          line-height: 1.2;
        }

        .bot-status {
          font-size: 0.7rem;
          color: var(--clr-accent-light);
          opacity: 0.9;
        }

        .chat-close-btn {
          background: transparent;
          border: none;
          color: var(--clr-white);
          font-size: 1.8rem;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
        }

        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(254, 252, 249, 0.95);
        }

        .message-wrapper {
          display: flex;
          width: 100%;
        }

        .message-wrapper.bot {
          justify-content: flex-start;
        }

        .message-wrapper.user {
          justify-content: flex-end;
        }

        .message-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: var(--radius-lg);
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .bot .message-bubble {
          background-color: var(--clr-bg-alt);
          border-top-left-radius: 2px;
          color: var(--clr-text);
          border: 1px solid rgba(74, 26, 107, 0.05);
        }

        .user .message-bubble {
          background-color: var(--clr-primary);
          color: var(--clr-white);
          border-top-right-radius: 2px;
        }

        .message-text {
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0;
          word-break: break-word;
        }

        .message-text :global(a) {
          color: var(--clr-primary);
          font-weight: 700;
          text-decoration: underline;
          text-decoration-color: var(--clr-accent);
          text-underline-offset: 2px;
        }

        .user .message-text :global(a) {
          color: var(--clr-accent-light);
        }

        .message-time {
          font-size: 0.65rem;
          opacity: 0.6;
          display: block;
          text-align: right;
          margin-top: 4px;
        }

        .chat-input-area {
          padding: 12px var(--space-md);
          background: var(--clr-white);
          border-top: 1px solid rgba(74, 26, 107, 0.08);
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .chat-input {
          flex-grow: 1;
          border: 1px solid rgba(74, 26, 107, 0.15);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-size: 0.88rem;
          font-family: var(--font-sans);
          outline: none;
          transition: var(--transition-fast);
        }

        .chat-input:focus {
          border-color: var(--clr-primary);
          box-shadow: 0 0 0 2px rgba(74, 26, 107, 0.1);
        }

        .chat-send-btn {
          background: var(--clr-primary);
          border: none;
          color: var(--clr-white);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .chat-send-btn:hover {
          background: var(--clr-primary-light);
          transform: scale(1.05);
        }

        .send-icon {
          width: 16px;
          height: 16px;
        }

        /* Typing Dots Indicator */
        .typing-bubble {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: var(--clr-bg-alt);
        }

        .dot {
          width: 6px;
          height: 6px;
          background-color: var(--clr-primary-light);
          border-radius: 50%;
          animation: bounceDot 1.4s infinite ease-in-out both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounceDot {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
