const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        throw new CustomAPIError('Please provide username and password', 400);
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    response.status(200).json({ message: 'User created.', token });
}

const dashboard = async (request, response) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided!', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const luckyNumber = Math.floor(Math.random() * 100);
        response.status(200).json({
            message: `Hello, ${decoded.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
        });

    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route!', 401);
    }
}

module.exports = {
    login,
    dashboard
}