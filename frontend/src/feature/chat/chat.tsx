import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-io";
import { useAuthStore } from "@/store/auth.store";
import { parseJwt } from "@/lib/utils";
import { env } from "@/enviroments/env";

type UserDetail = {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
}

type Message = {
  text: string;
        senderId: number;
        recieverId:number;
  timestamp: string;
  align: "right" | "left"
};

function Chat() {
      const { token } = useAuthStore()
   
// Usage:
const userData : UserDetail= parseJwt(token);
console.log({userData});

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on(env.VITE_SOCKET_EVENT_NAME, (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  function sendMessage(recieverId: number) {
    if (!message.trim()) return;
    const messageDetail: Message = {
      text: message,
        senderId: userData.id,
        recieverId,
  timestamp: new Date().toLocaleTimeString(),
  align: "right"
    }

    socket.emit(env.VITE_SOCKET_EVENT_NAME,messageDetail );

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
          <div key={index} style={{textAlign: msg.align}}>{msg.text}</div>
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
        onClick={()=>sendMessage}
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