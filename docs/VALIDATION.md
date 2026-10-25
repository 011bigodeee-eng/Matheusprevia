# Validação — revisão editorial com as skills

Ambiente: Node.js 24.19.0, npm 11.9.0, Linux e Chromium disponível em `/usr/bin/chromium`.

## Verificações executadas

- Instalação reproduzível com `npm ci --cache /tmp/matheus-npm-cache --no-audit --no-fund`: aprovada.
- `npm run lint`: aprovado, sem avisos.
- `npm run typecheck`: aprovado.
- `npm test`: 3 testes aprovados, nenhum ignorado. Objetivos/desafios, codificação da mensagem com acentos e ausência de links para contatos inválidos.
- `npm run build`: aprovado; aplicação estática gerada em `dist/`.
- `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser`: 6 testes aprovados, nenhum ignorado. As verificações incluem os quatro objetivos e todas as etapas, voltar preservando respostas, reiniciar, contato ausente, WhatsApp configurado por interceptação apenas no teste, teclado e foco, menu/Escape, método, modalidades, FAQ, imagens, texto ampliado para 200%, foco abaixo do header e ausência de erros de execução.
- O teste de WhatsApp captura a chamada a `window.open`, valida o número e a mensagem completa; não envia mensagem nem navega para um contato real.
- Responsividade: ausência de overflow horizontal em 360, 375, 390, 430, 768, 1024, 1440 e 1920 pixels. Capturas e inspeção visual em desktop e mobile.
- axe WCAG 2 A/AA e 2.1 AA: nenhuma violação automática em desktop, mobile com movimento reduzido e menu aberto. Testada a circulação do foco com Tab e o retorno ao botão ao fechar.

## Lighthouse de produção

Medição refeita após a revisão visual e dos componentes. Uma execução local com Lighthouse 13.5.0, build de produção servido com `npm run preview`, perfil mobile padrão, latência de 150 ms, taxa de 1638,4 Kbps e redução de CPU de 4×:

| Indicador      | Resultado |
| -------------- | --------- |
| Performance    | 93/100    |
| Acessibilidade | 100/100   |
| Boas práticas  | 100/100   |
| SEO            | 100/100   |
| FCP            | 2,4 s     |
| LCP            | 2,8 s     |
| TBT            | 30 ms     |
| CLS            | 0         |

Os resultados são de laboratório e variam por execução, hospedagem, rede e fotos definitivas. O LCP ainda ficou acima da meta ideal de 2,5 s. TBT não é uma medição de INP em campo. A auditoria automatizada não substitui uma revisão com tecnologias assistivas.

## Aplicação das skills

As decisões de pesquisa, os resultados descartados e as adaptações à marca estão registrados em `design-system/consistency-project/MASTER.md`. A voz e a composição estão em `docs/brand-guidelines.md`. Os tokens executáveis estão em `src/styles/tokens.css`.

Esta revisão retirou os atletas recortados, consolidou o CSS, ampliou os textos, reorganizou as composições e preservou a jornada, sem gerar planos de treino automáticos nem inventar dados do profissional.

## Pendências de conteúdo e publicação

Configure o profissional, qualificações verificadas, serviços, região, contatos oficiais, imagens autorizadas, conteúdos e histórias reais em `src/config/site.ts`. Os placeholders são identificados na interface. O botão final da jornada explica a falta do WhatsApp enquanto não existir contato oficial.

Vídeo do profissional e histórias reais não foram fornecidos. Os componentes aceitam esses dados; a navegação da galeria com dados reais ainda precisa ser revisada após incluí-los.

Os testes de navegador usaram Chromium. Não foram executados em Safari/iOS ou Chrome Android físicos. O site e o snapshot do ambiente não foram publicados automaticamente. As instruções `install_script` e `start_skill` foram salvas em rascunho nas configurações do ambiente para revisão e publicação pelo usuário.
