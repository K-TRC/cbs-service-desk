/**
 * Sync local dev files (.js/.css) to Apps Script HTML includes before clasp push.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pairs = [
  ['app.js', 'app.html'],
  ['gas-api.js', 'gas-api.html'],
  ['stores.js', 'stores.html'],
  ['app.css', 'app-css.html']
];

pairs.forEach(function (pair) {
  const src = path.join(root, pair[0]);
  const dest = path.join(root, pair[1]);
  if (!fs.existsSync(src)) {
    throw new Error('Missing source file: ' + pair[0]);
  }
  fs.copyFileSync(src, dest);
  console.log('Synced ' + pair[0] + ' -> ' + pair[1]);
});
