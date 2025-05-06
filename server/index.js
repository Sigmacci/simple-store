import express from 'express';
import session from 'express-session';
import router from './routing.js';
import { initializeDatabase } from './data.js';
import { v4 as genuuid } from 'uuid';
import cookie from 'express-session/session/cookie.js';

const app = express();

async function startServer() {
    await initializeDatabase();

    app.use('/', router);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        genid: (req) => {
            return genuuid()
        },
        secret: 'keyboard cat',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 
        },
        resave: false,
        saveUninitialized: true,
        cart: []
    }));
    app.set('view engine', 'ejs');

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://26.245.46.216:${PORT}`);
    });
}

startServer();
