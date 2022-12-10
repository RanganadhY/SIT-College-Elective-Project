import axios from "axios";

const axiosInstance=axios.create({
    
    // baseURL:"http://localhost:3000",
    baseURL:"http://ec2-3-109-199-106.ap-south-1.compute.amazonaws.com:3000/",
    // headers:{ baseURL
    //     'Content-Type': 'multipart/form-data'
    // }

    
    
});

export default axiosInstance;