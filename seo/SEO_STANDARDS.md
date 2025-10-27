# SEO Standards

Comprehensive SEO guidelines for web agency and digital marketing projects to ensure maximum visibility and organic reach.

## Meta Tags & Basic SEO

### Essential Meta Tags

Every page must include these meta tags:

```tsx
// app/layout.tsx or individual pages
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Title - Brand Name",
  description: "Compelling description between 150-160 characters that includes target keywords and value proposition.",
  keywords: ["keyword1", "keyword2", "keyword3"], // Optional in modern SEO
  authors: [{ name: "Your Agency Name" }],
  creator: "Your Agency Name",
  publisher: "Your Agency Name",

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com/page",
    siteName: "Site Name",
    title: "OG Title - Can be different from page title",
    description: "OG description for social media sharing",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image description",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Twitter Title",
    description: "Twitter description",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
}
```

### Title Tag Best Practices

```tsx
// Homepage
title: "Brand Name - Tagline or Value Proposition"

// Service pages
title: "Service Name | Brand Name"

// Blog posts
title: "Article Title - Brand Name"

// Product pages
title: "Product Name - Category | Brand Name"
```

**Guidelines:**
- Keep under 60 characters (desktop) or 50 characters (mobile)
- Include primary keyword near the beginning
- Make it compelling and clickable
- Use pipe (|) or dash (-) as separators
- Include brand name at the end (except homepage)

### Meta Description Best Practices

```tsx
description: "Discover how our [service] helps [target audience] achieve [benefit]. Get started today with [unique value proposition]."
```

**Guidelines:**
- Keep between 150-160 characters
- Include target keyword naturally
- Include a call-to-action
- Make it compelling and benefit-focused
- Don't duplicate descriptions across pages
- Write for humans, not just search engines

---

## Open Graph & Social Media

### Image Requirements

**Open Graph Image (Facebook, LinkedIn):**
- Dimensions: 1200 x 630 pixels
- Aspect ratio: 1.91:1
- Format: JPG or PNG
- Max file size: 8MB
- Include branding and minimal text

**Twitter Card Image:**
- Dimensions: 1200 x 628 pixels (large card)
- Aspect ratio: 1.91:1
- Format: JPG, PNG, or WebP
- Max file size: 5MB

### Implementation Example

```tsx
// For specific pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://yourdomain.com/blog/${params.slug}`,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}
```

---

## Structured Data (Schema.org)

### Organization Schema

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "Company description",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-555-5555",
      "contactType": "Customer Service",
      "email": "contact@yourdomain.com"
    },
    "sameAs": [
      "https://facebook.com/yourcompany",
      "https://twitter.com/yourcompany",
      "https://linkedin.com/company/yourcompany",
      "https://instagram.com/yourcompany"
    ]
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Article Schema (Blog Posts)

```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "image": "https://yourdomain.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://yourdomain.com/author/author-name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/logo.png"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-20",
  "description": "Article description"
}
```

### Product Schema (E-commerce)

```tsx
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://yourdomain.com/product-image.jpg",
  "description": "Product description",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://yourdomain.com/product",
    "priceCurrency": "USD",
    "price": "99.99",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}
```

### Local Business Schema

```tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "image": "https://yourdomain.com/business-image.jpg",
  "url": "https://yourdomain.com",
  "telephone": "+1-555-555-5555",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ]
}
```

### FAQ Schema

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a 30-day money-back guarantee on all products."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer international shipping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we ship to over 50 countries worldwide."
      }
    }
  ]
}
```

---

## XML Sitemap

### Next.js Sitemap Generation

```tsx
// app/sitemap.ts
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourdomain.com"

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  // Dynamic pages (e.g., blog posts)
  const posts = await getPosts()
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages]
}
```

### Sitemap Best Practices

- Include all important pages
- Update `lastModified` dates accurately
- Set appropriate `changeFrequency`
- Use priority values (0.0 to 1.0) wisely
- Submit sitemap to Google Search Console
- Include in robots.txt

---

## Robots.txt

### Next.js Robots.txt

```tsx
// app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yourdomain.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "GPTBot", // OpenAI crawler
        disallow: ["/"], // Block if you don't want AI training on your content
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

---

## URL Structure

### Best Practices

**Good URLs:**
```
https://yourdomain.com/services/web-design
https://yourdomain.com/blog/seo-best-practices-2025
https://yourdomain.com/products/wireless-headphones
```

**Bad URLs:**
```
https://yourdomain.com/page?id=123
https://yourdomain.com/article_2025_01_15.html
https://yourdomain.com/SERVICES/Web-Design
```

### Guidelines

- Use lowercase letters
- Use hyphens (-) to separate words, not underscores (_)
- Keep URLs short and descriptive
- Include target keywords
- Avoid special characters
- Use consistent structure
- Implement breadcrumb hierarchy

### Canonical Tags

```tsx
// For duplicate or similar content
export const metadata: Metadata = {
  alternates: {
    canonical: "https://yourdomain.com/preferred-url",
  },
}
```

---

## Internal Linking Strategy

### Link Types

**Header Navigation:**
- Homepage link (logo)
- Main service/category pages
- About/Contact pages

**Footer Navigation:**
- Sitemap links
- Legal pages (Privacy, Terms)
- Social media profiles
- Contact information

**Contextual Links:**
- Related blog posts
- Service pages from blog content
- Product recommendations
- Resource pages

### Best Practices

```tsx
// Good internal linking
<Link href="/services/web-design">
  Learn more about our web design services
</Link>

// Bad internal linking
<Link href="/services/web-design">
  Click here
</Link>
```

**Guidelines:**
- Use descriptive anchor text
- Link to relevant related content
- Avoid excessive linking (2-5 per page ideal)
- Ensure all important pages are linked
- Use nofollow for untrusted content

---

## Image SEO

### Image Optimization

```tsx
import Image from "next/image"

<Image
  src="/product-image.jpg"
  alt="Wireless noise-cancelling headphones in black"
  width={800}
  height={600}
  loading="lazy" // or "eager" for above-fold images
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Alt Text Guidelines

**Good alt text:**
- Descriptive: "Red leather handbag with gold chain strap"
- Contextual: "Graph showing 50% increase in website traffic"
- Concise: Under 125 characters

**Bad alt text:**
- Generic: "image", "photo", "picture"
- Keyword stuffing: "buy handbags cheap handbags leather handbags"
- Empty: `alt=""`

**When to leave alt empty:**
- Decorative images with no informational value
- Images with adjacent text describing them

### File Naming

```
Good: blue-running-shoes-nike.jpg
Bad: IMG_1234.jpg, image-final-final-v2.jpg
```

---

## Page Speed & Core Web Vitals

### Performance Targets

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### SEO-Critical Performance

```tsx
// Priority loading for critical assets
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.google.com" />

// Preload critical resources
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
```

### Best Practices

- Optimize images (WebP/AVIF formats)
- Minimize JavaScript bundle size
- Use code splitting and lazy loading
- Implement caching strategies
- Use CDN for static assets
- Enable compression (Gzip/Brotli)

---

## Mobile SEO

### Mobile-First Indexing

Google primarily uses mobile version for indexing and ranking.

**Essential checks:**
- Responsive design (adapts to all screen sizes)
- Touch-friendly navigation (44x44px minimum)
- Readable text without zooming (16px minimum)
- Fast mobile load times
- No intrusive interstitials

### Mobile Viewport

```tsx
// Automatically included in Next.js, but verify
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

## Local SEO

### Google My Business

- Claim and verify your business
- Complete all profile information
- Add high-quality photos
- Collect and respond to reviews
- Post regular updates

### NAP Consistency

Ensure Name, Address, Phone are consistent across:
- Website footer
- Contact page
- Google My Business
- Social media profiles
- Business directories

### Local Schema Markup

Use `LocalBusiness` schema (see Structured Data section)

---

## Content SEO

### Heading Hierarchy

```tsx
<h1>Page Title - Use Once Per Page</h1>
<h2>Main Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>
```

**Guidelines:**
- One H1 per page (usually page title)
- Use headings in hierarchical order
- Include keywords naturally
- Make headings descriptive

### Keyword Optimization

**Keyword Placement:**
1. Title tag (high priority)
2. H1 heading
3. First paragraph
4. Subheadings (H2, H3)
5. Alt text for images
6. Meta description
7. URL slug

**Keyword Density:**
- Primary keyword: 1-2% of total content
- Focus on natural language
- Use variations and synonyms
- Avoid keyword stuffing

### Content Length

- **Homepage**: 300-500 words
- **Service pages**: 500-1000 words
- **Blog posts**: 1000-2000+ words
- **Product pages**: 300-500 words + specifications

**Quality over quantity** - prioritize value and readability.

---

## Technical SEO Checklist

### Essential Technical Elements

- [ ] SSL certificate installed (HTTPS)
- [ ] XML sitemap generated and submitted
- [ ] Robots.txt configured correctly
- [ ] Canonical tags implemented
- [ ] 404 error page customized
- [ ] 301 redirects for moved/deleted pages
- [ ] Schema markup implemented
- [ ] Page speed optimized (Core Web Vitals)
- [ ] Mobile-responsive design
- [ ] Structured data validated (Google Rich Results Test)
- [ ] Meta robots tags configured
- [ ] Hreflang tags (for international sites)
- [ ] Social media meta tags (OG, Twitter)
- [ ] Google Search Console configured
- [ ] Google Analytics installed

### Next.js Specific

```tsx
// app/not-found.tsx - Custom 404 page
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Return to homepage</Link>
    </div>
  )
}

// Redirects in next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
    ]
  },
}
```

---

## Analytics & Tracking

### Google Analytics 4

```tsx
// app/layout.tsx
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Meta Pixel (Facebook)

```tsx
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
    fbq('track', 'PageView');
  `}
</Script>
```

---

## SEO Tools & Resources

### Essential Tools

**Analysis:**
- Google Search Console
- Google Analytics 4
- Bing Webmaster Tools
- Ahrefs / SEMrush / Moz

**Testing:**
- Google PageSpeed Insights
- Google Mobile-Friendly Test
- Google Rich Results Test
- Schema.org Validator

**Research:**
- Google Keyword Planner
- AnswerThePublic
- Google Trends

### Monitoring

- Track keyword rankings weekly
- Monitor Core Web Vitals monthly
- Review Search Console for errors
- Check backlink profile monthly
- Monitor competitor rankings

---

## Common SEO Mistakes to Avoid

1. ❌ Duplicate meta descriptions
2. ❌ Missing or poor alt text
3. ❌ Broken internal links
4. ❌ Slow page load times
5. ❌ Non-mobile-friendly design
6. ❌ Thin or duplicate content
7. ❌ Missing canonical tags
8. ❌ Poor URL structure
9. ❌ Not submitting sitemap
10. ❌ Ignoring Search Console errors
11. ❌ Keyword stuffing
12. ❌ Missing structured data
13. ❌ No HTTPS certificate
14. ❌ Blocking important pages in robots.txt
15. ❌ Not tracking results

---

## SEO Checklist for New Pages

Before publishing any new page:

- [ ] Title tag optimized (< 60 characters)
- [ ] Meta description written (150-160 characters)
- [ ] URL is clean and descriptive
- [ ] H1 heading includes target keyword
- [ ] Content is 300+ words and valuable
- [ ] Images optimized with alt text
- [ ] Internal links added (2-5)
- [ ] Canonical tag set if needed
- [ ] Schema markup added
- [ ] Mobile responsive
- [ ] Page speed tested
- [ ] Open Graph tags configured
- [ ] Twitter card tags configured
- [ ] No broken links
- [ ] Added to sitemap
