"use client";

import React, { useState } from "react";
import io from "socket.io-client";
import OpenAI from "openai";

const socket = io("http://localhost:5001");

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chat({ user, recipient }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState("doctor"); // Default chat with doctor

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: user, message };
    setMessages([...messages, userMessage]);
    setMessage("");
    setLoading(true);

    if (chatMode === "ai") {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful medical assistant providing guidance to patients and doctors.",
            },
            { role: "user", content: message },
          ],
        });

        const botMessage = {
          sender: "AI",
          message: response.choices[0].message.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    } else {
      socket.emit("send_message", userMessage);
      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-blue-400">
        Chat with {chatMode === "ai" ? "AI Assistant" : recipient}
      </h2>

      <div className="flex justify-between my-2">
        <button
          className={`px-3 py-1 rounded-md ${
            chatMode === "doctor"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setChatMode("doctor")}
        >
          Talk to Doctor
        </button>
        <button
          className={`px-3 py-1 rounded-md ${
            chatMode === "ai"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setChatMode("ai")}
        >
          Talk to AI
        </button>
      </div>

      <div className="h-64 overflow-y-auto bg-gray-800 p-2 rounded-md shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${
              msg.sender === user
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-700 text-white"
            }`}
          >
            <p className="text-sm font-bold">{msg.sender}:</p>
            <p className="text-md">{msg.message}</p>
          </div>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
