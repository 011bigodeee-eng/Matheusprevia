import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Target,
  Dumbbell,
  Flame,
  Activity,
  Repeat2,
} from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import {
  goals,
  emptyAnswers,
  type Answers,
  journeyMessage,
  whatsappUrl,
} from "../config/journey";
import Photo from "./Photo";
import { site } from "../config/site";
const icons = [Dumbbell, Flame, Activity, Repeat2];
export default function Journey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [notice, setNotice] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (moved.current) title.current?.focus({ preventScroll: true });
  }, [step]);
  const go = (value: number) => {
    moved.current = true;
    setStep(value);
  };
  const selected = [
    answers.goal !== null,
    !!answers.challenge,
    !!answers.days,
    !!answers.modality,
    true,
  ][step];
  const headings = [
    "Qual é o seu objetivo?",
    "O que mais dificulta seu caminho?",
    "Qual espaço o treino tem na sua semana?",
    "Como você prefere ser acompanhado?",
    answers.goal === 3
      ? "Seu próximo passo é construir constância."
      : "Seu próximo passo é dar direção à sua evolução.",
  ];
  const options =
    step === 0
      ? goals.map((g) => g.label)
      : step === 1
        ? goals[answers.goal ?? 3].challenges
        : step === 2
          ? ["2 dias", "3 dias", "4 dias", "5 ou mais dias"]
          : [
              "Consultoria online",
              "Treinamento presencial",
              "Quero entender as diferenças",
            ];
  const pick = (value: string, index: number) => {
    setNotice(false);
    setAnswers((a) =>
      step === 0
        ? { ...a, goal: index, challenge: a.goal === index ? a.challenge : "" }
        : {
            ...a,
            [step === 1 ? "challenge" : step === 2 ? "days" : "modality"]:
              value,
          },
    );
  };
  const active = (value: string, index: number) =>
    step === 0
      ? answers.goal === index
      : value ===
        (step === 1
          ? answers.challenge
          : step === 2
            ? answers.days
            : answers.modality);
  const send = () => {
    const url = whatsappUrl(site.contact.whatsapp, journeyMessage(answers));
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else setNotice(true);
  };
  return (
    <div className="section journey-section">
      <div className="section-top">
        <span className="eyebrow">
          <span />
          01 / SEU PONTO DE PARTIDA
        </span>
        <span className="small-note">
          FEITO PARA A SUA VIDA. NÃO O CONTRÁRIO.
        </span>
      </div>
      <div className="journey-intro">
        <h2>
          A SUA EVOLUÇÃO
          <br />
          COMEÇA <em>AQUI.</em>
        </h2>
        <p>
          Cada pessoa tem um ponto de partida.
          <br />
          Vamos entender o seu.
        </p>
      </div>
      <div className="journey-grid">
        <aside className={`journey-visual goal-${answers.goal ?? 3}`}>
          <Photo
            src={
              answers.goal === 1 || answers.goal === 2
                ? site.images.coach
                : site.images.hero
            }
            alt="Atleta em imagem ilustrativa de treinamento"
            loading="lazy"
            width="660"
            height="753"
          />
          <div className="visual-caption">
            <span className="eyebrow">UM PASSO DE CADA VEZ</span>
            <h3>{goals[answers.goal ?? 3].short}</h3>
            <p>{goals[answers.goal ?? 3].description}</p>
            {site.images.illustrative && (
              <span className="image-label">IMAGEM ILUSTRATIVA</span>
            )}
          </div>
        </aside>
        <div className="journey-panel">
          <div className="step-meta">
            <span>SEU PLANO COMEÇA COM VOCÊ</span>
            <span aria-live="polite">
              {String(step + 1).padStart(2, "0")} / 05
            </span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Progresso da jornada"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={5}
          >
            <span style={{ width: `${(step + 1) * 20}%` }} />
          </div>
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                onAnimationComplete={() => {
                  if (moved.current)
                    title.current?.focus({ preventScroll: true });
                }}
                key={step}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="step-body"
              >
                <h3 ref={title} tabIndex={-1}>
                  {headings[step]}
                </h3>
                {step < 4 ? (
                  <>
                    <p className="step-help">
                      {step === 2
                        ? "Quantos dias por semana você acredita conseguir reservar para treinar? Isso não é uma prescrição."
                        : "Selecione a opção que mais faz sentido para você."}
                    </p>
                    <div
                      className="options"
                      role="group"
                      aria-label={headings[step]}
                    >
                      {options.map((value, i) => {
                        const Icon = step === 0 ? icons[i] : Target;
                        return (
                          <button
                            key={value}
                            onClick={() => pick(value, i)}
                            aria-pressed={active(value, i)}
                            className={`option ${active(value, i) ? "selected" : ""}`}
                          >
                            <Icon size={20} />
                            <span>{value}</span>
                            <span className="radio">
                              {active(value, i) && <Check size={12} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="step-help">
                      Você quer {goals[answers.goal ?? 3].label.toLowerCase()} e
                      apontou: “{answers.challenge}”. Um planejamento
                      individualizado pode ajudar a organizar esse processo de
                      forma mais sustentável.
                    </p>
                    <dl className="answer-summary">
                      {[
                        ["Objetivo", goals[answers.goal ?? 3].label],
                        ["Seu desafio", answers.challenge],
                        ["Disponibilidade", `${answers.days} por semana`],
                        ["Acompanhamento", answers.modality],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="summary-note">
                      O próximo passo é conversar com o profissional para
                      avaliar necessidades, possibilidades e modalidade. Nenhum
                      treino é gerado por esta experiência.
                    </p>
                    <button className="button primary" onClick={send}>
                      {site.cta.journey}
                      <ArrowRight size={18} />
                    </button>
                    {notice && (
                      <p className="config-notice" role="status">
                        O WhatsApp oficial ainda não foi informado. Seu resumo
                        está aqui para consulta; nenhum dado foi enviado.
                      </p>
                    )}
                  </>
                )}
              </m.div>
            </AnimatePresence>
          </LazyMotion>
          <div className="journey-actions">
            {step > 0 ? (
              <button className="text-button" onClick={() => go(step - 1)}>
                <ArrowLeft size={16} /> Voltar
              </button>
            ) : (
              <span className="privacy-note">Sem cadastro. No seu ritmo.</span>
            )}
            {step < 4 ? (
              <button
                className="button primary"
                disabled={!selected}
                onClick={() => go(step + 1)}
              >
                Continuar <ArrowRight size={17} />
              </button>
            ) : (
              <button
                className="text-button"
                onClick={() => {
                  setAnswers(emptyAnswers);
                  setNotice(false);
                  go(0);
                }}
              >
                <RotateCcw size={15} /> Recomeçar
              </button>
            )}
          </div>
          <p className="privacy-note bottom-note">
            Suas respostas ficam apenas nesta página e só são enviadas se você
            abrir o WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
