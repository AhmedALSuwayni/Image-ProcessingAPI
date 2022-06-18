/* 
Created By : Ahmed Alsuwayin at 6/10/2022 
email : ahmedsuwayni@gmail.com
*/

import express from 'express';
import routes from './routes/index';
import * as toCheck from './utils/Checkimage';
import logger from './utils/logger';

const app = express();
const port = 5000;
const url = 'http://localhost:5000/';
app.use(logger, routes);

app.listen(port, async (): Promise<void> => {
  await toCheck.default.CheckingThumbnail();

  console.log(`Here is Faster Way to Open The API ${url}`);
});

export default app;
