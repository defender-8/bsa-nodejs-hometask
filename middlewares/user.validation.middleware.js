const { user } = require('../models/user');
const { BaseValidator } = require('./base.validation');

const validator = new BaseValidator(user);

const createUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during creation
    const data = req.body;
    const { firstName, lastName, email, phoneNumber, password } = data;

    validator.areValuesRequired(res, data);

    next();
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during update
    const data = req.body;
    const { firstName, lastName, email, phoneNumber, password } = data;

    validator.areValuesRequired(res, data);

    next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
