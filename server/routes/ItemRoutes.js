const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/ItemController');

router.route('/').get(getItems).post(createItem);
router.route('/:id').get(getItem).delete(deleteItem).put(updateItem);

module.exports = router;