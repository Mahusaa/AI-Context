# Performance Standards

Comprehensive guidelines for building fast, efficient, and high-performing web applications that deliver exceptional user experiences.

## Why Performance Matters

- **User Experience**: 53% of mobile users abandon sites that take over 3 seconds to load
- **SEO**: Google uses Core Web Vitals as ranking factors
- **Conversions**: 1-second delay can reduce conversions by 7%
- **Revenue**: Faster sites generate more revenue and engagement
- **Accessibility**: Performance is an accessibility concern

---

## Core Web Vitals

Google's Core Web Vitals measure real-world user experience:

### 1. Largest Contentful Paint (LCP)

**Measures:** Loading performance - when the largest content element becomes visible

**Targets:**
- **Good**: ≤ 2.5 seconds
- **Needs Improvement**: 2.5 - 4 seconds
- **Poor**: > 4 seconds

**How to Improve:**
```tsx
// 1. Optimize images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority // Load immediately
  quality={85}
  placeholder="blur"
/>

// 2. Preload critical resources
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

// 3. Use CDN for images
<Image
  src="https://cdn.yourdomain.com/image.jpg"
  alt="Optimized image"
  width={800}
  height={600}
/>

// 4. Implement responsive images
<Image
  src="/image.jpg"
  alt="Responsive image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 2. First Input Delay (FID)

**Measures:** Interactivity - time from when user first interacts to when browser responds

**Targets:**
- **Good**: ≤ 100 milliseconds
- **Needs Improvement**: 100 - 300 milliseconds
- **Poor**: > 300 milliseconds

**How to Improve:**
```tsx
// 1. Code split large JavaScript bundles
import dynamic from "next/dynamic"

const HeavyComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <Spinner />
})

// 2. Defer non-critical JavaScript
<Script src="/analytics.js" strategy="lazyOnload" />

// 3. Use web workers for heavy computation
// worker.ts
self.addEventListener('message', (e) => {
  const result = heavyComputation(e.data)
  self.postMessage(result)
})

// component.tsx
const worker = new Worker('/worker.js')
worker.postMessage(data)
worker.onmessage = (e) => setResult(e.data)

// 4. Optimize third-party scripts
<Script
  src="https://analytics.google.com/..."
  strategy="afterInteractive" // or "lazyOnload"
/>
```

### 3. Cumulative Layout Shift (CLS)

**Measures:** Visual stability - unexpected layout shifts during page load

**Targets:**
- **Good**: ≤ 0.1
- **Needs Improvement**: 0.1 - 0.25
- **Poor**: > 0.25

**How to Improve:**
```tsx
// 1. Always specify image dimensions
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600} // Prevents layout shift
/>

// 2. Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// 3. Avoid inserting content above existing content
// Bad: Injecting banner at top after load
// Good: Reserve space or append to bottom

// 4. Use CSS aspect-ratio for media
<div className="aspect-video">
  <iframe src="..." />
</div>

// 5. Preload fonts to prevent FOUT (Flash of Unstyled Text)
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### Interaction to Next Paint (INP)

**New metric replacing FID:**

**Measures:** Overall responsiveness - time from user interaction to visual update

**Targets:**
- **Good**: ≤ 200 milliseconds
- **Needs Improvement**: 200 - 500 milliseconds
- **Poor**: > 500 milliseconds

**How to Improve:**
- Optimize event handlers
- Reduce JavaScript execution time
- Break up long tasks
- Use `requestIdleCallback` for non-urgent work

---

## Loading Performance

### Critical Rendering Path

Optimize the critical rendering path:

```tsx
// next.config.js
module.exports = {
  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Enable compression
  compress: true,
}
```

### Resource Hints

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for other domains */}
        <link rel="dns-prefetch" href="https://analytics.google.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload critical CSS (if not using CSS-in-JS) */}
        <link rel="preload" href="/styles/critical.css" as="style" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Code Splitting

```tsx
// Dynamic imports for route-based code splitting
import dynamic from "next/dynamic"

// Lazy load heavy components
const Chart = dynamic(() => import("@/components/chart"), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable server-side rendering if not needed
})

// Lazy load modals
const SettingsModal = dynamic(() => import("@/components/settings-modal"))

// Lazy load third-party components
const VideoPlayer = dynamic(() => import("react-player"), {
  ssr: false,
})

// Usage
export default function Dashboard() {
  return (
    <div>
      <Chart data={data} />
    </div>
  )
}
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})

# Run analysis
ANALYZE=true npm run build
```

---

## Image Optimization

### Next.js Image Component

```tsx
import Image from "next/image"

// Basic usage
<Image
  src="/product.jpg"
  alt="Product image"
  width={800}
  height={600}
  quality={85} // 75-85 is optimal
/>

// Priority for above-the-fold images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // Skip lazy loading
  quality={90}
/>

// Responsive images
<Image
  src="/image.jpg"
  alt="Responsive image"
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// External images (configure in next.config.js)
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={800}
  height={600}
/>

// Fill container (when dimensions are unknown)
<div className="relative w-full h-96">
  <Image
    src="/image.jpg"
    alt="Fill image"
    fill
    className="object-cover"
  />
</div>
```

### Image Best Practices

1. **Use modern formats**: WebP, AVIF (Next.js handles automatically)
2. **Compress images**: TinyPNG, ImageOptim before upload
3. **Specify dimensions**: Always set width and height
4. **Lazy load**: Use native lazy loading (default in Next.js)
5. **Use CDN**: Serve images from CDN (Cloudinary, Imgix, Vercel)
6. **Responsive images**: Serve appropriate size for device
7. **Blur placeholder**: Show blur while loading

```tsx
// Blur placeholder with local images
import heroImage from "@/public/hero.jpg"

<Image
  src={heroImage}
  alt="Hero"
  placeholder="blur" // Automatic blur placeholder
/>

// Blur placeholder with remote images
<Image
  src="https://example.com/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Generate with tools
/>
```

---

## Font Optimization

### Next.js Font Optimization

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from "next/font/google"

// Load Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

// Use in Tailwind config
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
}
```

### Local Font Files

```tsx
import localFont from "next/font/local"

const customFont = localFont({
  src: [
    {
      path: '../public/fonts/custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/custom-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-custom',
})
```

### Font Best Practices

1. **Limit font variations**: Only load weights and styles you use
2. **Use variable fonts**: Single file for all weights
3. **Self-host fonts**: Faster than Google Fonts
4. **Preload fonts**: Add to `<head>` for critical fonts
5. **Use font-display: swap**: Prevent invisible text
6. **Subset fonts**: Only include characters you need

---

## JavaScript Optimization

### Tree Shaking

Ensure proper tree shaking:

```tsx
// Bad - imports entire library
import _ from 'lodash'
const result = _.debounce(fn, 300)

// Good - imports only what you need
import debounce from 'lodash/debounce'
const result = debounce(fn, 300)

// Even better - use native or lightweight alternatives
const debounce = (fn: Function, ms: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}
```

### Defer Non-Critical JavaScript

```tsx
import Script from "next/script"

export default function Page() {
  return (
    <>
      {/* Load after page is interactive */}
      <Script src="/analytics.js" strategy="afterInteractive" />

      {/* Load when browser is idle */}
      <Script src="/non-critical.js" strategy="lazyOnload" />

      {/* Inline critical scripts */}
      <Script id="critical-script" strategy="beforeInteractive">
        {`console.log('Critical script')`}
      </Script>
    </>
  )
}
```

### Optimize Dependencies

```bash
# Analyze bundle size
npm install -g bundle-phobia-cli
bundle-phobia <package-name>

# Find lighter alternatives
# Instead of moment.js (heavy), use day.js or date-fns
npm install dayjs
```

---

## CSS Optimization

### Tailwind CSS Optimization

```tsx
// tailwind.config.js
module.exports = {
  // Remove unused styles in production
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  // Optimize for production
  corePlugins: {
    // Disable plugins you don't use
    preflight: true,
  },
}

// next.config.js - Enable CSS optimization
module.exports = {
  experimental: {
    optimizeCss: true, // Uses critters
  },
}
```

### Critical CSS

```tsx
// Inline critical CSS
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Caching Strategies

### HTTP Caching Headers

```tsx
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,gif,ico,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Next.js Caching

```tsx
// Static generation (ISR)
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Fetch with caching
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Cache for 1 hour
})

// No cache for dynamic data
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})
```

### Client-Side Caching

```tsx
// Use SWR for data fetching with cache
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // 1 minute
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return <div>Hello {data.name}!</div>
}
```

---

## Database Performance

### Query Optimization

```typescript
// Bad - N+1 query problem
const users = await db.select().from(users)
for (const user of users) {
  const posts = await db.select().from(posts).where(eq(posts.userId, user.id))
}

// Good - Single query with join
const usersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(posts.userId, users.id))

// Use prepared statements for repeated queries
const getUserById = db
  .select()
  .from(users)
  .where(eq(users.id, placeholder('id')))
  .prepare('get_user_by_id')

const user = await getUserById.execute({ id: 123 })
```

### Database Indexing

```typescript
// Add indexes for frequently queried columns
import { index } from "drizzle-orm/pg-core"

export const posts = tableCreator("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userIdx: index("user_idx").on(table.userId),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
  titleIdx: index("title_idx").on(table.title),
}))
```

### Connection Pooling

```typescript
// Use connection pooling for Neon
import { neon, neonConfig } from "@neondatabase/serverless"

neonConfig.fetchConnectionCache = true

const sql = neon(process.env.DATABASE_URL!)
```

---

## API Performance

### API Route Optimization

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server"

// Enable caching
export const revalidate = 60 // Cache for 60 seconds

// Enable runtime edge for faster cold starts
export const runtime = 'edge'

export async function GET() {
  const users = await getUsers()

  return NextResponse.json(users, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
    }
  })
}
```

### Pagination

```typescript
// Implement cursor-based pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor')
  const limit = 20

  const posts = await db
    .select()
    .from(posts)
    .where(cursor ? gt(posts.id, Number(cursor)) : undefined)
    .limit(limit)
    .orderBy(desc(posts.id))

  return NextResponse.json({
    data: posts,
    nextCursor: posts.length === limit ? posts[posts.length - 1].id : null
  })
}
```

### Rate Limiting

```typescript
// Use rate limiting to prevent abuse
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  // Process request
}
```

---

## Third-Party Scripts

### Optimize Analytics

```tsx
// Google Analytics
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}

        {/* Load analytics after page is interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
```

### Partytown for Heavy Scripts

```bash
npm install @builder.io/partytown
```

```tsx
// next.config.js
module.exports = {
  experimental: {
    partytown: true,
  },
}

// Run scripts in web worker
<Script
  src="https://example.com/heavy-script.js"
  strategy="worker"
/>
```

---

## Performance Monitoring

### Web Vitals Tracking

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Custom Web Vitals Reporting

```typescript
// app/web-vitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  })
}

onCLS(sendToAnalytics)
onFID(sendToAnalytics)
onFCP(sendToAnalytics)
onLCP(sendToAnalytics)
onTTFB(sendToAnalytics)
```

---

## Performance Testing Tools

### Automated Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com"
```

### Testing Tools

**Development:**
- Chrome DevTools (Lighthouse, Performance tab)
- WebPageTest: https://www.webpagetest.org/
- PageSpeed Insights: https://pagespeed.web.dev/

**Monitoring:**
- Vercel Analytics
- Google Search Console (Core Web Vitals)
- Real User Monitoring (RUM) tools

---

## Performance Budget

Set and enforce performance budgets:

```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
  },
}
```

---

## Performance Checklist

Before deploying:

**Images:**
- [ ] All images optimized (WebP/AVIF)
- [ ] Images have width and height attributes
- [ ] Above-fold images use `priority`
- [ ] Using Next.js Image component
- [ ] Responsive images configured

**Fonts:**
- [ ] Fonts optimized with next/font
- [ ] Using font-display: swap
- [ ] Only loading necessary font weights

**JavaScript:**
- [ ] Code splitting implemented
- [ ] Heavy components lazy loaded
- [ ] Third-party scripts optimized
- [ ] Bundle size analyzed and optimized

**CSS:**
- [ ] Unused CSS removed
- [ ] Critical CSS inlined
- [ ] CSS minified

**Caching:**
- [ ] Static assets cached long-term
- [ ] API responses cached appropriately
- [ ] ISR configured for semi-static pages

**Core Web Vitals:**
- [ ] LCP < 2.5s
- [ ] FID < 100ms (INP < 200ms)
- [ ] CLS < 0.1

**Testing:**
- [ ] Lighthouse score > 90
- [ ] Tested on slow network (3G)
- [ ] Tested on low-end devices
- [ ] Real user monitoring configured

---

## Common Performance Mistakes

1. ❌ Not optimizing images
2. ❌ Loading entire libraries when only need small parts
3. ❌ No lazy loading for below-fold content
4. ❌ Blocking rendering with synchronous scripts
5. ❌ Not using CDN for static assets
6. ❌ No caching strategy
7. ❌ N+1 database queries
8. ❌ Not monitoring Core Web Vitals
9. ❌ Large JavaScript bundles
10. ❌ No compression (Gzip/Brotli)
11. ❌ Too many third-party scripts
12. ❌ Not using Next.js Image component
13. ❌ Missing image dimensions causing CLS
14. ❌ No font optimization
15. ❌ Not testing on real devices

---

## Resources

**Tools:**
- Chrome DevTools
- Lighthouse
- WebPageTest
- Bundle Analyzer
- Web Vitals Library

**Documentation:**
- Web.dev: https://web.dev/
- Next.js Performance: https://nextjs.org/docs/app/building-your-application/optimizing
- Vercel Analytics: https://vercel.com/analytics

**Remember**: Performance is not a one-time task. Continuously monitor, test, and optimize as your application grows.
