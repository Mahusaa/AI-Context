#!/usr/bin/env node

const fetch = require('node-fetch');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Mahusaa/Database-Readme/main';

const STANDARDS = {
  'all': {
    name: 'All Standards (Combined)',
    description: 'Fetch all standards in one file',
    files: [
      'coding-rule/CODING_STANDART.md',
      'design/DESIGN_STANDARDS.md',
      'seo/SEO_STANDARDS.md',
      'accessibility/ACCESSIBILITY_STANDARDS.md',
      'content/CONTENT_GUIDELINES.md',
      'performance/PERFORMANCE_STANDARDS.md'
    ]
  },
  'coding': {
    name: 'Coding Standards',
    description: 'Code conventions, file naming, TypeScript guidelines',
    files: ['coding-rule/CODING_STANDART.md']
  },
  'design': {
    name: 'Design Standards',
    description: 'UI/UX, branding, design system guidelines',
    files: ['design/DESIGN_STANDARDS.md']
  },
  'seo': {
    name: 'SEO Standards',
    description: 'SEO best practices, meta tags, structured data',
    files: ['seo/SEO_STANDARDS.md']
  },
  'accessibility': {
    name: 'Accessibility Standards',
    description: 'WCAG compliance, a11y guidelines',
    files: ['accessibility/ACCESSIBILITY_STANDARDS.md']
  },
  'content': {
    name: 'Content Guidelines',
    description: 'Copywriting, tone of voice, content structure',
    files: ['content/CONTENT_GUIDELINES.md']
  },
  'performance': {
    name: 'Performance Standards',
    description: 'Web vitals, optimization, loading strategies',
    files: ['performance/PERFORMANCE_STANDARDS.md']
  }
};

async function fetchFile(filePath) {
  const url = `${GITHUB_RAW_BASE}/${filePath}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('\n🤖 AI Context Fetcher\n');
  console.log('Select which standards you want to use as AI context:\n');

  const choices = Object.keys(STANDARDS).map(key => ({
    title: STANDARDS[key].name,
    description: STANDARDS[key].description,
    value: key
  }));

  const response = await prompts({
    type: 'select',
    name: 'standard',
    message: 'Pick a standard:',
    choices: choices,
    initial: 0
  });

  if (!response.standard) {
    console.log('No selection made. Exiting.');
    process.exit(0);
  }

  const selected = STANDARDS[response.standard];
  console.log(`\n✓ Fetching ${selected.name}...\n`);

  let combinedContent = '';

  for (const file of selected.files) {
    console.log(`  Downloading ${file}...`);
    const content = await fetchFile(file);
    if (content) {
      combinedContent += `\n\n${'='.repeat(80)}\n`;
      combinedContent += `FILE: ${file}\n`;
      combinedContent += `${'='.repeat(80)}\n\n`;
      combinedContent += content;
    }
  }

  if (!combinedContent) {
    console.error('\n❌ Failed to fetch any content.');
    process.exit(1);
  }

  // Ask what to do with the content
  const action = await prompts({
    type: 'select',
    name: 'action',
    message: 'What would you like to do with the content?',
    choices: [
      { title: 'Display in terminal', value: 'display' },
      { title: 'Save to file', value: 'save' },
      { title: 'Both (display and save)', value: 'both' }
    ]
  });

  if (!action.action) {
    console.log('No action selected. Exiting.');
    process.exit(0);
  }

  if (action.action === 'display' || action.action === 'both') {
    console.log('\n' + '='.repeat(80));
    console.log('CONTENT START');
    console.log('='.repeat(80) + '\n');
    console.log(combinedContent);
    console.log('\n' + '='.repeat(80));
    console.log('CONTENT END');
    console.log('='.repeat(80) + '\n');
  }

  if (action.action === 'save' || action.action === 'both') {
    const filename = await prompts({
      type: 'text',
      name: 'filename',
      message: 'Enter filename to save:',
      initial: `ai-context-${response.standard}.md`
    });

    if (filename.filename) {
      const outputPath = path.join(process.cwd(), filename.filename);
      fs.writeFileSync(outputPath, combinedContent, 'utf8');
      console.log(`\n✓ Content saved to: ${outputPath}`);
    }
  }

  console.log('\n✓ Done! You can now use this as context for your AI assistant.\n');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
