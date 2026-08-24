import { db } from './index';
import { products } from './schema';

const sampleProducts: (typeof products.$inferInsert)[] = [
  {
    name: "DevPulse Analytics",
    slug: "devpulse-analytics",
    tagline: "Real-time performance monitoring & error tracking for Next.js applications.",
    description:
      "DevPulse provides instant visibility into server components, API latency, and edge function metrics with zero setup overhead. Built for modern web applications.",
    websiteUrl: "https://devpulse.example.com",
    tags: ["Developer Tools", "Next.js", "Analytics", "Monitoring"],
    voteCount: 142,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    submittedBy: "Alex Chen",
    userId: "user_2N1x9aB7c8D9e0F1g2H3i4J5k6",
    organizationId: "org_2N1x9aB7c8D9e0F1g2H3i4J5k6",
  },
  {
    name: "Canvas AI",
    slug: "canvas-ai",
    tagline: "Transform rough UI wireframes into clean React components using generative AI.",
    description:
      "Upload a screenshot, napkin sketch, or Figma frame, and Canvas AI generates production-ready Tailwind CSS and React code in seconds.",
    websiteUrl: "https://canvasai.example.com",
    tags: ["AI", "Design", "React", "Tailwind"],
    voteCount: 289,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    submittedBy: "Sarah Connor",
    userId: "user_2M8y7zX6w5V4u3T2s1R0q9P8o7",
    organizationId: "org_2M8y7zX6w5V4u3T2s1R0q9P8o7",
  },
  {
    name: "ShipFast Kit",
    slug: "shipfast-kit",
    tagline: "The ultimate Next.js boilerplate for launching SaaS apps in days, not months.",
    description:
      "Pre-built authentication with Clerk, Drizzle ORM integration, Stripe payments, automatically generated SEO meta tags, and responsive UI components.",
    websiteUrl: "https://shipfastkit.example.com",
    tags: ["SaaS", "Next.js", "Boilerplate", "Open Source"],
    voteCount: 412,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    submittedBy: "Hemanta Rana",
    userId: "user_2L7x6yW5v4U3t2S1r0Q9p8O7n6",
    organizationId: null,
  },
  {
    name: "FeedbackLoop",
    slug: "feedback-loop",
    tagline: "Embeddable customer feedback widgets with automated sentiment analysis.",
    description:
      "Collect feature requests, bug reports, and user testimonials directly in your app. Powered by AI categorization and voting boards.",
    websiteUrl: "https://feedbackloop.example.com",
    tags: ["Productivity", "Customer Feedback", "SaaS"],
    voteCount: 88,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    submittedBy: "Emily Watson",
    userId: "user_2K6w5vU4t3S2r1Q0p9O8n7M6l5",
    organizationId: "org_2K6w5vU4t3S2r1Q0p9O8n7M6l5",
  },
  {
    name: "PromptForge",
    slug: "prompt-forge",
    tagline: "Collaborative prompt engineering workspace for LLM application builders.",
    description:
      "Test, version control, and evaluate prompt variations against multiple LLM providers with automated regression testing and latency benchmarks.",
    websiteUrl: "https://promptforge.example.com",
    tags: ["AI", "Developer Tools", "LLM"],
    voteCount: 175,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    submittedBy: "David Kim",
    userId: "user_2J5v4uT3s2R1q0P9o8N7m6L5k4",
    organizationId: "org_2J5v4uT3s2R1q0P9o8N7m6L5k4",
  },
  {
    name: "DBStudio Light",
    slug: "dbstudio-light",
    tagline: "Lightweight browser-based database management tool for PostgreSQL and SQLite.",
    description:
      "Manage tables, run SQL queries, view relationships, and export seed scripts directly inside your web browser without installing local desktop clients.",
    websiteUrl: "https://dbstudio.example.com",
    tags: ["Database", "Developer Tools", "PostgreSQL"],
    voteCount: 54,
    status: "pending",
    approvedAt: null,
    submittedBy: "Marcus Brody",
    userId: "user_2I4u3tS2r1Q0p9O8n7M6l5K4j3",
    organizationId: null,
  },
  {
    name: "FlowMotion FX",
    slug: "flow-motion-fx",
    tagline: "Create high-performance scroll animations and interactive canvas graphics.",
    description:
      "A declarative animation library optimized for React and Next.js projects with hardware-accelerated rendering and customizable physics controls.",
    websiteUrl: "https://flowmotion.example.com",
    tags: ["Design", "Animation", "React", "Frontend"],
    voteCount: 23,
    status: "pending",
    approvedAt: null,
    submittedBy: "Jessica Taylor",
    userId: "user_2H3t2sR1q0P9o8N7m6L5k4J3i2",
    organizationId: null,
  },
  {
    name: "API Sentinel",
    slug: "api-sentinel",
    tagline: "Automated API contract testing and uptime monitoring for microservices.",
    description:
      "Continuous validation of OpenAPI/Swagger specs against live endpoints. Receive instant alerts on schema drift or breaking API changes.",
    websiteUrl: "https://apisentinel.example.com",
    tags: ["Developer Tools", "API", "Testing", "Security"],
    voteCount: 67,
    status: "approved",
    approvedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    submittedBy: "Jordan Rivera",
    userId: "user_2G2s1rQ0p9O8n7M6l5K4j3I2h1",
    organizationId: "org_2G2s1rQ0p9O8n7M6l5K4j3I2h1",
  },
  {
    name: "SpamShield API",
    slug: "spam-shield-api",
    tagline: "AI-driven anti-spam protection for user submissions and comments.",
    description:
      "Prevent bot registrations and low-quality content submissions with edge middleware filtering and fast response times under 10ms.",
    websiteUrl: "https://spamshield.example.com",
    tags: ["Security", "API", "Developer Tools"],
    voteCount: 5,
    status: "rejected",
    approvedAt: null,
    submittedBy: "Anonymous Developer",
    userId: "user_2F1r0qP9o8N7m6L5k4J3i2H1g0",
    organizationId: null,
  },
];

async function seed() {
  console.log('🌱 Starting database seeding process...');

  try {
    // Clear existing products table data
    console.log('🧹 Clearing existing products...');
    await db.delete(products);

    // Insert sample products
    console.log(`📦 Inserting ${sampleProducts.length} sample products...`);
    const insertedProducts = await db.insert(products).values(sampleProducts).returning();

    console.log(`✅ Successfully seeded database with ${insertedProducts.length} products!`);
    console.log('\nInserted products preview:');
    insertedProducts.forEach((product) => {
      console.log(
        `  - [${product.status ? product.status.toUpperCase() : 'PENDING'}] ${product.name} (Slug: ${product.slug}, Votes: ${product.voteCount})`
      );
    });
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
