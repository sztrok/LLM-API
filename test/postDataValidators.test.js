import { expect } from 'chai';
import PostDataValidators from '../../llm_api_work_demo/utils/postDataValidators.js';


describe('PostDataValidators', () => {
    let validator;

    beforeEach(() => {
        process.env.OPENAI_API_KEY = 'fake-api-key';
        validator = new PostDataValidators();
    });

    describe('stringIsAValidUrl', () => {
        it('should return true for a valid URL', () => {
            expect(validator.stringIsAValidUrl('https://www.example.com')).to.be.true;
        });

        it('should return false for an invalid URL', () => {
            expect(validator.stringIsAValidUrl('invalid-url')).to.be.false;
        });
    });

    describe('responseLengthIsWithinRange', () => {
        it('should return true for response length within range', () => {
            expect(validator.responseLengthIsWithinRange(50)).to.be.true;
        });

        it('should return false for response length below lower bound', () => {
            expect(validator.responseLengthIsWithinRange(0)).to.be.false;
        });

        it('should return false for response length above upper bound', () => {
            expect(validator.responseLengthIsWithinRange(101)).to.be.false;
        });

        it('should return false for undefined response length', () => {
            expect(validator.responseLengthIsWithinRange(undefined)).to.be.false;
        });
    });

    describe('isLanguageSupported', () => {
        it('should return true for supported language', () => {
            expect(validator.isLanguageSupported('english')).to.be.true;
        });

        it('should return false for unsupported language', () => {
            expect(validator.isLanguageSupported('spanish')).to.be.false;
        });
    });

    describe('checkPostDataValues', () => {
        it('should return true for valid inputs', async () => {
            const result = await validator.checkPostDataValues('https://www.example.com', 50, 'english');
            expect(result).to.be.true;
        });

        it('should return false for invalid URL', async () => {
            const result = await validator.checkPostDataValues('invalid-url', 50, 'english');
            expect(result).to.be.false;
        });

        it('should return false for out of range response length', async () => {
            const result = await validator.checkPostDataValues('https://www.example.com', 101, 'english');
            expect(result).to.be.false;
        });

        it('should return false for unsupported language', async () => {
            const result = await validator.checkPostDataValues('https://www.example.com', 50, 'spanish');
            expect(result).to.be.false;
        });
    });
});
