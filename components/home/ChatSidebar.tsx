"use client";

import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@/hooks/useChat";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConvId: string | null;
  onNew: () => void;
  onSwitch: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConvId,
  onNew,
  onSwitch,
}: ChatSidebarProps) {
  return (
    <aside className="hidden sm:flex flex-col w-64 shrink-0 border-r border-gray-100 bg-gray-50 overflow-hidden">
      {/* Bouton nouvelle discussion */}
      <div className="p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-sm font-medium"
          onClick={onNew}
        >
          <Plus size={16} />
          Nouvelle discussion
        </Button>
      </div>

      <div className="px-3 pb-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Discussions
        </p>
      </div>

      {/* Liste des discussions */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {conversations.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6">
            Aucune discussion pour l'instant
          </p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSwitch(conv.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors group ${
              conv.id === activeConvId
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <MessageSquare
              size={14}
              className={`shrink-0 ${
                conv.id === activeConvId ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-600"
              }`}
            />
            <span className="truncate text-sm leading-snug">{conv.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
