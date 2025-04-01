import { useState } from "react";

export default function ChatBox() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

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
            setLoading(false); // Always turn off loading, even on error
        }
    };


    return (
        <div className="mx-12 bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="overflow-y-auto flex-1 max-h-[70vh]">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-2 my-4 rounded-md ${
                            msg.role === "user"
                                ? "bg-blue-600 w-fit ml-auto max-w-[80%]"
                                : "bg-gray-400 w-fit mr-auto max-w-[80%]"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {loading && <div className="italic text-gray-500">Assistant is typing...</div>}
            </div>
            <div className="flex gap-2">
                <input
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-black"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
