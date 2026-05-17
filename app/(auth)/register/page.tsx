"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <AuthCard
        title="Je suis locataire"
        description="Créez votre compte pour commencer"
      >
        <RegisterForm role="locataire" onChangeRole={() => setStarted(false)} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Créer un compte"
      description="Espace réservé aux locataires"
    >
      <div className="flex flex-col gap-4 pt-2">
        <button
          onClick={() => setStarted(true)}
          className="flex items-center gap-4 p-4 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-accent transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
            <User className="text-blue-600 dark:text-blue-400" size={22} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Je suis locataire</p>
            <p className="text-sm text-muted-foreground">Accédez à votre espace personnel</p>
          </div>
          <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <p className="text-center text-sm text-muted-foreground pt-2">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Se connecter
          </Link>
        </p>

        {/* <p className="text-center text-xs text-muted-foreground">
          Vous êtes bailleur ?{" "}
          <Link href="/register/admin" className="text-orange-600 font-medium hover:underline">
            Créer un compte bailleur
          </Link>
        </p> */}
      </div>
    </AuthCard>
  );
}
