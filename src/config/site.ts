export const site = {
  brand: "THE CONSISTENCY PROJECT",
  personal: {
    name: "",
    title: "Personal trainer",
    biography: "",
    qualifications: [] as string[],
    specialties: [] as string[],
    region: "",
    video: "",
  },
  contact: { whatsapp: "", instagram: "" },
  modalities: { online: false, presencial: false },
  images: {
    hero: "/assets/images/training-1170.webp",
    coach: "/assets/images/practice.webp",
    heroSrcSet:
      "/assets/images/training-600.webp 600w, /assets/images/training-1170.webp 1170w",
    coachSrcSet: "/assets/images/practice.webp 416w",
    heroAlt:
      "Fotografia de referência de um atleta durante uma série na barra fixa",
    coachAlt:
      "Fotografia de referência de uma atleta em um exercício com barra",
    illustrative: true,
  },
  stories: [] as {
    name: string;
    goal: string;
    context: string;
    duration: string;
    quote: string;
    image: string;
  }[],
  content: [] as {
    title: string;
    category: string;
    image: string;
    url: string;
  }[],
  cta: {
    primary: "Vamos falar do meu treino",
    journey: "Conversar sobre minha jornada",
  },
  seo: {
    title: "The Consistency Project — Constância transforma",
    description:
      "Treinamento com estratégia, acompanhamento e um método que se adapta à sua rotina. Constância transforma.",
    canonical: "",
    image: "",
  },
  faq: [
    {
      question: "Preciso já ter experiência na academia?",
      answer:
        "Seu ponto de partida faz parte da conversa inicial. Conte sobre sua experiência, seus objetivos e suas necessidades para avaliar o acompanhamento adequado.",
    },
    {
      question: "Como funciona o acompanhamento?",
      answer:
        "A proposta é entender sua rotina, planejar o treinamento e acompanhar a evolução. Frequência de contato, ferramentas e condições devem ser confirmadas com o profissional antes da contratação.",
    },
    {
      question: "A consultoria é personalizada?",
      answer:
        "A proposta apresentada aqui é de planejamento individualizado. A avaliação profissional é necessária para definir o que faz sentido para você. Serviços disponíveis ainda precisam ser confirmados.",
    },
    {
      question: "Posso treinar com uma rotina corrida?",
      answer:
        "A disponibilidade é um ponto de partida para o planejamento. Na conversa inicial, explique os dias e horários que consegue reservar. A jornada deste site não prescreve treinos.",
    },
    {
      question: "Como são feitos os ajustes?",
      answer:
        "Os ajustes devem considerar sua resposta ao treinamento e as mudanças na rotina. O formato e a periodicidade serão definidos na modalidade contratada.",
    },
    {
      question: "Qual a diferença entre online e presencial?",
      answer:
        "No online, o acompanhamento acontece à distância. No presencial, há orientação durante a sessão. Disponibilidade, local e detalhes de cada serviço precisam ser confirmados.",
    },
    {
      question: "Como começo?",
      answer:
        "Responda à jornada para organizar seus objetivos. Quando o contato oficial estiver configurado, você poderá enviar esse resumo ao profissional pelo WhatsApp.",
    },
  ],
};
