const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const dbDataPath = path.resolve(__dirname, '../data.json');
const adapter = new FileSync(dbDataPath);
const DB = low(adapter);

// Set some defaults
DB.defaults({ posts: [], users: [] })
  .write();

export default DB;
