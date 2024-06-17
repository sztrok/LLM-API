import { expect } from 'chai';
import sinon from 'sinon';
import { OpenAI } from 'openai';
import OpenAIManager from '../../llm_api_work_demo/utils/openAIManager.js';


describe('OpenAIManager', () => {
    let manager, openAIStub;

    beforeEach(() => {
        // setting environment variable for tests
        process.env.OPENAI_API_KEY = 'fake-api-key';

        openAIStub = sinon.stub();
        const openAIInstance = {
            chat: {
                completions: {
                    create: openAIStub
                }
            }
        };
        sinon.stub(OpenAI.prototype, 'constructor').returns(openAIInstance);

        manager = new OpenAIManager('gpt-3.5-turbo');
        manager.openai = openAIInstance;
    });

    afterEach(() => {
        sinon.restore();
        delete process.env.OPENAI_API_KEY; // clearing environment variable after tests
    });

    describe('constructor', () => {
        it('should initialize with the correct model', () => {
            expect(manager.model).to.equal('gpt-3.5-turbo');
        });

        it('should initialize OpenAI with the provided apiKey', () => {
            expect(manager.openai).to.be.an('object');
        });
    });

    describe('validateModel', () => {
        it('should keep the model if it is valid', async () => {
            await manager.validateModel();
            expect(manager.model).to.equal('gpt-3.5-turbo');
        });

        it('should set the model to the default if it is invalid', async () => {
            manager.model = 'invalid-model';
            await manager.validateModel();
            expect(manager.model).to.equal('gpt-3.5-turbo');
        });
    });

    describe('getArticleSummary', () => {
        it('should call OpenAI with the correct parameters', async () => {
            const articleContent = 'This is a test article.';
            const responseLength = 5;
            const language = 'english';

            openAIStub.resolves({ data: 'fake-response' });

            const result = await manager.getArticleSummary(articleContent, responseLength, language);

            expect(openAIStub.calledOnce).to.be.true;
            const callArgs = openAIStub.firstCall.args[0];
            expect(callArgs.model).to.equal('gpt-3.5-turbo');
            expect(callArgs.messages[0].role).to.equal('user');
            expect(callArgs.messages[0].content).to.include(articleContent);
            expect(callArgs.messages[0].content).to.include(responseLength);
            expect(callArgs.messages[0].content).to.include(language);
            expect(result.data).to.equal('fake-response');
        });

        it('should validate the model before calling OpenAI', async () => {
            const validateModelSpy = sinon.spy(manager, 'validateModel');
            const articleContent = 'This is a test article.';
            const responseLength = 5;
            const language = 'english';

            openAIStub.resolves({ data: 'fake-response' });

            await manager.getArticleSummary(articleContent, responseLength, language);

            expect(validateModelSpy.calledOnce).to.be.true;
        });
    });
});