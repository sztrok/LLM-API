const express = require("express");
const router = express.Router();
const postDataValidators = require('../utils/postDataValidators')
require("dotenv").config();
const extractArticleContent = require('../utils/articleExtractor.js');
const openAIManager = require('../utils/openAIManager')


//summarize endpoint configuration
router.post('/', async (req, res) => {

    //get data from POST body
    const {url} = req.body;
    const {responseLength} = req.body;
    const {language} = req.body;
    const {model} = req.body;

    //validate given data
    const validators = new postDataValidators();
    if(!await validators.checkPostDataValues(url, responseLength, language)){
        return res.status(400).json({
            success: false
        });
    }

    //extract article content for given URL
    let articleContent = '';
    await extractArticleContent(url)
        .then(data => {
            articleContent = data;
        })
        .catch(error => {
            console.error("Data fetch failed: ", error.message);
        });

    //get and return response from OpenAI
    if (articleContent) {
        const manager = new openAIManager(model);
        const response = await manager.getArticleSummary(articleContent, responseLength, language);
        res.set('Content-Type', 'text/html')
        return res.status(200).send(response.choices[0].message.content);
    } else {
        return res.status(400).json({
            success: false
        });
    }
});

module.exports = router;