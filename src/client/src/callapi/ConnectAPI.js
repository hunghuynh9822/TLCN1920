const getServer = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.SERVER_HOST || 'http://localhost:8080';
    }
    return 'http://localhost:8080';
}
module.exports = {
    getServer
}