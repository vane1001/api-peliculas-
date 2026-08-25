const { Router } = require('express');
const generoController = require('../controllers/generoController');

const router = Router();

router.get('/', generoController.getAll);
router.get('/:id', generoController.getById);
router.post('/', generoController.create);
router.put('/:id', generoController.update);
router.delete('/:id', generoController.remove);

module.exports = router;