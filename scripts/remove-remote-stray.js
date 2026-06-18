/**
 * Remove stray files from Apps Script project that clasp push cannot delete.
 * Usage: node scripts/remove-remote-stray.js [fileName]
 */
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const scriptId = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '.clasp.json'), 'utf8')
).scriptId;

const claspRcPath = path.join(
  process.env.USERPROFILE || process.env.HOME,
  '.clasprc.json'
);
const claspRc = JSON.parse(fs.readFileSync(claspRcPath, 'utf8'));
const oauth2 = new google.auth.OAuth2(
  claspRc.oauth2ClientSettings.clientId,
  claspRc.oauth2ClientSettings.clientSecret,
  claspRc.oauth2ClientSettings.redirectUri
);
oauth2.setCredentials(claspRc.token);

const script = google.script({ version: 'v1', auth: oauth2 });
const strayName = process.argv[2] || 'scripts/sync-client';

async function main() {
  const res = await script.projects.getContent({ scriptId });
  const files = res.data.files || [];
  const stray = files.filter(function (f) {
    return f.name === strayName || f.name.indexOf(strayName) === 0;
  });

  if (!stray.length) {
    console.log('No stray file found:', strayName);
    console.log(
      'Remote files:',
      files.map(function (f) { return f.name; }).join(', ')
    );
    return;
  }

  console.log('Removing:', stray.map(function (f) { return f.name; }).join(', '));
  const kept = files.filter(function (f) {
    return stray.every(function (s) { return s.name !== f.name; });
  });

  await script.projects.updateContent({
    scriptId: scriptId,
    requestBody: { files: kept }
  });

  console.log('Done. Remaining files:', kept.map(function (f) { return f.name; }).join(', '));
}

main().catch(function (err) {
  console.error(err.message || err);
  process.exit(1);
});
