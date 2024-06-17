# LLM API DEMO
Node JS and Express JS application used for creating article summary from given URL. 
  
To establish connection, create a **.env** file in root directory and add property **OPEN_AI_KEY='your-key'**

To get article summary, use POST request on address **http://localhost:3000/api/summarize** with JSON body with given parameters:

**url** - url of website from which we want to get article content

**responseLength** - length of a generated summary (from 1 to 100 sentences)

**language** - language of generated summary (currently available polish and english)

**model** - chatGPT model (currently available *gpt-3.5-turbo* and *gpt-4o*
