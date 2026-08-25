const { Router } = require('express');
const productoraController = require('../controllers/productoraController');

const router = Router();

router.get('/', productoraController.getAll);
router.get('/:id', productoraController.getById);
router.post('/', productoraController.create);
router.put('/:id', productoraController.update);
router.delete('/:id', productoraController.remove);

module.exports = router;