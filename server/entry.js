
const BACKPACK_ENTRY_MAP = {
  server: () => {
    require('./server');
  },
  'sync-article': () => {
    require('./syncArticleData');
  }
};

const runEntryCommand = () => {
  console.log(process.env.BACKPACK_ENTRY);
  const entry = process.env.BACKPACK_ENTRY;
  const task = BACKPACK_ENTRY_MAP[entry] || BACKPACK_ENTRY_MAP['server'];

  task();
}

runEntryCommand();
