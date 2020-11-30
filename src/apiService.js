import axios from 'axios';
const url = "//www.omdbapi.com"

const getCall = async(query) => {
    const currenturl = url + "/?"+query+"&apikey=c7256108";
    const data = await axios.get(currenturl);
    return data
}

export default getCall;