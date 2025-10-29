# AI Context Database

A centralized repository of standards, guidelines, and best practices for AI-assisted development in web agency and digital marketing projects.

## Purpose

This repository serves as a **context database** for AI development assistants (like Claude, GitHub Copilot, Cursor, etc.) to ensure consistent, high-quality code and content across all agency projects.

By providing this context to AI assistants, we ensure:
- Consistent code style and architecture
- Adherence to industry best practices
- SEO-optimized and accessible web applications
- High-performance, user-friendly digital experiences
- Brand-consistent design implementations

## How to Use

### Quick Start with CLI Tool

The easiest way to use these standards is with our CLI tool:

**Option 1: Install Globally (Recommended)**
```bash
npm install -g https://github.com/Mahusaa/AI-Context.git
ai-context
```

**Option 2: Use with npx (No Installation)**
```bash
npx https://github.com/Mahusaa/AI-Context.git
```

**Option 3: Clone and Run Locally**
```bash
git clone https://github.com/Mahusaa/AI-Context.git
cd Database-Readme
npm install
npm start
```

The CLI tool will:
1. Present an interactive multi-select menu of available standards
2. Allow you to select multiple standards at once using spacebar
3. Fetch the selected standard(s) directly from GitHub
4. Automatically create an `ai-context/` folder in your current directory
5. Save each standard as a separate file with a fixed name
6. Make it easy to provide context to your AI assistant

**Example Usage:**
```bash
ai-context
# Use space to select multiple standards (e.g., Coding Standards, Design Standards)
# Press enter to confirm
# Files are automatically saved to ./ai-context/ folder:
#   - coding-standards.md
#   - design-standards.md
# Copy and paste these files into your AI chat as needed
```

**Output Files:**
- `coding-standards.md` - Coding conventions and TypeScript guidelines
- `design-standards.md` - UI/UX and design system guidelines
- `seo-standards.md` - SEO best practices and optimization
- `accessibility-standards.md` - WCAG compliance and a11y guidelines
- `content-guidelines.md` - Copywriting and content structure
- `performance-standards.md` - Web vitals and optimization strategies

### For Development Teams

1. **Clone this repository** alongside your project
2. **Reference these standards** when providing context to AI assistants
3. **Link to specific standards** in pull request reviews or code comments
4. **Update standards** as the team evolves best practices

### For AI Assistants

When working on web agency or digital marketing projects, use these documents as reference for:
- Code structure and naming conventions
- Design system implementation
- SEO optimization strategies
- Accessibility requirements
- Performance benchmarks
- Content and copywriting tone

## Repository Structure

```
database-readme/
├── coding-rule/
│   └── CODING_STANDART.md       # Code conventions, file naming, TypeScript guidelines
├── design/
│   └── DESIGN_STANDARDS.md      # UI/UX, branding, design system guidelines
├── seo/
│   └── SEO_STANDARDS.md         # SEO best practices, meta tags, structured data
├── accessibility/
│   └── ACCESSIBILITY_STANDARDS.md  # WCAG compliance, a11y guidelines
├── content/
│   └── CONTENT_GUIDELINES.md    # Copywriting, tone of voice, content structure
├── performance/
│   └── PERFORMANCE_STANDARDS.md # Web vitals, optimization, loading strategies
└── README.md                    # This file
```

## Standards Included

### 1. Coding Standards
- File naming conventions (kebab-case)
- Component structure (React/Next.js)
- TypeScript guidelines
- Database conventions (Drizzle ORM + Neon DB)
- Git commit conventions

### 2. Design Standards
- Design system principles
- Color palette and typography
- Component design patterns
- Responsive design breakpoints
- Brand consistency guidelines

### 3. SEO Standards
- Meta tags and Open Graph
- Structured data (Schema.org)
- XML sitemaps and robots.txt
- URL structure and canonical tags
- Performance optimization for SEO

### 4. Accessibility Standards
- WCAG 2.1 Level AA compliance
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility

### 5. Content Guidelines
- Tone of voice
- Writing style for web
- Call-to-action best practices
- Microcopy guidelines
- Content structure and hierarchy

### 6. Performance Standards
- Core Web Vitals targets
- Image optimization
- Code splitting and lazy loading
- Caching strategies
- Third-party script management

## Contributing

When adding or updating standards:

1. Ensure clarity and examples are provided
2. Keep content actionable and specific
3. Update this README if adding new categories
4. Follow the existing document structure
5. Test guidelines with real projects before committing

## Tech Stack Reference

Our projects typically use:
- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Neon DB (PostgreSQL) with Drizzle ORM
- **Deployment**: Vercel, Netlify
- **Analytics**: Google Analytics 4, Meta Pixel
- **CMS**: Contentful, Sanity, or custom headless solutions

## License

Internal use only for agency projects.

## Questions or Feedback?

Contact the development team lead or open an issue in this repository.
