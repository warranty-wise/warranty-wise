'use client';

import {useEffect, useRef, useState} from "react";
import {TextareaAutosize} from "@mui/material";
import { PiChats } from "react-icons/pi";

export default function ChatBox() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const chatbotRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [isOpen, messages]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (
                chatbotRef.current &&
                !chatbotRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    const toggleChatbox = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            const text = await res.text();
            console.log("RAW RESPONSE FROM /api/chat:", text);

            try {
                const data = JSON.parse(text);
                const updatedMessages = [...newMessages, { role: "assistant", content: data.reply }];
                setMessages(updatedMessages);
            } catch (err) {
                console.error("Failed to parse JSON:", err);
                setMessages([...newMessages, { role: "assistant", content: "Error: Could not get response." }]);
            }
        } catch (err) {
            console.error("Network error:", err);
            setMessages([...newMessages, { role: "assistant", content: "Network error." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                ref={buttonRef}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
                onClick={toggleChatbox}
            >
                {isOpen ? <PiChats className="w-7 h-7" /> : <PiChats className="w-7 h-7" />}
            </button>

            {/* Chat Popup */}
            {isOpen && (

                <div ref={chatbotRef} className="fixed bottom-20 right-6 w-96 h-96 rounded shadow p-4 flex flex-col gap-2 z-50 bg-white border-2">
                    <div className="overflow-y-auto flex-1">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 my-4 rounded-md ${
                                    msg.role === "user"
                                        ? "bg-blue-600 text-white w-fit ml-auto max-w-[80%]"
                                        : "bg-gray-300 text-black w-fit mr-auto max-w-[80%]"
                                }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div className="italic text-gray-500">Assistant is typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex items-end gap-2 mt-2">
                        <TextareaAutosize
                            minRows={1}
                            maxRows={6}
                            className="flex-1 border border-gray-300 rounded px-3 py-2 text-black resize-none bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 whitespace-nowrap m-0"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
