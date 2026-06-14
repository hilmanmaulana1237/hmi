"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Send, X, Trash2 } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("saintek-bot-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        // ignore error
      }
    }
    setMessages([
      {
        id: "initial",
        role: "assistant",
        content:
          "Assalamualaikum kanda/yunda! 👋 Saya Saintek-Bot, asisten AI dari HMI Komisariat Sains dan Teknologi. Ada yang bisa saya bantu?",
      },
    ]);
  }, [setMessages]);

  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("saintek-bot-history", JSON.stringify(messages));
    }
  }, [messages, mounted]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const botId = Date.now().toString() + "-bot";

    try {
      // Filter out greeting and any empty messages to satisfy API constraints
      const apiMessages = newMessages
        .filter((msg) => msg.id !== "initial" && msg.content.trim() !== "")
        .map(({ role, content }) => ({ role, content }));
      
      console.log("[Saintek-Bot] Sending payload:", apiMessages);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      console.log("[Saintek-Bot] Response status:", response.status, response.statusText);

      if (!response.ok) throw new Error(response.statusText || `HTTP error! status: ${response.status}`);

      // Tambahkan bubble asisten kosong untuk indikator typing
      setMessages((prev) => [...prev, { id: botId, role: "assistant", content: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botContent = "";
      
      console.log("[Saintek-Bot] Reader initialized:", !!reader);

      while (reader) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("[Saintek-Bot] Stream ended.");
          break;
        }
        const decoded = decoder.decode(value, { stream: true });
        console.log("[Saintek-Bot] Chunk received:", JSON.stringify(decoded));
        botContent += decoded;
        
        // Membersihkan tag <think> jika ada
        const cleanContent = botContent
          .replace(/<think>[\s\S]*?<\/think>/gi, '')
          .replace(/&lt;\/?think&gt;/gi, '')
          .trimStart();

        setMessages((prev) => 
          prev.map((msg) => msg.id === botId ? { ...msg, content: cleanContent } : msg)
        );
      }

      // Jika stream selesai tetapi tidak ada konten
      if (!botContent.trim()) {
        console.warn("[Saintek-Bot] Received empty content from stream.");
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId
              ? { ...msg, content: "Maaf, Saintek-Bot tidak menerima respon dari server. Silakan coba lagi." }
              : msg
          )
        );
      }
    } catch (error) {
      console.error(error);
      // Update bubble bot jika sudah dibuat, atau tambahkan bubble baru jika gagal di awal
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === botId);
        if (exists) {
          return prev.map((msg) =>
            msg.id === botId
              ? { ...msg, content: "Maaf, terjadi kesalahan koneksi. Silakan coba beberapa saat lagi." }
              : msg
          );
        } else {
          return [
            ...prev,
            {
              id: botId,
              role: "assistant",
              content: "Maaf, terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.",
            },
          ];
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-[65] grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#006144] to-[#003324] text-white shadow-[0_10px_25px_rgba(0,97,68,0.4)] transition hover:scale-105"
        aria-label="Buka Saintek-Bot"
      >
        <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
        {open ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
      </button>

      <div
        className={`fixed bottom-28 right-6 z-[64] flex h-[450px] w-[380px] max-w-[calc(100vw-2rem)] origin-bottom-right flex-col overflow-hidden rounded-[1.25rem] border border-black/5 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition ${open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-5 scale-95 opacity-0"
          }`}
      >
        <div className="flex min-h-[75px] items-center justify-between bg-gradient-to-br from-[#006144] to-[#003324] px-5 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#006144]">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-black">Saintek-Bot</h3>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-[#B9FBC0]">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Asisten AI HMI Saintek
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Hapus semua riwayat obrolan?")) {
                  localStorage.removeItem("saintek-bot-history");
                  setMessages([
                    {
                      id: "initial",
                      role: "assistant",
                      content:
                        "Assalamualaikum kanda/yunda! 👋 Saya Saintek-Bot, asisten AI dari HMI Komisariat Sains dan Teknologi. Ada yang bisa saya bantu?",
                    },
                  ]);
                }
              }}
              title="Hapus Riwayat"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-[#F4F8F6] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-[1.1rem] px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${message.role === "user"
                ? "ml-auto rounded-br bg-gradient-to-br from-[#006144] to-[#003324] text-white"
                : "rounded-bl border border-slate-100 bg-white text-[#003324] shadow-sm"
                }`}
            >
              {message.content === "" && message.role === "assistant" ? (
                isLoading ? (
                  <div className="flex h-5 items-center gap-1.5 py-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#006144] [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#006144] [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#006144]"></div>
                  </div>
                ) : (
                  "Maaf, tidak ada respon dari server."
                )
              ) : (
                message.content
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleFormSubmit} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#006144] focus:bg-white"
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2994A] text-[#003324] hover:bg-[#D6A84F] transition"
            aria-label="Kirim"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="bg-white px-4 pb-3 text-center text-[0.65rem] leading-4 text-slate-400">
          Saintek-Bot masih dalam tahap awal pengembangan oleh Bidang IT dan dapat melakukan kesalahan.
        </div>
      </div>
    </>
  );
}
