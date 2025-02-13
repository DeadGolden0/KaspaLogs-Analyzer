module.exports = [
    // --- Critique ---
    {
      category: 'credentials',
      regex: /password:\s*\S+/i, 
      severity: 'critique'
    },
    {
      category: 'credentials',
      // Pour capturer à la fois "User" et "Password" sur la même ligne
      // on peut affiner : /User:.*Password:.*/i
      // Mais souvent on scanne juste "User: " pour être prudent
      regex: /user:\s*\S+/i,
      severity: 'critique'  // ou 'eleve' si vous distinguez du 'password'
    },
  
    // --- Élevé ---
    {
      category: 'personalData',
      regex: /miner sn:\s*\S+/i,
      severity: 'eleve'
    },
    {
      category: 'personalData',
      regex: /board_sn:\s*\S+/i,
      severity: 'eleve'
    },
    {
      category: 'servicePort',
      // Cherche mention explicite du port 6060
      regex: /listen on\s+6060/i,
      severity: 'eleve'
    },
  
    // --- Modéré ---
    {
      category: 'firmware',
      regex: /(fw_version|firmware|bitmain power fw version)/i,
      severity: 'modere'
    },
    {
      category: 'kernelVersion',
      regex: /linux version\s+\S+/i,
      severity: 'modere'
    },
    {
      category: 'macAddress',
      regex: /(?:[0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}/,  // MAC de type xx:xx:xx:xx:xx:xx
      severity: 'modere'
    }
];
  