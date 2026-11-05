const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTypeScript(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loadedModule = { exports: {} };
  const resolveModule = (request) => {
    if (!request.startsWith('.')) return require(request);
    const resolvedPath = path.resolve(path.dirname(filePath), request);
    return loadTypeScript(path.extname(resolvedPath) ? resolvedPath : `${resolvedPath}.ts`);
  };
  new Function('require', 'module', 'exports', compiled)(
    resolveModule,
    loadedModule,
    loadedModule.exports,
  );
  return loadedModule.exports;
}

const tokens = loadTypeScript(path.resolve(__dirname, '../tokens/tokens.ts')).tokens;
let css = '@theme {\n';
const kebab = (value) => value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

for (const [name, value] of Object.entries(tokens.colors)) {
  css += `  --color-${kebab(name)}: ${value};\n`;
}
css += '  --spacing: 4px;\n';
for (const [name, value] of Object.entries(tokens.radius)) {
  css += `  --radius-${name}: ${value}px;\n`;
}
for (const [name, value] of Object.entries(tokens.shadow)) {
  css += `  --shadow-${name}: ${value};\n`;
}
for (const family of [tokens.typography.fontThai, tokens.typography.fontEnglish]) {
  for (const weight of ['Regular', 'Medium', 'SemiBold', 'Bold']) {
    css += `  --font-${family.toLowerCase()}-${kebab(weight)}: "${family}-${weight}";\n`;
  }
}
css += '  --font-sans: "Prompt-Regular";\n';
for (const [name, value] of Object.entries(tokens.typography)) {
  if (typeof value !== 'object') continue;
  css += `  --text-${kebab(name)}: ${value.size}px;\n`;
  css += `  --text-${kebab(name)}--line-height: ${value.lineHeight};\n`;
}
for (const [name, value] of Object.entries(tokens.breakpoints)) {
  css += `  --breakpoint-${name}: ${value}px;\n`;
}
css += '}\n';

fs.writeFileSync(path.resolve(__dirname, '../src/theme/tokens.css'), css);
