"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home, Bot, Building2, BookOpen, HelpCircle,
  Phone, UserCircle, Menu, X, LogOut, Bell,
  AlertTriangle, History, FileText,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/hooks/useAuth";

const NAV_MAIN = [
  { href: "/",                     icon: Home,          title: "Accueil" },
  { href: "/client/chat",          icon: Bot,           title: "Assistant" },
  { href: "/maison",               icon: Building2,     title: "Logement" },
  { href: "/client/tutos",         icon: BookOpen,      title: "Conseils" },
  { href: "/client/qui-fait-quoi", icon: HelpCircle,    title: "Qui fait quoi ?" },
  { href: "/client/contacts",      icon: Phone,         title: "Contacts" },
];

// Items du compte — partagés entre dropdown desktop et menu mobile
const ACCOUNT_ITEMS = [
  { href: "/accounts",                 icon: UserCircle,    title: "Mon profil"              },
  { href: "/client/incidents",         icon: AlertTriangle, title: "Mes incidents"           },
  { href: "/client/compte/historique", icon: History,       title: "Historique"              },
  { href: "/decouverte",               icon: Building2,     title: "Découvertes"             },
  { href: "/client/compte/documents",  icon: FileText,      title: "Documents / Équipements" },
];

// Dashboard uniquement bailleur — ajouté dynamiquement
const DASHBOARD_ITEM = { href: "/dashboard", icon: UserCircle, title: "Dashboard" };

// Mobile : nav principale + notifications + items compte
const buildMobileNav = (isBailleur: boolean) => [
  ...NAV_MAIN,
  { href: "/notification", icon: Bell, title: "Notifications" },
  ...ACCOUNT_ITEMS,
  ...(isBailleur ? [DASHBOARD_ITEM] : []),
];

function getInitials(name?: string | null, email?: string | null) {
  if (name) return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

export function HeaderApp({ onLogoClick }: { onLogoClick?: () => void }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? null;
  const initials = getInitials(user?.user_metadata?.full_name, user?.email);
  const role = (user?.user_metadata?.role ?? user?.app_metadata?.role) as string | undefined;
  const isLocataire = role === "locataire";
  const isBailleur = !isLocataire;
  const mobileNav = buildMobileNav(isBailleur);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-card border-b border-border shadow-sm">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0" onClick={onLogoClick}>
        <Image src="/logo-default.png" alt="Logo" width={32} height={32} className="rounded" />
        <span className="font-semibold text-base sm:text-lg tracking-tight text-foreground hidden sm:block">
          Qui fait quoi ?
        </span>
      </Link>

      {/* ── Desktop ── */}
      <div className="hidden lg:flex items-center gap-1">
        {!loading && (
          user ? (
            <>
              {NAV_MAIN.map(({ href, icon: Icon, title }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    title={title}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-medium whitespace-nowrap">
                      {title}
                    </span>
                  </Link>
                );
              })}

              {/* Notifications */}
              <Link
                href="/notification"
                title="Alertes"
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/notification"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                <span className="relative block">
                  <Bell size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
                </span>
                <span className="text-[10px] font-medium whitespace-nowrap">
                  Alertes
                </span>
              </Link>

              {/* Mon compte dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-medium whitespace-nowrap">
                      Mon compte
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                    {user.user_metadata?.full_name && (
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  {ACCOUNT_ITEMS.map(({ href, icon: Icon, title }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="flex items-center gap-2 cursor-pointer">
                        <Icon size={15} /> {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {isBailleur && (
                    <DropdownMenuItem asChild>
                      <Link href={DASHBOARD_ITEM.href} className="flex items-center gap-2 cursor-pointer">
                        <DASHBOARD_ITEM.icon size={15} /> {DASHBOARD_ITEM.title}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut size={15} /> Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">S&apos;inscrire</Link>
              </Button>
            </>
          )
        )}
      </div>

      {/* ── Mobile / Tablet ── */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu size={20} /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen w-screen flex flex-col px-6 py-6">
            <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>

            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2" onClick={onLogoClick}>
                <Image src="/logo-default.png" alt="Logo" width={32} height={32} className="rounded" />
                <span className="font-semibold text-lg text-foreground">Qui fait quoi ?</span>
              </Link>
              <SheetClose asChild>
                <Button variant="ghost" size="icon"><X size={20} /></Button>
              </SheetClose>
            </div>

            {user && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                  {user.user_metadata?.full_name && (
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  )}
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
              {(user ? mobileNav : [
                { href: "/login",    icon: UserCircle, title: "Se connecter" },
                { href: "/register", icon: UserCircle, title: "S'inscrire"   },
              ]).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 py-3 border-b border-border transition-colors ${
                        isActive ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            {user && (
              <SheetClose asChild>
                <button onClick={logout} className="flex items-center gap-2 text-red-600 font-medium py-3 mt-4">
                  <LogOut size={18} /> Se déconnecter
                </button>
              </SheetClose>
            )}
          </SheetContent>
        </Sheet>
      </div>

    </header>
  );
}
