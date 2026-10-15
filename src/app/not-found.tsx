import { ButtonLink } from "@/components/ui/button";
import { Grad, PageHero } from "@/components/ui/primitives";
import { Background } from "@/components/layout/background";
import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/* Rendered by the root layout (outside the (site) group), so it brings its own chrome. */
export default function NotFound() {
  return (
    <Providers>
      <Background />
      <SiteHeader />
      <main id="main" className="grid min-h-[60vh] flex-1 items-center">
        <PageHero
          eyebrow="error: 404"
          title={
            <>
              This page needs <Grad>a refactor.</Grad>
            </>
          }
          text="fatal: path not found in working tree"
        >
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/videos" size="lg" variant="ghost">
              Browse videos
            </ButtonLink>
          </div>
        </PageHero>
      </main>
      <SiteFooter />
    </Providers>
  );
}
