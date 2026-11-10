import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const inputHtml = path.join(rootDir, 'cv', 'index.html');
const outputPdf = path.join(rootDir, 'public', 'utils', 'CV_Alejandro_Portaluppi.pdf');

function findBrowser() {
  const candidates = [
    // Windows Edge
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    // Windows Chrome
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // Linux / Mac binaries
    'microsoft-edge',
    'google-chrome',
    'chromium',
    'chromium-browser'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // Fallback to searching PATH
  return candidates[0];
}

const browser = findBrowser();
console.log(`Generando CV PDF con: ${browser}`);

const args = [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${outputPdf}`,
  inputHtml
];

try {
  execFileSync(browser, args, { stdio: 'inherit' });
  const stats = fs.statSync(outputPdf);
  console.log(`CV generado con éxito en: ${outputPdf} (${(stats.size / 1024).toFixed(1)} KB)`);
} catch (error) {
  console.error('Error al generar el PDF del CV:', error);
  process.exit(1);
}
