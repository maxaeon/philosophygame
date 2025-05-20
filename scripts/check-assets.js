const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function getJsFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'scripts' || entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getJsFiles(full));
    } else if (entry.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const jsFiles = getJsFiles(repoRoot);
let missing = [];
// Match loadImage('...') or loadImage(`...`)
const regex = /loadImage\(\s*(["'`])([^"'`]+)\1/g;

for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const imgPath = match[2];
    if (imgPath.includes('${')) {
      // Skip dynamic template strings
      continue;
    }
    const abs = path.resolve(repoRoot, imgPath);
    if (!fs.existsSync(abs)) {
      missing.push({file: path.relative(repoRoot, file), path: imgPath});
    }
  }
}

if (missing.length) {
  console.error('Missing asset files:');
  for (const m of missing) {
    console.error(`  ${m.file} -> ${m.path}`);
  }
  process.exit(1);
} else {
  console.log('All referenced assets found.');
}
