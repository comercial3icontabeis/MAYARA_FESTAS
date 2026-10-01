import { photo, type Media } from "./media";

/**
 * CATEGORIAS DO ACERVO
 * ------------------------------------------------------------------
 * Ordem, nomes, textos e fotos são configuráveis.
 * `slug` define a URL em /acervo/[slug].
 * `items` lista produtos reais — deixe vazio até ter o catálogo.
 */

export type CollectionItem = { name: string; description?: string; photo?: Media };

export type Collection = {
  slug: string;
  title: string;
  /** Frase curta usada na rolagem horizontal. */
  tagline: string;
  /** Texto da página da categoria (SEO local natural). */
  intro: string;
  photo: Media;
  items: CollectionItem[];
};

export const collections: Collection[] = [
  {
    slug: "mesas-e-cadeiras",
    title: "Mesas e cadeiras",
    tagline: "Composições para diferentes estilos e formatos de evento.",
    intro:
      "Mesas e cadeiras para recepções, jantares, aniversários e casamentos — combinadas ao estilo e ao número de convidados de cada celebração.",
    photo: photo("acervo-mesas-e-cadeiras", "Mesas e cadeiras montadas em salão, plano médio", "Mesas e cadeiras montadas para evento", "4:3", "rose"),
    items: [],
  },
  {
    slug: "loucas-e-cristais",
    title: "Louças e cristais",
    tagline: "Pratos, taças e talheres que vestem a mesa.",
    intro:
      "Louças, cristais e talheres para mesas postas, jantares e recepções, escolhidos para combinar com a composição do evento.",
    photo: photo("acervo-loucas-e-cristais", "Louças e taças sobre toalha de linho, luz natural", "Louças e taças de cristal em mesa posta", "4:3", "linen"),
    items: [],
  },
  {
    slug: "decoracao",
    title: "Peças decorativas",
    tagline: "Os detalhes que dão personalidade ao ambiente.",
    intro:
      "Peças decorativas para compor mesas, painéis e ambientes, do mais clássico ao mais contemporâneo.",
    photo: photo("acervo-decoracao", "Peças decorativas agrupadas: vasos, castiçais, bandejas", "Peças decorativas para festas", "4:3", "petal"),
    items: [],
  },
  {
    slug: "mobiliario",
    title: "Mobiliário",
    tagline: "Sofás, aparadores e apoios para criar ambientes.",
    intro:
      "Mobiliário para lounges, recepções e áreas de convivência, pensado para acolher os convidados.",
    photo: photo("acervo-mobiliario", "Lounge montado com sofá, poltronas e aparador", "Mobiliário de lounge para evento", "4:3", "stone"),
    items: [],
  },
  {
    slug: "texteis",
    title: "Têxteis",
    tagline: "Toalhas, caminhos e guardanapos com textura e cor.",
    intro: "Toalhas, caminhos de mesa e guardanapos que trazem cor, textura e acabamento à composição.",
    photo: photo("acervo-texteis", "Close de tecidos: toalha, caminho e guardanapo", "Toalhas e guardanapos de tecido", "4:3", "sage"),
    items: [],
  },
  {
    slug: "acessorios",
    title: "Acessórios",
    tagline: "Bandejas, suportes e pequenas peças que completam tudo.",
    intro: "Bandejas, suportes, boleiras e acessórios que completam a mesa e facilitam o serviço.",
    photo: photo("acervo-acessorios", "Bandejas, boleiras e suportes sobre aparador", "Bandejas e suportes para festas", "4:3", "linen"),
    items: [],
  },
  {
    slug: "festas-infantis",
    title: "Itens para festas infantis",
    tagline: "Delicadeza e cor para as primeiras celebrações.",
    intro: "Peças e mobiliário para festas infantis com composição delicada, segura e cheia de personalidade.",
    photo: photo("acervo-festas-infantis", "Mesa de festa infantil sofisticada, tons suaves", "Mesa decorada para festa infantil", "4:3", "petal"),
    items: [],
  },
  {
    slug: "outros",
    title: "Outros",
    tagline: "Se a sua festa precisa, a gente procura junto.",
    intro: "Outros itens do acervo. Conte o que você está planejando e verificamos a disponibilidade.",
    photo: photo("acervo-outros", "Detalhes diversos do acervo", "Itens diversos do acervo", "4:3", "wine"),
    items: [],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
