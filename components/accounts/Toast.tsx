
import { Check, AlertCircle } from "lucide-react";
import type { ToastState } from "@/types/accounts";

export function Toast({ message, type }: ToastState) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <Check size={15} /> : <AlertCircle size={15} />}
      {message}
    </div>
  );
}
