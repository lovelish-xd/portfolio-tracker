const express = require('express');
const router = express.Router();
const stockController = require('../controller/stockController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', stockController.createStock);
router.get('/', stockController.getAllStocks);
router.put('/:id', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);

module.exports = router;