const express = require('express');
const router = express.Router();
const { handleCreateUrl, handleRedirectUrl, handleAnalytics } = require('../controller/url');

router.post('/',handleCreateUrl);
router.get('/:shortUrl', handleRedirectUrl);
router.get('/analytics/:shortUrl', handleAnalytics);

module.exports = router;