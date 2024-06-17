const {OpenAI} = require("openai");


class OpenAIManager{

    models = ["gpt-3.5-turbo", "gpt-4o"];

    /**
     * Constructor for class managing OpenAI API connection and prompts
     * @param model selected model of chatGPT
     */
    constructor(model) {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });
        this.model = model;
    }

    /**
     * Gets article summary from chatGPT prompt
     * @param articleContent content of article
     * @param responseLength length of generated response
     * @param language language of generated response
     * @returns {APIPromise<ChatCompletion>} summary of article
     */
    async getArticleSummary(articleContent, responseLength, language) {
        //checks if set model is valid
        await this.validateModel();
        console.log(`OPENAI MODEL: ${this.model}`)
        return this.openai.chat.completions.create({
            model: this.model,
            messages: [
                {
                    role: "user",
                    content: `write summary of this article: ${articleContent}
                    using this number of sentences: ${responseLength}
                    in language: ${language}`
                }
            ],
            max_tokens: 4096
        });
    }

    /**
     * Checks if model set in constructor is in array of accepted models.
     * If model is not accepted, sets model as first value of models array
     */
    async validateModel(){
        if(!(this.models.indexOf(this.model) > -1)){
            this.model = this.models[0];
        }
    }
}

module.exports = OpenAIManager;