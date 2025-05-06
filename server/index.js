import express from 'express';
import router from './routing.js';
import { initializeDatabase } from './data.js';
import cookie from 'express-session/session/cookie.js';

const app = express();

async function startServer() {
    await initializeDatabase(); // Ensure the database is initialized

    app.use('/', router);
    app.use(session({
        genid: (req) => {
            return genuuid()
        },
        secret: 'keyboard cat',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        },
    }));

    app.set('view engine', 'ejs');

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
