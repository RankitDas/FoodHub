# 🔌 Integration Guide - FoodHub

## Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your credentials:
   - Project URL
   - Anonymous Key (Anon Key)

### 2. Add Credentials to `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Database Tables

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Customers Table
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Cart Sessions Table
```sql
CREATE TABLE cart_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  items JSONB,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Authentication Setup

### Enable Auth in Supabase
1. Go to Authentication settings
2. Enable Email provider
3. Configure email templates

### Add Auth to Cart Store
```typescript
import { supabase } from '@/lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

---

## Real-time Features

### Subscribe to Orders
```typescript
supabase
  .channel('orders')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
      console.log('New order:', payload.new);
    }
  )
  .subscribe();
```

### Live Cart Sync
```typescript
supabase
  .channel(`cart:${userId}`)
  .on('postgres_changes', { event: '*' }, (payload) => {
    // Update cart in real-time
  })
  .subscribe();
```

---

## Payment Integration (Stripe)

### Install Stripe
```bash
npm install @stripe/react-js @stripe/js stripe
```

### Create Payment Component
```typescript
import { loadStripe } from '@stripe/js';

const stripePromise = loadStripe('your_publishable_key');

export const PaymentForm = () => {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    // Handle payment
  };

  return (
    <form onSubmit={handlePayment}>
      {/* Stripe elements */}
    </form>
  );
};
```

### Backend Endpoint (API Route)
Create `src/app/api/create-payment-intent/route.ts`:
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}
```

---

## Email Notifications

### Setup Sendgrid
```bash
npm install @sendgrid/mail
```

### Send Order Confirmation
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendOrderConfirmation(
  email: string,
  order: Order
) {
  await sgMail.send({
    to: email,
    from: 'orders@foodhub.com',
    subject: 'Order Confirmation',
    html: `
      <h1>Order #${order.id}</h1>
      <p>Total: $${order.total_price}</p>
    `,
  });
}
```

---

## Analytics Integration

### Add Google Analytics
```bash
npm install @react-ga/core @react-ga/ga4
```

```typescript
import ReactGA from '@react-ga/core';

ReactGA.initialize('GA_MEASUREMENT_ID');

// Track events
ReactGA.event({
  category: 'engagement',
  action: 'add_to_cart',
  label: 'pizza',
  value: 12.99,
});
```

---

## Search Integration

### Add Algolia
```bash
npm install algoliasearch instantsearch.js react-instantsearch
```

```typescript
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

const searchClient = algoliasearch(
  'APP_ID',
  'SEARCH_ONLY_API_KEY'
);

export const SearchComponent = () => (
  <InstantSearch searchClient={searchClient} indexName="foods">
    <SearchBox />
    <Hits />
  </InstantSearch>
);
```

---

## Image Upload

### Setup Supabase Storage
```typescript
// Upload image
const { data, error } = await supabase.storage
  .from('foods')
  .upload(`${Date.now()}-${file.name}`, file);

// Get public URL
const { data } = supabase.storage
  .from('foods')
  .getPublicUrl(path);
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# SendGrid
SENDGRID_API_KEY=SG.xxx

# Google Analytics
NEXT_PUBLIC_GA_ID=G-xxx

# Algolia
NEXT_PUBLIC_ALGOLIA_APP_ID=xxx
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=xxx
```

---

## API Routes Example

### Create Order
`src/app/api/orders/route.ts`:
```typescript
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { userId, items, totalPrice } = await req.json();

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        items,
        total_price: totalPrice,
        status: 'pending',
      },
    ]);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data);
}
```

### Get Orders
```typescript
export async function GET(req: Request) {
  const { userId } = req.nextUrl.searchParams;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId);

  return Response.json(data);
}
```

---

## Webhooks (Order Updates)

### Supabase Webhooks
1. Go to Database > Webhooks
2. Create webhook for `orders` table
3. Set HTTP method: POST
4. Add your endpoint: `https://your-app.com/api/webhooks/order-status`

### Webhook Handler
```typescript
export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === 'INSERT') {
    console.log('New order:', event.record);
    // Send notification
  }

  return Response.json({ ok: true });
}
```

---

## Environment Setup Checklist

- [ ] Supabase account created
- [ ] Database tables created
- [ ] Auth configured
- [ ] Environment variables added
- [ ] Storage bucket created
- [ ] Stripe account setup
- [ ] SendGrid API key added
- [ ] Google Analytics ID added
- [ ] Algolia index created
- [ ] API routes implemented

---

## Testing Integrations

```bash
# Test Supabase connection
npm run dev

# Check browser console for auth
console.log(await supabase.auth.getSession());

# Test API routes
curl http://localhost:3000/api/orders
```

---

## Production Deployment

1. **Set production environment variables** in Vercel/hosting
2. **Enable Row Level Security** in Supabase
3. **Setup CORS** if needed
4. **Configure webhooks** for production
5. **Setup monitoring** and error tracking
6. **Enable caching** for performance

---

## Common Issues

### CORS Error
```typescript
// Add to next.config.js
async headers() {
  return [{
    source: '/api/:path*',
    headers: [
      {
        key: 'Access-Control-Allow-Credentials',
        value: 'true',
      },
    ],
  }];
}
```

### Auth Not Persisting
```typescript
// Use supabase.auth.onAuthStateChange
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});
```

### Real-time Not Working
- Check Row Level Security policies
- Verify channel name format
- Ensure subscription is active

---

## Support

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Status**: Integration guide complete ✅
**Last Updated**: May 2026
