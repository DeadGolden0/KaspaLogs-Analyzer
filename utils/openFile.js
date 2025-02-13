// utils/openFile.js

const { exec } = require('child_process');
const path = require('path');

function openFile(filePath) {
  const absolutePath = path.resolve(filePath);

  switch (process.platform) {
    case 'win32':
      exec(`start "" "${absolutePath}"`);
      break;
    case 'darwin':
      exec(`open "${absolutePath}"`);
      break;
    default:
      exec(`xdg-open "${absolutePath}"`);
  }
}

module.exports = {
  openFile
};
