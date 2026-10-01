import { photo, type Media } from "./media";

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
    photo: photo("evento-casamentos", "Recepção de casamento montada", "Recepção de casamento decorada", "4:5", "linen"),
  },
  {
    slug: "aniversarios",
    title: "Aniversários",
    short: "De jantares íntimos a grandes festas",
    intro: "Composições para aniversários de todos os tamanhos, do jantar íntimo à festa completa.",
    photo: photo("evento-aniversarios", "Mesa de aniversário montada", "Decoração de 15 anos em azul-marinho e dourado com tema de lua e estrelas, painéis em arco, balões e números em neon", "4:5", "wine"),
  },
  {
    slug: "festas-infantis",
    title: "Festas infantis",
    short: "Delicadeza, cor e cuidado",
    intro: "Peças e mobiliário para festas infantis sofisticadas, com segurança e muito cuidado nos detalhes.",
    photo: photo("evento-festas-infantis", "Festa infantil sofisticada montada", "Decoração de 1 ano com tema de borboletas em lilás, rosa e verde, painéis em arco, arco de balões, bolo e número 1", "4:5", "petal"),
  },
  {
    slug: "corporativos",
    title: "Eventos corporativos",
    short: "Coquetéis, lançamentos e confraternizações",
    intro: "Estrutura e composição para coquetéis, lançamentos, confraternizações e eventos de empresa.",
    photo: photo("evento-corporativos", "Coquetel corporativo montado", "Coquetel corporativo", "4:5", "stone"),
  },
  {
    slug: "chas-e-recepcoes",
    title: "Chás e recepções",
    short: "Encontros à tarde, mesas delicadas",
    intro: "Mesas postas e ambientes para chás de bebê, chás de panela, brunches e recepções.",
    photo: photo("evento-chas-e-recepcoes", "Mesa de chá montada à luz do dia", "Mesa posta para chá", "4:5", "sage"),
  },
  {
    slug: "celebracoes-especiais",
    title: "Celebrações especiais",
    short: "Bodas, formaturas, batizados e mais",
    intro: "Bodas, formaturas, batizados, noivados e outros momentos que merecem uma composição especial.",
    photo: photo("evento-celebracoes-especiais", "Celebração especial montada à noite", "Celebração especial decorada", "4:5", "night"),
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
