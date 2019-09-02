const axios = require('axios');
const url = require('./Common').getServer();
const getInfoAPI = () => axios.get(url)
  .then((response) => response.data)
  .catch(function (error) {
    console.log(error);
  });
const postAPI = (studentName) => axios.post(url + '/demo/student/create', {
    studentName
  })
  .then((response) => response.data)
  .catch(function (error) {
    console.log(error);
  });
module.exports = {
  getInfoAPI,
  postAPI
}