"use client";

import { useState, useRef } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  fileName?: string;
};

export function useChat() {
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const idRef = useRef(0);

  const nextId = () => String(++idRef.current);

  const handleSend = () => {
    if (!message.trim() && !attachedFile) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content: message.trim(),
      fileName: attachedFile?.name,
    };

    // Réponse simulée en attendant l'intégration IA
    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      content: "Je traite votre demande… (réponse IA à intégrer)",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setMessage("");
    setAttachedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    message,
    setMessage,
    attachedFile,
    setAttachedFile,
    messages,
    handleSend,
    handleKeyDown,
  };
}
