import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectToDB() {
  const dbUri = config.get<string>('dbUri');
  log.info('Start connecting to DB');

  try {
    await mongoose.connect(dbUri);

    log.info('Connected to DB!!!.');
  } catch (e) {
    log.info('Error connecting!');
    process.exit(1);
  }
}

export default connectToDB;
