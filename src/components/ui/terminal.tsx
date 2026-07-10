import React from "react";
import { cn } from "@/lib/utils";

/** Yellow corner brackets — the signature frame detail of the design system. */
export function Corners({ className, subtle = false }: { className?: string; subtle?: boolean }) {
  const base = cn(
    "pointer-events-none absolute h-2.5 w-2.5 border-(--accent) transition-opacity duration-300",
    subtle ? "opacity-40 group-hover/panel:opacity-100" : "opacity-100",
    className,
  );
  return (
    <>
      <span aria-hidden className={cn(base, "left-[-1px] top-[-1px] border-l-2 border-t-2")} />
      <span aria-hidden className={cn(base, "right-[-1px] top-[-1px] border-r-2 border-t-2")} />
      <span aria-hidden className={cn(base, "bottom-[-1px] left-[-1px] border-b-2 border-l-2")} />
      <span aria-hidden className={cn(base, "bottom-[-1px] right-[-1px] border-b-2 border-r-2")} />
    </>
  );
}

/** Bordered panel with corner brackets. */
export function Panel({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/panel relative border border-line bg-[#0a0a08]/80",
        interactive && "transition-colors duration-300 hover:border-line-strong",
        className,
      )}
    >
      <Corners subtle={interactive} />
      {children}
    </div>
  );
}

/** Numbered section header: `01 // TITLE ………………… meta` */
export function SectionHeader({
  index,
  title,
  meta,
  className,
}: {
  index: string;
  title: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={cn("mono mb-10 flex items-baseline gap-3 border-b border-line pb-3", className)}>
      <span className="text-sm text-accent">{index}</span>
      <span className="text-sm text-muted">{"//"}</span>
      <h2 className="bitcount text-lg uppercase tracking-[0.25em] text-foreground md:text-xl">
        {title}
      </h2>
      {meta && <span className="ml-auto hidden text-xs text-muted sm:block">{meta}</span>}
    </div>
  );
}

/** Small monospace uppercase chip. */
export function Tag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        "mono inline-block border px-2 py-0.5 text-[11px] uppercase tracking-wider",
        accent ? "border-accent/60 text-accent" : "border-line text-muted",
      )}
    >
      {children}
    </span>
  );
}

/** Monospace label like `[STATUS]` used for tiny annotations. */
export function HudLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("mono text-[11px] uppercase tracking-[0.2em] text-muted", className)}>
      {children}
    </span>
  );
}
