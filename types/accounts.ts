
// ── Types partagés pour le module accounts ────────────────────────────────────

export interface ProfileForm {
  full_name: string;
  telephone: string;
  organisation: string;
}

export interface PasswordForm {
  next: string;
  confirm: string;
}

export interface NotificationPrefs {
  email_incidents: boolean;
  email_interventions: boolean;
  email_newsletter: boolean;
  push_incidents: boolean;
  push_interventions: boolean;
}

export type ToastType = "success" | "error";

export interface ToastState {
  message: string;
  type: ToastType;
}

export type ThemeOption = "light" | "dark" | "system";
export type LangOption = "fr" | "en" | "es";
