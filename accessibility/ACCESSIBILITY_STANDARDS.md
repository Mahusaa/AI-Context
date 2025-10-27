# Accessibility Standards

Comprehensive guidelines to ensure all web projects are accessible to everyone, including people with disabilities. We aim for WCAG 2.1 Level AA compliance as a minimum.

## Why Accessibility Matters

- **Legal Compliance**: ADA, Section 508, and other regulations
- **Wider Audience**: 15% of the world has some form of disability
- **Better UX**: Accessible sites are easier for everyone to use
- **SEO Benefits**: Many accessibility practices improve SEO
- **Brand Reputation**: Shows commitment to inclusivity

---

## WCAG 2.1 Principles (POUR)

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

### 2. Operable
UI components and navigation must be operable by all users.

### 3. Understandable
Information and operation of UI must be understandable.

### 4. Robust
Content must be robust enough to work with assistive technologies.

---

## Color & Contrast

### Contrast Ratios (WCAG AA)

**Normal Text:**
- Minimum: 4.5:1 contrast ratio
- Size: Under 18px (or under 14px bold)

**Large Text:**
- Minimum: 3:1 contrast ratio
- Size: 18px and larger (or 14px bold and larger)

**UI Components & Graphics:**
- Minimum: 3:1 contrast ratio
- Applies to: icons, borders, form inputs, focus indicators

### Testing Tools

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Lighthouse accessibility audit
- Figma plugins: Stark, A11y - Color Contrast Checker

### Implementation

```tsx
// Good - Sufficient contrast
<p className="text-gray-900 bg-white">
  High contrast text (21:1 ratio)
</p>

// Good - Large text with 3:1 ratio
<h1 className="text-4xl text-gray-600 bg-white">
  Large heading (3.8:1 ratio)
</h1>

// Bad - Insufficient contrast
<p className="text-gray-400 bg-white">
  Low contrast text (2.5:1 ratio) ❌
</p>
```

### Color Blindness

Don't rely solely on color to convey information:

```tsx
// Bad - Color only
<span className="text-red-500">Error</span>
<span className="text-green-500">Success</span>

// Good - Color + icon + text
<span className="text-red-500 flex items-center gap-2">
  <AlertCircle className="h-4 w-4" />
  Error: Form submission failed
</span>
```

**Design for color blindness:**
- Use patterns/textures in addition to color
- Add icons alongside color-coded items
- Use multiple visual cues (color + text + icons)
- Test with color blindness simulators

---

## Semantic HTML

Use HTML elements for their intended purpose:

### Good Examples

```tsx
// Navigation
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Main content
<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>

// Buttons and links
<button onClick={handleSubmit}>Submit Form</button>
<a href="/page">Navigate to page</a>

// Form labels
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

### Bad Examples

```tsx
// Don't use divs for everything
<div onClick={handleClick}>Click me</div> ❌

// Use button instead
<button onClick={handleClick}>Click me</button> ✅

// Don't use divs for navigation
<div className="nav">
  <div className="link">Home</div>
</div> ❌

// Use semantic nav elements
<nav>
  <a href="/">Home</a>
</nav> ✅
```

---

## Heading Hierarchy

### Proper Structure

```tsx
<h1>Page Title (Only one per page)</h1>

<h2>Main Section</h2>
<p>Content...</p>

<h3>Subsection</h3>
<p>Content...</p>

<h3>Another Subsection</h3>
<p>Content...</p>

<h2>Another Main Section</h2>
<p>Content...</p>
```

### Rules

- Use only one `<h1>` per page
- Don't skip heading levels (h1 → h2 → h3, not h1 → h3)
- Use headings for structure, not styling
- Screen readers use headings for navigation

### Testing

```tsx
// Bad - skipping levels
<h1>Title</h1>
<h3>Subsection</h3> ❌

// Good - proper hierarchy
<h1>Title</h1>
<h2>Section</h2>
<h3>Subsection</h3> ✅
```

---

## ARIA (Accessible Rich Internet Applications)

### When to Use ARIA

**First Rule of ARIA:**
> Don't use ARIA if you can use native HTML instead.

```tsx
// Bad - unnecessary ARIA
<div role="button" onClick={handleClick}>Click me</div>

// Good - native HTML
<button onClick={handleClick}>Click me</button>
```

### Common ARIA Attributes

#### aria-label

Use when visible text isn't descriptive enough:

```tsx
// Icon-only button
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Search button
<button aria-label="Search">
  <Search className="h-5 w-5" />
</button>
```

#### aria-labelledby

Reference another element's text as the label:

```tsx
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  <p>Are you sure you want to delete this item?</p>
</div>
```

#### aria-describedby

Provide additional description:

```tsx
<input
  id="password"
  type="password"
  aria-describedby="password-requirements"
/>
<p id="password-requirements">
  Password must be at least 8 characters
</p>
```

#### aria-live

Announce dynamic content changes:

```tsx
// Polite - announces when user is idle
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

// Assertive - announces immediately
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

#### aria-expanded

Indicate expandable/collapsible elements:

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu {isOpen ? '▲' : '▼'}
</button>
<div id="dropdown-menu" hidden={!isOpen}>
  {/* Menu items */}
</div>
```

#### aria-hidden

Hide decorative elements from screen readers:

```tsx
// Decorative icon (with meaningful text nearby)
<div className="flex items-center gap-2">
  <Star className="h-4 w-4" aria-hidden="true" />
  <span>Featured</span>
</div>
```

### ARIA Roles

```tsx
// Navigation landmark
<nav role="navigation">
  {/* Nav items */}
</nav>

// Main content landmark
<main role="main">
  {/* Main content */}
</main>

// Alert
<div role="alert">
  {errorMessage}
</div>

// Dialog/Modal
<div role="dialog" aria-modal="true">
  {/* Dialog content */}
</div>

// Tab interface
<div role="tablist">
  <button role="tab" aria-selected={true}>Tab 1</button>
  <button role="tab" aria-selected={false}>Tab 2</button>
</div>
```

---

## Keyboard Navigation

### Focus Management

All interactive elements must be keyboard accessible:

```tsx
// Ensure custom interactive elements are focusable
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Custom Button
</div>
```

### Focus Indicators

Always show visible focus indicators:

```css
/* Good - Clear focus indicator */
button:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

/* Bad - Removed focus indicator */
button:focus {
  outline: none; /* ❌ Never do this */
}
```

### Focus Order

Ensure logical tab order:

```tsx
// Bad - confusing tab order
<div>
  <button tabIndex={3}>Third</button>
  <button tabIndex={1}>First</button>
  <button tabIndex={2}>Second</button>
</div>

// Good - natural tab order (no tabIndex needed)
<div>
  <button>First</button>
  <button>Second</button>
  <button>Third</button>
</div>
```

### Focus Trapping (Modals)

Trap focus inside modals:

```tsx
import { Dialog, DialogContent } from "@/components/ui/dialog"

// shadcn/ui Dialog automatically handles focus trapping
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    {/* Focus is trapped within dialog */}
    <input type="text" />
    <button>Cancel</button>
    <button>Submit</button>
  </DialogContent>
</Dialog>
```

### Skip Links

Provide skip navigation links:

```tsx
// At the very top of page
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
>
  Skip to main content
</a>

<nav>{/* Navigation */}</nav>

<main id="main-content">
  {/* Main content */}
</main>
```

---

## Forms

### Labels

Always associate labels with inputs:

```tsx
// Method 1: htmlFor + id
<label htmlFor="email">Email Address</label>
<input id="email" type="email" name="email" />

// Method 2: Wrapping
<label>
  Email Address
  <input type="email" name="email" />
</label>
```

### Required Fields

Indicate required fields clearly:

```tsx
<label htmlFor="name">
  Full Name <span className="text-red-500" aria-label="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>
```

### Error Messages

Provide clear, accessible error messages:

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert" className="text-red-500">
      Please enter a valid email address
    </p>
  )}
</div>
```

### Field Instructions

Provide helpful instructions:

```tsx
<label htmlFor="password">Password</label>
<input
  id="password"
  type="password"
  aria-describedby="password-requirements"
/>
<p id="password-requirements" className="text-sm text-gray-600">
  Must be at least 8 characters with one uppercase letter and one number
</p>
```

### Fieldsets & Legends

Group related form fields:

```tsx
<fieldset>
  <legend>Shipping Address</legend>
  <label htmlFor="street">Street</label>
  <input id="street" type="text" />

  <label htmlFor="city">City</label>
  <input id="city" type="text" />
</fieldset>
```

---

## Images

### Alt Text

Every `<img>` must have alt text:

```tsx
// Meaningful image
<Image
  src="/product.jpg"
  alt="Blue running shoes with white stripes"
  width={400}
  height={300}
/>

// Decorative image
<Image
  src="/decoration.jpg"
  alt=""
  width={400}
  height={300}
  aria-hidden="true"
/>

// Complex image (chart, diagram)
<figure>
  <Image
    src="/sales-chart.jpg"
    alt="Bar chart showing sales increase"
    width={800}
    height={400}
  />
  <figcaption>
    Sales increased 50% from January ($10k) to December ($15k) in 2024
  </figcaption>
</figure>
```

### Alt Text Guidelines

**Do:**
- Describe the content and function
- Keep it concise (< 125 characters)
- Include relevant context
- Leave decorative images empty: `alt=""`

**Don't:**
- Say "image of" or "picture of"
- Stuff with keywords
- Leave alt attribute missing entirely
- Describe decorative images

---

## Links

### Descriptive Link Text

```tsx
// Bad - not descriptive
<a href="/services">Click here</a>
<a href="/report.pdf">Read more</a>

// Good - descriptive
<a href="/services">View our services</a>
<a href="/report.pdf">Download 2024 annual report (PDF, 2MB)</a>
```

### External Links

Indicate when links open in new windows:

```tsx
<a
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Visit external site
  <span className="sr-only">(opens in new window)</span>
</a>
```

### Links vs Buttons

```tsx
// Links - navigate to different pages/sections
<a href="/about">About Us</a>

// Buttons - perform actions on current page
<button onClick={handleSubmit}>Submit Form</button>
<button onClick={() => setIsOpen(true)}>Open Modal</button>
```

---

## Tables

### Accessible Data Tables

```tsx
<table>
  <caption>Monthly Sales Report 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
      <td>5%</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>$12,000</td>
      <td>20%</td>
    </tr>
  </tbody>
</table>
```

### Table Guidelines

- Use `<caption>` to describe table purpose
- Use `<th>` for header cells with `scope` attribute
- Keep tables simple (avoid nested tables)
- Make tables responsive (scroll or stack on mobile)

---

## Media (Audio/Video)

### Video Accessibility

```tsx
<video controls>
  <source src="/video.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/captions-en.vtt"
    srclang="en"
    label="English"
    default
  />
  <track
    kind="subtitles"
    src="/subtitles-es.vtt"
    srclang="es"
    label="Español"
  />
  Your browser doesn't support video.
</video>
```

### Requirements

**Video:**
- Provide captions for all speech and sounds
- Provide audio description for visual content
- Ensure controls are keyboard accessible
- Don't autoplay with sound

**Audio:**
- Provide transcript
- Ensure player controls are accessible

---

## Loading States & Progress

### Loading Indicators

```tsx
// Spinner with aria-label
<div role="status" aria-label="Loading content">
  <Loader className="animate-spin" aria-hidden="true" />
  <span className="sr-only">Loading...</span>
</div>

// Progress bar
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Upload progress"
>
  <div style={{ width: `${progress}%` }} />
</div>
```

### Live Regions

Announce dynamic updates:

```tsx
// Success message
<div role="status" aria-live="polite">
  {successMessage && <p>{successMessage}</p>}
</div>

// Error alert
<div role="alert" aria-live="assertive">
  {errorMessage && <p>{errorMessage}</p>}
</div>
```

---

## Mobile Accessibility

### Touch Targets

Minimum touch target size: 44x44 pixels

```tsx
// Bad - too small
<button className="w-8 h-8">X</button>

// Good - adequate size
<button className="w-11 h-11 flex items-center justify-center">
  <X className="h-5 w-5" />
</button>
```

### Gestures

Provide alternatives to complex gestures:

```tsx
// Swipe to delete with alternative
<div className="flex items-center gap-2">
  <span>Item (swipe left to delete)</span>
  <button aria-label="Delete item">
    <Trash className="h-4 w-4" />
  </button>
</div>
```

### Orientation

Support both portrait and landscape:

```css
/* Don't lock orientation */
/* Ensure content works in both orientations */
```

---

## Screen Reader Testing

### Screen Reader Only Content

```tsx
// CSS class for screen reader only text
<span className="sr-only">Additional context for screen readers</span>
```

```css
/* Tailwind's sr-only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Make visible on focus */
.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Testing Tools

**Screen Readers:**
- **Windows**: NVDA (free), JAWS (paid)
- **Mac**: VoiceOver (built-in)
- **iOS**: VoiceOver (built-in)
- **Android**: TalkBack (built-in)

**Basic Testing:**
- Navigate page with Tab key only
- Use screen reader to navigate headings
- Test forms with screen reader
- Test modals and dynamic content

---

## Accessibility Testing Checklist

### Automated Testing

```tsx
// Install testing library
npm install -D @axe-core/react

// Add to app (development only)
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000)
  })
}
```

### Manual Testing

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Heading hierarchy is correct (one h1, no skipped levels)
- [ ] All text can be zoomed to 200% without breaking layout
- [ ] No content relies on color alone
- [ ] Skip navigation link is present
- [ ] ARIA attributes are used correctly (not overused)
- [ ] Dynamic content announces changes
- [ ] Modals trap focus
- [ ] Forms show clear error messages
- [ ] Video has captions
- [ ] Links have descriptive text
- [ ] Tables have proper headers
- [ ] Touch targets are at least 44x44px
- [ ] Page works with screen reader
- [ ] Page works with keyboard only

### Testing Tools

**Browser Extensions:**
- axe DevTools
- WAVE (Web Accessibility Evaluation Tool)
- Lighthouse (Chrome DevTools)

**Online Testers:**
- WAVE: https://wave.webaim.org/
- WebAIM Contrast Checker
- HTML validator: https://validator.w3.org/

**Code Analysis:**
- ESLint plugin: eslint-plugin-jsx-a11y
- Lighthouse CI for automated testing

---

## Common Accessibility Mistakes

1. ❌ Missing alt text on images
2. ❌ Poor color contrast
3. ❌ Missing form labels
4. ❌ No keyboard navigation support
5. ❌ Removing focus indicators
6. ❌ Using div/span for buttons
7. ❌ Skipping heading levels
8. ❌ Non-descriptive link text ("click here")
9. ❌ Autoplaying video/audio
10. ❌ Not announcing dynamic content changes
11. ❌ Inaccessible modals
12. ❌ Relying on color alone
13. ❌ Small touch targets on mobile
14. ❌ Missing ARIA labels on icon buttons
15. ❌ Not testing with real assistive technology

---

## Resources

### Documentation
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- WebAIM: https://webaim.org/

### Learning
- A11y Project: https://www.a11yproject.com/
- Inclusive Components: https://inclusive-components.design/
- Deque University: https://dequeuniversity.com/

### Communities
- A11y Slack: https://web-a11y.slack.com/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

Remember: **Accessibility is not a feature, it's a requirement.** Build it in from the start, not as an afterthought.
