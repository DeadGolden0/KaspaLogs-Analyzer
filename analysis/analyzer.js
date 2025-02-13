// analysis/analyzer.js

const fs = require('fs');
const path = require('path');
const { ENCODING } = require('../config/config');
const patterns = require('./patterns');

/**
 * Ordre de priorité pour la gravité.
 * Si une ligne match plusieurs patterns,
 * on applique la plus élevée.
 */
const severityOrder = ['faible', 'modere', 'eleve', 'critique'];

/**
 * Compare deux niveaux de gravité pour savoir le plus élevé.
 * Retourne le plus élevé des deux.
 */
function getHigherSeverity(sev1, sev2) {
  const idx1 = severityOrder.indexOf(sev1);
  const idx2 = severityOrder.indexOf(sev2);
  return idx1 > idx2 ? sev1 : sev2;
}

/**
 * Analyse un fichier de log ligne par ligne.
 * - On ne conserve que les lignes qui matchent
 *   au moins un pattern jugé "sensible".
 * - Si une ligne match plusieurs patterns,
 *   on lui attribue la gravité la plus haute détectée.
 */
function analyzeLogFile(filepath) {
  const data = fs.readFileSync(filepath, ENCODING);
  const lines = data.split('\n');
  const findings = [];

  lines.forEach((line, idx) => {
    let matchedCategory = null;
    let matchedSeverity = 'faible'; // gravité minimale, éventuellement

    patterns.forEach(pt => {
      if (pt.regex.test(line)) {
        // On a un match => on compare la gravité
        matchedSeverity = getHigherSeverity(matchedSeverity, pt.severity);
        // On stocke la dernière catégorie trouvée au passage (pas forcément utile)
        matchedCategory = pt.category;
      }
    });

    // Si matchedCategory n'est pas null, alors la ligne match au moins un pattern
    if (matchedCategory) {
      findings.push({
        file: path.basename(filepath),
        line: idx + 1,
        text: line.trim(),
        category: matchedCategory,
        severity: matchedSeverity
      });
    }
  });

  return findings;
}

module.exports = {
  analyzeLogFile,
  severityOrder
};
