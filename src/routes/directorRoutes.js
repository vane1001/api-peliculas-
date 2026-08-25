const { Router } = require('express');
const directorController = require('../controllers/directorController');

const router = Router();

router.get('/', directorController.getAll);
router.get('/:id', directorController.getById);
router.post('/', directorController.create);
router.put('/:id', directorController.update);
router.delete('/:id', directorController.remove);

module.exports = router;