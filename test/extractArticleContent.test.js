import { expect } from 'chai';
import extractArticleContent from '../../llm_api_work_demo/utils/articleExtractor.js';


describe('extractArticleContent', () => {

    it('should return the article content for a valid URL with article tag', async () => {
        const url = 'http://example.com';
        const content = await extractArticleContent(url);
        expect(content).to.equal("This domain is for use in illustrative examples in documents. You may use this\n" +
            "    domain in literature without prior coordination or asking for permission.More information...");
    });

    it('should throw an error for an invalid URL', async () => {
        const url = 'http://invalidurl.com';
        try {
            await extractArticleContent(url);
        } catch (error) {
            expect(error).to.exist;
        }
    });

    it('should log an error and return undefined if no article content is found', async () => {
        const url = 'https://www.webpagetest.org/blank.html';
        const content = await extractArticleContent(url);
        expect(content).to.be.undefined;
    });
});