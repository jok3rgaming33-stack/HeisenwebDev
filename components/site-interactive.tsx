"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "heisenweb33@protonmail.com";

type ChatMsg = {
  id: string;
  from: "bot" | "user";
  text: string;
  at: number;
};

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function SiteInteractive({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [notifStatus, setNotifStatus] = useState<"default" | "granted" | "denied" | "unsupported">(
    "default",
  );
  const [notifBusy, setNotifBusy] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [installHint, setInstallHint] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  // Register SW + install prompt + display mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    if (!("Notification" in window)) setNotifStatus("unsupported");
    else setNotifStatus(Notification.permission);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onBip = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setInstallPrompt(null);
      setInstallHint(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
    };
  }, []);

  // Seed chat when opened
  useEffect(() => {
    if (!chatOpen) {
      seeded.current = false;
      return;
    }
    if (seeded.current) return;
    seeded.current = true;
    setMessages([
      {
        id: uid(),
        from: "bot",
        text: "Bonjour — bienvenue chez HeisenWeb. Décrivez brièvement votre projet (objectif, délai, budget approximatif si vous le souhaitez).",
        at: Date.now(),
      },
      {
        id: uid(),
        from: "bot",
        text: "Pour ne manquer aucune réponse, activez les notifications ci-dessous. Vous pouvez aussi m’écrire directement à heisenweb33@protonmail.com.",
        at: Date.now() + 1,
      },
    ]);
  }, [chatOpen]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, chatOpen]);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  // Expose openChat via custom event so server page links can open modal
  useEffect(() => {
    const onOpen = () => openChat();
    window.addEventListener("heisenweb:open-chat", onOpen);
    return () => window.removeEventListener("heisenweb:open-chat", onOpen);
  }, [openChat]);

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      setNotifStatus("unsupported");
      return;
    }
    setNotifBusy(true);
    try {
      const perm = await Notification.requestPermission();
      setNotifStatus(perm);
      if (perm === "granted") {
        try {
          const reg = await navigator.serviceWorker?.ready;
          if (reg?.showNotification) {
            await reg.showNotification("HeisenWeb", {
              body: "Notifications activées. Vous serez alerté des réponses.",
              icon: "/icon.svg",
              tag: "heisenweb-welcome",
            });
          } else {
            new Notification("HeisenWeb", {
              body: "Notifications activées. Vous serez alerté des réponses.",
              icon: "/icon.svg",
            });
          }
        } catch {
          /* soft */
        }
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            from: "bot",
            text: "Parfait — les notifications sont activées sur cet appareil.",
            at: Date.now(),
          },
        ]);
      } else if (perm === "denied") {
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            from: "bot",
            text: "Notifications refusées. Vous pourrez les activer plus tard dans les paramètres du navigateur.",
            at: Date.now(),
          },
        ]);
      }
    } finally {
      setNotifBusy(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const userMsg: ChatMsg = { id: uid(), from: "user", text, at: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Soft prompt notifications if not decided
    if (notifStatus === "default" && "Notification" in window) {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          from: "bot",
          text: "Souhaitez-vous activer les notifications pour être prévenu d’une réponse ? Utilisez le bouton ci-dessous.",
          at: Date.now(),
        },
      ]);
    }

    // Envoi réel via mailto (pas de backend) — ouvre le client mail
    const subject = encodeURIComponent(
      `Contact HeisenWeb${name.trim() ? ` — ${name.trim()}` : ""}`,
    );
    const body = encodeURIComponent(
      `${text}\n\n---\nNom: ${name.trim() || "(non renseigné)"}\nDepuis: vitrine HeisenWeb`,
    );

    // Ack visuel
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          from: "bot",
          text: "Message préparé. Votre client mail va s’ouvrir pour l’envoyer à heisenweb33@protonmail.com. Merci — je reviens vers vous rapidement.",
          at: Date.now(),
        },
      ]);
      setSending(false);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }, 450);
  };

  const handleInstall = async () => {
    setInstallHint(null);
    if (installed) {
      setInstallHint("Déjà en mode application sur cet appareil.");
      return;
    }
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setInstallPrompt(null);
      }
      return;
    }

    // Fallback instructions
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isAndroid = /Android/i.test(ua);
    if (isIOS) {
      setInstallHint(
        "Sur iPhone / iPad : Safari → bouton Partager → « Sur l’écran d’accueil ».",
      );
    } else if (isAndroid) {
      setInstallHint(
        "Sur Android : menu ⋮ du navigateur → « Installer l’application » ou « Ajouter à l’écran d’accueil ».",
      );
    } else {
      setInstallHint(
        "Sur ordinateur : icône d’installation dans la barre d’adresse (Chrome / Edge), ou menu → Installer HeisenWeb.",
      );
    }
  };

  return (
    <>
      {/* Clone children is not needed — we inject nav actions via portal-like fixed UI */}
      {children}

      {/* Floating nav actions — pointer-events only on the right cluster so center nav links stay clickable */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-16 sm:h-[4.25rem]">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-end px-5 sm:px-8">
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => void handleInstall()}
              className="hidden items-center gap-1.5 rounded-full border border-white/12 bg-[#0b0f18]/90 px-3 py-1.5 text-[11px] font-semibold text-slate-200 backdrop-blur-md transition-colors hover:border-[#8ec5ff]/40 hover:text-white sm:inline-flex"
              title="Installer en application"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {installed ? "Mode appli" : "Installer l’app"}
            </button>
            <button
              type="button"
              onClick={() => void handleInstall()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0b0f18]/90 text-slate-200 backdrop-blur-md hover:border-[#8ec5ff]/40 sm:hidden"
              aria-label="Installer en application"
              title="Installer en application"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={openChat}
              className="btn-glow rounded-full bg-[#8ec5ff] px-4 py-2 text-[12px] font-bold tracking-wide text-[#0a0f18] transition-transform hover:scale-[1.02] sm:px-5 sm:text-[13px]"
            >
              Discutons
            </button>
          </div>
        </div>
      </div>

      {installHint && (
        <div className="fixed bottom-4 left-1/2 z-[70] w-[min(92vw,28rem)] -translate-x-1/2 rounded-2xl border border-[#8ec5ff]/25 bg-[#0b0f18] px-4 py-3 text-center text-xs text-slate-300 shadow-2xl">
          {installHint}
          <button
            type="button"
            className="mt-2 block w-full text-[11px] font-semibold text-[#8ec5ff]"
            onClick={() => setInstallHint(null)}
          >
            Fermer
          </button>
        </div>
      )}

      {/* Chat modal */}
      {chatOpen && (
        <div
          className="chat-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Discussion HeisenWeb"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeChat();
          }}
        >
          <div className="chat-panel flex h-[min(88vh,640px)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f18] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8ec5ff] to-[#5ba8f5] text-[11px] font-black text-[#0a0f18]">
                  HW
                </span>
                <div>
                  <p className="text-sm font-bold text-white">HeisenWeb</p>
                  <p className="text-[11px] text-slate-500">Réponse sous 24–48 h · chat + mail</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            {/* Notif banner */}
            <div className="border-b border-white/[0.06] bg-[#8ec5ff]/[0.06] px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#cfe8ff]">Notifications</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                    {notifStatus === "granted"
                      ? "Activées sur cet appareil."
                      : notifStatus === "denied"
                        ? "Refusées — activez-les dans les paramètres du navigateur."
                        : notifStatus === "unsupported"
                          ? "Non supportées sur ce navigateur."
                          : "Activez les notifications pour être alerté d’une réponse."}
                  </p>
                </div>
                {notifStatus !== "granted" && notifStatus !== "unsupported" && (
                  <button
                    type="button"
                    disabled={notifBusy || notifStatus === "denied"}
                    onClick={() => void enableNotifications()}
                    className="shrink-0 rounded-full bg-[#8ec5ff] px-3 py-1.5 text-[11px] font-bold text-[#0a0f18] disabled:opacity-40"
                  >
                    {notifBusy ? "…" : "Activer"}
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md bg-[#8ec5ff] text-[#0a0f18]"
                        : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-slate-200"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <div className="border-t border-white/[0.07] p-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom (optionnel)"
                className="mb-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-[#8ec5ff]/40"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                  placeholder="Votre message…"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#8ec5ff]/40"
                />
                <button
                  type="button"
                  disabled={!input.trim() || sending}
                  onClick={() => void sendMessage()}
                  className="rounded-xl bg-[#8ec5ff] px-4 text-sm font-bold text-[#0a0f18] disabled:opacity-40"
                >
                  Envoyer
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-600">
                Envoi via votre messagerie → {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
