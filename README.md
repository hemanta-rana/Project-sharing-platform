# i-Built-This

> **Share What You've Built. Discover What's Launching.**

A Product Hunt–style community platform where developers and indie makers can submit their projects, get discovered, and let the community vote on what's trending. Products go through an admin review workflow before appearing publicly, keeping the feed curated and high quality.

---

## Features

- **Submit a Project** — Share your product with a name, slug, tagline, description, website URL, and tags
- **Community Voting** — Upvote or downvote products with optimistic UI updates (no page refresh needed)
- **Featured Badge** — Products with 100+ votes automatically earn a "Featured" badge
- **Explore Page** — Browse all approved products with live client-side search and sort (Trending / Recent)
- **Recently Launched** — A dedicated section streaming in products launched within the last 7 days via React Suspense
- **Admin Dashboard** — Approve, reject, or delete submitted products; view stats across all statuses
- **Organization-based Auth** — Submitting and voting requires membership in a Clerk organization
- **Role-based Access** — Admin panel is gated behind a Clerk `publicMetadata.isAdmin` flag

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Actions, `use cache`) |
| Language | TypeScript 5 |
| UI | [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS v4](https://tailwindcss.com), [Lucide React](https://lucide.dev) |
| Auth | [Clerk](https://clerk.com) v7 (users, orgs, public metadata) |
| Database | [Neon](https://neon.tech) serverless PostgreSQL |
| ORM | [Drizzle ORM](https://orm.drizzle.team) + Drizzle Kit |
| Validation | [Zod](https://zod.dev) v4 |
| Font | Poppins via `next/font/google` |

---

## Project Structure

```
├── app/
│   ├── page.tsx                  # Landing page (Hero, Featured, Recently Launched)
│   ├── explore/page.tsx          # Browse & search all approved products
│   ├── submit/page.tsx           # Product submission form
│   ├── products/[slug]/page.tsx  # Individual product detail page
│   ├── admin/page.tsx            # Admin dashboard (protected)
│   ├── layout.tsx                # Root layout with ClerkProvider
│   └── types/index.ts            # Shared TypeScript types
├── components/
│   ├── common/                   # Header, Footer, SectionHeader, CustomUserButton
│   ├── landing/                  # HeroSection, FeatureProducts, RecentlyLaunched, StatsCards
│   ├── products/                 # ProductCard, ProductExplorer, SubmitForm, VotingButton, Skeleton
│   ├── admin/                    # AdminProductCard, AdminAction, StatsCard
│   ├── form-field/               # Reusable FormField (input + textarea + validation)
│   └── ui/                       # shadcn/ui primitives (button, badge, card, etc.)
├── lib/
│   ├── products/
│   │   ├── product-action.ts     # Server Actions: submit, upvote, downvote
│   │   ├── product-select.ts     # Data fetching: featured, recent, by slug, all
│   │   └── product-validation.ts # Zod schema for product form
│   └── admin/
│       └── admin-action.tsx      # Server Actions: approve, reject, delete
├── db/
│   ├── schema.ts                 # Drizzle schema — products table
│   ├── index.ts                  # Drizzle + Neon client setup
│   └── seed.ts                   # Seed script (9 sample products)
└── drizzle/                      # Migration files
```

---

## Database Schema

Single `products` table:

| Column | Type | Notes |
|---|---|---|
| `id` | serial (PK) | Auto-increment |
| `name` | varchar(120) | Required |
| `slug` | varchar(140) | Unique, URL-friendly identifier |
| `tagline` | varchar(200) | Short pitch |
| `description` | text | Long-form description |
| `website_url` | text | Link to the project |
| `tags` | json → string[] | Comma-separated tags stored as JSON array |
| `vote_count` | integer | Default 0, floored at 0 |
| `status` | varchar(20) | `pending` / `approved` / `rejected` |
| `submitted_by` | varchar(120) | Submitter's email address |
| `user_id` | varchar(255) | Clerk user ID |
| `organization_id` | varchar(255) | Clerk org ID |
| `created_at` | timestamptz | Auto-set on insert |
| `approved_at` | timestamptz | Set when admin approves |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account (free tier works)
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/i-built-this.git
cd i-built-this
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file at the project root:

```env
# Clerk — from your Clerk dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Neon — from your Neon project → Connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

### 4. Push the database schema

```bash
npx drizzle-kit push
```

### 5. (Optional) Seed the database

Populates the database with 9 sample products across different categories:

```bash
npm run db:seed
```

> ⚠️ The seed script clears all existing data before inserting. Don't run it on a production database.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Setup

The admin panel at `/admin` is protected by a `isAdmin` flag in Clerk's user public metadata.

To grant admin access to a user:

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Users** → select the user
3. Open the **Metadata** tab → **Public metadata**
4. Add the following JSON:

```json
{
  "isAdmin": true
}
```

The user will now see an **Admin Panel** link in their profile dropdown and can access `/admin`.

---

## Key Workflows

### Submitting a Product

1. Sign in and create or join a Clerk organization (required)
2. Click **Submit Project** in the header
3. Fill in the form: name, slug, tagline, description, website URL, and tags
4. The product is submitted with `status: "pending"` and awaits admin review

### Voting

- Click the up/down chevrons on any product card or detail page
- Requires being signed in and a member of a Clerk organization
- Vote count updates instantly via optimistic UI (`useOptimistic`)
- Products reaching 100+ votes get a **Featured** badge

### Admin Review

1. Log in as an admin user and navigate to `/admin` (or use the Admin Panel link in your profile dropdown)
2. The dashboard shows a stats overview (total / pending / approved / rejected)
3. **Pending** products can be Approved or Rejected
4. Any product can be hard-deleted at any time

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed the database with sample data |

---

## Deployment

The easiest path is [Vercel](https://vercel.com):

1. Push your repository to GitHub
2. Import the project in Vercel
3. Add your environment variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`) in the Vercel project settings
4. Deploy

Make sure your Clerk application has the correct **Allowed redirect URLs** set to your production domain.

---

