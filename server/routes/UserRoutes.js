const express = require('express');
const router = express.Router();
const { getUsers, getUser, deleteUser, updateUser  } = require('../controllers/UserController');

//router.route('/').get(getUsers).post(createUser);
router.route('/').get(getUsers)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;