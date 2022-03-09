import axios from 'axios';


export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await axios.get(url,{body, headers})
    
            if(!response.statusText === "OK"){
                throw new Error(`Error ${url}, status: ${response.status}`);
            }
    
            return response.data;
        } catch (error) {
            return error;
        }

    }

    return {request};

}