// index.js

const fs = require('fs');
const { openFile } = require('./utils/openFile');
const {
  LOGS_DIRECTORY,
  ENCODING,
  REPORT_OUTPUT_HTML
} = require('./config/config');

const { getLogFiles } = require('./utils/fileHelper');
const { info, error } = require('./utils/logger');
const { analyzeLogFile } = require('./analysis/analyzer');
const { generateHTMLReport } = require('./analysis/reportHtmlGenerator');

async function main() {
  try {
    info('Démarrage de l’analyse des logs...');

    const logFiles = getLogFiles(LOGS_DIRECTORY);
    if (logFiles.length === 0) {
      info(`Aucun fichier trouvé dans : ${LOGS_DIRECTORY}`);
      return;
    }

    // Analyse
    let allFindings = [];
    logFiles.forEach(file => {
      const fileFindings = analyzeLogFile(file);
      allFindings = allFindings.concat(fileFindings);
    });

    // Génération du rapport HTML
    const html = generateHTMLReport(allFindings);
    fs.writeFileSync(REPORT_OUTPUT_HTML, html, ENCODING);

    info(`Rapport HTML généré : ${REPORT_OUTPUT_HTML}`);

    // === Ouvre automatiquement le rapport dans le navigateur ===
    openFile(REPORT_OUTPUT_HTML);

  } catch (err) {
    error(`Erreur : ${err.message}`);
  }
}

main();
