const { fighter } = require('../models/fighter');
const { BaseValidator } = require('./base.validation');

const validator = new BaseValidator(fighter);

const createFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during creation
    const data = req.body;
    const { name, health, power, defense } = data;

    validator.areValuesRequired(res, data);

    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validator for fighter entity during update
    const data = req.body;
    const { name, health, power, defense } = data;

    validator.areValuesRequired(res, data);

    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
