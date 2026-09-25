# Kimizu

Vitrine de artigos de K-pop (Vite + React + TypeScript + Tailwind) com admin em `/admin` ligado ao **Supabase** (login e-mail/senha + CRUD de produtos).

## Setup local

```bash
npm install
cp .env.example .env.local
```

Preencha no `.env.local`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

(ambas em Supabase → Project Settings → API)

```bash
npm run dev
```

- Vitrine: http://localhost:5173/
- Admin: http://localhost:5173/admin

Sem as variáveis do Supabase, a vitrine usa os produtos de exemplo em `src/data/products.ts`. O admin exige Supabase configurado.

## Supabase (uma vez)

1. Crie um projeto em [supabase.com](https://supabase.com).
2. **SQL Editor** → cole e rode o arquivo [`supabase/schema.sql`](supabase/schema.sql) (cria tabela, RLS e seed).
3. **Authentication → Providers**: deixe **Email** ligado.
4. **Authentication → Providers → Email**: desative **Confirm email** (ou confirme o e-mail depois) para facilitar o primeiro acesso.
5. **Authentication → Users → Add user**: crie seu usuário admin (e-mail + senha).  
   Não há cadastro público no site — só login.
6. (Opcional) Em Authentication → Settings, desative “Allow new users to sign up” se a opção existir no seu painel, para impedir cadastro pela API.

Políticas RLS:

- leitura pública dos produtos
- insert / update / delete só para usuários autenticados

## Deploy na Vercel

1. Conecte o repositório (ou faça upload do projeto).
2. Framework: Vite. Build: `npm run build`. Output: `dist`.
3. Em **Environment Variables**, adicione as mesmas `VITE_SUPABASE_*`.
4. O arquivo `vercel.json` já reescreve rotas SPA para `/admin` funcionar.

Depois do deploy, entre em `https://seu-dominio.vercel.app/admin`, faça login e gerencie os produtos. Mudanças aparecem na vitrine sem novo deploy.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — ESLint
- `npm run preview` — preview do build
