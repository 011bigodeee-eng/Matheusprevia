import { containDialogFocus } from "./dialogFocus";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  Play,
  Plus,
  Quote,
} from "lucide-react";
import Photo from "./Photo";
import { site } from "../config/site";
const phases = [
  {
    name: "ENTENDER",
    title: "Antes do treino, a sua vida.",
    description:
      "Objetivos, experiência e rotina. O ponto de partida é entender quem você é e o que precisa.",
    detail: "ESCUTA + AVALIAÇÃO INICIAL",
    image: site.images.coach,
  },
  {
    name: "PLANEJAR",
    title: "Estratégia que cabe na rotina.",
    description:
      "Um planejamento de treinamento adequado ao seu contexto, à sua experiência e à sua disponibilidade.",
    detail: "CONTEXTO + DIREÇÃO",
    image: site.images.hero,
  },
  {
    name: "EXECUTAR",
    title: "Cada repetição tem um porquê.",
    description:
      "Orientação e acompanhamento conforme a modalidade contratada. Clareza para colocar o planejamento em prática.",
    detail: "TÉCNICA + ACOMPANHAMENTO",
    image: site.images.coach,
  },
  {
    name: "EVOLUIR",
    title: "O plano acompanha você.",
    description:
      "Monitoramento e ajustes para manter o processo coerente com a evolução e as mudanças na sua vida.",
    detail: "MONITORAMENTO + AJUSTES",
    image: site.images.hero,
  },
];
export function Hero() {
  return (
    <section className="hero campaign-hero" id="inicio">
      <div className="campaign-meta">
        <span>TREINAMENTO INDIVIDUALIZADO</span>
        <span>CONSTÂNCIA TRANSFORMA.</span>
      </div>
      <div className="hero-art campaign-photo">
        <Photo
          className="hero-image"
          src={site.images.hero}
          alt={site.images.heroAlt}
          width="1170"
          height="500"
          fetchPriority="high"
        />
        <div className="campaign-photo-caption">
          <span>O PRÓXIMO TREINO.</span>
          <span>
            {site.images.illustrative
              ? "FOTOGRAFIA DE REFERÊNCIA"
              : site.personal.name}
          </span>
        </div>
      </div>
      <div className="hero-content">
        <h1>
          <span className="hero-preface">VOCÊ NÃO PRECISA RECOMEÇAR.</span>
          <span className="hero-word">PRECISA</span>
          <em>CONTINUAR.</em>
        </h1>
        <div className="campaign-summary">
          <div>
            <p>
              Tem semana corrida. Tem dia sem vontade. O treino precisa levar
              isso em conta.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#jornada">
                {site.cta.primary}
                <ArrowUpRight size={20} />
              </a>
              <a className="hero-secondary" href="#metodo">
                Como funciona <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#constancia">
          <ArrowDown size={15} /> NÃO PRECISA SER PERFEITO. PRECISA SER
          POSSÍVEL.
        </a>
        <span>CONSTÂNCIA TRANSFORMA.</span>
      </div>
    </section>
  );
}
export function Manifesto() {
  return (
    <div className="field-strip">
      <span className="field-strip-title">UMA REGRA SIMPLES.</span>
      <p>
        Um treino ruim não apaga os anteriores.
        <br />
        <strong>Um dia perdido não precisa virar um mês.</strong>
      </p>
      <ArrowUpRight className="field-strip-mark" aria-hidden="true" />
    </div>
  );
}
export function Problem() {
  return (
    <section className="section problem notebook-section" id="constancia">
      <div className="problem-heading">
        <span className="eyebrow">ANOTAÇÃO 01 / A ROTINA REAL</span>
        <h2>
          O PLANO
          <br />
          ERA TREINAR.
          <br />
          <em>
            A VIDA
            <br />
            ACONTECEU.
          </em>
        </h2>
        <p>
          O trabalho esticou. Você dormiu mal. A academia ficou para amanhã.
          Você não é a única pessoa que passa por isso.
        </p>
        <a className="inline-link" href="#metodo">
          É aqui que o planejamento entra <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="notebook-right">
        <p className="notebook-note">
          Um plano que só funciona
          <br />
          na semana perfeita
          <br />
          <span>precisa de ajustes.</span>
        </p>
        <div className="problem-list">
          {[
            [
              "01",
              "Começar com tudo. Parar de novo.",
              "Quando o ritmo depende só da empolgação, qualquer imprevisto pesa mais.",
            ],
            [
              "02",
              "Treinar quando sobra tempo.",
              "A rotina não costuma abrir espaço sozinha. O planejamento precisa partir do tempo que você tem.",
            ],
            [
              "03",
              "Repetir sem saber se está evoluindo.",
              "Organizar, acompanhar e ajustar os treinos ajuda a decidir o próximo passo.",
            ],
          ].map(([n, t, d]) => (
            <article key={n} className="reveal problem-item">
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="notebook-signoff">
          O objetivo é encontrar um jeito de continuar.
        </div>
      </div>
    </section>
  );
}
export function Method() {
  const [phase, setPhase] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const go = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(phases.length - 1, index));
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      el.scrollTo({
        left: current.current * el.clientWidth,
        behavior: "instant",
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="section method" id="metodo">
      <div className="section-top">
        <span className="eyebrow">03 / O MÉTODO</span>
        <span className="small-note">SEM ATALHOS. COM DIREÇÃO.</span>
      </div>
      <h2>
        ENTENDER. PLANEJAR.
        <br />
        <em>FAZER. AJUSTAR.</em>
      </h2>
      <div
        className="method-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Fases do método"
      >
        <div
          id="method-slides"
          className="method-track"
          ref={track}
          tabIndex={0}
          aria-label="Use as setas do teclado ou deslize para mudar de fase"
          onScroll={() => {
            const el = track.current;
            if (!el?.clientWidth) return;
            const next = Math.max(
              0,
              Math.min(
                phases.length - 1,
                Math.round(el.scrollLeft / el.clientWidth),
              ),
            );
            current.current = next;
            setPhase(next);
          }}
          onKeyDown={(event) => {
            let next: number | undefined;
            if (event.key === "ArrowRight") next = phase + 1;
            if (event.key === "ArrowLeft") next = phase - 1;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = phases.length - 1;
            if (next !== undefined) {
              event.preventDefault();
              go(next);
            }
          }}
        >
          {phases.map((item, index) => (
            <article
              className="method-slide"
              key={item.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${phases.length}: ${item.name}`}
              aria-hidden={index !== phase}
            >
              <div className="method-photo">
                <Photo
                  src={item.image}
                  alt="Fotografia ilustrativa de treinamento"
                  width="660"
                  height="753"
                  loading="lazy"
                />
                <span className="method-watermark" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <div className="method-caption">
                <span className="eyebrow">{item.detail}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {site.images.illustrative && (
                  <span className="image-label">IMAGEM ILUSTRATIVA</span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="method-controls">
          <button
            onClick={() => go(phase - 1)}
            disabled={phase === 0}
            aria-label="Fase anterior"
            aria-controls="method-slides"
          >
            <ArrowLeft size={20} />
          </button>
          <span aria-live="polite" aria-atomic="true">
            0{phase + 1} / 04{" "}
            <span className="method-current-name">— {phases[phase].name}</span>
          </span>
          <button
            onClick={() => go(phase + 1)}
            disabled={phase === phases.length - 1}
            aria-label="Próxima fase"
            aria-controls="method-slides"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div
          className="method-pagination"
          role="group"
          aria-label="Escolher fase do método"
        >
          {phases.map((item, index) => (
            <button
              key={item.name}
              aria-label={`Ir para fase ${index + 1}: ${item.name}`}
              aria-current={index === phase ? "step" : undefined}
              aria-controls="method-slides"
              onClick={() => go(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.name}</strong>
              <span className="method-pagination-line" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Stories() {
  const [index, setIndex] = useState(0);
  const detail = useRef<HTMLDialogElement>(null);
  const story = site.stories[index];
  return (
    <section className="section stories" id="historias">
      <div className="section-top">
        <span className="eyebrow">
          <span />
          04 / HISTÓRIAS DE EVOLUÇÃO
        </span>
        <span className="small-note">CADA PESSOA TEM SEU PROCESSO.</span>
      </div>
      <div className="stories-layout">
        <div>
          <h2>
            EVOLUÇÃO
            <br />
            TEM <em>HISTÓRIA.</em>
          </h2>
          <p>
            Não é só sobre o que muda no espelho.
            <br />É sobre o que você consegue manter.
          </p>
        </div>
        {story ? (
          <article className="story-card">
            <Photo
              src={story.image}
              alt={`Fotografia autorizada de ${story.name}`}
              loading="lazy"
            />
            <Quote size={28} />
            <h3>{story.name}</h3>
            <p>{story.goal}</p>
            <button
              className="inline-link"
              onClick={() => detail.current?.showModal()}
            >
              Conhecer história <ArrowUpRight size={18} />
            </button>
            <div className="story-controls">
              <button
                onClick={() =>
                  setIndex(
                    (i) => (i - 1 + site.stories.length) % site.stories.length,
                  )
                }
                aria-label="História anterior"
              >
                <ArrowLeft />
              </button>
              <span>
                {index + 1} / {site.stories.length}
              </span>
              <button
                onClick={() => setIndex((i) => (i + 1) % site.stories.length)}
                aria-label="Próxima história"
              >
                <ArrowRight />
              </button>
            </div>
          </article>
        ) : (
          <div className="story-placeholder">
            <Quote size={32} />
            <span className="eyebrow">RELATOS DOS ALUNOS</span>
            <h3>
              Histórias de quem
              <br />
              continua.
            </h3>
            <p>
              Os relatos autorizados dos alunos ainda não foram adicionados.
              Este espaço está reservado para essas histórias.
            </p>
            <span className="status-pill">EM PREPARAÇÃO</span>
          </div>
        )}
      </div>
      <dialog
        onKeyDown={containDialogFocus}
        ref={detail}
        className="detail-dialog"
        aria-label="História de evolução"
        onClick={(e) => {
          if (e.target === e.currentTarget) detail.current?.close();
        }}
      >
        <button className="text-button" onClick={() => detail.current?.close()}>
          Fechar ×
        </button>
        {story && (
          <>
            <h3>{story.name}</h3>
            <p>{story.context}</p>
            <p>Acompanhamento: {story.duration}</p>
            <blockquote>{story.quote}</blockquote>
          </>
        )}
      </dialog>
    </section>
  );
}
export function Coach() {
  return (
    <section className="section coach" id="coach">
      <div className="coach-photo">
        <span className="coach-frame" />
        <Photo
          src={site.images.coach}
          alt="Retrato ilustrativo de atleta; não representa o personal responsável"
          loading="lazy"
          width="660"
          height="753"
        />
        <div className="coach-photo-label">
          <span className="blue-dot" /> ESCUTA ANTES DO PLANEJAMENTO
        </div>
        {site.images.illustrative && (
          <span className="image-label">FOTO DE REFERÊNCIA · TREINAMENTO</span>
        )}
      </div>
      <div className="coach-copy">
        <span className="eyebrow">
          <span />
          05 / CONHEÇA O COACH
        </span>
        <h2>
          ANTES DA FICHA,
          <br />
          <em>UMA CONVERSA.</em>
        </h2>
        {site.personal.name ? (
          <h3>
            {site.personal.name} <span>{site.personal.title}</span>
          </h3>
        ) : (
          <p className="profile-pending">
            PERFIL DO PROFISSIONAL EM PREPARAÇÃO
          </p>
        )}
        <p>
          {site.personal.biography ||
            "Quanto tempo você tem? O que já tentou? O que fez você parar? Antes de pensar em séries e repetições, essas perguntas precisam de resposta."}
        </p>
        {!site.personal.biography && (
          <p className="small-note">
            Biografia, formação e especialidades serão incluídas após validação
            pelo profissional.
          </p>
        )}
        {site.personal.qualifications.length > 0 && (
          <ul>
            {site.personal.qualifications.map((q) => (
              <li key={q}>
                <Check size={16} />
                {q}
              </li>
            ))}
          </ul>
        )}
        {site.personal.specialties.length > 0 && (
          <p>{site.personal.specialties.join(" · ")}</p>
        )}
        {site.personal.video && (
          <a
            className="inline-link"
            href={site.personal.video}
            target="_blank"
            rel="noreferrer"
          >
            <Play size={17} />
            Conheça minha história
          </a>
        )}
        {site.contact.instagram ? (
          <a
            href={site.contact.instagram}
            className="inline-link"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} /> Acompanhar no Instagram{" "}
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <a className="inline-link" href="#jornada">
            Conheça seu ponto de partida <ArrowUpRight size={18} />
          </a>
        )}
      </div>
    </section>
  );
}
export function Services() {
  const demo = !site.modalities.online && !site.modalities.presencial;
  const [mode, setMode] = useState<"online" | "presencial">(
    site.modalities.presencial && !site.modalities.online
      ? "presencial"
      : "online",
  );
  const online = mode === "online";
  const items = online
    ? [
        "Conversa inicial sobre objetivos e rotina",
        "Planejamento e orientações à distância",
        "Canal e frequência de contato a combinar",
        "Ajustes conforme o acompanhamento contratado",
      ]
    : [
        "Avaliação inicial e alinhamento de objetivos",
        "Orientação durante as sessões",
        "Local e disponibilidade a confirmar",
        "Ajustes conforme o acompanhamento contratado",
      ];
  return (
    <section className="section services" id="servicos">
      <div className="section-top">
        <span className="eyebrow">
          <span />
          06 / ACOMPANHAMENTO
        </span>
        <span className="small-note">ONLINE OU PRESENCIAL</span>
      </div>
      <div className="services-heading">
        <h2>
          QUAL ACOMPANHAMENTO
          <br />
          <em>CABE NA SUA VIDA?</em>
        </h2>
        <div
          className="tabs"
          role="group"
          aria-label="Modalidade de acompanhamento"
        >
          {(demo || site.modalities.online) && (
            <button aria-pressed={online} onClick={() => setMode("online")}>
              ONLINE <ArrowUpRight size={16} />
            </button>
          )}
          {(demo || site.modalities.presencial) && (
            <button
              aria-pressed={!online}
              onClick={() => setMode("presencial")}
            >
              PRESENCIAL <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="service-panel">
        <div className="service-photo">
          <Photo
            src={online ? site.images.hero : site.images.coach}
            alt={`Imagem ilustrativa de treinamento ${online ? "online" : "presencial"}`}
            loading="lazy"
            width="660"
            height="753"
          />
          {site.images.illustrative && (
            <span className="image-label">IMAGEM ILUSTRATIVA</span>
          )}
        </div>
        <div className="service-copy" key={mode}>
          <span className="eyebrow">
            {online ? "CONSULTORIA ONLINE" : "PERSONAL PRESENCIAL"}
          </span>
          <h3>
            {online
              ? "Acompanhamento\nà distância."
              : "Orientação durante\no seu treino."}
          </h3>
          <p>
            {online
              ? "Para quem procura orientação com flexibilidade e consegue executar os treinos com autonomia."
              : "Para quem busca orientação durante o treino e um acompanhamento presencial da execução."}
          </p>
          <ul>
            {items.map((t) => (
              <li key={t}>
                <Check size={17} />
                {t}
              </li>
            ))}
          </ul>
          <p className="availability">
            {site.modalities[mode]
              ? online
                ? "Consulte condições e disponibilidade."
                : `Região: ${site.personal.region || "a confirmar"}. Consulte horários.`
              : "Modalidade demonstrativa. Oferta e condições ainda precisam ser confirmadas pelo profissional."}
          </p>
          <a className="button primary" href="#jornada">
            Entender o acompanhamento <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Content() {
  return (
    <section className="section content-section" id="conteudo">
      <div className="section-top">
        <span className="eyebrow">
          <span />
          07 / DENTRO E FORA DA ACADEMIA
        </span>
        {site.contact.instagram && (
          <a
            className="inline-link"
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram <ArrowUpRight size={18} />
          </a>
        )}
      </div>
      <div className="content-heading">
        <h2>
          ALÉM DO <em>TREINO.</em>
        </h2>
        <p>
          Técnica, bastidores e a construção de uma rotina.
          <br />O processo também acontece fora da academia.
        </p>
      </div>
      {site.content.length ? (
        <div className="content-grid">
          {site.content.map((c) => (
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="content-card"
              key={c.url}
            >
              <Photo src={c.image} alt="" loading="lazy" />
              <span>{c.category}</span>
              <h3>{c.title}</h3>
              <Play />
            </a>
          ))}
        </div>
      ) : (
        <div className="content-empty">
          <div className="content-empty-icon">
            <Play size={28} />
          </div>
          <div>
            <span className="eyebrow">VÍDEOS E BASTIDORES</span>
            <h3>Publicações em preparação.</h3>
            <p>
              Os conteúdos oficiais do profissional serão reunidos aqui, com
              acesso às publicações originais.
            </p>
          </div>
          <span className="status-pill">EM PREPARAÇÃO</span>
        </div>
      )}
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section faq" id="duvidas">
      <div>
        <span className="eyebrow">
          <span />
          08 / PERGUNTAS FREQUENTES
        </span>
        <h2>
          ANTES DE
          <br />
          <em>COMEÇAR.</em>
        </h2>
        <p>
          Clareza também faz parte
          <br />
          de um bom começo.
        </p>
      </div>
      <div className="faq-items">
        {site.faq.map((f, i) => (
          <details key={f.question}>
            <summary>
              <span className="faq-number">0{i + 1}</span>
              {f.question}
              <Plus size={20} />
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <span className="eyebrow">SEM ESPERAR A SEGUNDA-FEIRA.</span>
      <h2>
        O PRÓXIMO TREINO
        <br />
        COMEÇA COM
        <br />
        <em>UMA CONVERSA.</em>
      </h2>
      <div className="final-bottom">
        <p>
          Conte como é a sua semana.
          <br />O que você quer mudar. O que tem sido difícil.
          <br />A conversa começa por aí.
        </p>
        <div>
          <a className="button primary" href="#jornada">
            Vamos conversar <ArrowUpRight size={19} />
          </a>
          <a className="inline-link" href="#duvidas">
            Ainda tenho dúvidas <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
