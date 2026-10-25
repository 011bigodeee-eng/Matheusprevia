# The Consistency Project — Design System

## Contexto e decisões

Landing page de um profissional de treinamento, em React 19 + TypeScript + Vite + Tailwind 4. Conversão: entender a proposta, informar objetivo e disponibilidade, iniciar uma conversa no WhatsApp oficial.

Direção: **Editorial Grid / Magazine**, com fotografia em contexto e contraste esportivo. Sem cards repetidos em todas as seções, halos, gradientes decorativos, métricas fictícias ou excesso de microtexto.

## Pesquisa das skills

- `personal trainer editorial performance --design-system`: categoria General, inadequada como recomendação completa. Resultado não aplicado.
- `fitness gym training --design-system`: identificou Fitness/Gym App e Barlow Condensed. O segmento é relacionado, mas o produto é outro: descartar gamificação, planos automáticos, verde e laranja.
- `editorial magazine --domain style`: resultado ativo `editorial-grid-magazine`; adotar assimetria, hierarquia editorial, fotos grandes, ritmo de seções e adaptação mobile. Preservar as fontes e cores já exigidas pelo usuário.
- `keyboard focus multi step form --domain ux`: progresso, foco visível e foco não encoberto.
- `form state accessibility --stack react`: estado local e controles com identificação acessível.

Este documento sintetiza os resultados verificados com as exigências do projeto. Não apresenta a recomendação bruta de app fitness como se fosse adequada à landing page.

## Tokens e componentes

Fonte executável: `src/styles/tokens.css`, com três camadas. Escala de espaço de 4px, seções de 64–112px, corpo de 16px, texto secundário de 14px e rótulos de pelo menos 12px. Barlow Condensed + Manrope locais. Contraste AA para texto e foco visível nas superfícies escuras e claras.

Botões primários de 56px, controles de pelo menos 44px, bordas retas, seleção com marca e estado `aria-pressed`. Navegação mobile em dialog com Escape e foco contido. Evitar gestos ou hover como único caminho.

## Composição e comportamento

1. Hero: mensagem única, fotografia em quadro, CTA acima da fotografia no mobile.
2. Contexto: papel claro, nota editorial e situações de rotina; sem depoimento fictício.
3. Jornada: quatro perguntas + resumo, progresso, voltar preservando respostas, reiniciar, envio explícito.
4. Método: carrossel de quatro fases, com scroll-snap nativo, deslize, setas, indicadores diretos e teclado. Sem avanço automático; movimento reduzido usa transição imediata.
5. Perfil/serviços: dados verificáveis, modalidades claramente identificadas.
6. Relatos/conteúdos: estados curtos e honestos até receber dados autorizados.
7. FAQ e fechamento: respostas claras e próximo passo.

Movimento: entrada de 900–1200ms, transições de 280ms, revelações curtas por transform, sem bloquear a leitura. Movimento reduzido mostra o estado final. GSAP só para scroll; Motion só para troca das etapas.

## Validação de entrega

Build, lint, tipos, testes da jornada e navegador. Verificar 360/375/390/430/768/1024/1440/1920px, zoom de texto, contraste com axe, navegação por teclado, menu, fases, modalidades, ausência de erro de console e de overflow. Medir novamente o Lighthouse; números da primeira versão não validam esta revisão.
