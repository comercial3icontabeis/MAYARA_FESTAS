import { makeMedia, type Media } from "./media";

export type ProcessStep = { title: string; text: string; photo: Media };

export const processSteps: ProcessStep[] = [
  {
    title: "Você conta o que precisa",
    text: "Data, local, número de convidados e o clima que você imagina. Pode ser uma ideia solta — a gente ajuda a organizar.",
    photo: makeMedia("Conversa / atendimento com cliente", "Atendimento ao cliente", "linen"),
  },
  {
    title: "Escolhemos as peças",
    text: "Sugerimos itens do acervo que combinam entre si e com o seu evento.",
    photo: makeMedia("Seleção de peças no acervo", "Seleção de peças do acervo", "sand"),
  },
  {
    title: "Montamos a composição",
    text: "Mesas, louças, têxteis e decoração pensados como um conjunto, não como uma lista.",
    photo: makeMedia("Composição de mesa sendo testada", "Composição de mesa", "blush"),
  },
  {
    title: "Preparamos tudo",
    text: "As peças são separadas e conferidas antes de seguir para o seu evento.",
    photo: makeMedia("Peças embaladas / conferidas para entrega", "Preparação das peças", "stone"),
  },
  {
    title: "Sua celebração acontece",
    text: "Você recebe seus convidados num ambiente pronto para ser lembrado.",
    photo: makeMedia("Evento pronto com convidados", "Celebração acontecendo", "ember"),
  },
];
