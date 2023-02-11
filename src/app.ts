// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import config from 'config';
import connectToDB from './utils/connectDB';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get('port') || 3001;

app.listen(port, () => {
  log.info(`Server started at localhost:${port}`);
  connectToDB();
});
