import axios from 'axios';

function formatStringForPixabayQuery(inputString) {
    var words = inputString.split(" ");
    var formattedString = words.join("+");
    return formattedString;
}

class ImageSearchService {
    static async getImagesBySearchTextFromPexels(searchText){
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${searchText}&per_page=1&size=medium`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.29.3',
                'Authorization': process.env.REACT_APP_PEXELS_API_KEY
            }
        })
        return response.data.photos[0].src.original
    }
    static async getImagesBySearchTextFromPixabay(searchText){
        const apiKey = process.env.REACT_APP_PIXABAY_API_KEY
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${formatStringForPixabayQuery(searchText)}&image_type=photo`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.29.3',
            }
        })
        const hits = response.data.hits
        if(hits.length == 0){
            return '' 
        }
        return hits[0].webformatURL
    }
}
export default ImageSearchService;