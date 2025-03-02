"use client";

import React, { useState, useEffect } from "react";
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

  // Attach the listener only once when the component mounts
  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessages((prevMessages) => {
        // Avoid adding duplicate messages by checking the unique id
        if (prevMessages.some((msg) => msg.id === data.id)) {
          return prevMessages;
        }
        return [...prevMessages, data];
      });
    };

    socket.on("receive_message", receiveMessageHandler);

    // Clean up the listener on unmount
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Create a unique id for the message
    const newMessage = {
      id: Date.now() + Math.random(),
      sender: user,
      message,
    };

    // Immediately update the local state (optimistic update)
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
          id: Date.now() + Math.random(),
          sender: "AI",
          message: response.choices[0].message.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    } else {
      // Emit the message to the server (which broadcasts it to all)
      socket.emit("send_message", newMessage);
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
        {messages.map((msg) => (
          <div
            key={msg.id}
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
