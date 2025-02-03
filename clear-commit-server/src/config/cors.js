export const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
    credentials: true,
}