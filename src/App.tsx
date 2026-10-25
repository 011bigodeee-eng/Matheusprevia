import { lazy, Suspense, useEffect, useRef } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import Header, { Brand } from "./components/Header";
import {
  Hero,
  Manifesto,
  Problem,
  Method,
  Stories,
  Coach,
  Services,
  Content,
  FAQ,
  FinalCTA,
} from "./components/Sections";
import { site } from "./config/site";
const Journey = lazy(() => import("./components/Journey"));
export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    // Scroll enhancements load after the interactive first screen.
    const timer = window.setTimeout(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ default: gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const mm = gsap.matchMedia();
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const context = gsap.context(() => {
              gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
                gsap.from(el, {
                  y: 26,
                  duration: 0.7,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none reverse",
                  },
                }),
              );
              gsap.to(".scroll-progress", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: true },
              });
            }, root);
            return () => context.revert();
          });
          cleanup = () => mm.revert();
        })
        .catch(() => {
          /* Content and native navigation remain available without scroll enhancements. */
        });
    }, 700);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, []);
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <section id="jornada">
          <Suspense
            fallback={
              <div className="section journey-loading">
                <p role="status">Preparando sua jornada…</p>
              </div>
            }
          >
            <Journey />
          </Suspense>
        </section>
        <Problem />
        <Method />
        <Stories />
        <Coach />
        <Services />
        <Content />
        <FAQ />
        <FinalCTA />
      </main>
      <footer className="footer">
        <div className="footer-top">
          <Brand />
          <p>
            Constância transforma.
            <br />
            Um treino de cada vez.
          </p>
          <a href="#inicio" className="inline-link">
            Voltar ao início <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.brand}
          </span>
          <span>
            {site.personal.name
              ? "Treinamento com estratégia, acompanhamento e constância."
              : "Proposta demonstrativa · informações profissionais a confirmar."}
          </span>
          {site.contact.instagram && (
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram do profissional"
            >
              <Instagram size={18} />
            </a>
          )}
          <a href="#jornada">Sem rastreamento. Sem cadastro.</a>
        </div>
      </footer>
    </div>
  );
}
