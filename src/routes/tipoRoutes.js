const { Router } = require('express');
const tipoController = require('../controllers/tipoController');

const router = Router();

router.get('/', tipoController.getAll);
router.get('/:id', tipoController.getById);
router.post('/', tipoController.create);
router.put('/:id', tipoController.update);
router.delete('/:id', tipoController.remove);

module.exports = router;