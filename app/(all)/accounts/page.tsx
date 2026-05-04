"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { accountsService } from "@/services/accounts.service";
import { useToast }         from "@/hooks/accounts/useToast";
import { useAccountForm }   from "@/hooks/accounts/useAccountForm";
import { usePasswordForm }  from "@/hooks/accounts/usePasswordForm";
import { useNotifications } from "@/hooks/accounts/useNotifications";
import { usePreferences }   from "@/hooks/accounts/usePreferences";
import { useState }         from "react";
import { AccountHeader }        from "@/components/accounts/AccountHeader";
import { ProfileSection }       from "@/components/accounts/ProfileSection";
import { SecuritySection }      from "@/components/accounts/SecuritySection";
import { PreferencesSection }   from "@/components/accounts/PreferencesSection";
import { PrivacySection }       from "@/components/accounts/PrivacySection";
import { OrganisationSection }  from "@/components/accounts/OrganisationSection";
import { HelpSection }          from "@/components/accounts/HelpSection";
import { DangerSection }        from "@/components/accounts/DangerSection";
import { Toast }                from "@/components/accounts/Toast";
import { NotificationsSection } from "@/components/accounts/NotificationsSection";

type ActiveSection = "profile" | "password" | null;

export default function AccountsPage() {
  const { user, profile, loading, refreshProfile } = useAuthContext();
  const router = useRouter();

  const { toast, show: showToast } = useToast();
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const role = profile?.role ?? (user?.user_metadata?.role as string) ?? "locataire";
  const isBailleur = role === "bailleur";

  // Hooks metier
  const accountForm = useAccountForm({
    user, profile,
    refreshProfile,
    onSuccess: (msg) => { showToast(msg, "success"); setActiveSection(null); },
    onError:   (msg) => showToast(msg, "error"),
  });

  const passwordForm = usePasswordForm({
    onSuccess: (msg) => { showToast(msg, "success"); setActiveSection(null); },
    onError:   (msg) => showToast(msg, "error"),
  });

  const { prefs: notifPrefs, toggle: toggleNotif } = useNotifications();
  const { lang, setLang, theme, setTheme } = usePreferences();

  // Redirection si non connecte
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  const handleLogout = async () => {
    await accountsService.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderApp />
      <div className="max-w-2xl mx-auto px-4 py-8">

        <AccountHeader user={user} profile={profile} />

        <div className="space-y-4">

          <ProfileSection
            user={user}
            profile={profile}
            isBailleur={isBailleur}
            isEditing={activeSection === "profile"}
            form={accountForm.form}
            saving={accountForm.saving}
            onEdit={() => setActiveSection("profile")}
            onCancel={() => setActiveSection(null)}
            onSave={accountForm.save}
            onFieldChange={accountForm.setField}
          />

          <SecuritySection
            isEditing={activeSection === "password"}
            form={passwordForm.form}
            showPw={passwordForm.showPw}
            saving={passwordForm.saving}
            isValid={passwordForm.isValid}
            isMatch={passwordForm.isMatch}
            onEdit={() => setActiveSection("password")}
            onCancel={() => setActiveSection(null)}
            onSave={passwordForm.save}
            onFieldChange={passwordForm.setField}
            onToggleShowPw={passwordForm.toggleShowPw}
          />

          <NotificationsSection prefs={notifPrefs} onToggle={toggleNotif} />

          <PreferencesSection
            lang={lang}
            theme={theme}
            onLangChange={setLang}
            onThemeChange={setTheme}
          />

          <PrivacySection />

          {isBailleur && (
            <OrganisationSection onNavigate={(href) => router.push(href)} />
          )}

          <HelpSection />

          <DangerSection onLogout={handleLogout} />

        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Membre depuis{" "}
          {user?.created_at
            ? new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
            : "—"}
        </p>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
