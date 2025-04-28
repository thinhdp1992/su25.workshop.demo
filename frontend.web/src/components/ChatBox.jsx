import { useState, useEffect, useRef } from 'react';

function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Scroll to bottom when new messages appear
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { role: "user", content: input }];
        setHistory(newHistory);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch(`${apiURL}/chat-flower`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: newHistory }),
            });

            const data = await res.json();
            setHistory([...newHistory, { role: "assistant", content: data.answer }]);
        } catch (error) {
            console.error("Chat error:", error);
            setHistory([...newHistory, { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-pink-500 text-white rounded-full p-4 shadow-lg hover:bg-pink-600 transition-colors"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-pink-500 text-white p-4">
                        <h3 className="font-bold">Flower Assistant</h3>
                        <p className="text-sm">Ask me anything about flowers!</p>
                    </div>

                    <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                        {history.length === 0 ? (
                            <p className="text-gray-500 text-center my-4">Start a conversation!</p>
                        ) : (
                            history.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                                >
                                    <div
                                        className={`inline-block p-3 rounded-lg max-w-[80%] ${msg.role === 'user'
                                            ? 'bg-pink-500 text-white rounded-br-none'
                                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="text-left mb-3">
                                <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef}></div>
                    </div>

                    <form onSubmit={handleSend} className="p-3 border-t border-gray-200 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition-colors"
                            disabled={loading || !input.trim()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
