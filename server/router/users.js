const router = require('express').Router();
const { usersController } = require('../controller');

router.post('/signup', usersController.signup.post);
router.post('/signin', usersController.signin.post);
router.delete('/signout', usersController.signout.delete);
router.get('/:uid', usersController.uid.get);
router.patch('/properties', usersController.properties.patch);
router.delete('/properties', usersController.properties.delete);

module.exports = router;
