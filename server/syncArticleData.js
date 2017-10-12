import path from 'path';
import walk from 'walk';
import fs from 'fs';
import { articleModel } from './models/index';
import { parseTags, parseDesc, parseImage, parseTitle } from './libs/mdParser';

const mdDir = path.resolve(__dirname, '../markdown/');


console.log(mdDir);

// articleModel.addOrUpdateArticle('test');

function walkMd() {
  const walker = walk.walk(mdDir, {

  });

  walker.on('file', function(root, fileStats, next) {
    const { name, birthtime } = fileStats;
    const fileNamePur = name.replace(/\.md$/, '');
    const filePath = path.resolve(mdDir, name);

    fs.readFile(filePath, 'utf8', (err, data) => {
      const tags = parseTags(data);
      const desc = parseDesc(data);
      const img = parseImage(data);
      const title = parseTitle(data);

      articleModel.insertOrUpdate({
        title,
        img,
        desc,
        tags,
        name: fileNamePur,
        time: birthtime,
      });

      next();

      console.log(articleModel.getList((item) => {
        return item.time > 0;
      }));
    });
  });
}

walkMd();

console.log(articleModel.getList((item) => {
  return item.time > 0;
}));

console.log('sync article done');
