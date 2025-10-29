#!/usr/bin/env node

const fetch = require('node-fetch');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Mahusaa/Database-Readme/main';

const STANDARDS = {
  'coding': {
    name: 'Coding Standards',
    description: 'Code conventions, file naming, TypeScript guidelines',
    files: ['coding-rule/CODING_STANDART.md'],
    outputFile: 'coding-standards.md'
  },
  'design': {
    name: 'Design Standards',
    description: 'UI/UX, branding, design system guidelines',
    files: ['design/DESIGN_STANDARDS.md'],
    outputFile: 'design-standards.md'
  },
  'seo': {
    name: 'SEO Standards',
    description: 'SEO best practices, meta tags, structured data',
    files: ['seo/SEO_STANDARDS.md'],
    outputFile: 'seo-standards.md'
  },
  'accessibility': {
    name: 'Accessibility Standards',
    description: 'WCAG compliance, a11y guidelines',
    files: ['accessibility/ACCESSIBILITY_STANDARDS.md'],
    outputFile: 'accessibility-standards.md'
  },
  'content': {
    name: 'Content Guidelines',
    description: 'Copywriting, tone of voice, content structure',
    files: ['content/CONTENT_GUIDELINES.md'],
    outputFile: 'content-guidelines.md'
  },
  'performance': {
    name: 'Performance Standards',
    description: 'Web vitals, optimization, loading strategies',
    files: ['performance/PERFORMANCE_STANDARDS.md'],
    outputFile: 'performance-standards.md'
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

async function mainFetch() {
  console.log('\n🤖 AI Context Fetcher\n');
  console.log('Select which standards you want to use as AI context:');
  console.log('(Use space to select, enter to confirm)\n');

  const choices = Object.keys(STANDARDS).map(key => ({
    title: STANDARDS[key].name,
    description: STANDARDS[key].description,
    value: key
  }));

  const response = await prompts({
    type: 'multiselect',
    name: 'standards',
    message: 'Pick standards:',
    choices: choices,
    hint: '- Space to select. Return to submit',
    instructions: false
  });

  if (!response.standards || response.standards.length === 0) {
    console.log('\n❌ No selection made. Exiting.\n');
    process.exit(0);
  }

  // Create .context folder if it doesn't exist
  const outputDir = path.join(process.cwd(), '.context');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log(`\n✓ Created folder: ${outputDir}\n`);
  } else {
    console.log(`\n✓ Using folder: ${outputDir}\n`);
  }

  console.log(`📥 Downloading ${response.standards.length} standard(s)...\n`);

  let successCount = 0;
  let failCount = 0;
  const savedFiles = [];

  // Process each selected standard
  for (const standardKey of response.standards) {
    const standard = STANDARDS[standardKey];
    console.log(`  📄 ${standard.name}...`);

    let combinedContent = '';
    let hasContent = false;

    // Fetch all files for this standard
    for (const file of standard.files) {
      const content = await fetchFile(file);
      if (content) {
        hasContent = true;
        combinedContent += content;
        if (standard.files.length > 1) {
          combinedContent += `\n\n${'='.repeat(80)}\n`;
          combinedContent += `FILE: ${file}\n`;
          combinedContent += `${'='.repeat(80)}\n\n`;
        }
      }
    }

    if (hasContent) {
      const outputPath = path.join(outputDir, standard.outputFile);
      fs.writeFileSync(outputPath, combinedContent, 'utf8');
      console.log(`     ✓ Saved to: ${standard.outputFile}`);
      savedFiles.push(standard.outputFile);
      successCount++;
    } else {
      console.log(`     ✗ Failed to download`);
      failCount++;
    }
    console.log('');
  }

  // Summary
  console.log('='.repeat(60));
  console.log(`\n✓ Download complete!\n`);
  console.log(`   Success: ${successCount} file(s)`);
  if (failCount > 0) {
    console.log(`   Failed:  ${failCount} file(s)`);
  }
  console.log(`   Location: ${outputDir}\n`);

  if (savedFiles.length > 0) {
    console.log('📁 Downloaded files:');
    savedFiles.forEach(file => console.log(`   - ${file}`));
  }

  console.log('\n💡 You can now use these files as context for your AI assistant!\n');
}

async function installClaude() {
  console.log('\n🔧 Claude Settings Installation\n');

  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const claudeDir = path.join(homeDir, '.claude');
  const settingsPath = path.join(claudeDir, 'settings.json');

  // Check if .claude folder already exists
  if (fs.existsSync(settingsPath)) {
    const overwrite = await prompts({
      type: 'confirm',
      name: 'value',
      message: `settings.json already exists at ${settingsPath}. Overwrite?`,
      initial: false
    });

    if (!overwrite.value) {
      console.log('\n❌ Installation cancelled.\n');
      process.exit(0);
    }
  }

  // Create .claude directory if it doesn't exist
  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
    console.log(`\n✓ Created directory: ${claudeDir}`);
  }

  // Default settings template (Windows version)
  const defaultSettings = {
    statusLine: {
      type: "command",
      command: "bash E:/home/despro/.claude/statusline-command.sh"
    },
    hooks: {
      Notification: [
        {
          hooks: [
            {
              type: "command",
              command: "powershell -c (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\confir.wav').PlaySync()"
            }
          ]
        }
      ],
      Stop: [
        {
          hooks: [
            {
              type: "command",
              command: "powershell -c (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\done.wav').PlaySync()"
            }
          ]
        }
      ],
      PreToolUse: [
        {
          matcher: "Bash",
          hooks: [
            {
              type: "command",
              command: "powershell -c (New-Object Media.SoundPlayer 'C:\\Windows\\Media\\Windows Notify Email.wav').PlaySync()"
            }
          ]
        }
      ]
    },
    permissions: {
      allow: [
        "Bash:powershell"
      ]
    }
  };

  // Ask if user wants to customize the statusline path
  const customizeStatusline = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'Do you want to customize the statusline command path?',
    initial: false
  });

  if (customizeStatusline.value) {
    const statuslineResponse = await prompts({
      type: 'text',
      name: 'path',
      message: 'Enter the full path to your statusline-command.sh:',
      initial: defaultSettings.statusLine.command.replace('bash ', '')
    });

    if (statuslineResponse.path) {
      defaultSettings.statusLine.command = `bash ${statuslineResponse.path}`;
    }
  }

  // Write settings.json
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2), 'utf8');
    console.log(`\n✓ settings.json created successfully!`);
    console.log(`   Location: ${settingsPath}\n`);

    console.log('📋 Installed configuration:');
    console.log('   - Status line command');
    console.log('   - Sound notifications (Windows)');
    console.log('   - PowerShell permissions');

    console.log('\n💡 You can edit this file manually to customize your Claude settings.\n');
  } catch (error) {
    console.error(`\n❌ Error writing settings.json: ${error.message}\n`);
    process.exit(1);
  }
}

async function main() {
  const action = await prompts({
    type: 'select',
    name: 'value',
    message: 'What would you like to do?',
    choices: [
      { title: 'Fetch AI Context Standards', description: 'Download standards to .context/ folder', value: 'fetch' },
      { title: 'Install Claude Settings', description: 'Set up .claude/settings.json', value: 'install' }
    ],
    initial: 0
  });

  if (!action.value) {
    console.log('\n❌ No selection made. Exiting.\n');
    process.exit(0);
  }

  if (action.value === 'fetch') {
    await mainFetch();
  } else if (action.value === 'install') {
    await installClaude();
  }
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
