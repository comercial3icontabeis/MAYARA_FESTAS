import { makeMedia, type Media } from "./media";

/** TIPOS DE EVENTO — `slug` define a URL em /eventos/[slug]. */

export type EventType = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  photo: Media;
};

export const events: EventType[] = [
  {
    slug: "casamentos",
    title: "Casamentos",
    short: "Recepções, jantares e cerimônias",
    intro:
      "Louças, mobiliário, têxteis e peças decorativas para recepções de casamento — da mesa dos noivos ao lounge dos convidados.",
    photo: makeMedia("Recepção de casamento montada", "Recepção de casamento decorada", "linen"),
  },
  {
    slug: "aniversarios",
    title: "Aniversários",
    short: "De jantares íntimos a grandes festas",
    intro: "Composições para aniversários de todos os tamanhos, do jantar íntimo à festa completa.",
    photo: makeMedia("Mesa de aniversário adulto montada", "Mesa de aniversário decorada", "ember"),
  },
  {
    slug: "festas-infantis",
    title: "Festas infantis",
    short: "Delicadeza, cor e cuidado",
    intro: "Peças e mobiliário para festas infantis sofisticadas, com segurança e muito cuidado nos detalhes.",
    photo: makeMedia("Festa infantil sofisticada montada", "Festa infantil decorada", "blush"),
  },
  {
    slug: "corporativos",
    title: "Eventos corporativos",
    short: "Coquetéis, lançamentos e confraternizações",
    intro: "Estrutura e composição para coquetéis, lançamentos, confraternizações e eventos de empresa.",
    photo: makeMedia("Coquetel corporativo montado", "Coquetel corporativo", "stone"),
  },
  {
    slug: "chas-e-recepcoes",
    title: "Chás e recepções",
    short: "Encontros à tarde, mesas delicadas",
    intro: "Mesas postas e ambientes para chás de bebê, chás de panela, brunches e recepções.",
    photo: makeMedia("Mesa de chá montada à luz do dia", "Mesa posta para chá", "sage"),
  },
  {
    slug: "celebracoes-especiais",
    title: "Celebrações especiais",
    short: "Bodas, formaturas, batizados e mais",
    intro: "Bodas, formaturas, batizados, noivados e outros momentos que merecem uma composição especial.",
    photo: makeMedia("Celebração especial montada à noite", "Celebração especial decorada", "night"),
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
