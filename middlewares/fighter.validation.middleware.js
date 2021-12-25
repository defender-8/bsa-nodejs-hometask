const { fighter } = require('../models/fighter');
const { BaseValidator } = require('./base.validation');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during creation
    fighterValid(req, res, next);
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during update
    fighterValid(req, res, next);
};

function fighterValid(req, res, next) {
    const data = req.body;
    const { health, power, defense } = data;

    const validator = new BaseValidator(fighter, res, data);

    const isValidationError = validator.isNotDeclaredValues()
      || validator.isIdInsideReqBody()
      || validator.isEmptyRequiredField()
      || validator.isInRange('Power', power, 1, 100)
      || validator.isInRange('Defense', defense, 1, 10)
      || validator.isInRange('Health', health, 80, 120);

    if (isValidationError) {
        next();
    }

    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
