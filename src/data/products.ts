import type { ReactElement } from 'react'
import {
  AlbumIcon,
  CollectibleIcon,
  LightstickIcon,
  PhotocardIcon,
  PlushIcon,
  ShirtIcon,
  StarIcon,
  StarPendantIcon,
  StationeryIcon,
  type IconProps,
} from '../components/icons'

export type ProductCategoryId =
  | 'roupas'
  | 'pelucias'
  | 'photocards'
  | 'albuns'
  | 'lightsticks'
  | 'acessorios'
  | 'papelaria'
  | 'colecionaveis'

export type ProductTag = 'novo' | 'fofo' | 'pre-venda' | 'edicao-limitada' | 'mais-amado'

export type ProductVariantGroup = {
  /** Ex.: "Tamanho" ou "Cor". */
  label: string
  options: string[]
}

export type Product = {
  id: string
  name: string
  category: ProductCategoryId
  price: number
  /** Frase curta para o card. */
  shortDescription: string
  /** Texto completo para o modal. */
  description: string
  /** Caminho da foto do produto. Sem imagem, o card mostra um placeholder no estilo Kimizu. */
  image?: string
  tag?: ProductTag
  variants?: ProductVariantGroup[]
}

export const TAG_LABEL: Record<ProductTag, string> = {
  novo: 'novo',
  fofo: 'fofo',
  'pre-venda': 'pré-venda',
  'edicao-limitada': 'edição limitada',
  'mais-amado': 'mais amado',
}

type CategoryMeta = {
  id: 'todos' | ProductCategoryId
  label: string
  Icon: (props: IconProps) => ReactElement
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'todos', label: 'Todos', Icon: StarIcon },
  { id: 'roupas', label: 'Roupas', Icon: ShirtIcon },
  { id: 'pelucias', label: 'Pelúcias', Icon: PlushIcon },
  { id: 'photocards', label: 'Photocards', Icon: PhotocardIcon },
  { id: 'albuns', label: 'Álbuns', Icon: AlbumIcon },
  { id: 'lightsticks', label: 'Lightsticks', Icon: LightstickIcon },
  { id: 'acessorios', label: 'Acessórios', Icon: StarPendantIcon },
  { id: 'papelaria', label: 'Papelaria', Icon: StationeryIcon },
  { id: 'colecionaveis', label: 'Colecionáveis', Icon: CollectibleIcon },
]

export const CATEGORY_LABEL: Record<ProductCategoryId, string> = {
  roupas: 'Roupas',
  pelucias: 'Pelúcias',
  photocards: 'Photocards',
  albuns: 'Álbuns',
  lightsticks: 'Lightsticks',
  acessorios: 'Acessórios',
  papelaria: 'Papelaria',
  colecionaveis: 'Colecionáveis',
}

export const products: Product[] = [
  {
    id: 'moletom-comeback-night',
    name: 'Moletom oversized Comeback Night',
    category: 'roupas',
    price: 189.9,
    shortDescription: 'Bem quentinho, com estampa estelar nas mangas.',
    description:
      'Moletom oversized supermacio, ideal para maratonar comeback debaixo do cobertor ou sair para o show. Estampa estelar bordada nas mangas e capuz forrado.',
    tag: 'mais-amado',
    variants: [{ label: 'Tamanho', options: ['P', 'M', 'G', 'GG'] }],
  },
  {
    id: 'jaqueta-bomber-estelar',
    name: 'Jaqueta bomber estelar',
    category: 'roupas',
    price: 259.9,
    shortDescription: 'Bordado de estrelas cintilantes e forro cetim.',
    description:
      'Jaqueta bomber com bordado de estrelas de 4 pontas cintilantes, forro em cetim lilás e acabamento premium. Perfeita para o look do dia do show.',
    tag: 'novo',
    variants: [{ label: 'Tamanho', options: ['P', 'M', 'G'] }],
  },
  {
    id: 'cropped-encore',
    name: 'Camiseta cropped Encore',
    category: 'roupas',
    price: 89.9,
    shortDescription: 'Leve, com estampa de coraçõezinhos em degradê.',
    description:
      'Camiseta cropped em algodão leve, gola careca e estampa exclusiva de coraçõezinhos em degradê azul-lilás. Combina com qualquer look de fã.',
    variants: [{ label: 'Tamanho', options: ['PP', 'P', 'M', 'G'] }],
  },
  {
    id: 'pelucia-kimizu',
    name: 'Pelúcia lontrinha Kimizu',
    category: 'pelucias',
    price: 119.9,
    shortDescription: 'A mascote fofa para abraçar em todo comeback.',
    description:
      'Pelúcia oficial da lontrinha Kimizu, com pelo supersuave, estrela prateada na cabeça e coleira com pingente de cristal. Um abraço fofo para os dias de espera pelo próximo comeback.',
    tag: 'mais-amado',
  },
  {
    id: 'pelucia-peixinho',
    name: 'Pelúcia mini peixinho brilhante',
    category: 'pelucias',
    price: 49.9,
    shortDescription: 'Miniatura fofa para pendurar na bag.',
    description:
      'Peixinho de pelúcia mini, com tecido acetinado que brilha suavemente na luz. Vem com presilha para pendurar na bag ou no chaveiro.',
    tag: 'fofo',
  },
  {
    id: 'kit-photocards-glitter',
    name: 'Kit de photocards com glitter',
    category: 'photocards',
    price: 34.9,
    shortDescription: 'Edição especial com glitter holográfico.',
    description:
      'Kit com 6 photocards de bordas holográficas e glitter fino, guardados em envelope de cristal. Peça de colecionador para completar o seu álbum.',
    tag: 'edicao-limitada',
  },
  {
    id: 'ficharios-photocards',
    name: 'Fichário de photocards estelar',
    category: 'photocards',
    price: 59.9,
    shortDescription: 'Páginas em cristal para exibir sua coleção.',
    description:
      'Fichário com capa acolchoada estampada de estrelas e páginas em cristal transparente, protegendo cada photocard com muito carinho.',
  },
  {
    id: 'porta-album-cristal',
    name: 'Porta-álbum de cristal',
    category: 'albuns',
    price: 69.9,
    shortDescription: 'Vitrine transparente com luz suave.',
    description:
      'Porta-álbum em acrílico transparente com base iluminada em LED azul-lilás suave, para exibir seu álbum favorito com destaque no cantinho do bias.',
  },
  {
    id: 'suporte-albuns',
    name: 'Suporte giratório para álbuns',
    category: 'albuns',
    price: 79.9,
    shortDescription: 'Organiza a coleção e ainda gira 360°.',
    description:
      'Suporte giratório com 4 níveis, perfeito para organizar vários álbuns sem perder o acesso rápido a nenhum deles. Estrutura firme e discreta.',
    tag: 'novo',
  },
  {
    id: 'charm-lightstick',
    name: 'Charm decorativo para lightstick',
    category: 'lightsticks',
    price: 39.9,
    shortDescription: 'Pingentes fofos que brilham junto com você.',
    description:
      'Conjunto de charms para personalizar seu lightstick: estrela de cristal, corações em degradê e uma lontrinha mini. Vem com fita de veludo lilás.',
    tag: 'fofo',
  },
  {
    id: 'chaveiro-estrela',
    name: 'Chaveiro acrílico de estrela',
    category: 'acessorios',
    price: 29.9,
    shortDescription: 'Estrela de 4 pontas com brilho holográfico.',
    description:
      'Chaveiro em acrílico transparente com corte de estrela de 4 pontas e efeito holográfico, alça em fita de cetim lilás.',
  },
  {
    id: 'bag-charm-kimizu',
    name: 'Bag charm lontrinha Kimizu',
    category: 'acessorios',
    price: 34.9,
    shortDescription: 'Pendente fofo para deixar a bag mais fã.',
    description:
      'Mini lontrinha Kimizu em pelúcia com argola resistente, ideal para pendurar na bag, na mochila ou no estojo de photocards.',
    tag: 'mais-amado',
    variants: [{ label: 'Cor', options: ['Lilás', 'Azul-cristal'] }],
  },
  {
    id: 'adesivos-holograficos',
    name: 'Adesivos holográficos Cantinho do Bias',
    category: 'papelaria',
    price: 19.9,
    shortDescription: 'Estrelas, corações e gotinhas de cristal.',
    description:
      'Cartela com 24 adesivos holográficos: estrelas de 4 pontas, corações em degradê e gotinhas de cristal, perfeitos para decorar cadernos e diários de fã.',
  },
  {
    id: 'washi-tape-cristalina',
    name: 'Washi tape cristalina',
    category: 'papelaria',
    price: 16.9,
    shortDescription: 'Fita decorativa com estampa de sakura.',
    description:
      'Rolo de washi tape em papel fino, estampa de pétalas de sakura e brilho sutil, ótima para decorar scrapbooks de show e diários de fã.',
    tag: 'novo',
  },
  {
    id: 'bandeira-fileira-k',
    name: 'Bandeira de show Fileira K',
    category: 'colecionaveis',
    price: 54.9,
    shortDescription: 'Leve para o show e agite bem alto.',
    description:
      'Bandeira de tecido leve com estampa exclusiva de estrelas e ondas cristalinas, perfeita para agitar no show e guardar depois como lembrança.',
    tag: 'pre-venda',
  },
  {
    id: 'pin-estrela-cadente',
    name: 'Pin esmaltado estrela cadente',
    category: 'colecionaveis',
    price: 24.9,
    shortDescription: 'Peça de coleção em esmalte brilhante.',
    description:
      'Pin esmaltado em formato de estrela cadente, acabamento brilhante e fixador duplo. Uma peça delicada para colecionar ou usar na jaqueta.',
  },
]
