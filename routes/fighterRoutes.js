const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', (req, res, next) => {
  try {
    const fighters = FighterService.get();
    res.data = ({ fighters });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const fighter = FighterService.search({id: req.params.id});
    res.data = ({ fighter });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  const { err } = res;
  try {
    if (err) throw err;
    const fighter = FighterService.createOne(req.body);
    res.data = ({
      message: 'Fighter has been successfully created',
      fighter,
    });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
  const { err } = res;
  try {
    if (err) throw err;
    const updatedFighter = FighterService.updateOne(req.params.id, req.body);
    res.data = ({
      message: 'Fighter has been successfully updated',
      updatedFighter,
    });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const removedFighter = FighterService.deleteOne(req.params.id);
    res.data = ({
      message: 'Fighter has been successfully removed',
      removedFighter,
    });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;
