# The Consistency Project

Landing page em português para acompanhamento de treinamento, com React 19, TypeScript, Vite e Tailwind CSS. Direção visual em carbono e azul elétrico; fontes Barlow Condensed e Manrope locais. CSS cuida da entrada do hero; GSAP/ScrollTrigger são carregados após a primeira tela para os efeitos de scroll. Motion cuida apenas das transições da jornada, carregada em um chunk separado.

## Executar

Requer Node.js 24 e npm 11 (Node 24 também executa os testes TypeScript sem transpiler).

```sh
npm ci --cache /tmp/matheus-npm-cache
npm run dev
```

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

## Configurar conteúdo real

Edite **`src/config/site.ts`**. O arquivo centraliza nome, título, biografia, qualificações, especialidades, WhatsApp, Instagram, região, modalidades confirmadas, fotos, vídeo, histórias autorizadas, conteúdos, FAQ, CTAs e SEO.

- WhatsApp: formato internacional com DDI/DDD, somente números, por exemplo o número oficial fornecido pelo cliente. Vazio impede abrir um contato incorreto e exibe um aviso claro.
- Instagram e vídeos: URLs oficiais HTTPS.
- `modalities`: marque apenas os serviços confirmados. Até lá, a interface os identifica como demonstrativos.
- `stories` e `content`: adicione somente registros reais e autorizados. Listas vazias exibem estados editoriais de preparação, sem depoimentos ou publicações fictícios.
- `seo.canonical` e `seo.image`: informe URLs absolutas após definir domínio e imagem social. Os metadados são inseridos no HTML pelo Vite; refaça o build após editar.
- Substitua fotos ilustrativas por imagens autorizadas em `public/assets/images`. Atualize `heroSrcSet`, `coachSrcSet`, `heroAlt` e `coachAlt`; marque `images.illustrative` como `false` após inserir fotos reais autorizadas. Consulte `docs/ASSETS.md`.
- Revise os textos de proposta, as respostas do FAQ, as condições e a região com o profissional antes da publicação. Nenhuma qualificação, resultado, preço ou política comercial foi inventada.

A jornada não prescreve treino. As respostas são mantidas em memória, não são persistidas nem transmitidas a analytics. O resumo só deixa a página quando o visitante abre o WhatsApp oficial.

## Interações

Jornada de cinco etapas com quatro objetivos, desafios próprios, seleção única, progresso, voltar, reiniciar e mensagem codificada. Menu modal com Escape, contenção nativa de foco e retorno ao botão. Fases do método por scroll no desktop e botões no mobile. Modalidades interativas, FAQ nativo e componentes de histórias/conteúdos que usam os dados reais quando configurados. Animações respeitam movimento reduzido.

## Testes de navegador

```sh
npx playwright install chromium
npm run test:browser
```

Se já houver Chromium no ambiente:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

Playwright inicia o servidor automaticamente. Os testes cobrem os quatro caminhos da jornada, voltar/reiniciar, ausência de contato, menu/Escape/foco, método, modalidade, FAQ, imagens e overflow em 360, 375, 390, 430, 768, 1024, 1440 e 1920 pixels. Também cobrem o link real de WhatsApp com número de teste, foco entre etapas e auditoria axe WCAG A/AA em desktop, mobile e menu aberto. Capturas ficam em `test-results/` (ignorado pelo Git).

## Publicação

`npm run build` gera `dist/`, para hospedagem estática. Não há backend, banco de dados, segredos ou serviço externo necessário à renderização. Nenhuma publicação é feita automaticamente. O envio para WhatsApp depende do contato oficial; a identidade final depende do conteúdo real do profissional.
