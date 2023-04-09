import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PPTXBuilder from '../services/PPTXBuilder';
import { jsonrepair } from 'jsonrepair';
import pptxgen from "pptxgenjs";
import OpenAIService from '../services/OpenAIService';
import ImageSearchService from '../services/ImageSearchService';
import convertJSON from '../utils/jsonConverter';
function TextToPPTX() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false)
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const createPresentation = async (topic) => {
    try {
      setLoading(true)
      const aiJsonResponse = await PPTXBuilder.getInformationFromOpenAI(topic)
      const fixedJson = await PPTXBuilder.fixJson(aiJsonResponse)
      let jsonData = jsonrepair(fixedJson)
      jsonData = JSON.parse(convertJSON(JSON.parse(jsonData)))
      const pptx = new pptxgen();
      for (const slideData of jsonData) {
        const slide = pptx.addSlide();
        switch(true){
            case slideData.title !== undefined:
                slide.addText(slideData.title.text, slideData.title.options);
            case slideData.subtitle !== undefined:
                slide.addText(slideData.subtitle.text, slideData.subtitle.options);
            case slideData.content !== undefined:
                for (const contentData of slideData.content) {
                    switch (contentData.type) {
                        case 'text': 
                            slide.addText(contentData.text, contentData.options);
                            break;
                        case 'image': 
                            const imageTitle = await ImageSearchService.getGoogleTitle(slideData.title.text, slideData.subtitle.text)
                            const imageUrl = await ImageSearchService.getImagesBySearchText(imageTitle)
                            slide.addImage(
                                {
                                    path: imageUrl,
                                    w: contentData.width,
                                    h: contentData.height,
                                    x: contentData.options.x,
                                    y: contentData.options.y
                                }
                            );
                            break;
                    }
                } 
                break;
            default: break;
        }
      }
      await pptx.writeFile(`${jsonData[0].title.text}.pptx`);
      setLoading(false);
    } catch (err) {
      console.error("Error occurred while creating presentation:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPresentation(inputText);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formInputText">
          <Form.Label>Enter your text:</Form.Label>
          <Form.Control as="textarea" rows={10} value={inputText} onChange={handleInputChange} />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          {loading ? 'PPTX creation process...' : 'Convert to PPTX'}
        </Button>
      </Form>
    </div>
  );
}

export default TextToPPTX;
