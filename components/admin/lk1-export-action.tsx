"use client";

import React from "react";

export function Lk1ExportAction() {
  const handleExport = () => {
    window.open("/api/export/lk1", "_blank");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={handleExport}
        className="btn btn--style-primary btn--size-small"
        type="button"
      >
        Export Data CSV
      </button>
    </div>
  );
}
