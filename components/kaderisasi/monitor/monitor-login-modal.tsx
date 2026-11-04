"use client";

import React, { useState } from "react";
import { KeyRound, ShieldAlert, Eye, EyeOff, Lock, ArrowRight } from "lucide-react";

interface MonitorLoginModalProps {
  onLoginSuccess: (password: string) => void;
}

export const MonitorLoginModal: React.FC<MonitorLoginModalProps> = ({
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Masukkan kata sandi akses monitoring LK-I.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Test password against /api/lk1/admin
      const res = await fetch("/api/lk1/admin", {
        headers: { "x-admin-key": password.trim() },
      });

      if (res.status === 401) {
        setError("Kata sandi salah. Silakan tanyakan kata sandi kepada pengurus / panitia LK-I.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("hmi_admin_authenticated", "true");
      sessionStorage.setItem("hmi_admin_authenticated_key", password.trim());
      onLoginSuccess(password.trim());
    } catch (err: any) {
      console.error("Login verification error:", err);
      // Fallback local check
      if (password.trim() === "hilmanganteng@123" || password.trim() === "hmi2026") {
        sessionStorage.setItem("hmi_admin_authenticated", "true");
        sessionStorage.setItem("hmi_admin_authenticated_key", password.trim());
        onLoginSuccess(password.trim());
      } else {
        setError("Gagal memverifikasi kata sandi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-5 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#DCE8E2] bg-white p-2 shadow-sm ring-4 ring-[#EAF2EE]">
            <img src="/logo.png" alt="Logo HMI" className="h-10 w-10 object-contain" />
          </div>

          <h3 className="mt-4 text-xl font-black text-[#10231C]">
            Portal Monitoring LK-I
          </h3>
          <p className="mt-1 text-xs text-[#4B6259]">
            Khusus panitia SC/OC & pengurus kaderisasi HMI Komisariat Sains dan Teknologi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#10231C]">
              <KeyRound className="h-4 w-4 text-[#006144]" />
              <span>Kata Sandi Akses</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                autoFocus
                className="w-full rounded-2xl border border-[#DCE8E2] bg-white pl-4 pr-11 py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-[#006144]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 border border-red-100">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#006144] to-[#008f62] py-3.5 text-xs sm:text-sm font-black text-white shadow-lg shadow-[#006144]/25 hover:brightness-110 active:scale-95 transition-all disabled:opacity-60"
          >
            <span>{isLoading ? "Memverifikasi..." : "Masuk ke Monitoring LK-I"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-[#4B6259]">
              Halaman ini terpisah dari CMS Payload. Anda tidak perlu akun CMS admin untuk memantau data.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

