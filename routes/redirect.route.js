const express = require('express');
const router = express.Router();

const { getUrl } = require('../controllers/url.controller');

router.get('/:custom_url', (req, res) => {
    getUrl(req, res)
});

module.exports = router;