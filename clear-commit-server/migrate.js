import { initDb } from './db-postgres.js';

console.log('Starting database migration...');

initDb()
    .then(() => {
        console.log('Migration completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });