import ChatbotWidget from "../components/ChatbotWidget";

export default function ChatPage() {
  return (
    <>
      <h2>Secure Chat Assistant</h2>
      <p style={{ lineHeight: "1.6", textAlign: "justify" }}>
        Chat with the AI-powered assistant to explore and manage your shopping needs.{" "}
        All interactions are handled securely to protect your privacy and data.
      </p>
      <div className="chat-widget-wrapper">
        <ChatbotWidget />
      </div>
    </>
  );
}
