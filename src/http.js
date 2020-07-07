import axios from "axios";

const http = axios.create({
    baseURL: 'https://afxltd.fn.thelarkcloud.com/',

});

export default http