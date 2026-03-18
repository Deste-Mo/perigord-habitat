"use client";

import { useEffect, useRef } from "react";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import type { ChatMessage } from "@/hooks/useChat";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {/* Avatar assistant */}
          {msg.role === "assistant" && (
            <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <Image src="/logo-default.png" alt="QFQ" width={32} height={32} />
            </div>
          )}

          <div
            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-indigo-600 text-white rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
            }`}
          >
            {msg.fileName && (
              <div className="flex items-center gap-1.5 mb-2 text-xs opacity-75">
                <Paperclip size={12} />
                <span>{msg.fileName}</span>
              </div>
            )}
            {msg.content && <p>{msg.content}</p>}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
