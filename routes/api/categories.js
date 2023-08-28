const express = require('express');
const categoryCtrl = require('../../controllers/api/categories');

const router = express.Router();

router.get('/', categoryCtrl.index);
router.get('/:id', categoryCtrl.show);
// router.get('/api/categories', categoryCtrl.fetchCategories);
module.exports = router;