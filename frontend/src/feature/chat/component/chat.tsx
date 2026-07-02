import { useEffect, useState } from "react";
import { socket } from "@/lib/socket-io";
import { useAuthStore } from "@/store/auth.store";
import { parseJwt } from "@/lib/utils";
import { env } from "@/enviroments/env";
import type { User } from "../hook/use-get-users.hook";

type Message = {
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
  align: "right" | "left"
};

interface Props {
  user: User;
  currentUser: User;
}

function Chat({ user, currentUser }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on(env.VITE_SOCKET_MESSAGE_EVENT_NAME, (msg: Message) => {
      console.log('got', msg)
      
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off(env.VITE_SOCKET_MESSAGE_EVENT_NAME);
    };
  }, []);

  function sendMessage() {
    console.log({ message });

    if (!message.trim()) return;
    const messageDetail: Message = {
      text: message,
      senderId: currentUser.id,
      receiverId: user.id,
      timestamp: new Date().toLocaleTimeString(),
      align: "right"
    }
    console.log({ env, messageDetail });

    socket.emit(env.VITE_SOCKET_MESSAGE_EVENT_NAME, messageDetail);

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
          <div key={index} style={{ textAlign: msg.align }}>{msg.text}</div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => {
          let message = e.target.value
          console.log({ message });

          setMessage(message)
        }}
        placeholder="Type message..."
        style={{
          width: "80%",
          padding: 10,
        }}
      />

      <button
        onClick={() => {
          console.log("click");

          sendMessage()
        }}
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