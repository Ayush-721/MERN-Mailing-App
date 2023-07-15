import axios from 'axios';

const API_URL = 'http://localhost:8000'; //backend server

const API_GMAIL = async (urlObject, payload, type) => {
    return await axios({
        method: urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,    //endpoint is basically the 4 operations ie get, post, put and delete
        data: payload                        //in case of get request it is empty

    })
    // axios.interceptors.response();
    // axios.get('localhost:8000');
}

export default API_GMAIL;