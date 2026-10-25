export const goals = [
  {
    label: "Ganhar massa muscular",
    short: "Força com direção.",
    description:
      "Mais do que aumentar a carga: construir uma evolução que respeite seu ponto de partida.",
    challenges: [
      "Não sei como progredir",
      "Tenho dificuldade com a alimentação e a rotina",
      "Falta organização nos treinos",
      "Preciso de orientação técnica",
    ],
  },
  {
    label: "Reduzir gordura corporal",
    short: "Um processo sustentável.",
    description:
      "Trocar os recomeços por um planejamento possível de manter, sem atalhos nem promessas.",
    challenges: [
      "Começo e paro frequentemente",
      "Minha rotina é muito corrida",
      "Não consigo manter uma rotina ativa",
      "Preciso de acompanhamento",
    ],
  },
  {
    label: "Melhorar condicionamento",
    short: "Mais fôlego para a vida.",
    description:
      "Construir capacidade aos poucos, com um processo adequado à sua experiência e rotina.",
    challenges: [
      "Sinto dificuldade para manter o ritmo",
      "Minha rotina é muito corrida",
      "Não sei por onde começar",
      "Preciso de orientação para progredir",
    ],
  },
  {
    label: "Criar constância",
    short: "O próximo treino importa.",
    description:
      "Você não precisa de uma rotina perfeita. Precisa de um plano que caiba na sua vida — e de direção para continuar.",
    challenges: [
      "Começo e paro frequentemente",
      "Minha rotina é muito corrida",
      "Não sei organizar meus treinos",
      "Preciso de orientação para manter o ritmo",
    ],
  },
];
export type Answers = {
  goal: number | null;
  challenge: string;
  days: string;
  modality: string;
};
export const emptyAnswers: Answers = {
  goal: null,
  challenge: "",
  days: "",
  modality: "",
};
export function journeyMessage(a: Answers) {
  return `Olá! Quero conversar sobre minha jornada.\nObjetivo: ${a.goal === null ? "A definir" : goals[a.goal].label}.\nPrincipal dificuldade: ${a.challenge}.\nDisponibilidade: ${a.days} por semana.\nModalidade: ${a.modality}.\nPodemos conversar sobre as possibilidades de acompanhamento?`;
}
export function whatsappUrl(phone: string, message: string) {
  const normalized = phone.replace(/\D/g, "");
  return /^\d{10,15}$/.test(normalized)
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
    : null;
}
