// ASAD-MD Main Launcher 🚀
console.log("🔧 Starting ASAD-MD Bot...");

const path = require('path');
const fs = require('fs');

// Load environment variables
if (fs.existsSync('.env')) require('dotenv').config();

// Load config
try {
  global.config = require('./config');
  console.log('✅ Loaded config.js');
} catch {
  console.warn('⚠️ config.js not found');
}

// Load connection handler (example)
try {
  require('./handler'); // make sure this file exists
  console.log('✅ Loaded handler.js');
} catch {
  console.warn('⚠️ handler.js not found');
}

// Auto-load all plugins from /plugins
const pluginsDir = path.join(__dirname, 'plugins');
if (fs.existsSync(pluginsDir)) {
  fs.readdirSync(pluginsDir).forEach(file => {
    if (file.endsWith('.js')) {
      try {
        require(path.join(pluginsDir, file));
        console.log(`✅ Plugin loaded: ${file}`);
      } catch (err) {
        console.error(`❌ Error loading plugin ${file}:`, err.message);
      }
    }
  });
} else {
  console.warn('⚠️ No plugins folder found');
}

// Optional folders (lib, events)
['lib', 'events'].forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    fs.readdirSync(fullPath).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          require(path.join(fullPath, file));
          console.log(`✅ Loaded ${dir}/${file}`);
        } catch (err) {
          console.error(`❌ Error in ${dir}/${file}:`, err.message);
        }
      }
    });
  }
});

console.log("🤖 ASAD-MD Bot is ready. Waiting for WhatsApp connection...");
