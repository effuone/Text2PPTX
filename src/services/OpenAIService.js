import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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'
  });
export default new OpenAIApi(configuration);