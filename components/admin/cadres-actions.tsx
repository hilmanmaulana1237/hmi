"use client";

import React, { useRef, useState } from "react";

export function CadresActions() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    window.open("/api/export/cadres", "_blank");
  };

  const handleDownloadTemplate = () => {
    window.open("/api/export/cadres?template=true", "_blank");
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/import/cadres", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Berhasil import ${data.count} data kader.`);
        window.location.reload();
      } else {
        alert("Gagal import: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error uploading file");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "10px" }}>
      <button
        onClick={handleExport}
        className="btn btn--style-primary btn--size-small"
        type="button"
      >
        Export CSV
      </button>
      <button
        onClick={handleDownloadTemplate}
        className="btn btn--style-secondary btn--size-small"
        type="button"
      >
        Unduh Template CSV
      </button>
      <input
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImport}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="btn btn--style-secondary btn--size-small"
        type="button"
      >
        {loading ? "Mengimpor..." : "Import CSV"}
      </button>
    </div>
  );
}
