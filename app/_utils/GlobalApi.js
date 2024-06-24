const { default: axios } = require("axios");

//created axio client to create endpoint
const axiosClient=axios.create({
    baseURL:'http://localhost:8000'
});

const createUser = (data) => axiosClient.post('/user', data)

export default{
    createUser
}