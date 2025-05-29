const express = require('express');
const router = express.Router();
const url = require('../model/url');

router.get('/', async (req, res) => {
    const allUrls = await url.find({});
    res.render('home',{
        urls: allUrls
    });
});

module.exports = router