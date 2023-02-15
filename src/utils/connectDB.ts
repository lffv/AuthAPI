import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectToDB() {
  const dbUri = config.get<string>('dbUri');
  log.info('Start connecting to DB');

  try {
    log.info(dbUri);
    await mongoose.connect(dbUri);

    log.info('Connected to DB!!!.');
  } catch (e) {
    log.info(e);
    process.exit(1);
  }
}

export default connectToDB;
