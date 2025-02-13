// analysis/reportHtmlGenerator.js

// On définit l'ordre des sévérités du plus grave (index 0) au moins grave (index 3).
const severityOrder = ['critique', 'eleve', 'modere', 'faible'];

/**
 * Renvoie l'index numérique correspondant à la sévérité (0 = critique, 3 = faible)
 */
function getSeverityIndex(severity) {
  return severityOrder.indexOf(severity);
}

/**
 * Regroupe les findings par catégorie.
 * Retourne un objet { categoryName: [occurrences], ... }
 */
function groupByCategory(findings) {
  const grouped = {};
  findings.forEach(item => {
    const cat = item.category;
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(item);
  });
  return grouped;
}

/**
 * Renvoie la sévérité "maximale" (au sens le plus grave) au sein d'une liste d'occurrences,
 * c'est-à-dire la sévérité qui a le plus bas index : (critique < élevé < modéré < faible).
 * Concrètement : on cherche le minimum d'index parmi toutes les occurrences.
 */
function getCategoryMaxSeverityIndex(occurrences) {
  let minIndex = Infinity;
  occurrences.forEach(item => {
    const idx = getSeverityIndex(item.severity);
    if (idx < minIndex) {
      minIndex = idx;
    }
  });
  return minIndex;
}

/**
 * Génère le rapport HTML :
 * 1. Regroupe par catégorie
 * 2. Pour chaque catégorie, calcule la gravité la plus haute (min index)
 * 3. Trie les catégories en conséquence (catégorie "critique" d'abord, etc.)
 * 4. À l'intérieur de chaque catégorie, trie les occurrences (critique en haut)
 * 5. Affiche le tout avec un design plus large, le nouveau placeholder, etc.
 */
function generateHTMLReport(allFindings) {
  // 1. Regrouper par catégorie
  const grouped = groupByCategory(allFindings);

  // On récupère la liste des catégories
  let categories = Object.keys(grouped);

  // 2. Pour chaque catégorie, on calcule la "gravité la plus haute"
  //    et on stocke ça dans un objet
  const categorySeverityMap = {};
  categories.forEach(cat => {
    // Trouver la gravité la plus haute (min index) dans cat
    const minIndex = getCategoryMaxSeverityIndex(grouped[cat]);
    categorySeverityMap[cat] = minIndex;
  });

  // 3. Trier la liste des catégories sur cet index (plus petit index = plus grave)
  categories.sort((catA, catB) => {
    return categorySeverityMap[catA] - categorySeverityMap[catB];
  });

  // 4. À l'intérieur de chaque catégorie, trier les occurrences (critique > faible)
  categories.forEach(cat => {
    grouped[cat].sort((a, b) => {
      return getSeverityIndex(a.severity) - getSeverityIndex(b.severity);
    });
  });

  // 5. Construction du code HTML
  let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Kaspa Logs Analyzer</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #333;
    }
    .header {
      background-color: #4c5a63;
      color: #fff;
      padding: 20px 0;
      text-align: center;
    }
    .header img {
      height: 60px;
      display: block;
      margin: 0 auto 10px;
    }
    .header h1 {
      font-size: 32px;
      margin: 0;
      letter-spacing: 1px;
    }
    .container {
      width: 85%;
      max-width: 1200px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    }
    .container h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .category-block {
      margin-bottom: 30px;
    }
    .category-block h3 {
      font-size: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    .occurrence-item {
      border-left: 5px solid #ccc;
      background-color: #fafafa;
      padding: 10px 15px;
      margin-bottom: 10px;
      word-wrap: break-word;
    }
    .occurrence-item pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      margin-top: 5px;
      background: #fff;
      padding: 8px;
      border: 1px solid #ddd;
    }
    .occurrence-item h4 {
      margin: 0 0 5px 0;
      font-size: 18px;
    }
    .severity-critique {
      color: #a80000;
      font-weight: bold;
    }
    .severity-eleve {
      color: #d46b00;
      font-weight: bold;
    }
    .severity-modere {
      color: #bca300;
      font-weight: bold;
    }
    .severity-faible {
      color: #006600;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 14px;
      padding: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <!-- Nouveau placeholder -->
    <img src="https://imgs.search.brave.com/NVZTig_oMf4VJzZ47oKZH1SeCovnmmPwnes0lfVyByU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jb2lu/LWltYWdlcy5jb2lu/Z2Vja28uY29tL2Nv/aW5zL2ltYWdlcy8y/NTc1MS9sYXJnZS9r/YXNwYS1pY29uLWV4/Y2hhbmdlcy5wbmc_/MTY5NjUyNDgzNw" 
         alt="Kaspa Placeholder Logo">
    <h1>Kaspa Logs Analyzer</h1>
  </div>

  <div class="container">
    <h2>Informations détectées</h2>
    <p>
      Voici les occurrences sensibles trouvées dans vos fichiers de logs, 
      regroupées par catégorie et classées de la plus grave 
      (<span class="severity-critique">critique</span>) 
      à la moins grave (<span class="severity-faible">faible</span>).
    </p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
`;

  // Si aucune catégorie
  if (categories.length === 0) {
    html += `<p>Aucune occurrence sensible détectée.</p>`;
  } else {
    // Affichage par catégorie, déjà triées par gravité la plus forte
    categories.forEach(cat => {
      const items = grouped[cat];
      html += `
      <div class="category-block">
        <h3>Catégorie : ${cat} (${items.length} occurrence${items.length > 1 ? 's' : ''})</h3>
      `;

      items.forEach(item => {
        html += `
        <div class="occurrence-item">
          <h4 class="severity-${item.severity}">
            Gravité : ${item.severity.toUpperCase()}
          </h4>
          <div>Fichier : ${item.file} | Ligne : ${item.line}</div>
          <div>Contenu :</div>
          <pre>${item.text}</pre>
        </div>
        `;
      });

      html += `</div>`;
    });
  }

  html += `
  </div>
  <div class="footer">
    Rapport généré automatiquement - ${new Date().toLocaleString()}
  </div>
</body>
</html>
`;

  return html;
}

module.exports = {
  generateHTMLReport
};
