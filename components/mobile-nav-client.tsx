"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MobileNavClientProps = {
  navItems: Array<{ href: string; label: string }>;
  logoUrl?: string;
  logoAlt?: string;
};

export default function MobileNavClient({ navItems, logoUrl, logoAlt }: MobileNavClientProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" id="mobile-nav-panel">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[min(100%,320px)] bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={logoAlt || "Logo"} width={120} height={40} className="h-10 w-auto object-contain" />
              ) : (
                <span className="font-semibold">Menu</span>
              )}
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-gray-800 hover:text-rose-500"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
