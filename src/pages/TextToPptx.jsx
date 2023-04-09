import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PPTXBuilder from '../services/PPTXBuilder';
import { jsonrepair } from 'jsonrepair';
import pptxgen from "pptxgenjs";
import OpenAIService from '../services/OpenAIService';
import ImageSearchService from '../services/ImageSearchService';
import convertJSON from '../utils/jsonConverter';
import {Table} from 'react-bootstrap';
function TextToPPTX() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false)
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const [ready, setReady] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });
  const [isTableShown, setIsTableShown] = useState(false)

  const handleReady = (stage) => {
    setReady((prevState) => ({
      ...prevState,
      [stage]: !prevState[stage],
    }));
  };

  const createPresentation = async (topic) => {
    try {
      setLoading(true)
      setIsTableShown(true)
      const aiJsonResponse = await PPTXBuilder.getInformationFromOpenAI(topic)
      handleReady('stage1')
      // const fixedJson = await PPTXBuilder.fixJson(aiJsonResponse)
      let jsonData = jsonrepair(aiJsonResponse)
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
                            // const imageTitle = await ImageSearchService.getGoogleTitle(slideData.title.text, slideData.subtitle.text)
                            // console.log()
                            const imageUrl = await ImageSearchService.getImagesBySearchText(contentData.imageToSearch)
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
                handleReady('stage2')
                break;
            default: break;
        }
      }
      await pptx.writeFile(`${jsonData[0].title.text}.pptx`);
      setLoading(false);
      handleReady('stage3')
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
        {isTableShown ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Readiness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Content Generation Completed</td>
                <td>
                  <input
                    type="checkbox"
                    checked={ready.stage1}
                    disabled
                    onChange={() => handleReady('stage1')}
                  />
                </td>
              </tr>
              <tr>
                <td>Photos Generated</td>
                <td>
                  <input
                    type="checkbox"
                    checked={ready.stage2}
                    disabled
                    onChange={() => handleReady('stage2')}
                  />
                </td>
              </tr>
              <tr>
                <td>Presentation download</td>
                <td>
                  <input
                    type="checkbox"
                    checked={ready.stage3}
                    disabled
                    onChange={() => handleReady('stage3')}
                  />
                </td>
              </tr>
            </tbody>
          </Table> : <></>}
        
      </Form>
    </div>
  );
}

export default TextToPPTX;
