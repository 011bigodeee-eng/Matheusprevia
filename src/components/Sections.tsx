import { containDialogFocus } from "./dialogFocus";
import { useEffect, useRef, useState } from "react";
import {
  Asterisk,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  Play,
  Plus,
  Quote,
  MoveUpRight,
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
    <section className="hero" id="inicio">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-art">
        <span className="hero-ring" />
        <span className="vertical-label">DISCIPLINA É LIBERDADE.</span>
        <span className="hero-ghost" aria-hidden="true">
          CONTINUE.
        </span>
        <Photo
          className="hero-image"
          src={site.images.hero}
          alt="Fotografia ilustrativa de atleta com halteres; substituir pela foto do personal"
          width="660"
          height="753"
          fetchPriority="high"
        />
        {site.images.illustrative && (
          <span className="photo-credit">
            FOTOGRAFIA ILUSTRATIVA / IDENTIDADE EM CONSTRUÇÃO
          </span>
        )}
        <div className="hero-art-tag">
          <span className="blue-dot" /> MENOS RECOMEÇOS.
          <br />
          <strong>MAIS CONSTÂNCIA.</strong>
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="short-line" /> TREINAMENTO COM PROPÓSITO
        </div>
        <h1>
          VOCÊ NÃO
          <br />
          PRECISA
          <br />
          RECOMEÇAR.
          <br />
          <em>
            PRECISA
            <br />
            CONTINUAR.
          </em>
        </h1>
        <p>
          Treinamento com estratégia, acompanhamento e um método que se adapta à
          sua rotina. Porque evolução de verdade se constrói com constância.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#jornada">
            {site.cta.primary}
            <ArrowUpRight size={20} />
          </a>
          <a className="hero-secondary" href="#metodo">
            Conhecer o método <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#jornada">
          <span className="scroll-icon">
            <ArrowDown size={15} />
          </span>{" "}
          A EVOLUÇÃO É UM PROCESSO. COMECE O SEU.
        </a>
        <span>ESTRATÉGIA. ACOMPANHAMENTO. CONSTÂNCIA.</span>
      </div>
    </section>
  );
}
export function Manifesto() {
  return (
    <div className="manifesto-strip">
      <span>CONSTÂNCIA TRANSFORMA</span>
      <Asterisk className="strip-star" aria-hidden="true" />
      <span>UM TREINO DE CADA VEZ</span>
      <Asterisk className="strip-star" aria-hidden="true" />
      <span>CONSTÂNCIA TRANSFORMA</span>
      <Asterisk className="strip-star" aria-hidden="true" />
    </div>
  );
}
export function Problem() {
  return (
    <section className="section problem" id="constancia">
      <div className="problem-heading">
        <span className="eyebrow">
          <span />
          02 / ALÉM DA MOTIVAÇÃO
        </span>
        <h2>
          COMEÇAR
          <br />É FÁCIL.
          <br />
          <span className="muted-heading">CONTINUAR</span>
          <br />É O DESAFIO.
        </h2>
        <p>
          Você conhece a sensação. O primeiro dia, a energia lá em cima. Algumas
          semanas depois, a vida acontece.
        </p>
        <a className="inline-link" href="#metodo">
          Existe um caminho mais sustentável <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="problem-list">
        {[
          [
            "01",
            "O impulso passa.",
            "Você começa com tudo, treina por algumas semanas e, aos poucos, perde o ritmo.",
          ],
          [
            "02",
            "A rotina não espera.",
            "Um plano que ignora a sua vida vira mais uma cobrança — e não um hábito.",
          ],
          [
            "03",
            "Esforço precisa de direção.",
            "Sem saber como progredir ou organizar os treinos, fica difícil enxergar o próximo passo.",
          ],
        ].map(([n, t, d]) => (
          <article key={n} className="reveal problem-item">
            <span>{n}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
            <MoveUpRight size={22} />
          </article>
        ))}
        <div className="problem-conclusion">
          <span className="blue-dot" />
          <p>
            A resposta não é se cobrar mais.
            <br />
            <strong>É construir um processo possível.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
export function Method() {
  const [phase, setPhase] = useState(0);
  const steps = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth < 900) return;
        for (const e of entries)
          if (e.isIntersecting)
            setPhase(Number((e.target as HTMLElement).dataset.phase));
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0 },
    );
    steps.current
      ?.querySelectorAll("[data-phase]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="section method" id="metodo">
      <div className="section-top">
        <span className="eyebrow">
          <span />
          03 / O MÉTODO
        </span>
        <span className="small-note">SEM ATALHOS. COM DIREÇÃO.</span>
      </div>
      <h2>
        RESULTADO NÃO É SORTE.
        <br />É <em>PROCESSO.</em>
      </h2>
      <div className="method-grid">
        <div className="method-visual">
          <span className="method-watermark" aria-hidden="true">
            0{phase + 1}
          </span>
          <Photo
            key={phases[phase].image}
            src={phases[phase].image}
            alt="Fotografia ilustrativa de treinamento"
            width="660"
            height="753"
            loading="lazy"
          />
          <div className="method-caption">
            <span className="eyebrow">{phases[phase].detail}</span>
            <h3>{phases[phase].title}</h3>
            <p>{phases[phase].description}</p>
            {site.images.illustrative && (
              <span className="image-label">IMAGEM ILUSTRATIVA</span>
            )}
          </div>
          <div className="method-mobile-controls">
            <button
              onClick={() => setPhase((p) => Math.max(0, p - 1))}
              disabled={phase === 0}
              aria-label="Fase anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <span>0{phase + 1} / 04</span>
            <button
              onClick={() => setPhase((p) => Math.min(3, p + 1))}
              disabled={phase === 3}
              aria-label="Próxima fase"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div ref={steps} className="method-steps">
          {phases.map((p, i) => (
            <article
              data-phase={i}
              className={phase === i ? "active" : ""}
              key={p.name}
            >
              <button onClick={() => setPhase(i)} aria-pressed={phase === i}>
                <span>0{i + 1}</span>
                <h3>{p.name}</h3>
                <ArrowUpRight />
              </button>
              <p>{p.description}</p>
              <div className="phase-line" />
            </article>
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
        <span className="small-note">PESSOAS REAIS. PROCESSOS DIFERENTES.</span>
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
            <span className="eyebrow">ESPAÇO RESERVADO A HISTÓRIAS REAIS</span>
            <h3>
              Cada processo merece
              <br />
              ser contado com verdade.
            </h3>
            <p>
              Os relatos serão publicados aqui somente com autorização dos
              alunos. Nenhum resultado ou depoimento fictício.
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
          <span className="blue-dot" /> A PESSOA POR TRÁS DO PROCESSO
        </div>
        {site.images.illustrative && (
          <span className="image-label">RETRATO ILUSTRATIVO · SUBSTITUIR</span>
        )}
      </div>
      <div className="coach-copy">
        <span className="eyebrow">
          <span />
          05 / CONHEÇA O COACH
        </span>
        <h2>
          NÃO É SOBRE
          <br />
          TREINAR MAIS.
          <br />É SOBRE TREINAR
          <br />
          <em>COM DIREÇÃO.</em>
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
            "Um bom acompanhamento começa com escuta. Entender sua rotina, respeitar seu ponto de partida e dar um propósito a cada etapa: essa é a filosofia desta proposta."}
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
        <span className="small-note">
          PERTO DO SEU OBJETIVO. DENTRO DA SUA ROTINA.
        </span>
      </div>
      <div className="services-heading">
        <h2>
          SEU TREINO.
          <br />
          <em>SEU CONTEXTO.</em>
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
            {online
              ? "DIREÇÃO, ONDE VOCÊ ESTIVER"
              : "PRESENÇA EM CADA REPETIÇÃO"}
          </span>
          <h3>
            {online
              ? "A distância muda.\nO propósito, não."
              : "Técnica de perto.\nEvolução com direção."}
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
            <span className="eyebrow">
              CONTEÚDO REAL, SEM PUBLICAÇÕES INVENTADAS
            </span>
            <h3>O próximo capítulo vem da vida real.</h3>
            <p>
              Vídeos de execução, bastidores e conversas sobre constância serão
              adicionados com os links oficiais do profissional.
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
          08 / SEM PONTAS SOLTAS
        </span>
        <h2>
          DÚVIDAS?
          <br />
          <em>VAMOS LÁ.</em>
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
      <Photo
        className="final-portrait"
        src={site.images.hero}
        alt=""
        loading="lazy"
        width="660"
        height="753"
      />
      <span className="eyebrow">
        <span />O PRÓXIMO PASSO É SEU.
      </span>
      <h2>
        A MOTIVAÇÃO OSCILA.
        <br />
        <em>
          O MÉTODO TE MANTÉM
          <br />
          EM MOVIMENTO.
        </em>
      </h2>
      <div className="final-bottom">
        <p>
          Não espere pela rotina perfeita. Descubra como construir um processo
          de treinamento que faça sentido para você.
        </p>
        <div>
          <a className="button primary" href="#jornada">
            Quero começar <ArrowUpRight size={19} />
          </a>
          <a className="inline-link" href="#duvidas">
            Tirar minhas dúvidas <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
