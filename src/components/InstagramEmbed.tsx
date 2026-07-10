"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Lightweight Instagram embed via the public /embed endpoint — no SDK, no
 * API keys. Lazy-loads the iframe when it scrolls near the viewport.
 */
export function InstagramEmbed({ url, className }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  const match = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  const id = match?.[1];

  useEffect(() => {
    const el = ref.current;
    if (!el || !id) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  if (!id) return null;

  return (
    <div ref={ref} className={className}>
      {load ? (
        <iframe
          src={`https://www.instagram.com/p/${id}/embed/captioned/`}
          className="h-[560px] w-full border-0 bg-[#0a0a08]"
          loading="lazy"
          allowFullScreen
          title="Instagram post"
        />
      ) : (
        <div className="mono flex h-[560px] w-full items-center justify-center border border-line text-xs uppercase tracking-widest text-muted">
          loading feed…
        </div>
      )}
    </div>
  );
}
