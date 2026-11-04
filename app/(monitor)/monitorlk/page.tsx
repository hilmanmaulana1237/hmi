"use client";

import React, { useState, useEffect } from "react";
import { MonitorDashboard } from "@/components/kaderisasi/monitor/monitor-dashboard";
import { MonitorLoginModal } from "@/components/kaderisasi/monitor/monitor-login-modal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MonitorLKPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminKey, setAdminKey] = useState<string>("");

  useEffect(() => {
    // Check session storage on mount
    const authStatus = sessionStorage.getItem("hmi_admin_authenticated");
    const storedKey = sessionStorage.getItem("hmi_admin_authenticated_key");

    if (authStatus === "true" && storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = (key: string) => {
    setAdminKey(key);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hmi_admin_authenticated");
    sessionStorage.removeItem("hmi_admin_authenticated_key");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  // Initial loading state to prevent flash
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7F6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#006144] border-t-transparent" />
          <p className="text-xs font-bold text-[#4B6259]">Memuat portal monitoring...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#EAF2EE] via-[#F4F7F6] to-white flex flex-col justify-between p-4 sm:p-6">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#BCD7CA] bg-white px-3.5 py-2 text-xs font-bold text-[#006144] shadow-sm transition hover:bg-[#EAF2EE]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Website Utama</span>
          </Link>
        </div>

        <MonitorLoginModal onLoginSuccess={handleLoginSuccess} />

        <div className="mx-auto max-w-md text-center text-xs text-[#6C847A] pb-4">
          © {new Date().getFullYear()} HMI Komisariat Sains dan Teknologi UIN SGD Bandung. Portal Khusus Panitia LK-I.
        </div>
      </main>
    );
  }

  return <MonitorDashboard onLogout={handleLogout} adminKey={adminKey} />;
}

