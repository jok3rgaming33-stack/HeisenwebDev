"use client";

/** Ouvre la modale de chat (événement écouté par SiteInteractive). */
export function OpenChatButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("heisenweb:open-chat"))}
    >
      {children}
    </button>
  );
}
