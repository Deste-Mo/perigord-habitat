
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/user";

function getInitials(name?: string | null, email?: string | null) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

interface AccountHeaderProps {
  user: User | null;
  profile: Profile | null;
}

export function AccountHeader({ user, profile }: AccountHeaderProps) {
  const displayName =
    profile?.full_name ?? user?.user_metadata?.full_name ?? user?.email ?? "Utilisateur";
  const initials = getInitials(
    profile?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  );
  const role = profile?.role ?? (user?.user_metadata?.role as string) ?? "locataire";
  const isBailleur = role === "bailleur";

  return (
    <div className="flex items-center gap-4 mb-8">
      <Link
        href="/"
        className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
      >
        <ArrowLeft size={18} />
      </Link>
      <div className="flex items-center gap-4 flex-1">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-md">
          {initials}
        </div>
        <div>
          <h1 className="text-lg font-black text-foreground">{displayName}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{user?.email}</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isBailleur
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
              }`}
            >
              {isBailleur ? "Bailleur" : "Locataire"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
