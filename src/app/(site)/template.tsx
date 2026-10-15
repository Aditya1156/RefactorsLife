import { ViewTransition, type ReactNode } from "react";

/*
 * Templates remount on every navigation, so this ViewTransition plays a short
 * fade-and-rise between pages (styles in globals.css). The header stays put.
 */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
