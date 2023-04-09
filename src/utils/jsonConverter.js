export default function convertJSON(inputJSON) {
    const outputJSON = [];
    
    // Loop through each object in the input JSON
    for (let i = 0; i < inputJSON.length; i++) {
      const inputObject = inputJSON[i];
      const outputObject = {
        title: {
          text: inputObject.title,
          options: {
            x: 0.3,
            y: 0.3,
            fontSize: 26,
            color: "0078D7"
          }
        },
        subtitle: {
          text: inputObject.subtitle,
          options: {
            x: 0.3,
            y: 0.8,
            fontSize: 18,
            color: "333333"
          }
        },
        content: []
      };
      
      // Loop through each content object in the input object
      for (let j = 0; j < inputObject.content.length; j++) {
        const inputContent = inputObject.content[j];
        const outputContent = {
          type: inputContent.type,
          imageToSearch: inputContent.imageToSearch
        };
        
        // Add options based on the content type
        if (inputContent.type === "text") {
          outputContent.text = inputContent.text;
          outputContent.options = {
            x: 0.3,
            y: 2.0,
            fontSize: 16,
            color: "333333"
          };
        } else if (inputContent.type === "image") {
          outputContent.width = 4.7;
          outputContent.height = 2.6;
          outputContent.options = {
            x: j === 1 ? 0.3 : 5.15,
            y: 2.9
          };
        }
        
        outputObject.content.push(outputContent);
      }
      
      outputJSON.push(outputObject);
    }
    
    return JSON.stringify(outputJSON);
  }
  