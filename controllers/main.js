const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password');
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    response.status(200).json({ message: 'User created.', token });
}

const dashboard = async (request, response) => {

    const luckyNumber = Math.floor(Math.random() * 100);
    response.status(200).json({
        message: `Hello, ${request.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
}

module.exports = {
    login,
    dashboard
}