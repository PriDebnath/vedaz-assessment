import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";

import { socket } from "@/lib/socket-io";
import { env } from "@/enviroments/env";

import type { User } from "../hook/use-get-users.hook";

type Message = {
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: string;
};

interface Props {
  user: User;
  currentUser: User;
}

export default function Chat({ user, currentUser }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on(env.VITE_SOCKET_MESSAGE_EVENT_NAME, (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off(env.VITE_SOCKET_MESSAGE_EVENT_NAME);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage() {
    if (!message.trim()) return;

    const msg: Message = {
      text: message,
      senderId: currentUser.id,
      receiverId: user.id,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit(env.VITE_SOCKET_MESSAGE_EVENT_NAME, msg);

    setMessages((prev) => [...prev, msg]);

    setMessage("");
  }

  return (
    <div className="flex h-[75vh] flex-col">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {user.name[0].toUpperCase()}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                user.active ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.active ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-5">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const mine = msg.senderId === currentUser.id;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  mine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    mine
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  <p>{msg.text}</p>

                  <p className="mt-1 text-right text-[10px] opacity-60">
                    {msg.timestamp}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 rounded-full border bg-muted px-5 py-3 outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            className="rounded-full bg-primary p-3 text-primary-foreground"
          >
            <SendHorizontal size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}