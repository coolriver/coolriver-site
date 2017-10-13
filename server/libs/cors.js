import cors from 'koa2-cors';

const whiteDomain = [
  'coolriver.net.cn',
  'localhost',
  '127.0.0.1',
];

export default function setupCors (app) {
  app.use(cors({
    origin: (ctx) => {
      // return '*';
      console.log(ctx.hostname);
      if (whiteDomain.indexOf(ctx.hostname) >= 0) {
        return ctx.origin;
      }

      return false;
    },
  }));
}
