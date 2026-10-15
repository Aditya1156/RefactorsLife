"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { SearchButton } from "./command-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so it closes itself after navigation.
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuOpen = menuFor === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="fixed -top-12 left-4 z-100 rounded-lg bg-accent px-3.5 py-2 text-white focus:top-3">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 py-2.5 md:py-3" style={{ viewTransitionName: "site-header" }}>
        <div className="container-rl">
          <div
            className={cn(
              "flex h-14 items-center gap-5 rounded-full border border-white/85 pr-2 pl-3.5 backdrop-blur-xl backdrop-saturate-180 transition-all duration-300 md:h-15 md:pr-2.5 md:pl-4.5",
              scrolled ? "bg-white/80 shadow-glass" : "bg-white/62 shadow-glass-sm",
            )}
          >
            <Logo />
            <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
              {site.nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[14.5px] transition-colors xl:px-3.5",
                    isActive(n.href) ? "bg-accent/8 text-accent" : "text-fg-soft hover:bg-slate-900/4 hover:text-fg",
                  )}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <SearchButton />
              <a
                href={site.channel.subscribe}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "dark", size: "sm", className: "hidden md:inline-flex" })}
              >
                <YouTubeIcon className="yt" />
                Subscribe
              </a>
              <button
                type="button"
                onClick={() => setMenuFor(menuOpen ? null : pathname)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid size-10 place-items-center rounded-full border border-line bg-white/60 text-fg-soft lg:hidden"
              >
                {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute inset-x-4 top-[calc(100%-2px)] flex animate-pop flex-col rounded-3xl bg-white/90! px-4.5 pt-2 pb-4.5 shadow-glass-lg glass lg:hidden"
          >
            {[{ href: "/", label: "Home" }, ...site.nav].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn("border-b border-line px-1 py-3.25 text-[17px]", isActive(n.href) && n.href !== "/" && "text-accent")}
              >
                {n.label}
              </Link>
            ))}
            {[
              { href: "/team", label: "Team" },
              { href: "/collab", label: "Work with us" },
            ].map((n) => (
              <Link key={n.href} href={n.href} className={cn("border-b border-line px-1 py-3.25 text-[17px]", isActive(n.href) && "text-accent")}>
                {n.label}
              </Link>
            ))}
            <a
              href={site.channel.subscribe}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "dark", className: "mt-3.5" })}
            >
              <YouTubeIcon className="yt" />
              Subscribe on YouTube
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
