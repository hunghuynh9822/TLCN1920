const axios = require('axios');
const url = require('./ConnectAPI').getServer();
console.log("Curent Server : "+url);
const getAllEmployees = () => axios.get(url + "/emplmicro/api/")
  .then((response) => response.data)
  .catch(function (error) {
    console.log(error);
  });
module.exports = {
  getAllEmployees
}