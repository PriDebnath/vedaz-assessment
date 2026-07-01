import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-io";

type Message = {
  text: string;
};

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("chat-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  function sendMessage() {
    if (!message.trim()) return;

    socket.emit("chat-message", {
      text: message,
    });

    setMessage("");
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Simple Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: 350,
          overflowY: "auto",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{
          width: "80%",
          padding: 10,
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: 10,
          marginLeft: 10,
        }}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;