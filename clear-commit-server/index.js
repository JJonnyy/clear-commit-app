import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { corsOptions } from './src/config/cors.js';
import uploadRouter from './src/routes/upload.router.js';
import usersRouter from './src/auth/users/users.router.js';
import authRouter from './src/auth/authentication/authentication.router.js';
import clearRouter from './src/routes/clear.router.js';
import { errorHandler } from './src/errors/errorHandler.js';
import { PUBLIC_PORT, SESSION_SECRET_KEY } from './src/config/config.js';
import { createDir } from "./src/utils/createDir.js";
import { errorLogger } from './src/auth/errors/middlewares/error-logger.middleware.js';
import { standardErrorResponser } from './src/auth/errors/middlewares/standard-error-responser.middleware.js';
import { authenticated } from './src/auth/authentication/middlewares/authenticated.middleware.js';
import { hasRole } from './src/auth/authorization/middlewares/has-role.middleware.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { initDb } from './db-postgres.js';
import pgSession from 'connect-pg-simple';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = PUBLIC_PORT;
const PostgresSessionStore = pgSession(session);

// Initialize directories
createDir('uploads');
createDir('uploads/clears');


// Add this settings before app.use(cors())
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }))

// Static files
app.use('/media', express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.set("Content-Type", "text/css");
    }
}));
app.use(cookieParser());

app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    store: new PostgresSessionStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true
    })
}));

app.use('/uploads', authenticated, hasRole('admin'), express.static('public'));

// Routes
app.use('/upload', uploadRouter);
app.use('/clear_file', clearRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use(errorLogger);
app.use(standardErrorResponser);


app.use((req, res, next) => {
    console.log(req.method + ' || ' + new Date(Date.now() + 1000 * 60 * 60 * 24));
    next();
});

// Error handling
app.use(errorHandler);

const startServer = async () => {
    try {
        console.log('Starting database migration...');
        await initDb();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();