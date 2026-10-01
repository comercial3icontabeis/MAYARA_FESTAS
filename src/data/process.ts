import { photo, type Media } from "./media";

export type ProcessStep = { title: string; text: string; photo: Media };

export const processSteps: ProcessStep[] = [
  {
    title: "Você conta o que precisa",
    text: "Data, local, número de convidados e o clima que você imagina. Pode ser uma ideia solta — a gente ajuda a organizar.",
    photo: photo("etapa-1", "Conversa / atendimento com cliente", "Atendimento ao cliente", "4:3", "linen"),
  },
  {
    title: "Escolhemos as peças",
    text: "Sugerimos itens do acervo que combinam entre si e com o seu evento.",
    photo: photo("etapa-2", "Seleção de peças no acervo", "Seleção de peças do acervo", "4:3", "rose"),
  },
  {
    title: "Montamos a composição",
    text: "Mesas, louças, têxteis e decoração pensados como um conjunto, não como uma lista.",
    photo: photo("etapa-3", "Composição de mesa sendo testada", "Composição de mesa", "4:3", "petal"),
  },
  {
    title: "Preparamos tudo",
    text: "As peças são separadas e conferidas antes de seguir para o seu evento.",
    photo: photo("etapa-4", "Peças embaladas / conferidas para entrega", "Preparação das peças", "4:3", "stone"),
  },
  {
    title: "Sua celebração acontece",
    text: "Você recebe seus convidados num ambiente pronto para ser lembrado.",
    photo: photo("etapa-5", "Evento pronto com convidados", "Celebração acontecendo", "4:3", "wine"),
  },
];
