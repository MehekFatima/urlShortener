const url = require('../model/url');
const shortid = require('shortid');

async function handleCreateUrl(req,res){
    const body = req.body;
    if(!body.originalUrl){
        return res.status(400).json({error: 'Original URL is required'});
    }
    const shortUrl = shortid.generate();
    await url.create({
        originalUrl: body.originalUrl,
        shortUrl: shortUrl,
        clicks:[]
    });
    res.json({shortUrl: shortUrl});
}

async function handleRedirectUrl(req,res){
    const shortUrl = req.params.shortUrl;
    const urlData = await url.findOne({shortUrl: shortUrl});
    if(!urlData){
        return res.status(404).json({error: 'URL not found'});
    }
    urlData.clicks.push({date: Date.now()});
    await urlData.save();
    res.redirect(urlData.originalUrl);
    // res.status(200).json({originalUrl: urlData.originalUrl});
}

async function handleAnalytics(req,res){
    const shortUrl = req.params.shortUrl;
    const urlData = await url.findOne({shortUrl: shortUrl});
    if(!urlData){
        return res.status(404).json({error: 'URL not found'});
    }
    const analytics = urlData.clicks.length;
    res.status(200).json({shortUrl: shortUrl, originalUrl: urlData.originalUrl, clicks: analytics});
}

module.exports = {
    handleCreateUrl,
    handleRedirectUrl,
    handleAnalytics
}