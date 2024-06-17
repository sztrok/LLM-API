const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Function used for extracting article content from given URL
 * @param url address of website
 * @returns {Promise<string>} website content
 */
async function extractArticleContent(url) {
    try {
        // get site contents
        const response = await axios.get(url);
        const html = response.data;

        // load html to cheerio
        const $ = cheerio.load(html);

        // example selectors used to identify article content
        const selectors = [
            'article',
            '.article-content',
            '.post-content',
            '.entry-content',
            'section.article',
            'section.content',
            'main.main-article',
            'p',
            '.article-body .paragraph',
        ];

        let articleContent = '';

        for (const selector of selectors) {
            if ($(selector).length) {
                articleContent = $(selector).text();
                break;
            }
        }

        if (articleContent) {
            return articleContent;
        } else {
            console.error('Couldn\'t find article content with given selectors.');
        }
    } catch (error) {
        console.error(`Error occurred while trying to get article content: ${error}`);
        throw error;
    }
}

module.exports = extractArticleContent;
