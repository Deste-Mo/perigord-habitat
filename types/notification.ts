export type NotificationType = "incident" | "intervention" | "notice" | "info";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
