# Content & Copywriting Guidelines

Standards for creating compelling, consistent, and conversion-focused content across all digital marketing and web agency projects.

## Content Principles

### 1. Clarity First
- Use simple, straightforward language
- Avoid jargon unless necessary for the audience
- One idea per sentence
- Short paragraphs (2-4 sentences)

### 2. User-Focused
- Write for your audience, not for yourself
- Address user pain points and needs
- Use "you" and "your" (second person)
- Show benefits, not just features

### 3. Action-Oriented
- Use active voice
- Include clear calls-to-action
- Make next steps obvious
- Create urgency when appropriate

### 4. Authenticity
- Be genuine and honest
- Don't make promises you can't keep
- Show real examples and results
- Use conversational tone while maintaining professionalism

---

## Tone of Voice

### Framework

Your brand's tone should be:

**Professional but Approachable**
- Sound expert without being stuffy
- Friendly without being too casual
- Confident without being arrogant

**Example Tone Spectrum:**

| Too Formal | Just Right | Too Casual |
|------------|------------|------------|
| "We hereby inform you..." | "We'll let you know..." | "Yo, heads up..." |
| "Utilize our services" | "Use our services" | "Try our stuff" |
| "Commence the process" | "Get started" | "Let's do this!" |

### Tone Variations by Context

**Homepage/Marketing Pages:**
- Confident and inspiring
- Focus on benefits and transformation
- Energetic and engaging

**About Page:**
- Warm and authentic
- Tell your story
- Build trust and connection

**Service/Product Pages:**
- Clear and informative
- Benefit-focused
- Professional and credible

**Blog Posts:**
- Educational and helpful
- Conversational and engaging
- Expert but accessible

**Error Messages:**
- Empathetic and helpful
- Clear about what happened
- Guide toward solution

**Success Messages:**
- Positive and encouraging
- Confirm the action
- Suggest next steps

---

## Writing for Web

### Scannable Content

Most users scan rather than read. Make content scannable:

**Use:**
- Short paragraphs (2-4 sentences)
- Bulleted lists
- Subheadings (H2, H3)
- Bold text for emphasis
- White space generously

**Example:**

```
Bad:
Our company provides a comprehensive suite of digital marketing services including search engine optimization, pay-per-click advertising, social media marketing, content marketing, email marketing, and web design and development services for small to medium-sized businesses who want to grow their online presence and increase their revenue through effective digital strategies.

Good:
We help businesses grow online with:
• Search engine optimization (SEO)
• Pay-per-click advertising (PPC)
• Social media marketing
• Content marketing
• Email marketing
• Web design & development

Our strategies are designed for small to medium-sized businesses ready to increase their online presence and revenue.
```

### F-Pattern Reading

Users typically scan in an F-pattern:
1. Horizontal movement across top (headline)
2. Vertical movement down left side
3. Horizontal movement across middle (subheading)

**Optimize for this:**
- Front-load important information
- Use strong headlines and subheadings
- Put key points at the start of paragraphs
- Use left-aligned text

### Inverted Pyramid

Start with the most important information:

1. **Lead**: Most important info (who, what, when, where, why)
2. **Body**: Supporting details and context
3. **Tail**: Background information and nice-to-haves

---

## Headlines & Headings

### Homepage Headlines

**Formula: [Benefit] + [For Whom] + [How/Why]**

```
Good Examples:
"Grow Your Business Online with Data-Driven Marketing"
"Web Design That Converts Visitors into Customers"
"Digital Marketing Services for Growing Businesses"

Bad Examples:
"Welcome to Our Website" (generic)
"We Are Digital Marketing Experts" (about you, not them)
"Best Solutions for Your Needs" (vague)
```

### Headline Best Practices

- Keep under 70 characters
- Include primary keyword (for SEO)
- Promise a clear benefit
- Be specific, not vague
- Create curiosity or urgency
- Use numbers when possible ("5 Ways to...", "30-Day Guide...")

### Subheadings

Use subheadings (H2, H3) to:
- Break up long content
- Guide scanners
- Include secondary keywords
- Promise value in each section

---

## Calls-to-Action (CTAs)

### Button Copy

**Good CTAs:**
- "Start Your Free Trial"
- "Get Your Free Quote"
- "Download the Guide"
- "See How It Works"
- "Schedule a Demo"
- "Join 10,000+ Users"

**Bad CTAs:**
- "Submit" (not benefit-focused)
- "Click Here" (not descriptive)
- "Learn More" (overused, vague)
- "Enter" (unclear)

### CTA Best Practices

1. **Use action verbs**: Start with strong verbs (Get, Start, Join, Download, Discover)
2. **Be specific**: Tell users exactly what they'll get
3. **Create urgency**: "Start Today", "Limited Time Offer"
4. **Reduce friction**: "No credit card required", "Free forever"
5. **Use first person**: "Start My Free Trial" (more engaging than "Start Your Free Trial")

### Primary vs Secondary CTAs

**Primary CTA** (most important action):
```tsx
<Button size="lg" variant="default">
  Start Free Trial
</Button>
```

**Secondary CTA** (alternative action):
```tsx
<Button size="lg" variant="outline">
  Watch Demo
</Button>
```

### CTA Placement

- Above the fold (hero section)
- After explaining value propositions
- At the end of long content
- In the navigation (for conversions)
- Repeated in sticky header or sidebar

---

## Microcopy

Microcopy is the small text that guides users through interactions.

### Form Field Placeholders

```tsx
// Good - helpful and specific
<Input type="email" placeholder="you@company.com" />
<Input type="tel" placeholder="(555) 123-4567" />

// Bad - redundant or unclear
<Input type="email" placeholder="Enter email" />
<Input type="tel" placeholder="Phone number" />
```

### Form Labels & Help Text

```tsx
// Good - clear and helpful
<label>Work Email</label>
<Input type="email" />
<p className="text-sm text-gray-600">
  We'll never share your email with third parties
</p>

// Good - reduce anxiety
<label>Credit Card</label>
<Input type="text" />
<p className="text-sm text-gray-600">
  Secure payment powered by Stripe. We don't store your card details.
</p>
```

### Error Messages

```tsx
// Good - specific and helpful
"Please enter a valid email address (example: you@company.com)"
"Password must be at least 8 characters with one uppercase letter"
"This username is already taken. Try adding numbers or underscores."

// Bad - unclear or scary
"Invalid input" (not specific)
"Error 403" (technical jargon)
"Wrong!" (not helpful)
```

### Success Messages

```tsx
// Good - confirm and guide
"Account created! Check your email to verify your address."
"Message sent! We'll respond within 24 hours."
"Settings saved successfully."

// Okay but could be better
"Success!" (generic)
"Done." (no confirmation or next steps)
```

### Empty States

```tsx
// Good - encouraging and actionable
"No projects yet. Create your first project to get started!"
"Your inbox is empty. Great work staying on top of messages!"

// Bad - discouraging
"Nothing here"
"No data found"
```

### Loading States

```tsx
// Good - informative
"Loading your dashboard..."
"Uploading image (2 of 5)..."
"Generating your report... This may take up to 30 seconds."

// Okay but generic
"Loading..."
"Please wait..."
```

---

## Content Types

### Homepage Content

**Hero Section:**
```
Headline: Clear value proposition (8-12 words)
Subheadline: Expand on headline (15-25 words)
CTA: Primary action button
Visual: Supporting image/video
```

**Social Proof:**
- Client logos
- Testimonials (name, photo, company)
- Statistics (users, ratings, results)

**Features/Benefits:**
- 3-6 key benefits
- Use icons
- Benefit-focused headlines
- Brief descriptions (20-40 words each)

**How It Works:**
- 3-4 simple steps
- Use numbers
- Visual representation
- End with CTA

**Closing CTA:**
- Reinforce main value proposition
- Strong call-to-action
- Address final objections

### Service/Product Pages

**Structure:**
1. Headline + subheadline
2. Hero image/video
3. Key benefits (3-5 points)
4. Features with descriptions
5. Social proof (testimonials, case studies)
6. FAQ section
7. Pricing (if applicable)
8. Strong closing CTA

**Content Tips:**
- Lead with benefits, follow with features
- Use "you" language
- Include specific results/outcomes
- Address common objections
- Show, don't just tell (use visuals, examples)

### About Page

**Include:**
- Company story (why you started)
- Mission and values
- Team photos and bios
- Company culture
- Milestones and achievements
- What makes you different

**Avoid:**
- Too much history (focus on relevant story)
- Corporate jargon
- Making it all about you (connect to customer needs)

### Blog Posts

**Structure:**
1. Compelling headline
2. Brief introduction (hook + what they'll learn)
3. Table of contents (for long posts)
4. Body with H2/H3 subheadings
5. Examples, images, data
6. Actionable takeaways
7. Conclusion
8. CTA (related service, newsletter signup, etc.)

**Best Practices:**
- Write 1,000-2,000+ words for SEO
- Include images (at least one per section)
- Use short paragraphs
- Add internal links (to other blog posts/pages)
- Include author bio
- Enable comments or social sharing

### Landing Pages

**Purpose**: Convert visitors (single focused goal)

**Structure:**
1. Strong headline (match ad copy if from ads)
2. Subheadline
3. Hero image/video
4. Benefits (3-5 points)
5. Social proof
6. Simple form or CTA
7. Address objections
8. Final CTA

**Best Practices:**
- Remove navigation (reduce distractions)
- One clear CTA repeated
- Match messaging to traffic source
- Mobile-optimized
- Fast loading

---

## SEO Copywriting

### Keyword Integration

**Natural Integration:**
```
Good:
"Our web design services help small businesses create professional websites that attract customers and drive sales."

Bad (keyword stuffing):
"Our web design services are the best web design services for web design. We offer web design services for all web design needs."
```

### Meta Titles & Descriptions

See SEO_STANDARDS.md for detailed guidance.

**Quick Tips:**
- Title: Primary keyword + benefit + brand
- Description: Expand on title, include CTA
- Make them compelling to click

### Content Length

**Minimum Recommendations:**
- Homepage: 300-500 words
- Service pages: 500-1,000 words
- Blog posts: 1,000-2,000+ words
- Product pages: 300-500 words + specs

**Quality > Quantity**: Don't add fluff just to hit word count.

---

## Email Marketing Copy

### Subject Lines

**Best Practices:**
- Keep under 50 characters (mobile)
- Create curiosity or urgency
- Personalize when possible
- Avoid spam trigger words (FREE, ACT NOW, !!!)
- Test different approaches

**Examples:**
```
Good:
"[Name], your exclusive invite inside 🎁"
"Last chance: 50% off ends tonight"
"5 mistakes you're making with SEO"

Bad:
"Newsletter #47" (not compelling)
"AMAZING OFFER FREE BUY NOW!!!" (spam triggers)
```

### Email Body

**Structure:**
1. Personal greeting
2. Hook (why they should keep reading)
3. Value/content
4. Clear CTA
5. P.S. (often gets high engagement)

**Tips:**
- Write conversationally
- Use short paragraphs
- One primary CTA
- Mobile-friendly (short lines, big buttons)
- Include unsubscribe link

---

## Social Media Copy

### Platform-Specific Guidelines

**LinkedIn:**
- Professional tone
- Industry insights
- Longer posts okay (1,000-2,000 characters)
- Use first-person storytelling
- End with question to drive engagement

**Instagram:**
- Visual-first (image is priority)
- Casual, authentic tone
- Hashtags: 5-10 relevant ones
- Line breaks for readability
- Strong first line (before "more")

**Facebook:**
- Conversational tone
- Questions drive engagement
- Shorter posts perform better (40-80 characters)
- Use emojis sparingly
- Include link in first comment (better reach)

**Twitter/X:**
- Concise (280 characters max)
- Use hashtags (1-2)
- Visual content increases engagement
- Thread for longer content
- Engage with replies

### Hashtag Strategy

**Best Practices:**
- Research relevant hashtags
- Mix popular (#marketing) and niche (#B2Bmarketing)
- Create branded hashtag
- Don't overuse (looks spammy)
- Placement: end of post or first comment

---

## Voice & Grammar

### Active vs Passive Voice

```
Passive: "The website was designed by our team."
Active: "Our team designed the website." ✅

Passive: "Results can be achieved through our methods."
Active: "Our methods achieve results." ✅
```

### Common Grammar Rules

**Contractions:**
- Use them (they're, we'll, don't) - sounds more conversational
- Okay in all content except legal pages

**Numbers:**
- Spell out one through nine
- Use numerals for 10+
- Exception: Start of sentence, always spell out

**Dates:**
- Month Day, Year: January 15, 2025
- No ordinals: January 15 (not January 15th)

**Time:**
- Include timezone: "9 AM EST"
- Use AM/PM (not a.m./p.m.)

### Words to Avoid

**Weak Words:**
- Very, really, just, maybe, perhaps
- "I think", "I believe" (be confident)

**Jargon:**
- "Leverage", "synergy", "solutions"
- "Best in class", "world-class"
- "Cutting-edge", "innovative" (overused)

**Vague Terms:**
- "Great", "good", "quality"
- "Various", "different", "several"
- Replace with specifics

---

## Formatting Guidelines

### Lists

**Bulleted Lists:**
- Use for unordered items
- Keep items parallel in structure
- Don't overuse (readers tune out)
- Start each item with capital letter
- No period if incomplete sentence

**Numbered Lists:**
- Use for sequential steps
- Use for rankings
- Use for specific quantities ("5 Ways...")

### Emphasis

**Bold:**
- Key concepts
- Important warnings
- Subheadings in paragraphs

**Italics:**
- Book/article titles
- Emphasis (use sparingly)
- Foreign words

**ALL CAPS:**
- Avoid (seems like shouting)
- Exception: acronyms (SEO, CTA, HTML)

### Links

```
Good:
"Read our complete guide to SEO"
"Download the free template"

Bad:
"Click here to read more"
"For more information, visit this page"
```

---

## Content Checklist

Before publishing any content:

**Clarity:**
- [ ] Purpose is clear
- [ ] Target audience is defined
- [ ] Main message is obvious
- [ ] Jargon is removed or explained

**Structure:**
- [ ] Clear headline
- [ ] Scannable (subheadings, lists, short paragraphs)
- [ ] Logical flow
- [ ] Conclusion/summary included

**Voice & Tone:**
- [ ] Consistent with brand voice
- [ ] Appropriate for audience
- [ ] Active voice used
- [ ] Conversational but professional

**Action:**
- [ ] Clear CTA included
- [ ] Next steps are obvious
- [ ] Benefits are highlighted
- [ ] Urgency or incentive (when appropriate)

**SEO:**
- [ ] Target keyword included naturally
- [ ] Meta title optimized (< 60 characters)
- [ ] Meta description compelling (150-160 characters)
- [ ] Internal links included
- [ ] Images have alt text

**Accuracy:**
- [ ] Facts checked
- [ ] Links work
- [ ] Contact info current
- [ ] No typos or grammar errors
- [ ] Formatting consistent

**Accessibility:**
- [ ] Headings used properly (H1, H2, H3)
- [ ] Links descriptive
- [ ] Plain language used
- [ ] Alternative formats provided (if needed)

---

## Content Templates

### Product/Service Feature Description

```
[Feature Name]

[One-sentence description of what it does]

Benefits:
• [Benefit 1]: How it helps the user
• [Benefit 2]: Another way it helps
• [Benefit 3]: Additional value

[Example use case or social proof]

[CTA related to this feature]
```

### Testimonial Format

```
"[Specific result or transformation in customer's words]"

— [Customer Name]
[Title], [Company]
[Optional: Customer photo and company logo]
```

### FAQ Format

```
Q: [Question in natural language, how users would ask]

A: [Clear, direct answer in 2-4 sentences. Include relevant links to detailed pages if needed.]
```

### Blog Post Outline

```
# [Compelling Headline with Benefit/Number]

[Introduction: Hook + promise of what they'll learn]

## [H2 Subheading - First Main Point]
[Content with examples, images]

## [H2 Subheading - Second Main Point]
[Content with examples, images]

## [H2 Subheading - Third Main Point]
[Content with examples, images]

## Conclusion
[Summary of key takeaways]

[CTA to related service or resource]
```

---

## Resources

### Writing Tools
- **Grammar**: Grammarly, Hemingway Editor
- **Readability**: Readable.com, Hemingway App
- **SEO**: Yoast SEO, Surfer SEO, Clearscope
- **Headline**: CoSchedule Headline Analyzer

### Inspiration
- Competitor websites
- Top-performing blog posts in your niche
- Marketing email swipe files
- Landing page galleries (Unbounce, Instapage)

### Style Guides
- AP Stylebook (journalism standard)
- Chicago Manual of Style
- Your own brand style guide (create one!)

---

## Final Thoughts

**Good content:**
- Solves problems
- Answers questions
- Builds trust
- Drives action
- Is easy to consume
- Reflects your brand

**Remember**: You're not writing to impress, you're writing to communicate clearly and persuade effectively. When in doubt, make it simpler.
