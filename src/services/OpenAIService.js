import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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'
  });
export default new OpenAIApi(configuration);