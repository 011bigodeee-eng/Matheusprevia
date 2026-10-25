import { containDialogFocus } from "./dialogFocus";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["jornada", "Sua jornada"],
  ["metodo", "O método"],
  ["coach", "O coach"],
  ["servicos", "Acompanhamento"],
];
export function Brand({ onNavigate }: { onNavigate?: () => void } = {}) {
  return (
    <a
      onClick={onNavigate}
      className="brand"
      href="#inicio"
      aria-label="The Consistency Project, início"
    >
      <span className="brand-mark">//</span>
      <span>
        THE CONSISTENCY
        <br />
        <strong>PROJECT.</strong>
      </span>
    </a>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 32);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const el = dialog.current;
    const returnFocus = trigger.current;
    if (open) {
      el?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
        el?.close();
        returnFocus?.focus({ preventScroll: true });
      };
    }
  }, [open]);
  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <Brand />
        <nav aria-label="Navegação principal">
          {links.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#jornada">
          VAMOS COMEÇAR <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-trigger"
          ref={trigger}
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu />
        </button>
      </header>
      <dialog
        onKeyDown={containDialogFocus}
        ref={dialog}
        id="mobile-menu"
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        aria-label="Menu de navegação"
      >
        <div className="menu-top">
          <Brand onNavigate={() => setOpen(false)} />
          <button onClick={() => setOpen(false)} aria-label="Fechar menu">
            <X />
          </button>
        </div>
        <span className="eyebrow">CONTINUE EM MOVIMENTO</span>
        <nav>
          {links.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <a
          href="#jornada"
          onClick={() => setOpen(false)}
          className="button primary"
        >
          Começar minha evolução <ArrowUpRight size={18} />
        </a>
      </dialog>
    </>
  );
}
