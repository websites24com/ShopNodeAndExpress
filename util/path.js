const path = require('path');
module.exports = path.dirname(require.main.filename); // ✅ safe and current
