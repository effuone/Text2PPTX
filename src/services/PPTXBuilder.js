import pptxgenjs from 'pptxgenjs'
import OpenAIService from './OpenAIService'

class PPTXBuilder { 
    static defineSlideMaster(pptx, slideMasters){
        for(const slide of slideMasters){
            pptx.defineSlideMaster(
                {
                    title: slide.title,
                    background: { color: slide.background.color },
                    objects: slide.objects
                }
            )
        }
    }
    static async getInformationFromOpenAI(userInput){
        const response = await OpenAIService.createCompletion({
            model: 'text-davinci-003',
            prompt: `Please generate a JSON structure representing a presentation on the topic of ${userInput}. Please include any relevant information or data that would be useful for the presentation. The JSON structure should include a collection of slides, with each slide containing a title, subtitle, and content. The content for each slide can be of different types, such as text or images. Create not more than 3 slides. Information should be too big. Please format the JSON structure in the following format: [
                {
                    "title": "Slide title",
                    "subtitle": "Slide subtitle",
                    "content": [
                        {
                          "type": "text",
                          "text": "Slide text"
                        },
                        {
                          "type": "image",
                          "imageToSearch": "Relevant image 1"
                        },
                        {
                          "type": "image",
                          "imageToSearch": "Relevant image 2"
                        }
                    ]
                }
            ]`,
            temperature: 0.7,
            max_tokens: 1025,
        })
        const jsonPattern = /(^[\s\S]*\{[\s\S]*\}$)/gm;

        // Extract JSON data from response
        const jsonData = response.data.choices[0].text.trim().match(jsonPattern)[0];
        return jsonData.match(jsonPattern)[0]
    }
    static async fixJson(aiJsonResponse){
        const response = await OpenAIService.createCompletion({
            model: 'text-davinci-003',
            prompt: `fix this json response "${aiJsonResponse}" so that it will be parsed properly. return ONLY json answer`,
            temperature: 0.7,
            max_tokens: 2025,
        })
        const jsonPattern = /(^[\s\S]*\{[\s\S]*\}$)/gm;

        // Extract JSON data from response
        const jsonData = response.data.choices[0].text.trim().match(jsonPattern)[0];
        return jsonData.match(jsonPattern)[0]
    }
    static createPresentation(){
        const pptx = new pptxgenjs()
        pptx.addSlide()
    }
}

export default PPTXBuilder