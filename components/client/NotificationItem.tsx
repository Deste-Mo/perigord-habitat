import { AlertTriangle, Wrench, FileText, Info } from "lucide-react";
import type { Notification } from "@/types/notification";
import { TYPE_CONFIG } from "@/data/notifications";

const ICONS = {
  incident:     AlertTriangle,
  intervention: Wrench,
  notice:       FileText,
  info:         Info,
};

interface Props {
  notification: Notification;
  onRead: (id: number) => void;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `Il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Il y a ${h}h`;
  return `Il y a ${Math.floor(h / 24)}j`;
}

export function NotificationItem({ notification: n, onRead }: Props) {
  const cfg = TYPE_CONFIG[n.type];
  const Icon = ICONS[n.type];

  return (
    <button
      onClick={() => onRead(n.id)}
      className={`w-full text-left flex items-start gap-4 px-4 py-4 rounded-xl border transition-all ${
        n.read
          ? "bg-card border-border opacity-70"
          : "bg-card border-primary/20 shadow-sm"
      } hover:shadow-md`}
    >
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
        <Icon size={18} className={cfg.color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-semibold leading-snug ${n.read ? "text-muted-foreground" : "text-foreground"}`}>
            {n.title}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-muted-foreground">{timeAgo(n.date)}</span>
            {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
        <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
          {cfg.label}
        </span>
      </div>
    </button>
  );
}
