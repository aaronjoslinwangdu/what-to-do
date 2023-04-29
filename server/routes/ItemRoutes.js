const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem, getUserItems } = require('../controllers/ItemController');

router.route('/').get(getItems).post(createItem);
router.route('/:id').get(getItem).delete(deleteItem).put(updateItem);
router.route('/user/:id').get(getUserItems);

module.exports = router;