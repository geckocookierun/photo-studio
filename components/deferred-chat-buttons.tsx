"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Mount chat floats after idle so they don't compete with LCP/TBT. */
export default function DeferredChatButtons() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(enable, 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
      <Link
        href="https://zalo.me/0909939351"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <Image src="/zalo-logo.png" alt="Zalo Logo" width={48} height={48} />
      </Link>
      <Link
        href="https://www.facebook.com/messages/t/116514626424223"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <Image src="/facebook-messenger.png" alt="Messenger Logo" width={36} height={36} />
      </Link>
    </div>
  );
}
