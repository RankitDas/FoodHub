# Deployment

## Required Runtime

- Node.js 18.17 or newer
- npm 9 or newer

## Environment Variables

Set these in your hosting provider:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION=false
```

Supabase variables are optional until a backend checkout or account flow is connected:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Preflight

Run the full deployment check before shipping:

```bash
npm run deploy:check
```

## Vercel

The included `vercel.json` uses `npm ci` and `npm run build`. Import the repository in Vercel, set `NEXT_PUBLIC_SITE_URL`, and deploy.

## Generic Node Host

```bash
npm ci
npm run build
npm run start
```

Use port configuration from your host. Next.js reads the `PORT` environment variable automatically.
