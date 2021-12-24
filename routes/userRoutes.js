const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
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

module.exports = router;
