import { Router } from 'express';
const router = Router();

import { Beer } from './data.js';

router.get('/', async (req, res) => {
    const beers = await Beer.findAll();

    res.render('home/index', { beers: beers.map(beer => beer.dataValues) });
});

router.post('/cart/add', (req, res) => {
    const id = req.body;

    if (!id) {
        return res.status(400).send('Invalid beer data');
    }

    const cart = req.session.cart || [];
    cart.push({ id });
    req.session.cart = cart;

    res.redirect('/');
});

router.get('/beer/:id', async (req, res) => {
    const beerId = req.params.id;
    const beer = await Beer.findByPk(beerId);

    if (!beer) {
        return res.status(404).send('Beer not found');
    }

    res.render('home/beer', { beer: beer.dataValues });
});

router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];

    res.render('home/cart', { cart });
});

export default router;