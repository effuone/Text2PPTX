import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_CHATAPI_KEY
  });
export default new OpenAIApi(configuration);