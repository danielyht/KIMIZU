-- Kimizu · schema Supabase
-- Cole no SQL Editor do projeto (Dashboard → SQL → New query) e rode uma vez.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null check (category in (
    'roupas', 'pelucias', 'photocards', 'albuns',
    'lightsticks', 'acessorios', 'papelaria', 'colecionaveis'
  )),
  price numeric(10, 2) not null check (price >= 0),
  short_description text not null default '',
  description text not null default '',
  image text,
  tag text check (
    tag is null or tag in ('novo', 'fofo', 'pre-venda', 'edicao-limitada', 'mais-amado')
  ),
  variants jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_sort_order_idx on public.products (sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Produtos públicos para leitura" on public.products;
create policy "Produtos públicos para leitura"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins autenticados podem inserir" on public.products;
create policy "Admins autenticados podem inserir"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Admins autenticados podem atualizar" on public.products;
create policy "Admins autenticados podem atualizar"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins autenticados podem apagar" on public.products;
create policy "Admins autenticados podem apagar"
  on public.products for delete
  to authenticated
  using (true);

-- Seed inicial (ignora se o id já existir)
insert into public.products (id, name, category, price, short_description, description, tag, variants, sort_order)
values
  ('moletom-comeback-night', 'Moletom oversized Comeback Night', 'roupas', 189.90,
   'Bem quentinho, com estampa estelar nas mangas.',
   'Moletom oversized supermacio, ideal para maratonar comeback debaixo do cobertor ou sair para o show. Estampa estelar bordada nas mangas e capuz forrado.',
   'mais-amado', '[{"label":"Tamanho","options":["P","M","G","GG"]}]'::jsonb, 1),
  ('jaqueta-bomber-estelar', 'Jaqueta bomber estelar', 'roupas', 259.90,
   'Bordado de estrelas cintilantes e forro cetim.',
   'Jaqueta bomber com bordado de estrelas de 4 pontas cintilantes, forro em cetim lilás e acabamento premium. Perfeita para o look do dia do show.',
   'novo', '[{"label":"Tamanho","options":["P","M","G"]}]'::jsonb, 2),
  ('cropped-encore', 'Camiseta cropped Encore', 'roupas', 89.90,
   'Leve, com estampa de coraçõezinhos em degradê.',
   'Camiseta cropped em algodão leve, gola careca e estampa exclusiva de coraçõezinhos em degradê azul-lilás. Combina com qualquer look de fã.',
   null, '[{"label":"Tamanho","options":["PP","P","M","G"]}]'::jsonb, 3),
  ('pelucia-kimizu', 'Pelúcia lontrinha Kimizu', 'pelucias', 119.90,
   'A mascote fofa para abraçar em todo comeback.',
   'Pelúcia oficial da lontrinha Kimizu, com pelo supersuave, estrela prateada na cabeça e coleira com pingente de cristal. Um abraço fofo para os dias de espera pelo próximo comeback.',
   'mais-amado', '[]'::jsonb, 4),
  ('pelucia-peixinho', 'Pelúcia mini peixinho brilhante', 'pelucias', 49.90,
   'Miniatura fofa para pendurar na bag.',
   'Peixinho de pelúcia mini, com tecido acetinado que brilha suavemente na luz. Vem com presilha para pendurar na bag ou no chaveiro.',
   'fofo', '[]'::jsonb, 5),
  ('kit-photocards-glitter', 'Kit de photocards com glitter', 'photocards', 34.90,
   'Edição especial com glitter holográfico.',
   'Kit com 6 photocards de bordas holográficas e glitter fino, guardados em envelope de cristal. Peça de colecionador para completar o seu álbum.',
   'edicao-limitada', '[]'::jsonb, 6),
  ('ficharios-photocards', 'Fichário de photocards estelar', 'photocards', 59.90,
   'Páginas em cristal para exibir sua coleção.',
   'Fichário com capa acolchoada estampada de estrelas e páginas em cristal transparente, protegendo cada photocard com muito carinho.',
   null, '[]'::jsonb, 7),
  ('porta-album-cristal', 'Porta-álbum de cristal', 'albuns', 69.90,
   'Vitrine transparente com luz suave.',
   'Porta-álbum em acrílico transparente com base iluminada em LED azul-lilás suave, para exibir seu álbum favorito com destaque no cantinho do bias.',
   null, '[]'::jsonb, 8),
  ('suporte-albuns', 'Suporte giratório para álbuns', 'albuns', 79.90,
   'Organiza a coleção e ainda gira 360°.',
   'Suporte giratório com 4 níveis, perfeito para organizar vários álbuns sem perder o acesso rápido a nenhum deles. Estrutura firme e discreta.',
   'novo', '[]'::jsonb, 9),
  ('charm-lightstick', 'Charm decorativo para lightstick', 'lightsticks', 39.90,
   'Pingentes fofos que brilham junto com você.',
   'Conjunto de charms para personalizar seu lightstick: estrela de cristal, corações em degradê e uma lontrinha mini. Vem com fita de veludo lilás.',
   'fofo', '[]'::jsonb, 10),
  ('chaveiro-estrela', 'Chaveiro acrílico de estrela', 'acessorios', 29.90,
   'Estrela de 4 pontas com brilho holográfico.',
   'Chaveiro em acrílico transparente com corte de estrela de 4 pontas e efeito holográfico, alça em fita de cetim lilás.',
   null, '[]'::jsonb, 11),
  ('bag-charm-kimizu', 'Bag charm lontrinha Kimizu', 'acessorios', 34.90,
   'Pendente fofo para deixar a bag mais fã.',
   'Mini lontrinha Kimizu em pelúcia com argola resistente, ideal para pendurar na bag, na mochila ou no estojo de photocards.',
   'mais-amado', '[{"label":"Cor","options":["Lilás","Azul-cristal"]}]'::jsonb, 12),
  ('adesivos-holograficos', 'Adesivos holográficos Cantinho do Bias', 'papelaria', 19.90,
   'Estrelas, corações e gotinhas de cristal.',
   'Cartela com 24 adesivos holográficos: estrelas de 4 pontas, corações em degradê e gotinhas de cristal, perfeitos para decorar cadernos e diários de fã.',
   null, '[]'::jsonb, 13),
  ('washi-tape-cristalina', 'Washi tape cristalina', 'papelaria', 16.90,
   'Fita decorativa com estampa de sakura.',
   'Rolo de washi tape em papel fino, estampa de pétalas de sakura e brilho sutil, ótima para decorar scrapbooks de show e diários de fã.',
   'novo', '[]'::jsonb, 14),
  ('bandeira-fileira-k', 'Bandeira de show Fileira K', 'colecionaveis', 54.90,
   'Leve para o show e agite bem alto.',
   'Bandeira de tecido leve com estampa exclusiva de estrelas e ondas cristalinas, perfeita para agitar no show e guardar depois como lembrança.',
   'pre-venda', '[]'::jsonb, 15),
  ('pin-estrela-cadente', 'Pin esmaltado estrela cadente', 'colecionaveis', 24.90,
   'Peça de coleção em esmalte brilhante.',
   'Pin esmaltado em formato de estrela cadente, acabamento brilhante e fixador duplo. Uma peça delicada para colecionar ou usar na jaqueta.',
   null, '[]'::jsonb, 16)
on conflict (id) do nothing;
