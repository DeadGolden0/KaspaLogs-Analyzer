// utils/fileHelper.js

const fs = require('fs');
const path = require('path');

/**
 * Récupère la liste des chemins de tous les fichiers
 * dans le répertoire spécifié (Logs).
 *
 * @param {string} dirPath - Chemin du répertoire
 * @returns {string[]} - Tableau complet des chemins de fichiers
 */
function getLogFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  // Ne filtre plus sur l'extension. On prend tout.
  const logFiles = files.map(f => path.join(dirPath, f));
  return logFiles;
}

module.exports = {
  getLogFiles
};
