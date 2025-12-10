import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../api/chatApi";
import { useAuth } from "../context/AuthContext";

export default function ChatbotWidget() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        `Assalam o Alaikum ${user?.name || ""}! I’m your secure e-commerce assistant.\n` +
        "Ask about products, your order (e.g., 101), refunds, or how we keep your data safe."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || loading) return; // no client-side error message, just ignore empty

    setMessages((prev) => [...prev, { from: "user", text: q }]);
    setInput("");
    setErr("");
    setLoading(true);

    try {
      const { data } = await sendMessage(q);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.answer || "No response." }
      ]);
    } catch (e) {
      // ❌ Don't show backend "Invalid input." etc – just a generic error
      setErr("Could not get response from assistant.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        SecureCommerce Assistant
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="msg bot">Thinking…</div>}
        <div ref={endRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder='Try: "gaming laptop under 150000", "track order 101", "refund policy", "how is my data protected?"'
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>

      {err && <div className="error">{err}</div>}
    </div>
  );
}
