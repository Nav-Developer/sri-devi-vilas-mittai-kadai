"use client";

import { usePathname } from "next/navigation";

/**
 * Wrap website-only parts (Navbar, Footer, LangToggle, StickyCTA...)
 * so they do not show on the /studio admin page.
 */
export default function HideOnStudio({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
