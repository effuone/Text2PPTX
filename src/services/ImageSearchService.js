import axios from 'axios';
import OpenAIService from './OpenAIService';
import { Configuration, OpenAIApi } from 'openai';

class ImageSearchService {
    static async getImagesBySearchText(searchText){
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${searchText}&per_page=1`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'X8hculvLjldV1taJeIgj5Bvu2DXH9kDlZ5X9Yowabl0uqDaLjsc4mbyE'
            }
        })
        return response.data.photos[0].src.original
    }
    static async generateOpenAiImage(){
        const response = await OpenAIService.createImage({
            prompt: "a machine learning presentation cover image",
            n: 1,
            size: "1024x1024",
          });
          return response.data.data[0].url;
    }
    static async getGoogleTitle(title, subtitle){
        const response = await OpenAIService.createCompletion({
            model: 'text-davinci-003',
            prompt: `I am creating pptx presentation about ${title}. What type of image should I google for slide about ${subtitle}. Write 2 words only.`,
            temperature: 0.7,
            max_tokens: 1025,
        })
        return response.data.choices[0].text.trim()
    }
}

export default ImageSearchService;