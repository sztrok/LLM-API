const URL = require("url").URL;

/**
 * Class used for validating post data
 */
class PostDataValidators {

    /**
     * Sets acceptable values for given attributes
     */
    constructor() {
        this.lengthLowerBound = 1;
        this.lengthUpperBound = 100;
        this.supportedLanguages = ["english", "polish"];
    }

    /**
     * Checks all conditions the POST data must meet
     * @param url URL of website
     * @param responseLength desired prompt response length
     * @param language language of generated response
     * @returns {Promise<boolean>} true if all conditions are met
     */
    async checkPostDataValues(url, responseLength, language){
        return this.stringIsAValidUrl(url) &&
            this.responseLengthIsWithinRange(responseLength) &&
            this.isLanguageSupported(language);
    }

    /**
     * Checks if given string is a valid URL
     * @param url given string
     * @returns {boolean} true if string is a valid URL
     */
    stringIsAValidUrl(url){
        try {
            new URL(url);
            console.log(`URL: ${url}`)
            return true;
        } catch (err) {
            console.error(`String is not a valid URL: ${url}`)
            return false;
        }
    }

    /**
     * Checks if desired response length is within predefined range
     * @param responseLength desired response length
     * @returns {boolean} true if value is in range
     */
    responseLengthIsWithinRange(responseLength){
        if(responseLength===undefined){
            console.error("Response length is undefined");
            return false;
        }
        else if((this.lengthLowerBound <= responseLength) && (responseLength <= this.lengthUpperBound)){
            console.log(`Response length: ${responseLength}`);
            return true;
        }
        else{
            console.error(`Response length is undefined or out of bounds: ${responseLength}`);
            return false;
        }
    }

    /**
     * Checks if desired language of generated prompt is in array of acceptable languages
     * @param language desired language
     * @returns {boolean} true if language is acceptable
     */
    isLanguageSupported(language){
        if(this.supportedLanguages.indexOf(language) > -1){
            console.log(`Selected language: ${language}`)
            return true;
        }
        else{
            console.error(`Language is not supported: ${language}`)
            return false;
        }
    }
}

module.exports = PostDataValidators;