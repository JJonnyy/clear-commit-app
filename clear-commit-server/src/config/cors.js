export const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.VITE_CLIENT_URL
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}