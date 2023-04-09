import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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'
  });
export default new OpenAIApi(configuration);