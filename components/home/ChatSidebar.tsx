"use client";

import { SquarePen, MessagesSquare } from "lucide-react";
import type { Conversation } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

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
    <aside className="hidden sm:flex flex-col w-60 shrink-0 border-r border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessagesSquare size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Discussions</span>
        </div>
        <button
          onClick={onNew}
          title="Nouvelle discussion"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-150"
        >
          <SquarePen size={15} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
            <MessagesSquare size={28} className="text-border" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Démarrez une discussion pour la retrouver ici
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => onSwitch(conv.id)}
                className={cn(
                  "group w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-150",
                    isActive
                      ? "bg-primary scale-110"
                      : "bg-border group-hover:bg-muted-foreground"
                  )}
                />
                <span className="truncate text-sm leading-snug font-medium">
                  {conv.title}
                </span>
              </button>
            );
          })
        )}
      </nav>

      <div className="px-4 py-3 border-t border-border">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium text-primary bg-accent hover:bg-accent/80 active:scale-[0.98] transition-all duration-150"
        >
          <SquarePen size={14} />
          Nouvelle discussion
        </button>
      </div>
    </aside>
  );
}
