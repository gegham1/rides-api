import 'dotenv/config';
import sqlite from 'sqlite3';
import buildSchemas from './src/schemas';
import app from './src/app';
import logger from './src/logger';

const port = process.env.PORT || 8010;

const sqlite3 = sqlite.verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    buildSchemas(db);

    app(db)
        .listen(port, () => logger.info(`App started and listening on port ${port}`));
});
