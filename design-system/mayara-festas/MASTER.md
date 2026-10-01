# Mayara Festas — Design System (MASTER)

Fonte da verdade visual do site. Páginas específicas podem ter overrides em `pages/<pagina>.md`.

Referências: skills `frontend-design` (processo, anti-padrões) e `ui-ux-pro-max`
(base local — produto #39 *Wedding/Event Planning*, #62 *Florist*; tipografia #50 *Luxury Minimalist*;
landing *Scroll-Triggered Storytelling*; UX #9, #19, #38, #43/#54, #46/#47, #99, #108; Next.js #17–#24, #40).

## Assunto, público, função

- **Assunto:** locação e fornecimento de peças e decoração para festas (mesas, louças, painéis, mobiliário, têxteis).
- **Público:** famílias planejando aniversários e festas infantis, noivos, empresas — na cidade da empresa.
- **Função da página:** fazer a pessoa imaginar a própria festa *a partir das fotos reais das decorações da Mayara*
  e pedir orçamento pelo WhatsApp.

## Cor

| Nome | Hex | Uso |
|---|---|---|
| Papel rosé | `#F7EFEC` | fundo principal |
| Rosa seco | `#E9D3CC` | superfícies alternadas, placeholders claros |
| Vinho | `#3B1D29` | texto, botões, linhas |
| Vinho noite | `#2A141E` | seções escuras (hero sem foto, processo, CTA final, rodapé) |
| Folha | `#8C9879` | marcadores pequenos (etiquetas da composição, pontos da timeline) |
| Ouro velho | `#B0894A` | detalhes não textuais: foco, fios finos, hover |

Origem: a paleta da base para eventos/casamento (rosa + dourado + creme + sálvia), dessaturada e ancorada
em vinho — a cor do brinde — em vez de rosa-chiclete (que leria como loja infantil, vetado no briefing).

## Tipografia

- **Bodoni Moda** (display, eixo óptico): títulos. Didone de alto contraste — a linguagem gráfica de convite
  de festa impresso. Peso 400–500. Itálico só em linhas inteiras (depoimentos), nunca numa palavra isolada.
- **Jost** (interface e texto): 400/500. Geométrica, contraste claro com a Bodoni.
- Caixa normal em todo o site. Única exceção: o rótulo `[ CELEBRAÇÕES ]` do hero, exigido pelo briefing.
- Escala: 1.0625rem corpo · 1.4rem lead · 2.4rem h3 · até 5.6rem h2 · até 9.5rem h1. Linhas ≤ 70 caracteres.

## Elemento memorável: o arco

O painel em arco (arco romano / painel redondo) é a peça-símbolo da decoração de festa brasileira atual.
Ele é o único gesto ousado do site:

- no manifesto, a foto **nasce dentro de um arco** e se abre até ocupar a tela conforme a rolagem;
- na seção de eventos, a prévia das fotos fica emoldurada em arco.

Todo o resto é retangular, sem cantos arredondados, sem cards, sem sombras.

## Layout

```
HERO (foto da festa em tela cheia)            MANIFESTO (sticky)
┌───────────────────────────────────────┐     ┌───────────────────────────────┐
│ logo                       nav  [CTA] │     │ Não é sobre                   │
│                                       │     │ alugar objetos.   ╭───────╮   │
│ [ CELEBRAÇÕES ]                       │     │                   │  foto │ → │ arco abre
│ A festa                               │     │ É sobre criar...  │       │   │ até a tela
│ começa nos           subtítulo        │     │                   └───────┘   │
│ detalhes.            [criar] [acervo] │     └───────────────────────────────┘
└───────────────────────────────────────┘
```

- Alinhamento à esquerda, composições assimétricas em grade de 12 colunas.
- Fotografia em tamanho generoso; texto curto ao lado, nunca em blocos longos.

## Fotografia (prioridade do projeto)

- Cada espaço de foto tem um **slot** com nome de arquivo fixo. Basta salvar a foto em `public/fotos/<slot>.jpg`
  — o site detecta sozinho (`npm run fotos` roda automaticamente antes de `dev`/`build`).
- Galeria: qualquer foto em `public/fotos/galeria/` entra no portfólio automaticamente.
- Sem foto, o espaço mostra um placeholder com o nome do arquivo esperado e a proporção recomendada.
- Next Image (`fill` + `sizes`), AVIF/WebP, lazy loading; `priority` só no hero (UX #46/#47, Next.js #17–#21).

## Movimento

O briefing pede motion design real; ele vence a regra genérica de "movimento mínimo". Ainda assim:
- uma orquestração por seção, nunca fade-up genérico em todo título;
- tudo dentro de `gsap.matchMedia()`; com `prefers-reduced-motion` o conteúdo aparece no estado final (UX #9, #99);
- carrossel de depoimentos com controles e pausa em hover/foco (UX #108).

## Anti-padrões evitados (revisão do plano)

| Default genérico | Decisão para este briefing |
|---|---|
| Creme + serifa + terracota | Papel rosé + vinho + folha/ouro, vindos da decoração de festa |
| Rótulo em CAIXA ALTA acima de cada título | Removidos; só o `[ CELEBRAÇÕES ]` do briefing |
| Uma palavra em itálico/cor no título | Títulos inteiros num só tratamento |
| `→` em todo botão/link | Removido; botões dizem a ação ("Solicitar orçamento") |
| Numeração 01/02 decorativa | Só onde há sequência real (processo) ou o briefing pede (acervo, portfólio) |
| Contorno gigante do nome no rodapé | Removido (Chanel: tirar um acessório) |
