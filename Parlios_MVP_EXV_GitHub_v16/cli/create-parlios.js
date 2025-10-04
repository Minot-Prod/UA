#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const TEMPLATE_ID = (()=>{
  const i = process.argv.indexOf('--template');
  return i>0 ? (process.argv[i+1]||'basic') : 'basic';
})();

const target = process.argv[2] || 'parlios-app';
const src = path.join(__dirname, '..', 'templates', TEMPLATE_ID);
const dest = path.resolve(process.cwd(), target);

if (!fs.existsSync(src)) {
  console.error('Template introuvable:', TEMPLATE_ID);
  process.exit(1);
}
if (fs.existsSync(dest)) {
  console.error('Le dossier cible existe déjà:', dest);
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });
function copyDir(s, d){
  fs.mkdirSync(d, { recursive: true });
  for (const entry of fs.readdirSync(s)){
    const sp = path.join(s, entry);
    const dp = path.join(d, entry);
    const stat = fs.statSync(sp);
    if (stat.isDirectory()) copyDir(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
}
copyDir(src, dest);
console.log('✅ Projet créé dans', dest);
console.log('👉 Suis les étapes :');
console.log('   cd', target);
console.log('   npm i');
console.log('   npm run dev');
