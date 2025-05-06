import express, { Router } from 'express';
import { Beer } from './data.js';
import { v4 as genuuid } from 'uuid';
import session from 'express-session';

const router = Router();

router.use(express.json());
router.use(session({
    genid: (req) => {
        return genuuid()
    },
    secret: 'keyboard cat',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    saveUninitialized: true,
    cart: [],
    message: null
}));

router.all('/', async (req, res) => {
    const beers = await Beer.findAll();
    const message = req.session.message || null;
    res.render('home/index', { beers: beers.map(beer => beer.dataValues), message: message });
    req.session.message = null; 
});

router.get('/cart', async (req, res) => {
    const cart = req.session.cart || [];
    const beers = await Beer.findAll({
        where: {
            id: cart
        }
    });

    res.render('home/cart', { beers: beers.map(beer => beer.dataValues) });
});

router.post('/cart/add', (req, res) => {
    const { beerId: id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid beer data');
    }

    const cart = req.session.cart || [];
    cart.push(id);
    req.session.cart = cart;

    console.log(req.session.cart);

    res.redirect('/');
});

router.post('/cart/cancel', (req, res) => {
    req.session.cart = [];
    req.session.message = 'Your cart has been cleared.';
    res.redirect('/');
});

router.post('/cart/finalize', async (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect('/');
    }

    const beers = await Beer.findAll({
        where: {
            id: cart
        }
    });

    console.log(beers.length)

    if (beers.length !== cart.length) {
        req.session.message = 'Some items in your cart are no longer available.';
        req.session.cart = [];
        res.redirect('/');
        return;
    }
    
    await Beer.destroy({
        where: {
            id: cart
        }
    });
    req.session.message = 'Your order has been placed successfully!';

    req.session.cart = [];
    res.redirect('/');
});

router.post('/cart/remove', (req, res) => {
    const { beerId: id } = req.body;

    if (!id) {
        return res.status(400).send('Invalid beer data');
    }

    const cart = req.session.cart || [];
    const index = cart.indexOf(id);
    if (index > -1) {
        cart.splice(index, 1);
    }
    req.session.cart = cart;

    if (cart.length === 0) {
        res.redirect('/');
    }

    console.log(req.session.cart);

    res.redirect('/cart');
});

export default router;