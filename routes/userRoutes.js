const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
  try {
    const users = UserService.get();
    res.data = ({ users });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const user = UserService.search({id: req.params.id});
    res.data = ({ user });
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  const { err } = res;
  try {
    if (err) throw err;
    UserService.createOne(req.body);
    res.data = ({message: 'User has been successfully created'});
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
  const { err } = res;
  try {
    if (err) throw err;
    UserService.updateOne(req.params.id, req.body);
    res.data = ({message: 'User has been successfully updated'});
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    UserService.deleteOne(req.params.id);
    res.data = ({message: 'User has been successfully removed'});
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;
