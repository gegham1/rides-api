import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();
export default new sqlite3.Database(':memory:');
