const getServer = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'https://doan1920-back.herokuapp.com';
    }
    return 'http://localhost:8080'
}
module.exports = {
    getServer
}