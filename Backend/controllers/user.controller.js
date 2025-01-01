const User = require('../models/user.model');
const { createUser } = require('../services/user.service');

exports.registerUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};