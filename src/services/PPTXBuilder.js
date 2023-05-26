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
            prompt: `Please generate a JSON structure representing a presentation on the topic of ${userInput}. Please include any relevant information or data that would be useful for the presentation. The JSON structure should include a collection of slides, with each slide containing a title, subtitle, and content. The content for each slide can be of different types, such as text or images. Create not more than 4 slides. Information should be too big. Image title names should be short and broad, so that they could be existing at Pixabay service (do not include names or unpopular terminology). Please format the JSON structure in the following format: [
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
                          "imageToSearch": "Image 1 title name to search in Pixabay"
                        },
                        {
                          "type": "image",
                          "imageToSearch": "Image 1 title name to search in Pixabay"
                        }
                    ]
                }
            ]. Your response should contain only JSON structure without any "Sure, here it is..." or something like that in order to let me just copy paste  `,
            temperature: 0.7,
            max_tokens: 1025,
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