import 'dotenv/config';
import app from './src/app';
import logger from './src/logger';
import db from './src/sqlite3';
import buildSchemas from './src/schemas';

const port = process.env.PORT || 8010;

(async function () {
  await buildSchemas(db);

  app.listen(port, () =>
    logger.info(`App started and listening on port ${port}`),
  );
})();
