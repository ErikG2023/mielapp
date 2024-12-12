const fs = require('fs');
const path = require('path');

const ignoredFiles = [
  'extract_react_code.cjs',
  '.env',
  '.gitignore',
  'eslint.config.js',
  'index.html',
  'package-lock.json',
  'postcss.config.js',
  'README.md',
  'Miel-app.txt'
];

const ignoredDirs = ['node_modules','public','assets'];

function extractCode(dir, output) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (fs.statSync(fullPath).isDirectory()) {
      if (!ignoredDirs.includes(item)) {
        extractCode(fullPath, output);
      }
    } else {
      if (!ignoredFiles.includes(item)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        output.push(`// File: ${relativePath}\n\n${content}\n\n`);
      }
    }
  }
}

function main() {
  const projectDir = './';
  const outputFile = 'Miel-app.txt';
  const extractedCode = [];

  extractCode(projectDir, extractedCode);

  fs.writeFileSync(outputFile, extractedCode.join('---\n\n'));
  console.log(`Código extraído y guardado en ${outputFile}`);
}

main();