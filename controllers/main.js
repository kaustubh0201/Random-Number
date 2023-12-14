const login = async (request, response) => {
    response.send('Fake Login!');
}

const dashboard = async (request, response) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    response.status(200).json({
        message: `Hello, John Doe`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
}

module.exports = {
    login,
    dashboard
}