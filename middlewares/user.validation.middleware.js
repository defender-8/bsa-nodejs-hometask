const { user } = require('../models/user');
const { BaseValidator } = require('./base.validation');

const createUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during creation
    userValid(req, res, next);
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validator for user entity during update
    userValid(req, res, next);
};

function userValid(req, res, next) {
    const data = req.body;
    const { email, phoneNumber, password } = data;

    const validator = new BaseValidator(user, res, data);

    const isValidationError = validator.isNotDeclaredValues()
      || validator.isIdInsideReqBody()
      || validator.isEmptyRequiredField()
      || validator.isValidEmail(email)
      || validator.isValidPhoneNumber(phoneNumber)
      || validator.isValidPassword(password);

    if (isValidationError) {
        next();
    }

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
