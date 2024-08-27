// api/db.js

import { createServer, Model } from 'json-server';
import path from 'path';
import fs from 'fs';

const server = createServer({
  middlewares: ['logger'],
  routes: '/api/*',
});

server.use((req, res, next) => {
  const dbFilePath = path.join(__dirname, '../db.json');
  const dbFile = fs.readFileSync(dbFilePath, 'utf8');
  const db = JSON.parse(dbFile);

  req.db = db; // Attach the database to the request object
  next();
});

server.use('/api', createServer({
  db: req => req.db,
  routes: {
    '/products': { model: Model.extend({ id: Number }) }
  }
}));

server.listen(3000, () => {
  console.log('JSON Server is running');
});

export default server;
